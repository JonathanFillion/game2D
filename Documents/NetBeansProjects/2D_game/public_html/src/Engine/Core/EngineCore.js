"use strict";

var Engine = Engine || {};

Engine.Core = (function () {
    var Gl = null;
    var getGl = function () {
        return Gl;
    };
    var initializeWebGl = function (canvasId) {
        var canvas = document.getElementById(canvasId);
        Gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        if (Gl === null) {
            console.error("WebGl ne peut pas etre charge");
            return;
        }
        Engine.VertexBuffer.initialize();
    };
    var clearCanvas = function (color) {
        Gl.clearColor(color[0], color[1], color[2], color[3]);
        Gl.clear(Gl.COLOR_BUFFER_BIT);
    };

    var Public = {
        getGl: getGl,
        initializeWebGl: initializeWebGl,
        clearCanvas: clearCanvas
    };
    return Public;
}());