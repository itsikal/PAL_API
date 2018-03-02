export type playerAPI = {
  on: (event: string, handler: (event: string) => void) => void;
  getState: () => string;
  getWrapper: () => HTMLElement;
  pause: () => void;
  play: () => void;
};

export class Driver {
  api: playerAPI;
  wrapper: HTMLElement;

  constructor(api: any, wrapper: HTMLElement) {
    this.api = api;
    this.wrapper = wrapper;
  }

  pause() {
    this.api.pause();
  }

  play() {
    this.api.play();
  }

  getWrapper() {
    return this.wrapper;
  }
}

export default function getDriver(params: { driver: any, selector: string, onReady: (driver: Driver) => void, onFail: () => void }) {
  tryGetDriver(
    params.driver,
    params.selector,
    (api, wrapper) => { params.onReady(new params.driver(api, wrapper)); },
    () => { params.onFail(); }
  );
}

function tryGetDriver(driver: any, selector: string, resolve: (api: any, wrapper: HTMLElement) => void, reject: () => void ) {
  let api;
  let wrapper: HTMLElement;
  let failCount = 0;
  let interval = setInterval(() => {
    if (failCount > 10) {
      clearInterval(interval);
      reject();
    }
    wrapper = tryGetWrapper(selector);
    if (wrapper) {
      api = tryGetAPI(driver, wrapper.id);
      if (api) {
        clearInterval(interval);
        resolve(api, wrapper);
      }
    }
    failCount++;
  }, 1000);
}

function tryGetWrapper(selector: string) {
  let wrapper;
  if (selector) {
    wrapper = document.getElementById(selector);
    if (!wrapper) {
      wrapper = document.getElementsByClassName(selector)[0];
    }
  }

  return wrapper as HTMLElement;
}

function tryGetAPI(driver: any, id: string) {
  return driver.getAPI({ id });
}
