function add_canvas_request(){
   websocket.send("addCanvas_");
}

function add_canvas(){

  var canvasesParent = document.getElementById('column_left_top');
  var childNodes = canvasesParent.children;

  var nextCanvas = 1;
  for (var i = 0; i < childNodes.length; i++) {
     nextCanvas = Math.max(nextCanvas, childNodes[i].className.replace("canvas canvas",""));
  }
  nextCanvas = nextCanvas + 1;

  var newCanvas = document.createElement('canvas');
  newCanvas.className = "canvas canvas" + nextCanvas
  newCanvas.style.display = "none";
  newCanvas.height = 400;
  newCanvas.width = 2000;
  canvasesParent.appendChild(newCanvas);

  var canvasesButtonsParent = document.getElementById('top_menu')
  var newCanvasButton = document.createElement('div');
  newCanvasButton.className = "action_can";
  newCanvasButton.id = "can" + nextCanvas;
  newCanvasButton.onclick = function(){init_request(nextCanvas)}//"init(" + nextCanvas + ")"";
  canvasesButtonsParent.insertBefore(newCanvasButton, document.getElementById('add_can'));
}


function UploadPic() {
                  window.location.href=    canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
                     }