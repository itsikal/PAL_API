"use strict";
exports.__esModule = true;
var Driver = (function () {
    function Driver(api, wrapper) {
        this.api = api;
        this.wrapper = wrapper;
    }
    Driver.prototype.pause = function () {
        this.api.pause();
    };
    Driver.prototype.play = function () {
        this.api.play();
    };
    Driver.prototype.getWrapper = function () {
        return this.wrapper;
    };
    return Driver;
}());
exports.Driver = Driver;
function getDriver(params) {
    tryGetDriver(params.driver, params.selector, function (api, wrapper) { params.onReady(new params.driver(api, wrapper)); }, function () { params.onFail(); });
}
exports["default"] = getDriver;
function tryGetDriver(driver, selector, resolve, reject) {
    var api;
    var wrapper;
    var failCount = 0;
    var interval = setInterval(function () {
        if (failCount > 10) {
            clearInterval(interval);
            reject();
        }
        wrapper = tryGetWrapper(selector);
        if (wrapper) {
            api = tryGetAPI(driver, wrapper.id);
            if (api) {
                clearInterval(interval);
                resolve(api, wrapper);
            }
        }
        failCount++;
    }, 1000);
}
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
function tryGetAPI(driver, id) {
    return driver.getAPI({ id: id });
}
