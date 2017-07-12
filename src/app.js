const css = require('./app.scss');

(function (lib) { 
  lib(window, document, window.jQuery); 
})(
(function(window, document, $) {
  
  /*******************************************************************
  DOCUMENT.READY
  *******************************************************************/
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

    function play() {
      setInterval(function() {
        var next = $(".slideshow .active").removeClass("active").next(".image");
        if (!next.length) {
          next = $(".slideshow .image:first");
        }
        next.addClass("active");
      }, 5000);
    }
    play();


    // SLIDER
    // $('.slider ul#slider-list').width(sliderWidth*totalSlides);
    // $('#next').click(function(){
    //   slideRight();
    // });
    // $('#previous').click(function(){
    //   slideLeft();
    // });
    // var autoSlider = setInterval(slideRight, 6000);
    // var sliderHover = false;
    // $('.slider').hover(function() { 
    //   $(this).addClass('active'); 
    //   sliderHover = true;
    //   clearInterval(autoSlider);
    //   // if (picsMousePos.x < picsWidth/4 && picsMousePos.y < picsHeight) {
    //   //   console.log('x: ' + picsMousePos.x + ', y: ' + picsMousePos.y);
    //   // }
    //   // else if (picsMousePos.x > picsWidth-(picsWidth/4) && picsMousePos.y < picsHeight) {
    //   //   console.log('x: ' + picsMousePos.x + ', y: ' + picsMousePos.y);
    //   // }
    // }, function() { 
    //   $(this).removeClass('active');
    //   sliderHover = false;
    //   autoSlider = setInterval(slideRight, 6000);
    // });
    // $.each($('.slider ul li'), function() {
    //   var color = $(this).attr('data-color');
    //   $(this).css('background-color', color);
    //   var li = document.createElement('li');
    //   $('#pagination ul').append(li);
    // });

    // // GET MOUSE POS
    // var picsOffset = $('.slider').offset();
    // var picsMousePos = { x: -1, y: -1 };
    // $(document).mousemove(function(event) {
    //   picsMousePos.x = event.pageX-picsOffset.left;
    //   picsMousePos.y = event.pageY+picsOffset.top;
    //   displayPicStats();
    // });

    // function displayPicStats() {
    //   // if (sliderHover) {
    //   //   console.log(picsMousePos);
    //   // }
    // }
    
    countPics();
    pagination();
  });

  /*******************************************************************
  APP CONFIG
  *******************************************************************/
  var sliderPos = 0;
  var totalSlides = $('.slider ul li').length;
  var sliderWidth = $('.slider').width();
  var sliderHeight = $('.slider').height();
  var sliderCanvas = {};
  $.each($('.slider ul li'), function(i,e) {
    // console.log($(e).css('background-image'));
    var wtf = $(e).css('background-image');
    console.log(wtf);
  });
  console.log(sliderCanvas);
  
  function slideLeft() {
    sliderPos--;
    if (sliderPos <= -1) {
      sliderPos = totalSlides-1;
    }
    $('.slider ul#slider-list').css('left', -((sliderWidth*totalSlides)*sliderPos));
    countPics();
    pagination();
  }
  function slideRight() {
    sliderPos++;
    if (sliderPos == totalSlides) {
      sliderPos = 0;
    }
    $('.slider ul#slider-list').css('left', -((sliderWidth*totalSlides)*sliderPos));
    countPics();
    pagination();
  }
  function countPics(){
    $('#counter').html(sliderPos+1 + ' / ' + totalSlides);
  }
  function pagination(){
    $('#pagination ul li').removeClass('active');
    $('#pagination ul li:eq('+sliderPos+')').addClass('active');
  }
  
}));