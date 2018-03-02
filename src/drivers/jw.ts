import { Driver, playerAPI } from '../api';

declare var window: any;
declare var jwplayer: (id: string) => playerAPI;

export default class JWdriver extends Driver {
  static getAPI = (params: { id: string }) => window['jwplayer'] && jwplayer(params.id);

  subscribe(params: { onPlayList: () => void, onAdPlay: (event?: string) => void }) {
    this.api.on('playlistItem', params.onPlayList);
    this.api.on('adStarted', params.onAdPlay);
    this.api.on('adError', params.onPlayList);
    this.api.on('playlistComplete', params.onAdPlay);
  }

  isPlaying() {
    return this.api.getState() === 'playing';
  }
}
