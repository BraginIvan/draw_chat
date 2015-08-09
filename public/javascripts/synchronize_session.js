function synchronize(){
    $.ajax({
      type: "POST",
      url: session_id + "/session_info",
      processData: false,
      contentType: false,
    }).done(function(images) {
      if(images)
       loadNext(images.split("_"));
    });

}

function loadNext(imgPathes){
  init(add_canvas(parseInt(imgPathes[0].split(".png"))));
  var img = new Image();
  img.onload = function(){
    ctx.drawImage(img,0,0);
    if(imgPathes.length > 1)
        loadNext(imgPathes.slice(1));
    else
        if(activeLauncher) init(activeLauncher);
  };
  img.src = "/assets/images/chat/" + session_id +"/" + imgPathes[0];
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

    var tmp_array = document.URL.split("/");
    var session_id = tmp_array[tmp_array.length-1];
    $.ajax({
      type: "POST",
      url: session_id + "/save_image",
      data: formdata,
      processData: false,
      contentType: false,
    }).done(function(o) {
        websocket.send("uploadDone_" + activeCanvas);
    });
}