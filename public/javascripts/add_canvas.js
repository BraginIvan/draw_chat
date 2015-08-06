function add_canvas_request(){
   websocket.send("addCanvas_");
}


function add_canvas(numCanvas){
    var nextCanvas = 0;
    var canvasesParent = document.getElementById('column_left_top');

    if(typeof numCanvas == 'undefined'){
        var childNodes = canvasesParent.children;
        for (var i = 0; i < childNodes.length; i++) {
            nextCanvas = Math.max(nextCanvas, childNodes[i].className.replace("canvas canvas",""));
        }
        nextCanvas = nextCanvas + 1;
    }else
        nextCanvas = numCanvas

  var newCanvas = document.createElement('canvas');
  newCanvas.className = "canvas canvas" + nextCanvas
  newCanvas.style.display = "none";
  newCanvas.height = 400;
  newCanvas.width = 2000;
  canvasesParent.appendChild(newCanvas);

  var canvasesButtonsParent = document.getElementById('image_activators')
  var newCanvasButton = document.createElement('div');
  newCanvasButton.className = "action_can";
  newCanvasButton.id = "can" + nextCanvas;
  newCanvasButton.onclick = function(){init_request(nextCanvas)}
  canvasesButtonsParent.appendChild(newCanvasButton);

  sortChildren(canvasesButtonsParent);

  return nextCanvas;
}



