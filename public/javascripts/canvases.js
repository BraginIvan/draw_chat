function add_canvas(){

  var canvasesParent = document.getElementById('column_left_top')
  var childNodes = canvasesParent.children;

  var nextCanvas = 1;
  for (var i = 0; i < childNodes.length; i++) {
     nextCanvas = Math.max(nextCanvas, childNodes[i].className.replace("canvas canvas",""));
  }
  nextCanvas = nextCanvas + 1;

  var newCanvas = document.createElement('canvas');
  newCanvas.className = "canvas canvas" + nextCanvas
  newCanvas.height = 800;
  newCanvas.width = 1000;
  canvasesParent.appendChild(newCanvas);

  var canvasesButtonsParent = document.getElementById('top_menu')
  var newCanvasButton = document.createElement('div');
  newCanvasButton.className = "action_can";
  newCanvasButton.id = "can" + nextCanvas;
  newCanvasButton.onclick = function(){init(nextCanvas)}//"init(" + nextCanvas + ")"";
  canvasesButtonsParent.appendChild(newCanvasButton);
}