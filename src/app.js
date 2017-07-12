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

    // SLIDER
    var numOfSlides = $('.image').length;
    var currentSlide = 0;
    var autoSlider;

    // build pagination bullets
    $.each($('.slider ul li'), function() {
      var li = document.createElement('li');
      $('.slider-pagination ul').append(li);
    });
    // set initial slider state
    currentSlide = 1;
    bulletUpdate();
    counterUpdate();

    // bundle tick/update functions into setInterval 
    function sliderPlay() {
      slideRight();
      slideUpdate();
      bulletUpdate();
      counterUpdate();
    }
    // set autoSlider to a var for e.g. clearInterval on hover
    autoSlider = setInterval(sliderPlay, 6000);
    $('.slider').hover(function() {
      $(this).addClass('active');
      clearInterval(autoSlider);
    }, function() {
      $(this).removeClass('active');
      autoSlider = setInterval(sliderPlay, 6000);
    })

    function slideUpdate() {
      $('.slideshow li').removeClass('active');
      $('.slideshow li:eq('+(currentSlide-1)+')').addClass('active');
    }
    function bulletUpdate() {
      $('.slider-pagination ul li').removeClass('active');
      $('.slider-pagination ul li:eq('+(currentSlide-1)+')').addClass('active');
    }
    function slideRight() {
      if (currentSlide >= numOfSlides) currentSlide = 1;
      else currentSlide++;
    }
    function slideLeft() {
      if (currentSlide <= 1) currentSlide = totalSlides;
      else currentSlide--;
    }

    function counterUpdate(){
      $('.slider-counter').html(currentSlide + ' / ' + numOfSlides);
    }


    // SLIDER
    // $('.slider ul#slider-list').width(sliderWidth*totalSlides);
    // $('#next').click(function(){
    //   slideRight();
    // });
    // $('#previous').click(function(){
    //   slideLeft();
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

  });

  /*******************************************************************
  APP CONFIG
  *******************************************************************/
  var sliderWidth = $('.slider').width();
  var sliderHeight = $('.slider').height();
  var sliderCanvas = {};

  
}));