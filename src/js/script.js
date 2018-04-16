function initNav() {
  // grabbing the class names from the data attributes
  const navBar = $('.navbar');
  const data = navBar.data();

  // booleans used to tame the scroll event listening a little..
  let scrolling = false;
  let scrolledPast = false;

  // transition Into
  function switchInto() {
    // update `scrolledPast` bool
    scrolledPast = true;
    // add/remove CSS classes
    navBar.removeClass(data.startcolor);
    navBar.removeClass(data.startsize);
    navBar.addClass(data.intocolor);
    navBar.addClass(data.intosize);
    console.log('into transition triggered!');
  }

  // transition Start
  function switchStart() {
    // update `scrolledPast` bool
    scrolledPast = false;
    // add/remove CSS classes
    navBar.addClass(data.startcolor);
    navBar.addClass(data.startsize);
    navBar.removeClass(data.intocolor);
    navBar.removeClass(data.intosize);
    console.log('start transition triggered!');
  }

  // set `scrolling` to true when user scrolls
  $(window).scroll(() => (scrolling = true));

  setInterval(() => {
    // when `scrolling` becomes true...
    if (scrolling) {
      // set it back to false
      scrolling = false;
      // check scroll position
      if ($(window).scrollTop() > 100) {
        // user has scrolled > 100px from top since last check
        if (!scrolledPast) {
          switchInto();
        }
      } else {
        // user has scrolled back <= 100px from top since last check
        if (scrolledPast) {
          switchStart();
        }
      }
    }
    // take a breath.. hold event listener from firing for 100ms
  }, 100);
}

function splitSection() {
  const e = parseInt($('#bodyborder-top').height());
  if ($('.split-section').length > 0) {
    let contentWidth = $('.wrapper').width();
    if (!contentWidth || contentWidth < 300) {
      contentWidth = 1080;
      if ($(window).width() < 1281) {
        contentWidth = 900;
      } else if ($(window).width() < 1121) {
        contentWidth = 730;
      } else if ($(window).width() < 861) {
        contentWidth = 280;
      }
    }
    const contentThird = Math.round(contentWidth / 3);
    const windowWidth = $(window).width() - e * 2;
    const difference = Math.round((windowWidth - contentWidth) / 2);
    const smallWidth = contentThird + difference + 13;
    const bigWidth = windowWidth - smallWidth;
    if ($(window).width() < 861) {
      $('.split-onethird, .split-onethird .split-bg, .split-twothird, .split-twothird .split-bg').css({
        width: '100%',
      });
    } else {
      $('.split-onethird, .split-onethird .split-bg').css({
        width: `${smallWidth}px`,
      });
      $('.split-twothird, .split-twothird .split-bg').css({
        width: `${bigWidth}px`,
      });
    }
    setTimeout(() => {
      $('.split-section .vertical-center').each(function() {
        const n = $(this).height();
        const r = parseInt($(this).css('padding-top')) + parseInt($(this).css('padding-bottom'));
        const i = n + r;
        const s = $(this)
          .parents('.split-section')
          .height();
        if (i < s && $(window).width() > 861) {
          const o = (s - i) / 2;
          $(this).css({
            marginTop: `${o}px`,
          });
        } else {
          $(this).css({
            marginTop: '0px',
          });
        }
      });
    }, 500);
  }
  if ($(window).width() < 861) {
    $('.split-left, .split-right').each(function() {
      const n = $(this).height();
      if (n < 50) {
        $(this).css({
          'min-height': '300px',
        });
      }
    });
  }
}

$(window).load(() => {
  // Page loader

  $(window).trigger('scroll');
  $(window).trigger('resize');
});

$(document).ready(() => {
  $(window).trigger('resize');
  initNav();
});

$(window).resize(() => {
  splitSection();
});

$(document).ready(() => {
  if ($('#js-parallax-window').length) {
    parallax();
  }
});

$(window).scroll(e => {
  if ($('#js-parallax-window').length) {
    parallax();
  }
});

function parallax() {
  if ($('#js-parallax-window').length > 0) {
    const plxBackground = $('#js-parallax-background');
    const plxWindow = $('#js-parallax-window');

    const plxWindowTopToPageTop = $(plxWindow).offset().top;
    const windowTopToPageTop = $(window).scrollTop();
    const plxWindowTopToWindowTop = plxWindowTopToPageTop - windowTopToPageTop;

    const plxBackgroundTopToPageTop = $(plxBackground).offset().top;
    const windowInnerHeight = window.innerHeight;
    const plxBackgroundTopToWindowTop = plxBackgroundTopToPageTop - windowTopToPageTop;
    const plxBackgroundTopToWindowBottom = windowInnerHeight - plxBackgroundTopToWindowTop;
    const plxSpeed = 0.35;

    plxBackground.css('top', `${-(plxWindowTopToWindowTop * plxSpeed)}px`);
  }
}
