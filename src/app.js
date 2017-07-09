const css = require('./app.scss');
// const css = require('./app.css');
// import css from './app.scss';
// import _ from 'lodash';

// function wtf() {
//   var e = document.createElement('div');
//   e.innerHTML = _.join(['lodash','working'],'__');
//   return e;
// }
// document.body.appendChild(wtf());

// function createInput(){
//   var $input = $('<input type="button" value="jquery" />');
//   $input.appendTo($("body"));
// }
// createInput();




console.log('hola from app.js');
(function (lib) { 
  lib(window, document, window.jQuery); 
})(
(function(window, document, $) {
  
  // DOCUMENT.READY SCRIPTS
  $(function() {    
    // NAVBAR
    var navbar = $('.navbar');
    var lastScrollTop = 0;
    $(window).scroll(function(e) {
      var scrollTop = $(this).scrollTop();
      if(scrollTop > lastScrollTop) {
        navbar.addClass('navbar-scroll');
      }
      else {
        navbar.removeClass('navbar-scroll');
      }
      lastScrollTop = scrollTop;
    });
    // $('body').scrollspy({target: '.navbar'});
    
    // PICS SLIDER
    $('.pics .slider ul#pics-list').width(picsWidth*totalPics);
    $('#next').click(function(){
      slideRight();
    });
    $('#previous').click(function(){
      slideLeft();
    });
    var autoSlider = setInterval(slideRight, 6000);
    $('.slider').hover(function() { 
      $(this).addClass('active'); 
      clearInterval(autoSlider);
      if (picsMousePos.x < picsWidth/4 && picsMousePos.y < picsHeight) {
        console.log('x: ' + picsMousePos.x + ', y: ' + picsMousePos.y);
      }
      else if (picsMousePos.x > picsWidth-(picsWidth/4) && picsMousePos.y < picsHeight) {
        console.log('x: ' + picsMousePos.x + ', y: ' + picsMousePos.y);
      }
    }, function() { 
      $(this).removeClass('active');
      autoSlider = setInterval(slideRight, 6000);
    });
    $.each($('.pics .slider ul li'), function() {
      var color = $(this).attr('data-color');
      // $(this).css('background', color);
      var li = document.createElement('li');
      $('#pagination ul').append(li);
    });
    var picsOffset = $('.pics').offset();
    var picsMousePos = { x: -1, y: -1 };
    $(document).mousemove(function(event) {
      picsMousePos.x = event.pageX-picsOffset.left;
      picsMousePos.y = event.pageY+picsOffset.top;
    });
    
    countPics();
    pagination();
    console.log('end of document.ready');
  });
  
  var picsPos = 0;
  var totalPics = $('.pics .slider ul li').length;
  var picsWidth = $('.pics .slider').width();
  var picsHeight = $('.pics .slider').height();
  
  function slideLeft() {
    picsPos--;
    if (picsPos <= -1) {
      picsPos = totalPics-1;
    }
    $('.slider ul#pics-list').css('left', -(picsWidth*picsPos));
    countPics();
    pagination();
  }
  function slideRight() {
    picsPos++;
    if (picsPos == totalPics) {
      picsPos = 0;
    }
    $('.slider ul#pics-list').css('left', -(picsWidth*picsPos));
    countPics();
    pagination();
  }
  function countPics(){
    $('#counter').html(picsPos+1 + ' / ' + totalPics);
  }
  function pagination(){
    $('#pagination ul li').removeClass('active');
    $('#pagination ul li:eq('+picsPos+')').addClass('active');
  }
  
}));