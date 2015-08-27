function loadPage(theme, lesson, action, element){
 // alert( element.onclick);
    $.ajax({
      type: "POST",
      url: "/science/" + theme + "/" + lesson + "/" + action,
      processData: false,
      contentType: false,
    }).done(function(scienceHtml) {
        var science_content = document.getElementById('science_content');
        while(science_content.lastChild)
           science_content.removeChild(science_content.lastChild);
        science_content.appendChild(create(scienceHtml));
    });

}

function create(htmlStr) {
    var frag = document.createDocumentFragment(),
        temp = document.createElement('div');
    temp.innerHTML = htmlStr;
    while (temp.firstChild) {
        frag.appendChild(temp.firstChild);
    }
    return frag;
}