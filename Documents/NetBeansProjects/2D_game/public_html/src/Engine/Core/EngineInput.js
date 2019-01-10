
"use strict";

var Engine = Engine || {};

Engine.Input = (function () {

    var Keys = {

        Left: 37,
        Up: 38,
        Right: 39,
        Down: 40,

        Space: 32,

        Zero: 48,
        One: 49,
        Two: 50,
        Three: 51,
        Four: 52,
        Five: 53,
        Six: 54,
        Seven: 55,
        Eight: 56,
        Nine: 57,

        A: 65,
        D: 68,
        E: 69,
        F: 70,
        G: 71,
        I: 73,
        J: 74,
        K: 75,
        L: 76,
        R: 82,
        S: 83,
        W: 87,

        LastKeyCode: 222
    };

    var keyPreviousState = [];
    var isKeyPressed = [];
    var isKeyClicked = [];

    var _onKeyDown = function (event) {
        event.preventDefault();
        isKeyPressed[event.keyCode] = true;
    };
    var _onKeyUp = function (event) {
        isKeyPressed[event.keyCode] = false;
    };

    var initialize = function () {
        var i;
        for (i = 0; i < Keys.LastKeyCode; i++) {
            isKeyPressed[i] = false;
            keyPreviousState[i] = false;
            isKeyClicked[i] = false;
        }

        window.addEventListener('keyup', _onKeyUp);
        window.addEventListener('keydown', _onKeyDown);
    };

    var update = function () {
        var i;
        for (i = 0; i < Keys.LastKeyCode; i++) {
            isKeyClicked[i] = (!keyPreviousState) && isKeyPressed[i];
            keyPreviousState = isKeyPressed[i];
        }
    };

    var getIsKeyPressed = function (keycode) {
        return isKeyPressed[keycode];
    };

    var getIsKeyClicked = function (keycode) {
        return isKeyClicked[keycode];
    };

    var Public = {
        initialize: initialize,
        update: update,
        getIsKeyPressed: getIsKeyPressed,
        getIsKeyClicked: getIsKeyClicked,
        Keys: Keys
    };
    return Public;
}());