activeCanvas = 0;
flag = false;

function init_request(i){
      websocket.send("initCanvas_" + i);
}

function init(i) {

    activeCanvas = i;
    Array.prototype.filter.call(document.getElementsByClassName('canvas'), function(el){
       return el.style.display = 'none';
   });
    canvas = document.getElementsByClassName('canvas' + i)[0];
    canvas.style.display = "block";
    ctx = canvas.getContext("2d");


    canvas.addEventListener("mousemove", function (e) {
        findxy('move', e)
    }, false);
    canvas.addEventListener("mousedown", function (e) {
        findxy('down', e)
    }, false);
    canvas.addEventListener("mouseup", function (e) {
        findxy('up', e)
    }, false);
    canvas.addEventListener("mouseout", function (e) {
        findxy('out', e)
    }, false);
    signLauncher(i)
}


function draw(prevX_, currX_, prevY_, currY_) {
    ctx.beginPath();
    ctx.moveTo(prevX_, prevY_);
    ctx.lineTo(currX_, currY_);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.closePath();
}



function erase() {
    var m = confirm("Want to clear");
    if (m) {
        ctx.clearRect(0, 0, w, h);
        document.getElementById("canvasimg").style.display = "none";
    }
}

function save() {
    document.getElementById("canvasimg").style.border = "2px solid";
    var dataURL = canvas.toDataURL();
    document.getElementById("canvasimg").src = dataURL;
    document.getElementById("canvasimg").style.display = "inline";
}

function findxy(res, e) {
    if (res == 'down') {
        currX = e.clientX + $("#column_left_top").scrollLeft() - parseFloat($("#column_left_top").offset().left)  + window.scrollX;
        currY = e.clientY + $("#column_left_top").scrollTop() - parseFloat($("#column_left_top").offset().top) + window.scrollY;
        flag = true;
    }
    if (res == 'up' || res == "out") {
        flag = false;
    }
    if (res == 'move') {
        if (flag) {
            prevX = currX;
            prevY = currY;
            currX = e.clientX  + $("#column_left_top").scrollLeft() - parseFloat($("#column_left_top").offset().left)  + window.scrollX;
            currY = e.clientY  + $("#column_left_top").scrollTop() - parseFloat($("#column_left_top").offset().top) + window.scrollY;
            websocket.send("draw_" + prevX + "_" + currX + "_" + prevY + "_" + currY)
        }
    }
}