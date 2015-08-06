function onMessege(ev){
    var request = ev.data.split("_")
    if(request[0] == "draw"){
          draw(request[1], request[2], request[3], request[4]);
    }
    if(request[0] == "addCanvas"){
         init(add_canvas());
    }
    if(request[0] == "initCanvas"){
         init(request[1]);
    }
    if(request[0] == "upload"){
        UploadPic();
    }
    if(request[0] == "synchronize"){
        synchronize();
        activeLauncher = request[1]
    }
    if(request[0] == "test"){
           alert("test msg");
        }

}



