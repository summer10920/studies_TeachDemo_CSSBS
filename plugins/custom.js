// scroll to id
$("#lokimenu a, #scrolltop a").click(function () {
  let who = $(this).attr("href");
  let val = $(who).offset().top - $("#lokimenu").innerHeight();
  $("html").animate(
    { scrollTop: val }, 1000, "swing"
  );
});

$(window).scroll(() => {
  spy(); // scroll spy
  bgmenu(); //check menu bg
});

spy();
bgmenu();

function spy() {
  let nowat = $(window).scrollTop();
  $('section').each(function () {
    let
      id = $(this).attr('id'),
      offset = $(this).offset().top - $("#lokimenu").innerHeight() - 1,
      height = $(this).height();

    if (offset <= nowat && nowat < offset + height) {
      $("#lokimenu a").removeClass('active');
      $(`#lokimenu a[href='#${id}']`).addClass('active');
    };
  });
}

function bgmenu() {
  /* 控制 Header's Navbar 的 bg-dark 因 scroll 而變動。*/
  let
    totalw = $(window).innerWidth(),
    nowat = $(window).scrollTop(),
    offset = $("#lokimenu").innerHeight() + 1,
    height = $("#lokislider").height();
  if (nowat <= height - offset) {
    if (totalw >= 769) $("#lokimenu").removeClass("bg-dark");
    $("#scrolltop").removeClass("shown");
  }
  else {
    if (totalw >= 769) $("#lokimenu").addClass("bg-dark");
    $("#scrolltop").addClass("shown");
  }
}