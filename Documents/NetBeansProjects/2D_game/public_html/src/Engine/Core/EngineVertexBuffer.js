"use strict";

var Engine = Engine || {};

Engine.VertexBuffer = (function () {

    var squareVertexBuffer = null;

    var verticesOfSquare = [
        0.5, 0.5, 0.0,
        -0.5, 0.5, 0.0,
        0.5, -0.5, 0.0,
        -0.5, -0.5, 0.0
    ];

    var initialize = function () {

        var webgl = Engine.Core.getGl();

        squareVertexBuffer = webgl.createBuffer();

        webgl.bindBuffer(webgl.ARRAY_BUFFER, squareVertexBuffer);

        webgl.bufferData(webgl.ARRAY_BUFFER, new Float32Array(verticesOfSquare), webgl.STATIC_DRAW);

    };

    var getGLVertexReference = function () {
        return squareVertexBuffer;
    };

    var Public = {
        initialize: initialize,
        getGLVertexReference: getGLVertexReference
    }

    return Public;
}());