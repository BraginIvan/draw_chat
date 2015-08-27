 $(document).ready(function(){
     $.ajax({
          type: "POST",
          url: "/tools/get_lessons/" + theme,
          processData: false,
          contentType: false,
        }).done(function(scienceHtml) {
            var parent = document.getElementById("tests_column")
            var science_content = document.getElementById('science_content');
            while(science_content.lastChild)
               science_content.removeChild(science_content.lastChild);
            science_content.appendChild(create(scienceHtml));
        });
 });