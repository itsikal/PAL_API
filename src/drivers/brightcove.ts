import { Driver, playerAPI } from '../api';

declare var window: any;
declare var videojs: (id: string) => playerAPI;

export default class BrightcoveDriver extends Driver {
  static getAPI = (params: { id: string }) => window['videojs'] && videojs('brightcovePlayer');

  subscribe(params: { onPlayList: () => void, onAdPlay: (event?: string) => void }) {
    this.api.on('playlistItem', params.onPlayList);

  }

  isPlaying() {
    return true;
  }
}
