export declare class JWdriver {
    static getAPI: (params: {
        id: string;
    }) => {
        on: (event: string, handler: (event: string) => void) => void;
        getState: () => string;
        getWrapper: () => HTMLElement;
        pause: () => void;
        play: () => void;
    };
    wrapper: HTMLElement;
    constructor(api: any, wrapper: HTMLElement);
    subscribe(params: {
        onPlayList: () => void;
        onAdPlay: (event?: string) => void;
        onStateChange: (state?: boolean) => void;
    }): void;
    pause(): void;
    play(): void;
    getState(): void;
    getWrapper(): HTMLElement;
    isPlaying(): boolean;
    private api;
    private playing;
}
export declare function getDriver(params: {
    selector: string;
    onReady: (driver: JWdriver) => void;
    onFail: () => void;
}): void;
export declare function tryGetDriver(selector: string, resolve: (api: any, wrapper: HTMLElement) => void): void;
export declare function tryGetWrapper(selector: string): HTMLElement;
export declare function tryGetAPI(id: string): {
    on: (event: string, handler: (event: string) => void) => void;
    getState: () => string;
    getWrapper: () => HTMLElement;
    pause: () => void;
    play: () => void;
};
