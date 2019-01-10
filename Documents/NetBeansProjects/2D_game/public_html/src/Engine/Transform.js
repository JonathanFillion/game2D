/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

"use strict";

function Transform() {
    this.position = glMatrix.vec2.fromValues(0, 0);
    this.scale = glMatrix.vec2.fromValues(1, 1);
    this.rotationRadians = 0.0;
}
;
Transform.prototype.setPosition = function (x, y) {
    this.setX(x);
    this.setY(y);
};

Transform.prototype.getPosition = function () {
    return this.position;
};

Transform.prototype.getX = function () {
    return this.position[0];
};
Transform.prototype.setX = function (x) {
    this.position[0] = x;
};
Transform.prototype.increaseX = function (value) {
    this.position[0] += value;
};
Transform.prototype.getY = function () {
    return this.position[1];
};
Transform.prototype.setY = function (y) {
    this.position[1] = y
};
Transform.prototype.increaseY = function (value) {
    this.position[1] += value;
};


Transform.prototype.setSize = function (width, height) {
    this.setWidth(width);
    this.setHeight(height);
};
Transform.prototype.getSize = function () {
    return this.scale;
};
Transform.prototype.incSizeBy = function (delta) {
    this.increaseWidth(delta);
    this.increaseHeight(delta);
};
Transform.prototype.getWidth = function () {
    return this.scale[0];
};
Transform.prototype.setWidth = function (width) {
    this.scale[0] = width;
};
Transform.prototype.increaseWidth = function (delta) {
    this.scale[0] += delta;
};
Transform.prototype.getHeight = function () {
    return this.scale[1];
};
Transform.prototype.setHeight = function (height) {
    this.scale[1] = height;
};
Transform.prototype.increaseHeight = function (delta) {
    this.scale[1] += delta;
};

//RADIANS -----------------------------------------------------------

Transform.prototype.setRotationRadians = function (rotationRad) {
    this.rotationRadians = rotationRad;
};

Transform.prototype.increaseRotationRadians = function (valueRad) {
    this.setRotationRadians(this.rotationRadians += valueRad);
};

Transform.prototype.getRotationRadians = function () {
    return this.rotationRadians;
};

//DEGREE ------------------------------------------------------------

Transform.prototype.setRotationDegree = function (rotationDeg) {
    this.setRotationRadians(rotationDeg * Math.PI / 180);
};

Transform.prototype.increaseRotationDegree = function (valueDeg) {
    this.increaseRotationRadians(valueDeg * Math.PI / 180);
};

Transform.prototype.getRotationDegree = function () {
    return this.rotationRadians * 180.0 / Math.PI;
};

//transformation matrice
//Ordre: Translation(rotation(scale()))

Transform.prototype.getTransformationMatrice = function () {
    var matrix = glMatrix.mat4.create();
    //glMatrix.

    //Webgl matrices are transposed, matrice operations must be in reverse order...

    glMatrix.mat4.translate(matrix, matrix, glMatrix.vec3.fromValues(this.getX(), this.getY(), 0.0));
    glMatrix.mat4.rotateZ(matrix, matrix, this.getRotationRadians());
    glMatrix.mat4.scale(matrix, matrix, glMatrix.vec3.fromValues(this.getWidth(), this.getHeight(), 1.0));

    return matrix;
};