import { Driver, playerAPI } from '../api';
export default class JWdriver extends Driver {
    static getAPI: (params: {
        id: string;
    }) => playerAPI;
    subscribe(params: {
        onPlayList: () => void;
        onAdPlay: (event?: string) => void;
    }): void;
    isPlaying(): boolean;
}
