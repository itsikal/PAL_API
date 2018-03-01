"use strict";
exports.__esModule = true;
function getWrapper(identifier) {
    var wrapper = null;
    if (identifier) {
        wrapper = document.getElementById(identifier);
        if (!wrapper) {
            wrapper = document.getElementsByClassName(identifier)[0];
        }
    }
    return wrapper;
}
exports.getWrapper = getWrapper;
