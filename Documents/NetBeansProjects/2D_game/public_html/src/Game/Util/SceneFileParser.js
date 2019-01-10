"use strict";

function SceneFileParser(sceneFilePath) {
    this.sceneXml = Engine.ResourceMap.retreiveAsset(sceneFilePath);
}

SceneFileParser.prototype._getElm = function (tag) {
    var elems = this.sceneXml.getElementsByTagName(tag);
    if (!elems.length) {
        console.log(tag + "is not found, Scene File Parser error");
    }
    return elems;
};

SceneFileParser.prototype.parseCamera = function () {
    var camElem = this._getElm("Camera");
    var cx = Number(camElem[0].getAttribute("CenterX"));
    var cy = Number(camElem[0].getAttribute("CenterY"));
    var w = Number(camElem[0].getAttribute("Width"));
    var viewport = camElem[0].getAttribute("Viewport").split(" ");
    var bgColor = camElem[0].getAttribute("BgColor").split(" ");

    var j;
    for (j = 0; j < 4; j++) {
        bgColor[j] = Number(bgColor[j]);
        viewport[j] = Number(viewport[j]);
    }

    var cam = new Camera(
            glMatrix.vec2.fromValues(cx, cy),
            w,
            viewport
            );
    cam.setBackgroundColor(bgColor);
    return cam;
};

SceneFileParser.prototype.parseSquares = function (sqrSet) {
    var elm = this._getElm("Square");
    var i, j, x, y, w, h, r, c, sq;
    for (i = 0; i < elm.length; i++) {
        x = Number(elm.item(i).attributes.getNamedItem("PosX").value);
        y = Number(elm.item(i).attributes.getNamedItem("PosY").value);
        w = Number(elm.item(i).attributes.getNamedItem("Width").value);
        h = Number(elm.item(i).attributes.getNamedItem("Height").value);
        r = Number(elm.item(i).attributes.getNamedItem("Rotation").value);
        c = elm.item(i).attributes.getNamedItem("Color").value.split(" ");
        sq = new Renderable(Engine.DefaultResources.getBasicColorShader());
        // make sure color array contains numbers
        for (j = 0; j < 4; j++) {
            c[j] = Number(c[j]);
        }
        sq.setRenderableColor(c);
        sq.getRenderableTransformationMatrice().setPosition(x, y);
        sq.getRenderableTransformationMatrice().setRotationDegree(r); // In Degree
        sq.getRenderableTransformationMatrice().setSize(w, h);
        sqrSet.push(sq);
    }
};