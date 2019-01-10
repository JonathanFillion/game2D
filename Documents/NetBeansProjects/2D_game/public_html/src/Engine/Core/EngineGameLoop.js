/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


"use strict";

var Engine = Engine || {};

Engine.GameLoop = (function () {
    var fps = 60;
    var mpf = 1000 / fps;

    var previousTime;
    var lagTime;
    var currentTime;
    var elapsedTime;

    var isLoopRunning = false;
    var game = null;

    var _runLoop = function () {
        if (isLoopRunning) {

            requestAnimationFrame(function () {
                _runLoop.call(game);
            });

            currentTime = Date.now();
            elapsedTime = currentTime - previousTime;
            previousTime = currentTime;
            lagTime += elapsedTime;


            while ((lagTime >= mpf) && isLoopRunning) {
                Engine.Input.update();
                this.update();
                lagTime -= mpf;
            }
            this.render();
        }
    };

    var _startLoop = function () {
        previousTime = Date.now();
        lagTime = 0.0;
        isLoopRunning = true;
        requestAnimationFrame(function () {
            _runLoop.call(game);
        });
    };

    var start = function (gameTemp) {
        game = gameTemp;
        Engine.ResourceMap.setLoadCompleteCallback(
                function () {
                    game.initialize();
                    _startLoop();
                }
        );
    };

    var Public = {
        start: start
    };
    return Public;
}());