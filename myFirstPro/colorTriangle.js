//注意大小写、分号
var VShader =
    'attribute vec4 a_Color;\n'+
    'varying vec4 v_Color;\n'+
    'attribute vec2 a_position;\n' +
    'void main() {\n' +
    'gl_Position=vec4(a_position,0,1);\n' +
    'v_Color=a_Color;\n'+
    '}\n';

//特别注意：这里需要具体说明float的精度
var FShader =
    '#ifdef GL_ES\n' +
    'precision mediump float;\n' +
    '#endif GL_ES\n' +
    'varying vec4 v_Color;\n'+
    'void main(){\n' +
    'gl_FragColor = v_Color;\n' +
    '}\n';

function main() {
    //get canvas context
    var canvas = document.getElementById("canvas");
    var gl = getWebGLContext(canvas);
    if (!gl) {
        console.log("can't init webgl");
        return;
    }

    //init
    if(!initShaders(gl, VShader, FShader)){
        console.log("can't init shader");
        return;
    }

    //create+bind+input data
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    var verticesData=new Float32Array([
        -1.0, 0.0,1.0 ,0.0, 0.0,
        1.0, 0.0, 0.0, 1.0, 0.0,
        0.0, 1.0, 0.0, 0.0, 1.0
    ]);
    gl.bufferData(gl.ARRAY_BUFFER,
        verticesData,
        gl.STATIC_DRAW
    );

    var FSize=verticesData.BYTES_PER_ELEMENT;
    //获取gl程序的attribute位置，放入数据，并开启之
    var positionLocation = gl.getAttribLocation(gl.program, "a_position");
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, FSize*5, 0);
    gl.enableVertexAttribArray(positionLocation);

    var colorLocation = gl.getAttribLocation(gl.program, "a_color");
    gl.vertexAttribPointer(colorLocation, 3, gl.FLOAT, false, FSize*5, FSize*2);
    gl.enableVertexAttribArray(colorLocation);

    //set canvas color
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    //clear canvas
    gl.clear(gl.COLOR_BUFFER_BIT);

    //draw
    gl.drawArrays(gl.POINTS, 0, 3);
}

