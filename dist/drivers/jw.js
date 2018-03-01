"use strict";
exports.__esModule = true;
var JWdriver = (function () {
    function JWdriver(api, wrapper) {
        this.playing = false;
        this.api = api;
        this.wrapper = wrapper;
    }
    JWdriver.prototype.subscribe = function (params) {
        this.api.on('playlistItem', params.onPlayList);
        this.api.on('adStarted', params.onAdPlay);
        this.api.on('adError', params.onPlayList);
        this.api.on('play', function () {
            params.onStateChange(true);
        });
        this.api.on('pause', function () {
            params.onStateChange(false);
        });
        this.api.on('playlistComplete', function () {
            params.onStateChange(false);
            params.onAdPlay();
        });
    };
    JWdriver.prototype.pause = function () {
        this.api.pause();
    };
    JWdriver.prototype.play = function () {
        this.api.play();
    };
    JWdriver.prototype.getState = function () {
        this.api.getState();
    };
    JWdriver.prototype.getWrapper = function () {
        return this.wrapper;
    };
    JWdriver.prototype.isPlaying = function () {
        return this.playing && this.api.getState() === 'playing';
    };
    JWdriver.getAPI = function (params) { return window['jwplayer'] && jwplayer(params.id); };
    return JWdriver;
}());
exports.JWdriver = JWdriver;
function getDriver(params) {
    tryGetDriver(params.selector, function (api, wrapper) {
        if (api) {
            params.onReady(new JWdriver(api, wrapper));
        }
    });
}
exports.getDriver = getDriver;
function tryGetDriver(selector, resolve) {
    var api;
    var wrapper;
    var failCount = 0;
    var interval = setInterval(function () {
        if (failCount > 10) {
            clearInterval(interval);
        }
        wrapper = tryGetWrapper(selector);
        if (wrapper) {
            api = tryGetAPI(wrapper.id);
            if (api) {
                clearInterval(interval);
                resolve(api, wrapper);
            }
        }
        failCount++;
    }, 1000);
}
exports.tryGetDriver = tryGetDriver;
function tryGetWrapper(selector) {
    var wrapper;
    if (selector) {
        wrapper = document.getElementById(selector);
        if (!wrapper) {
            wrapper = document.getElementsByClassName(selector)[0];
        }
    }
    return wrapper;
}
exports.tryGetWrapper = tryGetWrapper;
function tryGetAPI(id) {
    return JWdriver.getAPI({ id: id });
}
exports.tryGetAPI = tryGetAPI;
