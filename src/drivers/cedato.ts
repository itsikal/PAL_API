// class Api {
//   window: Window;
//   api: any;
//
//   init(id: string) {
//     if(window['CEDATO_API']) {
//       this.api = window.CEDATO_API.getPlayer(id);
//     }
//   }
//
//   onPlayListItem(fn: () => void) {
//     this.api.on('content.started', fn);
//   }
//
//   onDeactivatePiP(fn: () => void) {
//     this.api.on('content.completed', fn);
//     this.api.on('ad.start', fn);
//     this.api.on('ad.complete', fn);
//     this.api.on('ad.error', fn);
//   }
//
//   onStateChange(fn: (state: boolean) => void) {
//     this.api.on('content.started', () => { fn(true); });
//     this.api.on('content.resumed', () => { fn(true); });
//     this.api.on('content.paused', () => { fn(false); });
//   }
//
// }
//
// new Api();
