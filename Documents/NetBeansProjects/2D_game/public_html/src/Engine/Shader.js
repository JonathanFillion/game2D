"use strict";

function SimpleShader(vertexShaderId, fragmentShaderId) {

    this.compiledProgram = null;
    this.shaderVertexPositionAttribute = null;
    this.fragmentColor = null;
    this.transformationMatrix = null;
    this.viewProjectionMatrix = null;

    var webgl = Engine.Core.getGl();

    //Def the two shaders
    var vertexShader = this._compileShader(vertexShaderId, webgl.VERTEX_SHADER);
    var fragmentShader = this._compileShader(fragmentShaderId, webgl.FRAGMENT_SHADER);

    //Attach shader to created program
    this.compiledProgram = webgl.createProgram();
    webgl.attachShader(this.compiledProgram, vertexShader);
    webgl.attachShader(this.compiledProgram, fragmentShader);
    webgl.linkProgram(this.compiledProgram);

    if (!webgl.getProgramParameter(this.compiledProgram, webgl.LINK_STATUS)) {
        console.error("Error linking shaders to program");
        return null;
    }

    this.shaderVertexPositionAttribute = webgl.getAttribLocation(this.compiledProgram, "aSquareVertexPosition");

    webgl.bindBuffer(webgl.ARRAY_BUFFER, Engine.VertexBuffer.getGLVertexReference());

    webgl.vertexAttribPointer(this.shaderVertexPositionAttribute, 3, webgl.FLOAT, false, 0, 0);


    this.fragmentColor = webgl.getUniformLocation(this.compiledProgram, "uFragmentColor");
    this.transformationMatrix = webgl.getUniformLocation(this.compiledProgram, "uniformTransformation");
    this.viewProjectionMatrix = webgl.getUniformLocation(this.compiledProgram, "uniformViewProjection");



}
;
//@trans is a matrix applied to transformation reference
SimpleShader.prototype.loadTransformation = function (trans) {
    var webgl = Engine.Core.getGl();
    webgl.uniformMatrix4fv(this.transformationMatrix, false, trans);

};

SimpleShader.prototype.getProgram = function () {
    return this.compiledProgram;
};

SimpleShader.prototype.activateShader = function (color, viewProjMatrix) {
    var webgl = Engine.Core.getGl();
    webgl.useProgram(this.compiledProgram);
    webgl.uniformMatrix4fv(this.viewProjectionMatrix, false, viewProjMatrix);
    webgl.bindBuffer(webgl.ARRAY_BUFFER, Engine.VertexBuffer.getGLVertexReference());
    webgl.vertexAttribPointer(this.shaderVertexPositionAttribute, 3, webgl.FLOAT, false, 0, 0);
    webgl.enableVertexAttribArray(this.shaderVertexPositionAttribute);
    webgl.uniform4fv(this.fragmentColor, color);
};

SimpleShader.prototype._compileShader = function (filepath, shaderType) {
    var shaderSource, compiledShader;
    var webgl = Engine.Core.getGl();

    shaderSource = Engine.ResourceMap.retreiveAsset(filepath);
    compiledShader = webgl.createShader(shaderType);

    webgl.shaderSource(compiledShader, shaderSource);
    webgl.compileShader(compiledShader);

    //compiledShader is not really compiled

    if (!webgl.getShaderParameter(compiledShader, webgl.COMPILE_STATUS)) {
        console.error("Shader compiling error : " + webgl.getShaderInfoLog(compiledShader));
    }

    return compiledShader;
};

