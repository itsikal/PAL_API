import { Driver, playerAPI } from "../api";

declare var window: any;
declare var CEDATO_API: { getPlayer: (id: string) => playerAPI };

export default class CedatoDriver extends Driver {
  static getAPI = (params: { id: string }) => window['CEDATO_API'] && CEDATO_API.getPlayer(params.id);

  subscribe(params: { onPlayList: () => void, onAdPlay: (event?: string) => void }) {
    this.api.on('content.started', () => {
      this.playing = true;
      params.onPlayList
    });
    this.api.on('content.paused', () => {
      this.playing = false;
    });
    this.api.on('content.resumed', () => {
      this.playing = true;
    });
    this.api.on('content.completed', params.onAdPlay);
    this.api.on('ad.start', params.onAdPlay);
    this.api.on('ad.complete', params.onAdPlay);
    this.api.on('ad.error', params.onAdPlay);
  }

  isPlaying() {
    return this.playing;
  }

  private playing: boolean = false;
}
