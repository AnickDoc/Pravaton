$(function () {

  $('form').on("sabmit", function (e) {
    var leng = $(".form-end__input").val().length;
    if (leng !== 0) {
      $(".form-end__input").removeClass("err");
      $.ajax({
        type: "POST",
        url: "send.php",
        data: $(this).serialize(),
        success: function () {
          $(".thanks").fadeIn();
          $("html").css("overflow-y", "hidden");
        },
      });
    }
    else {
      $(".form-end__input").addClass("err");
    }
    e.preventDefault();
  });

  $(".slider-1, .slider-2").slick({
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  });

  $(".popup__btn, .anime__link").on("click", function (e) {
    $(".popup__overlay").fadeIn();
    $("html").css("overflow-y", "hidden");
    e.preventDefault();
  });

  $(".popup__close, .popup__overlay").on("click", function (e) {
    if (e.target == this) {
      $(".popup__overlay").fadeOut();
      $("html").css("overflow-y", "auto");
    }
  });

  $(".anime__close-inner").on("click", function () {
    $(".anime").fadeOut();
  })

  var step = 1;
  var width = step * 100 / 7;

  $(".form__input").on("click", function () {
    width = step * 100 / 7;
    $(".popup__liner-2").width(width + "%");
    $(".popup__liner-num").text(Math.trunc(width));

    $(".step" + step++).fadeOut(300, function () {
      $(".popup__prev-btn, .popup__next-btn").removeClass("disable");
      $(".step" + step).fadeIn(300, function () {
        if ($(".fn" + step).is(":checked")) {
          $(".popup__next-btn").removeClass("disable");
        } else {
          $(".popup__next-btn").addClass("disable");
        }
      });
    });

    if (step == 1) {
      $(".popup__prev-btn").addClass("disable");
      $(".popup__inner, .popup__message").fadeIn();
    }
    else {
      $(".popup__inner, .popup__message").fadeOut();
    }

    if (step == 6) {
      $(".popup__next-btn").text("Последний шаг");
    }
  });

  $(".popup__next-btn").on("click", function () {
    width = step * 100 / 7;
    if ($(".fn" + step).is(":checked")) {
      $(".step" + step++).fadeOut(300, function () {
        $(".step" + step).fadeIn(300, function () {
          if (step == 6) {
            $(".popup__next-btn").text("Последний шаг");
          }
          if ($(".fn" + step).is(":checked") || ($(".form__input-text").val().length !== 0)) {
            $(".popup__next-btn").removeClass("disable");
          } else {
            $(".popup__next-btn").addClass("disable");
          }
        });
        $(".popup__liner-2").width(width + "%");
        $(".popup__liner-num").text(Math.trunc(width));
      });
    } else {
      if (step == 5) {
        if ($(".form__input-text").val().length !== 0) {
          $(".step" + step++).fadeOut(300, function () {
            $(".step" + step).fadeIn(300, function () {
              if (step == 6) {
                $(".popup__next-btn").text("Последний шаг");
              }
              if ($(".fn" + step).is(":checked")) {
                $(".popup__next-btn").removeClass("disable");
              } else {
                $(".popup__next-btn").addClass("disable");
              }
            });
            $(".popup__liner-2").width(width + "%");
            $(".popup__liner-num").text(Math.trunc(width));
          });
        } else {
          $(".popup__next-btn").addClass("disable");
        }
      }
    }
  });

  $(".popup__prev-btn").on("click", function () {
    if (step !== 1) {
      $(".step" + step--).fadeOut(300, function () {
        $(".step" + step).fadeIn(300);
        $(".popup__next-btn").removeClass("disable");
        width = step * 100 / 7;
        $(".popup__liner-2").width(width - (100 / 6) + "%");
        $(".popup__liner-num").text(Math.trunc(width - (100 / 7)));
      });

      if (step == 1) {
        $(".popup__inner, .popup__message").fadeIn();
      } else {
        $(".popup__inner, .popup__message").fadeOut();
      }
    }

    if (step !== 6) {
      $(".popup__next-btn").text("Далее");
    }
  });

  $(".form__input-text").on("change", function () {
    if ($(this).val().length == 0) {
      // $(".popup__next-btn").addClass("disable");
    }
    else {
      width = step * 100 / 7;
      $(".popup__liner-2").width(width + "%");
      $(".popup__liner-num").text(Math.trunc(width));

      $(".step" + step++).fadeOut(300, function () {
        $(".popup__prev-btn, .popup__next-btn").removeClass("disable");
        $(".step" + step).fadeIn(300, function () {

          if ($(".fn" + step).is(":checked")) {
            $(".popup__next-btn").removeClass("disable");
          } else {
            $(".popup__next-btn").addClass("disable");
          }
        });
      });
    }

    if (step == 6) {
      $(".popup__next-btn").text("Последний шаг");
    }
  });

  $.fn.setCursorPosition = function (pos) {
    if ($(this).get(0).setSelectionRange) {
      $(this).get(0).setSelectionRange(pos, pos);
    } else if ($(this).get(0).createTextRange) {
      var range = $(this).get(0).createTextRange();
      range.collapse(true);
      range.moveEnd('character', pos);
      range.moveStart('character', pos);
      range.select();
    }
  };

  $.mask.definitions['9'] = false;
  $.mask.definitions['_'] = "[0-9]";
  $(".form-end__input").on("click", function () {
    $(this).setCursorPosition(4);
  }).mask("+7(8___) ___-____");

  // $(".form-end__input").intlTelInput({
  //   separateDialCode: true,
  //   initialCountry: "ru"
  // });
});
