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
  // GLOBAL
  var isMobile = false;
  // var winW = $(window).width();
  // var winH = $(window).height();
  // var projW = $('.project').width();
  // var projH = $('.project').height();
  // console.log(winW, winH);
  // console.log(projW, projH);

  // NAVBAR
  var navbar = $('.navbar');
  var lastScrollTop = 0;
  var scrollDirty = false;

  $('.projects__text-heading').hide();
  $(window).scroll(function(e) {
    if (!scrollDirty) {
      $('.projects__text-heading').slideDown(500, function(e) {
      });
      scrollDirty = true;
    }
    var scrollTop = $(this).scrollTop();
    if(scrollTop > lastScrollTop && !$('.navbar-collapse').hasClass('show') ) {
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
  

  // SLIDER 
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
  
  // SLIDER-PAGI
  function createBullets() {
    for (var i = 0; i < numOfSlides+1; i++) {
      var $li = $('<li class="slider-pagi__elem"></li>');
      var $pb = $('<div class="progressBar"><div class="progress"></div></div>')
      $li.addClass('slider-pagi__elem-'+i).data('page', i);
      if (!i) $li.addClass('active');
      $li.append($pb); 
      $pagination.append($li);
    }
    $('.progressBar').first().addClass('animating');
  }
  createBullets();




  $(window).on('load', function() {
    autoSlide();
    featureFitToWindow();
    projectFitToWindow( $('#project-1') );
    projectsSpacing($(window).width(), $(window).height()); 
    blurSlides();
  });

  $('.slider-pagi__elem').hover(function() {
    // stylePagi($(this));
  });

  function clearProgress($element) {
    // console.log('clearing progress on: ', $element);
    $element.find('.progress').css('width','0%');
    // $('.progressBar .progress').css('width', '0%');
  }
  
  var progAnimating = false;
  function slideProgress(percent, time, $element) {
    var $prog = $element.find('.progress');
    var progBarWidth = percent * $element.width() / 100;
    clearProgress($element);
    progAnimating = true;
    $prog.addClass('animating');
    $prog.animate({ width: progBarWidth }, time, function() {
      clearProgress($element);
      stylePagi($element);
    });
  }
  // slideProgress(100, autoSlideDelay, $('.progressBar').first());

  $(document).on("click", ".slider-pagi__elem", function() {
    autoSlideDirty = true;
    curSlide = $(this).data("page");
    console.error(curSlide);
    $('.progress').stop();
    $('.progress').clearQueue();
    changeSlides();
    clearProgress($(this));
    stylePagi($(this));
    $('.progressBar').removeClass('animating');
  });

  function stylePagi($element) {
    $('.slider-pagi__elem').find('.progress').css('width', '0%');
    console.log('styling pagi element', $element);
    var pagiActive = $element.hasClass('active');
    var progAnimating = $element.find('.progressBar').hasClass('animating');
    var $progress = $element.find('.progress');
    // if (pagiActive && progAnimating) {

    // }
    // else if (pagiActive && !progAnimating) {
    if (pagiActive) {
      console.log('pagi is active');
      // $('.progress').css('width', '100%');
      $progress.css('width', '100%');
    }
    else {
      console.log('clearing prog');
      clearProgress($element);
      $progress.css('width', '0%');
    }
  }
  stylePagi( $('.slider-pagi__elem-0') );

  
  function autoSlide() {
    autoSlideTimeout = setTimeout(function() {
      curSlide++;
      if (curSlide > numOfSlides) curSlide = 0;
      changeSlides();
    }, autoSlideDelay);
  };
  
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

    stylePagi($('.slider-pagi__elem-'+curSlide));
    // console.log("autoSlideDirty = " + autoSlideDirty);
    // if (!autoSlideDirty) {
    //   // console.error('where I wanna be')
    //   $(".progressBar").removeClass("animating");
    //   var $pb = $(".slider-pagi__elem-"+curSlide+" .progressBar"); 
    //   $pb.addClass("animating");
    //   autoSlide();
    //   // slideProgress(100, autoSlideDelay, $pb);
    // }
    // else {
    //   // console.error('in mordor')
    //   // clearProgress($('.slider-pagi__elem-'+curSlide));
    //   // stylePagi($('.slider-pagi__elem-'+curSlide));
    // }
    if (!autoSlideDirty) autoSlide();
  }

  function navigateLeft() {
    if (animating) return;
    if (curSlide > 0) curSlide--;
    else if (curSlide <= 0) curSlide = numOfSlides;
    changeSlides();
  }

  function navigateRight() {
    if (animating) return;
    if (curSlide < numOfSlides) curSlide++;
    else if (curSlide >= numOfSlides) curSlide = 0;
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
      navigateRight();
      // changeSlides();
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

  function blurSlides() {
    for (var i = 0; i < numOfSlides+1; i++) {
      var bg = $('.slide-'+i).find('.slide__text-bg');
      var text = $('.slide-'+i).find('.slide__text'); 
      // console.log(text.position(), text.width(), text.height() );
      bg.css({
        // 'top': text.offset().top + 'px',
        'left': text.css('margin-left'),
        'width': text.outerWidth(),
        'height': text.outerHeight(),
      });
    }
  }
  // blurSlides();

  function manageControls() {
    $(".slider-control").removeClass("inactive");
    // if (!curSlide) $(".slider-control.left").addClass("inactive");
    // if (curSlide === numOfSlides) $(".slider-control.right").addClass("inactive");
  };


  // FEATURE PROJECT
  var feature = $('#feature');
  var videoW = feature.attr('width');
  var videoH = feature.attr('height');
  var windowW = $(window).width();
  var displayRatio = videoW/videoH;

  function featureFitToWindow() {
    windowW = $(window).width();
    feature.attr('width', windowW);
    feature.attr('height', windowW/displayRatio);
    $('.project-feature').css('height', feature.attr('height'));
  }

  function projectFitToWindow($e) {
    // console.log($e.parent().parent());
    // var projectW = $e.parent().parent().width();
    // var projectH = $e.parent().parent().height();
    var vidW = $e.attr('width');
    var vidH = $e.attr('height');
    var vidDisplayRatio = vidW/vidH;
    var projectW = $('.project').width();
    var projectH = $('.project').height();

    // console.log('projects dimensions: ', projectW, projectH);
    // console.log('vid dimensions: ', vidW, vidH);
    // console.log($e.parent());

    $e.width(projectW-2);
    $e.height(projectH);

    // $e.css('width', projectW); 
    // $e.css('height', projectH); 
  }

  $(window).on('resize', function() {
    featureFitToWindow();
    projectFitToWindow( $('#project-1') );
    projectsSpacing(winW, winH); 
    // projectsSpacing(bootstrapViewportSize($(window).width())); 
  });

  // FEATURE PROJECT SPACING
  function bootstrapViewportSize(n) {
    var viewBreakpoints = {
      'xs': 576,
      'sm': 768,
      'md': 992,
      'lg': 1200
    };
    var viewportSize;
    if (n < viewBreakpoints.xs) viewportSize = 'xs';
    else if (n < viewBreakpoints.sm) viewportSize = 'sm';
    else if (n < viewBreakpoints.md) viewportSize = 'md';
    else if (n >= viewBreakpoints.md) viewportSize = 'lg';
    return viewportSize;
  }

  // PROJECTS SPACING
  var numOfProjects = $('.project').length;
  function projectsSpacing(width, height) {
    if (width < 768) {
      $('.project-'+i).css('padding-right', '0px');
      $('.project-'+i).css('padding-left', '0px');
    }
    else if (width >= 768 && width < 1200) {
      for (var i = 0; i < numOfProjects; i++) {
        if ( (i+1)%2 != 0 ) {
          $('.project-'+i).css('padding-right', '2px');
        }
        else if ( (i+1)%2 === 0 ) {
          $('.project-'+i).css('padding-left', '2px');
        }
      }
    }
    else if (width >= 1200) {
      for (var i = 0; i < numOfProjects; i++) {
        if ( (i+1) == numOfProjects ) {
          // console.log('setting .project-'+i+' padding-right: 0px');
          $('.project-'+i).css('padding-right', '0px');
        }
        else {
          // console.log('setting .project-'+i+' padding-right: 2px');
          $('.project-'+i).css('padding-right', '2px');
        }
      }
    }
  }



  // RESUME
  $resume = $('.resume');
  $(document).on('click', '.resume-title, .nav-link-resume', function(event) {
    var e = $('.resume-title');
    var eh2 = e.find('h2');
    var r = $('.resume');

    if (!e.hasClass('caret-collapsed')) {
      e.addClass('caret-collapsed');
      $resume.slideDown('slow');
      eh2.animate({'margin-bottom': '21px'}, 500);
      $("html, body").animate({scrollTop: $('#resume').offset().top+20}, 500);
    }
    else {
      e.removeClass('caret-collapsed');
      eh2.animate({'margin-bottom': '0px'}, 500);
      $resume.slideUp('slow');
    }
  });
  $resume.hide();


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



