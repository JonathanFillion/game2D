"use strict";

function Game() {

    this.sceneFile = "assets/scene.xml";
    this.sqrSet = [];
    this.camera = null;


}

Game.prototype.loadScene = function () {
    Engine.TextFileLoader.loadTextFile(this.sceneFile, Engine.TextFileLoader.textFileType.xmlFile);

};

Game.prototype.unloadScene = function () {
    Engine.TextFileLoader.unloadTextFile(this.sceneFile);
}

Game.prototype.initialize = function () {
    var sceneParser = new SceneFileParser(this.sceneFile);

    this.camera = sceneParser.parseCamera();

    sceneParser.parseSquares(this.sqrSet);
};

Game.prototype.render = function () {
    Engine.Core.clearCanvas([0.9, 0.9, 0.9, 1.0]);

    this.camera.setupViewProjMatrix();
    for (var i = 0; i < this.sqrSet.length; i++) {
        this.sqrSet[i].render(this.camera.getViewProjMatrix());
    }
};

Game.prototype.update = function () {
    var transform0 = this.sqrSet[0].getRenderableTransformationMatrice();
    var deltax = 0.05;
    if (Engine.Input.getIsKeyPressed(Engine.Input.Keys.Right)) {
        if (transform0.getX() > 30)
            transform0.setPosition(10, 60);
        transform0.increaseX(deltax);
    }
    if (Engine.Input.getIsKeyClicked(Engine.Input.Keys.Up))
        transform0.increaseRotationDegree(1);

    var transform1 = this.sqrSet[1].getRenderableTransformationMatrice();
    if (Engine.Input.getIsKeyPressed(Engine.Input.Keys.Down)) {
        if (transform1.getWidth() > 5)
            transform1.setSize(2, 2);
        transform1.incSizeBy(0.5);
    }
};
