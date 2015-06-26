 /*
 $(function() { $(document).on('mousemove', '#draw_area_wrapper', function(e) {
            var a = $(this).offset().top + $(this).outerHeight() - 16,  //  top border of bottom-right-corner-box area
                b = $(this).offset().left + $(this).outerWidth() - 16;  //  left border of bottom-right-corner-box area
            $(this).css({
                cursor: e.pageY > a && e.pageX > b ? 'se-resize' : ''
            });
        })
    });


*/

$( document ).ready(function() {



document.getElementById('content').style.width =
($(document).width() - document.getElementById('left_menu').offsetWidth -1) + "px";

document.getElementById('resizer-right').style.left =
document.getElementById('column_left').style.width =
document.getElementById('column_right').style.width =
document.getElementById('content').offsetWidth / 2 - 10 + "px";


document.getElementById('resizer-center').style.top =

document.getElementById('column_left_top').style.height =
document.getElementById('column_left_bottom').style.height =
document.getElementById('content').offsetHeight / 2 - 10 + "px";


interact('#resizer-right')
  .draggable({
    // enable inertial throwing
    inertia: true,
    // keep the element within the area of it's parent
    restrict: {
      restriction: "parent",
      endOnly: true,
      elementRect: {  left: 0,  right: 0 }
    },
    // call this function on every dragmove event
    onmove: dragMoveListener,

  });

  interact('#resizer-center')
    .draggable({
      // enable inertial throwing
      inertia: true,
      // keep the element within the area of it's parent
      restrict: {
        restriction: "parent",
        endOnly: true,
        elementRect: {  left: 0,  right: 0 }
      },
      // call this function on every dragmove event
      onmove: dragMove2Listener,

    });

function dragMoveListener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes

        detx = event.dx;
        dety = event.dy;

        x = parseInt(target.style.left) + detx,
        y = parseInt(target.style.top) + dety;
        x_bottom = document.getElementById('content').offsetWidth - 20 - x;
        y_bottom = document.getElementById('content').offsetHeight - 20 - y;

document.getElementById('column_left').style.width =
   target.style.left = x + "px";

   document.getElementById('column_left_top').style.height =
   target.style.top = y + "px";

   document.getElementById('column_left_bottom').style.height =
   y_bottom + "px";

   document.getElementById('column_right').style.width = x_bottom + "px";


  }



function dragMove2Listener (event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes


        dety = event.dy;


        y = parseInt(target.style.top) + dety;

        y_bottom = document.getElementById('content').offsetHeight - 20 - y;



   document.getElementById('column_left_top').style.height =
   target.style.top = y + "px";

   document.getElementById('column_left_bottom').style.height =
   y_bottom + "px";



  }

 });