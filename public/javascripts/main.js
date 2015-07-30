var session_id;
 $(document).ready(function(){
        var tmp_array = document.URL.split("/");
     session_id = tmp_array[tmp_array.length-1];
     });

     function sortChildren(element){
      var items = element.childNodes;
       var itemsArr = [];
       for (var i in items) {
           if (items[i].nodeType == 1) { // get rid of the whitespace text nodes
               itemsArr.push(items[i]);
           }
       }

       itemsArr.sort(function(a, b) {
                  return a.id == b.id
                          ? 0
                          : (parseInt(a.id.split("can")[1]) > parseInt(b.id.split("can")[1]) ? 1 : -1);
                });

       for (i = 0; i < itemsArr.length; ++i) {
         element.appendChild(itemsArr[i]);
       }
   }