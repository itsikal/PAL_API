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
var CedatoDriver = (function (_super) {
    __extends(CedatoDriver, _super);
    function CedatoDriver() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.playing = false;
        return _this;
    }
    CedatoDriver.prototype.subscribe = function (params) {
        var _this = this;
        this.api.on('content.started', function () {
            _this.playing = true;
            params.onPlayList;
        });
        this.api.on('content.paused', function () {
            _this.playing = false;
        });
        this.api.on('content.resumed', function () {
            _this.playing = true;
        });
        this.api.on('content.completed', params.onAdPlay);
        this.api.on('ad.start', params.onAdPlay);
        this.api.on('ad.complete', params.onAdPlay);
        this.api.on('ad.error', params.onAdPlay);
    };
    CedatoDriver.prototype.isPlaying = function () {
        return this.playing;
    };
    CedatoDriver.getAPI = function (params) { return window['CEDATO_API'] && CEDATO_API.getPlayer(params.id); };
    return CedatoDriver;
}(api_1.Driver));
exports["default"] = CedatoDriver;
