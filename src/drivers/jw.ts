type playerAPI = {
  on: (event: string, handler: (event: string) => void) => void;
  getState: () => string;
};

declare var window: any;
declare var jwplayer: (id: string) => playerAPI;

export class JWdriver {

  static getAPI = (params: { id: string }) => window['jwplayer'] && jwplayer(params.id);

  constructor(api: any) {
    // API pointer
    this.api = api;
  }

  subscribe(params: { onPlayList: () => void, onAdPlay: (event?: string) => void }) {
    this.api.on('playlistItem', params.onPlayList);
    this.api.on('adStarted', params.onAdPlay);
    this.api.on('adError', params.onPlayList);
    this.api.on('play', () => {
      this.playing = true;
    });
    this.api.on('pause', () => {
      this.playing = false;
    });
    this.api.on('playlistComplete', () => {
      this.playing = false;
      params.onAdPlay();
    });
  }

  isPlaying() {
    return this.playing && this.api.getState() === 'playing';
  }

  private api: playerAPI;
  private playing = false;
}

export function getDriver(params: { selector: string, onReady: (driver: JWdriver) => void, onFail: () => void }) {
  let api = tryGetDriver(params);
  if (api) {
    params.onReady(new JWdriver({ api }));
  }
}

export function tryGetDriver({ selector }: { selector: string }) {
  let api;
  let wrapper;
  let failCount = 0;
  let interval = setInterval(() => {
    if (failCount > 10) {
      clearInterval(interval);
    }
    wrapper = tryGetWrapper(selector);
    if (wrapper) {
      api = tryGetAPI(wrapper.id);
    }
    failCount++;
  }, 1000);

  return api;
}

export function tryGetWrapper(selector: string) {
  let wrapper;
  if (selector) {
    wrapper = document.getElementById(selector);
    if (wrapper) {
      wrapper = document.getElementsByClassName(selector)[0];
    }
  }

  return wrapper;
}

export function tryGetAPI(id: string) {
  return JWdriver.getAPI({ id });
}
