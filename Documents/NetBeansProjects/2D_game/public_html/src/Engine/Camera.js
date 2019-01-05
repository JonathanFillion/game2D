"use strict";

/*Scissor same size
 Instead of rendering from 0 to 1, you render from .2 to .8, with black bars on the outside. 
 This actually cuts off a portion of what would normally be visible (if you 
 used a viewport of the same size, you'd see the same amount but shrunk slightly).
https://www.gamedev.net/forums/topic/434130-difference-between-viewports-and-scissor-rectangles/
 */

function Camera(worldCenter, worldWidth, viewportArray) {
    this.worldCenter = worldCenter;
    this.worldWidth = worldWidth;
    //BLx, BLy, width, height
    this.viewport = viewportArray;
    this.nearPlane = 0;
    this.farPlane = 1000;

    this.viewMatrix = glMatrix.mat4.create();
    this.projectionMatrix = glMatrix.mat4.create();
    this.viewProjMatrix = glMatrix.mat4.create();

    this.bgColor = [0.9, 0.2, 0.8, 1];
}
;

Camera.prototype.setWorldCenter = function (x, y) {
    this.worldCenter[0] = x;
    this.worldCenter[1] = y;
};
Camera.prototype.getWorldCenter = function () {
    return this.worldCenter;
};

Camera.prototype.setWorldWidth = function (width) {
    this.worldWidth = width;
};

Camera.prototype.setViewport = function (viewportArray) {
    this.viewport = viewportArray;
};
Camera.prototype.getViewport = function () {
    return this.viewport;
};

Camera.prototype.setBackgroundColor = function (color) {
    this.bgColor = color;
};
Camera.prototype.getBackgroundColor = function () {
    return this.bgColor;
};

Camera.prototype.getViewProjMatrix = function () {
    return this.viewProjMatrix;
};

Camera.prototype.setupViewProjMatrix = function () {
    var webgl = Engine.Core.getGl();

    webgl.viewport(this.viewport[0], this.viewport[1], this.viewport[2], this.viewport[3]);
    webgl.scissor(this.viewport[0], this.viewport[1], this.viewport[2], this.viewport[3]);
    webgl.clearColor(this.bgColor[0], this.bgColor[1], this.bgColor[2], this.bgColor[3]);
    webgl.enable(webgl.SCISSOR_TEST);
    webgl.clear(webgl.COLOR_BUFFER_BIT);
    webgl.disable(webgl.SCISSOR_TEST);

    glMatrix.mat4.lookAt(this.viewMatrix,
            [this.worldCenter[0], this.worldCenter[1], 10],
            [this.worldCenter[0], this.worldCenter[1], 0],
            [0, 1, 0]);

    var halfWidth = 0.5 * this.worldWidth;
    var halfHeight = halfWidth * this.viewport[3] / this.viewport[2];
    glMatrix.mat4.ortho(this.projectionMatrix,
            -halfWidth,
            halfWidth,
            -halfHeight,
            halfHeight,
            this.nearPlane,
            this.farPlane
            );
    glMatrix.mat4.multiply(this.viewProjMatrix, this.projectionMatrix, this.viewMatrix);
};