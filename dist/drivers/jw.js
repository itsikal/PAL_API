"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var api_1 = require("../api");
var JWdriver = (function (_super) {
    __extends(JWdriver, _super);
    function JWdriver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    JWdriver.prototype.subscribe = function (params) {
        this.api.on('playlistItem', params.onPlayList);
        this.api.on('adStarted', params.onAdPlay);
        this.api.on('adError', params.onPlayList);
        this.api.on('playlistComplete', params.onAdPlay);
    };
    JWdriver.prototype.isPlaying = function () {
        return this.api.getState() === 'playing';
    };
    JWdriver.getAPI = function (params) { return window['jwplayer'] && jwplayer(params.id); };
    return JWdriver;
}(api_1.Driver));
exports["default"] = JWdriver;
