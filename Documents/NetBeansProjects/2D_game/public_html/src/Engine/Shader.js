"use strict";

function Shader(vertexShaderId, fragmentShaderId) {

    this.compiledProgram = null;
    this.shaderVertexPositionAttribute = null;
    this.fragmentColor = null;
    this.transformationMatrix = null;
    this.viewProjectionMatrix = null;

    var webgl = Engine.Core.getGl();

    //Def the two shaders
    var vertexShader = this._loadAndCompileShader(vertexShaderId, webgl.VERTEX_SHADER);
    var fragmentShader = this._loadAndCompileShader(fragmentShaderId, webgl.FRAGMENT_SHADER);

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
Shader.prototype.loadTransformation = function (trans) {
    var webgl = Engine.Core.getGl();
    webgl.uniformMatrix4fv(this.transformationMatrix, false, trans);

};

Shader.prototype.getProgram = function () {
    return this.compiledProgram;
};

Shader.prototype.activateShader = function (color, viewProjMatrix) {
    var webgl = Engine.Core.getGl();
    webgl.useProgram(this.compiledProgram);
    webgl.uniformMatrix4fv(this.viewProjectionMatrix, false, viewProjMatrix);
    webgl.bindBuffer(webgl.ARRAY_BUFFER, Engine.VertexBuffer.getGLVertexReference());
    webgl.vertexAttribPointer(this.shaderVertexPositionAttribute, 3, webgl.FLOAT, false, 0, 0);
    webgl.enableVertexAttribArray(this.shaderVertexPositionAttribute);
    webgl.uniform4fv(this.fragmentColor, color);
};

Shader.prototype._loadAndCompileShader = function (shaderPath, shaderType) {
    var shaderSource, compiledShader;
    var webgl = Engine.Core.getGl();

    shaderSource = Engine.Utils.getShaderSource(shaderPath);
    console.log(shaderSource);

    compiledShader = webgl.createShader(shaderType);

    webgl.shaderSource(compiledShader, shaderSource);
    webgl.compileShader(compiledShader);

    //compiledShader is not really compiled

    if (!webgl.getShaderParameter(compiledShader, webgl.COMPILE_STATUS)) {
        console.error("Shader compiling error : " + webgl.getShaderInfoLog(compiledShader));
    }

    return compiledShader;
};

