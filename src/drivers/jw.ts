type playerAPI = {
  on: (event: string, handler: (event: string) => void) => void;
  getState: () => string;
  getWrapper: () => HTMLElement;
  pause: () => void;
  play: () => void;
};

declare var window: any;
declare var jwplayer: (id: string) => playerAPI;

export class JWdriver {
  static getAPI = (params: { id: string }) => window['jwplayer'] && jwplayer(params.id);

  wrapper: HTMLElement;

  constructor(api: any, wrapper: HTMLElement) {
    // API pointer
    this.api = api;
    this.wrapper = wrapper;
  }

  subscribe(params: { onPlayList: () => void, onAdPlay: (event?: string) => void, onStateChange: (state?: boolean) => void }) {
    this.api.on('playlistItem', params.onPlayList);
    this.api.on('adStarted', params.onAdPlay);
    this.api.on('adError', params.onPlayList);
    this.api.on('play', () => {
      params.onStateChange(true);
    });
    this.api.on('pause', () => {
      params.onStateChange(false);
    });
    this.api.on('playlistComplete', () => {
      params.onStateChange(false);
      params.onAdPlay();
    });
  }

  pause() {
    this.api.pause();
  }

  play() {
    this.api.play();
  }

  getState() {
    this.api.getState();
  }

  getWrapper() {
    return this.wrapper;
  }

  isPlaying() {
    return this.playing && this.api.getState() === 'playing';
  }

  private api: playerAPI;
  private playing = false;
}

export function getDriver(params: { selector: string, onReady: (driver: JWdriver) => void, onFail: () => void }) {
  tryGetDriver(params.selector, (api, wrapper: HTMLElement) => {
    if (api) {
      params.onReady(new JWdriver( api, wrapper as HTMLElement));
    }
  });
}

export function tryGetDriver(selector: string, resolve: (api: any, wrapper: HTMLElement) => void) {
  let api;
  let wrapper: HTMLElement;
  let failCount = 0;
  let interval = setInterval(() => {
    if (failCount > 10) {
      clearInterval(interval);
    }
    wrapper = tryGetWrapper(selector);
    if (wrapper) {
      api = tryGetAPI(wrapper.id);
      if (api) {
        clearInterval(interval);
        resolve(api, wrapper);
      }
    }
    failCount++;
  }, 1000);
}

export function tryGetWrapper(selector: string) {
  let wrapper;
  if (selector) {
    wrapper = document.getElementById(selector);
    if (!wrapper) {
      wrapper = document.getElementsByClassName(selector)[0];
    }
  }

  return wrapper as HTMLElement;
}

export function tryGetAPI(id: string) {
  return JWdriver.getAPI({ id });
}
