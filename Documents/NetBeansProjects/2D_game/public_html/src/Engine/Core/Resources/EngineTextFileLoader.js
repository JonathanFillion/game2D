"use strict";

var Engine = Engine || {};

Engine.TextFileLoader = (function () {
    var textFileType = Object.freeze({
        xmlFile: 0,
        textFile: 1
    });

    var loadTextFile = function (filename, filetype, callback) {
        if (!(Engine.ResourceMap.isAssetLoaded(filename))) {
            Engine.ResourceMap.asyncLoadRequested(filename);

            var request = new XMLHttpRequest();
            request.onreadystatechange = function () {
                if ((request.readyState === 4) && (request.status !== 200)) {
                    console.log(filename + " failed to load");
                }
            };
            request.open("GET", filename, true);
            request.setRequestHeader("Content-Type", "text/xml");

            request.onload = function () {
                var fileContent = null;
                if (filetype === textFileType.xmlFile) {
                    var parser = new DOMParser();
                    fileContent = parser.parseFromString(request.responseText, "text/xml");
                } else {
                    fileContent = request.responseText;
                }
                Engine.ResourceMap.asyncLoadCompleted(filename, fileContent);
                if ((callback !== null) && (callback !== undefined)) {
                    callback(filename);
                }
            };
            request.send();
        } else {
            if ((callback !== null) && (callback !== undefined)) {
                callback(filename);
            }
        }
    };

    var unloadTextFile = function (filename) {
        Engine.ResourceMap.unloadAsset(filename);
    };

    var Public = {
        loadTextFile: loadTextFile,
        unloadTextFile: unloadTextFile,
        textFileType: textFileType
    };
    return Public;
}());