"use strict";

var Engine = Engine || {};

Engine.Core = (function () {
    var Gl = null;
    var getGl = function () {
        return Gl;
    };
    
    var startScene = function(scene){
        scene.loadScene.call(scene);
        Engine.GameLoop.start(scene);
    };
    
    var initializeEngineCore = function (canvasId, game) {
        _initializeWebGl(canvasId);
        Engine.VertexBuffer.initialize();
        Engine.Input.initialize();
        Engine.DefaultResources.initialize(function () {
            startScene(game);
        });
    };

    var _initializeWebGl = function (canvasId) {
        var canvas = document.getElementById(canvasId);
        Gl = canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
        if (Gl === null) {
            console.error("WebGl ne peut pas etre charge");
            return;
        }
    };

    var clearCanvas = function (color) {
        Gl.clearColor(color[0], color[1], color[2], color[3]);
        Gl.clear(Gl.COLOR_BUFFER_BIT);
    };
    
    var startScene = function(scene){
        scene.loadScene.call(scene);
        Engine.GameLoop.start(scene);
    };

    var Public = {
        getGl: getGl,
        initializeEngineCore: initializeEngineCore,
        clearCanvas: clearCanvas,
        startScene: startScene
    };
    return Public;
}());