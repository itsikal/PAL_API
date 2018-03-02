export declare type playerAPI = {
    on: (event: string, handler: (event: string) => void) => void;
    getState: () => string;
    getWrapper: () => HTMLElement;
    pause: () => void;
    play: () => void;
};
export declare class Driver {
    api: playerAPI;
    wrapper: HTMLElement;
    constructor(api: any, wrapper: HTMLElement);
    pause(): void;
    play(): void;
    getWrapper(): HTMLElement;
}
export default function getDriver(params: {
    driver: any;
    selector: string;
    onReady: (driver: Driver) => void;
    onFail: () => void;
}): void;
