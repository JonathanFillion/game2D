"use strict";

function Game(canvasId) {
    this.basicShader = null;

    Engine.Core.initializeWebGl(canvasId);
    var webgl = Engine.Core.getGl();
    
    this.camera = new Camera(glMatrix.vec2.fromValues(20, 60),20,[20,40,600,300]);

    this.basicShader = new Shader("src/Shaders/SimpleVS.glsl", "src/Shaders/WhiteFS.glsl");

    this.blueSquare = new Renderable(this.basicShader);
    this.blueSquare.setRenderableColor([0.25, 0.25, 0.95, 1]);
    this.redSquare = new Renderable(this.basicShader);
    this.redSquare.setRenderableColor([1, 0.25, 0.25, 1]);
    this.topLeft = new Renderable(this.basicShader);
    this.topLeft.setRenderableColor([0.9, 0.1, 0.1, 1]);
    this.topRight = new Renderable(this.basicShader);
    this.topRight.setRenderableColor([0.1, 0.9, 0.1, 1]);
    this.bottomRight = new Renderable(this.basicShader);
    this.bottomRight.setRenderableColor([0.1, 0.1, 0.9, 1]);
    this.bottomLeft = new Renderable(this.basicShader);
    this.bottomLeft.setRenderableColor([0.1, 0.1, 0.1, 1]);


    Engine.Core.clearCanvas([0, 0.9, 0.9, 1]);

    this.camera.setupViewProjMatrix();
    var viewProjMatrix = this.camera.getViewProjMatrix();
    
    this.blueSquare.getRenderableTransformationMatrice().setPosition(20, 60);
    this.blueSquare.getRenderableTransformationMatrice().setRotationRadians(0.2);
    this.blueSquare.getRenderableTransformationMatrice().setSize(5, 5);
    this.blueSquare.render(viewProjMatrix);

    this.redSquare.getRenderableTransformationMatrice().setPosition(20, 60);
    this.redSquare.getRenderableTransformationMatrice().setSize(2, 2);
    this.redSquare.render(viewProjMatrix);

    this.topLeft.getRenderableTransformationMatrice().setPosition(10, 65);
    this.topLeft.render(viewProjMatrix);

    this.topRight.getRenderableTransformationMatrice().setPosition(30, 65);
    this.topRight.render(viewProjMatrix);

    this.bottomRight.getRenderableTransformationMatrice().setPosition(30, 55);
    this.bottomRight.render(viewProjMatrix);

    this.bottomLeft.getRenderableTransformationMatrice().setPosition(10, 55);
    this.bottomLeft.render(viewProjMatrix);
}