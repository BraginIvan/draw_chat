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
    var formdata = new FormData();
    var imageCanvases = document.getElementsByClassName('canvas');
    formdata.append("pic_count", imageCanvases.length);
    for (var j = 0; j < imageCanvases.length; j++) {
        var blobBin = atob(imageCanvases[j].toDataURL().split(',')[1]);
        var array = [];
        for(var i = 0; i < blobBin.length; i++) {
            array.push(blobBin.charCodeAt(i));
        }
        var file=new Blob([new Uint8Array(array)], {type: 'image/png'});
        formdata.append("pic" + j, file);
    }


    $.ajax({
      type: "POST",
      url: "save_image",
      data: formdata,
      processData: false,
      contentType: false,
    }).done(function(o) {
      console.log(o);
    });
}