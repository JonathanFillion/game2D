
"use strict";

function Renderable(shader) {
    this.shader = shader;
    this.color = [1,1,1,1];
    this.transformation = new Transform();
};

Renderable.prototype.render = function(viewProjMatrix) {
    var webgl = Engine.Core.getGl();
    this.shader.activateShader(this.color, viewProjMatrix);
    this.shader.loadTransformation(this.transformation.getTransformationMatrice());
    webgl.drawArrays(webgl.TRIANGLE_STRIP, 0, 4);
};

Renderable.prototype.setRenderableColor=function(color){this.color=color;};
Renderable.prototype.getRenderableColor=function(){return this.color;};
Renderable.prototype.getRenderableTransformationMatrice = function() {return this.transformation;};