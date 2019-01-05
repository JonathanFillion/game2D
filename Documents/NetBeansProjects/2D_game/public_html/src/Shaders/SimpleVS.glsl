
attribute vec3 aSquareVertexPosition;

uniform mat4 uniformTransformation;
uniform mat4 uniformViewProjection;

void main(void){
    gl_Position = uniformViewProjection * uniformTransformation * vec4(aSquareVertexPosition, 1.0);
    }