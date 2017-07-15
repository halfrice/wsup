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
    var $slider = $('.x-slider');
    var $slideBGs = $('.slide__bg');
    var diff;
    var currentSlide = 0;
    var numOfSlides = $('.slide').length-1;
    var animating = false;
    var animationTime = 500;
    var autoSlideTimeout;
    var autoSlideDelay = 6000;
    var $pagination = $(".slider-pagi");

    // build pagination bullets
    function createBullets() {
      for (var i = 0; i < numOfSlides+1; i++) {
        var $li = $("<li class='slider-pagi__elem'></li>");
        $li.addClass("slider-pagi__elem-"+i).data("page", i);
        if (!i) $li.addClass("active");
        $pagination.append($li);
      }
    };
    createBullets();

    function manageControls() {
      $('.slider-control').removeClass('inactive');
      if (!currentSlide) $('.slider-control.left').addClass('inactive');
      if (currentSlide === numOfSlides) $('.slider-control.right').addClass('inactive');
    };


    function slideOnEm() {
      autoSlideTimeout = setTimeout(function() {
        currentSlide++
        if (currentSlide > numOfSlides) currentSlide = 0;
        changeSlides();
      }, autoSlideDelay);
    }
    slideOnEm();

    function changeSlides(instant) {
      if (!instant) {
        animating = true;
        manageControls();
        $slider.addClass('animating');
        $slider.css('top');
        $('.slide').removeClass('active');
        $('.slide-'+currentSlide).addClass('active');
        setTimeout(function() {
          $slider.removeClass('animating');
          animating = false;
        }, animationTime);
      }
      window.clearTimeout(autoSlideTimeout);
      $('.slider-pagi__elem').removeClass('active');
      $('.slider-pagi__elem-'+currentSlide).addClass('active');
      $slider.css('transform', 'translate3d('+ -currentSlide*100 +'%,0,0)');
      $slideBGs.css('transform', 'translate3d('+ currentSlide*50 +'%,0,0)');
      diff = 0;
      slideOnEm();
    }

    function slideLeft() {
      if (animating) return;
      if (currentSlide > 0) currentSlide--;
    }
    function slideRight() {
      if (animating) return;
      if (currentSlide < numOfSlides) currentSlide++;
    }

    $(document).on('mousedown touchstart', '.x-slider', function(e) {
      console.log('mousedown touchstart');
      if (animating) return;
      window.clearTimeout(autoSlideTimeout);
      var startX = e.pageX || e.originalEvent.touches[0].pageX;
      var winW = $(window).width();
      diff = 0;

      $(document).on('mousemove touchmove', function(e) {
        console.log('mousemove touchmove');
        var x = e.pageX || e.originalEvent.touches[0].pageX;
        diff = (startX - x) / winW * 70;
        if ((!currentSlide && diff < 0) || 
            (currentSlide === numOfSlides && diff > 0)) diff /= 2;
        $slider.css("transform", "translate3d("+ (-currentSlide*100 - diff) +"%,0,0)");
        $slideBGs.css("transform", "translate3d("+ (currentSlide*50 + diff/2) +"%,0,0)");
      });
    });

    $(document).on("mouseup touchend", function(e) {
      console.log('mouseup touchend')
      $(document).off("mousemove touchmove");
      console.log('mousemove touchmove')
      if (animating) return;
      if (!diff) {
        changeSlides(true);
        return;
      }
      if (diff > -8 && diff < 8) {
        changeSlides();
        return;
      }
      if (diff <= -8) {
        slideLeft();
      }
      if (diff >= 8) {
        slideRight();
      }
    });

    $(document).on('click', '.slider-control', function() {
      console.log('clicked on .slider-control');
      if ($(this).hasClass('left')) {
        slideLeft();
      } else {
        slideRight();
      }
    });

    $(document).on('click', '.slider-pagi__elem', function() {
      console.log('clicked on .slider-pagi__elem');
      currentSlide = $(this).data('page');
      changeSlides();
    });

  });

  /*******************************************************************
  APP CONFIG
  *******************************************************************/
  // var sliderWidth = $('.slider').width();
  // var sliderHeight = $('.slider').height();
  // var sliderCanvas = {};

  
}));