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
  };
  img.src = "/assets/images/chat/" + session_id +"/" + imgPathes[0];
}