$(document).ready(function(){
changeHeader();
function changeHeader() {
  if($(window).width() < 992) {
    $('ul.nav').removeClass('nav-tabs');
    $('ul.nav').addClass('navbar-nav');
  } else {
    $('ul.nav').removeClass('navbar-nav');
    $('ul.nav').addClass('nav-tabs');
  }
  if (window.matchMedia('(max-width: 992px)').matches) {
    $('ul.nav').removeClass('nav-tabs');
    $('ul.nav').addClass('navbar-nav');
  } else {
    $('ul.nav').removeClass('navbar-nav');
    $('ul.nav').addClass('nav-tabs');
  }
}

});