var menu=document.getElementById('menu-1');
var button=document.getElementById('collapser');

button.onclick=function() {
  menu.style.transform="translateX(0)";
}

menu.onclick=function() {
  menu.style.transform="translateX(5000px)";
}

/*
var menu = $('div.menu-collapseable');
var isMenuCollapsed=false;

menu.on('click',function() {
  if (isMenuCollapsed) {
    menu.css('display', 'block');
  } else {
    menu.css('display', 'none');
  }
})
*/

$(".control-buttons button").on("click", function() {
  var $counter = 1;
  var $button = $(this);
  var $dec = $button.next().next().find(".form-text").val();
  var $inc = $button.prev().find(".form-text").val();
  if($dec) {
    $counter--;
    console.log("dec");
  }
  else {
    $counter++;
    console.log("inc");
  }
});