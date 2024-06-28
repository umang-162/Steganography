let canvas1 = document.getElementById('can1'), canvas2 = document.getElementById('can2');
let canvas3 = document.getElementById('can3'), canvas4 = document.getElementById('can4');
let target_file = document.getElementById('tgt_file'), base_file = document.getElementById('base_file');
let enc_file = document.getElementById('input_img');
let target = null, base = null, encoded = null;

function clearCanvas(canvas) {
    var ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function loadTargetImage() {
    clearCanvas(canvas1);
    target = new SimpleImage(target_file);
    target.drawTo(canvas1);
}
function loadBaseImage() {
    clearCanvas(canvas2);
    base = new SimpleImage(base_file);
    base.drawTo(canvas2);
}

function modify_base(base_pixel) {
    base_pixel.setRed(Math.floor(base_pixel.getRed() / 16) * 16);
    base_pixel.setGreen(Math.floor(base_pixel.getGreen() / 16) * 16);
    base_pixel.setBlue(Math.floor(base_pixel.getBlue() / 16) * 16);
    return base_pixel;
}
function modify_target(target_pixel) {
    target_pixel.setRed(Math.floor(target_pixel.getRed() / 16));
    target_pixel.setGreen(Math.floor(target_pixel.getGreen() / 16));
    target_pixel.setBlue(Math.floor(target_pixel.getBlue() / 16));
    return target_pixel;
}

function encode() {
    var result = new SimpleImage(target.getWidth(), target.getHeight());
    if(target == null){
        alert('The target image is not yet loaded');
    }
    else if(base == null){
        alert('The base image is not yet loaded');
    }
    else{
        if (base.getWidth() != target.getWidth() || base.getHeight() != target.getHeight()) {
            base.setSize(target.getWidth(), target.getHeight());
        }
        for(var pixel of base.values()){
            var x = pixel.getX(), y = pixel.getY();
            var bp = modify_base(pixel), tp = modify_target(target.getPixel(x, y));
            result.getPixel(x, y).setRed(bp.getRed() + tp.getRed());
            result.getPixel(x, y).setGreen(bp.getGreen() + tp.getGreen());
            result.getPixel(x, y).setBlue(bp.getBlue() + tp.getBlue());
        }
        alert('Image successfully encoded!')
    }
    clearCanvas(canvas2);
    result.drawTo(canvas2);
}

function loadEncodedImage() {
    clearCanvas(canvas3);
    encoded = new SimpleImage(enc_file);
    encoded.drawTo(canvas3);
}
function decode() {
    var decoded = new SimpleImage(encoded.getWidth(), encoded.getWidth());
    if(encoded == null){
        alert('The encoded image is not yet loaded');
    }
    else{
        for (var pixel of encoded.values()) {
            var x = pixel.getX(), y = pixel.getY();
            var dp = decoded.getPixel(x, y);
            dp.setRed(Math.floor(pixel.getRed() % 16) * 16);
            dp.setGreen(Math.floor(pixel.getGreen() % 16) * 16);
            dp.setBlue(Math.floor(pixel.getBlue() % 16) * 16);
        }
        alert('Information successfully extracted!')
    }
    clearCanvas(canvas4);
    decoded.drawTo(canvas4);
}

function reset1() {
    target = null;
    base = null;
    clearCanvas(canvas1);
    clearCanvas(canvas2);
}
function reset2() {
    encoded = null;
    clearCanvas(canvas3);
    clearCanvas(canvas4);
}

target_file.addEventListener('change', () => {
    loadTargetImage();
});
base_file.addEventListener('change', () => {
    loadBaseImage();
});