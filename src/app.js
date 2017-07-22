const css = require('./app.scss');

// (function (lib) { 
//   lib(window, document, window.jQuery); 
// })(
// (function(window, document, $) {
  
//   /*******************************************************************
//   DOCUMENT.READY
//   *******************************************************************/
//   $(function() {    


//     // SLIDER

//   });
//   // END OF DOCUMENT READY

//   /*******************************************************************
//   APP CONFIG
//   *******************************************************************/

// }));


$(document).ready(function() {

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

  $(".navbar-toggler").on("click", function () {
    $(this).toggleClass("active");
  });
  
  var $slider = $(".slider"),
      $slideBGs = $(".slide__bg"),
      diff = 0,
      curSlide = 0,
      numOfSlides = $(".slide").length-1,
      animating = false,
      animTime = 500,
      autoSlideTimeout,
      autoSlideDelay = 6000,
      autoSlideDirty = false,
      $pagination = $(".slider-pagi");
  
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
    $(".slider-control").removeClass("inactive");
    if (!curSlide) $(".slider-control.left").addClass("inactive");
    if (curSlide === numOfSlides) $(".slider-control.right").addClass("inactive");
  };
  
  function autoSlide() {
    autoSlideTimeout = setTimeout(function() {
      curSlide++;
      if (curSlide > numOfSlides) curSlide = 0;
      changeSlides();
    }, autoSlideDelay);
  };
  
  autoSlide();
  
  function changeSlides(instant) {
    if (!instant) {
      animating = true;
      manageControls();
      $slider.addClass("animating");
      $slider.css("top");
      $(".slide").removeClass("active");
      $(".slide-"+curSlide).addClass("active");
      setTimeout(function() {
        $slider.removeClass("animating");
        animating = false;
      }, animTime);
    }
    window.clearTimeout(autoSlideTimeout);
    $(".slider-pagi__elem").removeClass("active");
    $(".slider-pagi__elem-"+curSlide).addClass("active");
    $slider.css("transform", "translate3d("+ -curSlide*100 +"%,0,0)");
    $slideBGs.css("transform", "translate3d("+ curSlide*50 +"%,0,0)");
    diff = 0;
    if (!autoSlideDirty) autoSlide();
  }

  function navigateLeft() {
    if (animating) return;
    if (curSlide > 0) curSlide--;
    changeSlides();
  }

  function navigateRight() {
    if (animating) return;
    if (curSlide < numOfSlides) curSlide++;
    changeSlides();
  }

  $(document).on("mousedown touchstart", ".slider", function(e) {
    if (animating) return;
    window.clearTimeout(autoSlideTimeout);
    var startX = e.pageX || e.originalEvent.touches[0].pageX,
        winW = $(window).width();
    diff = 0;
    
    $(document).on("mousemove touchmove", function(e) {
      var x = e.pageX || e.originalEvent.touches[0].pageX;
      diff = (startX - x) / winW * 70;
      if ((!curSlide && diff < 0) || (curSlide === numOfSlides && diff > 0)) diff /= 2;
      $slider.css("transform", "translate3d("+ (-curSlide*100 - diff) +"%,0,0)");
      $slideBGs.css("transform", "translate3d("+ (curSlide*50 + diff/2) +"%,0,0)");
    });
  });
  
  $(document).on("mouseup touchend", function(e) {
    $(document).off("mousemove touchmove");
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
      navigateLeft();
    }
    if (diff >= 8) {
      navigateRight();
    }
  });
  
  $(document).on("click", ".slider-control", function() {
    if ($(this).hasClass("left")) {
      navigateLeft();
    } else {
      navigateRight();
    }
  });
  
  $(document).on("click", ".slider-pagi__elem", function() {
    autoSlideDirty = true;
    curSlide = $(this).data("page");
    changeSlides();
  });



  /*
  var p5config = function(p) {
    var amount = 256;
    var balls = [];
    var width = $('.p5-canvas').width();
    var height = $('.p5-canvas').height();
    var x = 100; 
    var y = 100;

    p.setup = function() {
      p.createCanvas(width,height);
      p.frameRate(60);
      for (var i = 0; i < amount; i++) {
        balls[i] = new Ball();
      }
    };

    p.draw = function() {
      p.background(0,0,0);
      for (var i =0; i < balls.length; i++) {
        var ball = balls[i];
        balls[i].move();
        // balls[i].show();
        p.fill(ball.r,ball.g,ball.b);
        p.ellipse(ball.x,ball.y,ball.d,ball.d);
      }
    };

    function Ball() {
      this.r = 255; // red
      this.g = 0; // green
      this.b = 255; // blue
      this.d = 10; // diameter
      this.x = Math.random(width); 
      this.y = Math.random(height);
      this.speed = Math.random(-4.0,4.0);
      this.xspeed = Math.random(1,20)*5;
      this.yspeed = Math.random(1,20)*5;
      // this.xspeed = map(this.speed,0,20,1,20);
      // this.yspeed = map(this.speed,0,20,1,20);
      this.move = function() {
        if (this.x < 0 || this.x > width) {
          this.xspeed *= -1;
        }
        if (this.y < 0 || this.y > height) {
          this.yspeed *= -1;
        }
        this.x += this.xspeed;
        this.y += this.yspeed;
      };
      this.show = function() {
        p.fill(this.r,this.g,this.b);
        ellipse(this.x,this.y,this.d,this.d);
      };
    }
  };

  //var myp5 = new p5(p5config, 'p5-canvas');
  */  


});



