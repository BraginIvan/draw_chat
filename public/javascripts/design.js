    function signLauncher(id){
        var launchers = document.getElementById('image_activators').childNodes
        for (var i=0; i<launchers.length; i++) {
            launchers[i].style.border = "1px solid #CCC";
        }
        document.getElementById("can" + id).style.border = "2px solid #326999";
    }