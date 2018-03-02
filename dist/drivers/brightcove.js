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
var BrightcoveDriver = (function (_super) {
    __extends(BrightcoveDriver, _super);
    function BrightcoveDriver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BrightcoveDriver.prototype.subscribe = function (params) {
        this.api.on('playlistItem', params.onPlayList);
    };
    BrightcoveDriver.prototype.isPlaying = function () {
        return true;
    };
    BrightcoveDriver.getAPI = function (params) { return window['videojs'] && videojs('brightcovePlayer'); };
    return BrightcoveDriver;
}(api_1.Driver));
exports["default"] = BrightcoveDriver;
