"use strict";

var Engine = Engine || {};

Engine.Utils = (function () {

    var getShaderSource = function (path) {
        var getRequest = new XMLHttpRequest();
        getRequest.open("GET", path, false);
        getRequest.send();
        return getRequest.responseText;
    };

    var Public = {
        getShaderSource: getShaderSource
    };
    return Public;
}());
