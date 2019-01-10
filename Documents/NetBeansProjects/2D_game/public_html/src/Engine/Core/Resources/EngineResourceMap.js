"use strict";

var Engine = Engine || {};

Engine.ResourceMap = (function () {

    var MapEntry = function (rName) {
        this.asset = rName;
    };
    var numOutstandingLoads = 0;

    var loadCompleteCallback = null;

    var resourceMap = {};

    var asyncLoadRequested = function (rName) {
        resourceMap[rName] = new MapEntry(rName);
        numOutstandingLoads++;
    };

    var asyncLoadCompleted = function (rName, loadedAsset) {
        if (!isAssetLoaded(rName)) {
            console.log("Engine.asyncLoadCompleted: [" + rName + "] not in map!");
        }
        resourceMap[rName].asset = loadedAsset;
        numOutstandingLoads--;
        _checkAllComplete();
    };

    var _checkAllComplete = function () {
        if ((numOutstandingLoads === 0) && (loadCompleteCallback !== null)) {
            var functionToCall = loadCompleteCallback;
            loadCompleteCallback = null;
            functionToCall();
        }
    };

    var setLoadCompleteCallback = function (func) {
        loadCompleteCallback = func;
        _checkAllComplete();
    };

    var retreiveAsset = function (rName) {
        var res = null;
        if (rName in resourceMap) {
            res = resourceMap[rName].asset;
        } else {
            console.log("Error Engine.retrieveAsset : " + rName + " not in map");
        }
        return res;
    };

    var isAssetLoaded = function (rName) {
        return (rName in resourceMap);
    };

    var unloadAsset = function (rName) {
        if (rName in resourceMap)
            delete resourceMap[rName];
    };

    var Public = {
        asyncLoadRequested: asyncLoadRequested,
        asyncLoadCompleted: asyncLoadCompleted,
        setLoadCompleteCallback: setLoadCompleteCallback,
        retreiveAsset: retreiveAsset,
        unloadAsset: unloadAsset,
        isAssetLoaded: isAssetLoaded
    };
    return Public;
}());