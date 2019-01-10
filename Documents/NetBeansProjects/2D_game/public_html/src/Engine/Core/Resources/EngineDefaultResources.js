"use strict";

var Engine = Engine || {};

Engine.DefaultResources = (function () {
    var simpleVS = "src/Shaders/SimpleVS.glsl";
    var simpleFS = "src/Shaders/WhiteFS.glsl";

    var basicColorShader = null;

    var getBasicColorShader = function () {
        return basicColorShader;
    };

    var _createShaders = function (callback) {
        basicColorShader = new SimpleShader(simpleVS, simpleFS);
        callback();
    };

    var initialize = function (callback) {
        Engine.TextFileLoader.loadTextFile(simpleVS, Engine.TextFileLoader.textFileType.textFile);
        Engine.TextFileLoader.loadTextFile(simpleFS, Engine.TextFileLoader.textFileType.textFile);

        Engine.ResourceMap.setLoadCompleteCallback(function () {
            _createShaders(callback);
        });
    };

    var Public = {
        initialize: initialize,
        getBasicColorShader: getBasicColorShader
    };
    return Public;
}());