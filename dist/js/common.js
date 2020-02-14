$(function() {
    var screeWidth = screen.width;
    // Открытие теста
    $("#startTest").on("click", function() {
      $(".start--section").slideToggle();
      $(".main-test-block").slideToggle();
      $(".content__elem").each(function(index, item) {
        $(item).css({ left: index * screeWidth, width: screeWidth});
      });
    });
    var sliderContent = $(".main-test-block__content").children().length;
    $(".main-test-block__content").css({ width: sliderContent * screeWidth });
    var topDots = $('.header').height();
    $('.main-test-block__nav-dots').css({top: topDots + 50 });
    console.log(topDots);

    // Слайдер тестов
    $(".slider").each(function() {
      var obj = $(this);
      $(obj)
        .find(".content__elem")
        .each(function() {
          $(obj)
            .find(".main-test-block__nav-dots")
            .append(
              "<div class='nav-elem' rel='" + $(this).index() + "'></div>"
            );
          $(this).addClass("slider" + $(this).index());
        });
      $(obj)
        .find(".nav-elem")
        .first()
        .addClass("active");
    });

    $(document).on("click", ".slider .nav-elem", function() {
      var currSlide = $(".nav-elem.active").attr("rel");
      var sl = $(this).closest(".slider");
      $(sl)
        .find(".nav-elem")
        .removeClass("active");
      $(this).addClass("active");
      var obj = $(this).attr("rel");
      var slideDirection;
      console.log(obj);
      if (obj == 5) {
        $(".main-test-block__nav-dots").fadeOut();
        $(".main-test-block__nav-text").fadeOut();
      }

      if (currSlide > obj) {
        slideDirection = "left";
      } else if (currSlide < obj) {
        slideDirection = "right";
      }
      sliderJS(obj, sl, slideDirection);
      return false;
    });
    
    $(".nav-text-alem__prev").on("click", function() {
      var obj = $(".nav-elem.active").attr("rel");
      obj--;
      if (obj === 0) {
        $(this).removeClass("active");
      } else {
        $(this).addClass("active");
      }
      prevSlide(obj);
      return false;
    });
    $(".nav-text-alem__next").on("click", function() {
      var obj = $(".nav-elem.active").attr("rel");
      obj++;
      if (obj === 0) {
        $(".nav-text-alem__prev").removeClass("active");
      } else {
        $(".nav-text-alem__prev").addClass("active");
      }
      if (obj === 5) {
        $(".main-test-block__nav-dots").fadeOut();
        $(".main-test-block__nav-text").fadeOut();
      }
      nextSlide(obj);
      return false;
    });

    // Ввод только цифр и точки
    $(".onlyDigits").on("change keyup input keydown click", function(e) {
      if (this.value.match(/[^\d\.]/g)) {
        this.value = this.value.replace(/[^\d\.]/g, "");
      }
    });
  });

  function prevSlide(obj) {
    $(".nav-elem[rel='" + obj + "']").click();
  }

  function nextSlide(obj) {
    $(".nav-elem[rel='" + obj + "']").click();
  }

  function sliderJS(obj, sl, slideDirection) {
    var bl = $(sl).find(".content__elem.slider" + obj);
    var length = $(sl).find(".content__elem").length;
    var step = $(bl).width();

    var slide = step * obj;
    $(".main-test-block__content").animate({ left: "-" + slide }, 400);
    $(".content__elem").css({ opacity: 0, transition: ".3s" });
    $(bl).css({ opacity: 1, transition: ".3s" });
  }
