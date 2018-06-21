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
      $(
        '.split-onethird, .split-onethird .split-section__half--bg, .split-twothird, .split-twothird .split-section__half--bg'
      ).css({
        width: '100%',
      });
    } else {
      $('.split-onethird, .split-onethird .split-section__half--bg').css({
        width: `${smallWidth}px`,
      });
      $('.split-twothird, .split-twothird .split-section__half--bg').css({
        width: `${bigWidth}px`,
      });
    }
    setTimeout(() => {
      $('.split-section__content').each(function() {
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
    $('.split-section__half').each(function() {
      const n = $(this).height();
      if (n < 50) {
        $(this).css({
          'min-height': '300px',
        });
      }
    });
  }
}

function initHeightMatch() {
  (function($) {
    $('.js-height-full').height($(window).height());
    $('.js-height-parent').each(function() {
      $(this).height(
        $(this)
          .parent()
          .first()
          .height()
      );
    });
  })(jQuery);
}

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

function initCountdown() {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const countDown = new Date('Aug 18, 2018 08:00:00').getTime();
  const x = setInterval(() => {
    const now = new Date().getTime();
    const distance = countDown - now;

    document.getElementById('countdown-days').innerText = Math.floor(distance / day);
    document.getElementById('countdown-hours').innerText = Math.floor((distance % day) / hour);
    document.getElementById('countdown-minutes').innerText = Math.floor((distance % hour) / minute);
    document.getElementById('countdown-seconds').innerText = Math.floor((distance % minute) / second);

    // do something later when date is reached
    if (distance < 0) {
      clearInterval(x);
      document.getElementById('countdown-days').innerText = 0;
      document.getElementById('countdown-hours').innerText = 0;
      document.getElementById('countdown-minutes').innerText = 0;
      document.getElementById('countdown-seconds').innerText = 0;
    }
  }, second);
}

function initMap() {
  const heritageCords = { lat: 33.4460307, lng: -79.1597138 };
  // Basic options for a simple Google Map
  // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
  const mapOptions = {
    // How zoomed in you want the map to start at (always required)
    zoom: 12,

    // The latitude and longitude to center the map (always required)
    center: heritageCords,

    // How you would like to style the map.
    // This is where you would paste any style found on Snazzy Maps.
    styles: [
      {
        featureType: 'all',
        elementType: 'labels',
        stylers: [
          {
            visibility: 'on',
          },
        ],
      },
      {
        featureType: 'all',
        elementType: 'labels.text.fill',
        stylers: [
          {
            saturation: 36,
          },
          {
            color: '#000000',
          },
          {
            lightness: 40,
          },
        ],
      },
      {
        featureType: 'all',
        elementType: 'labels.text.stroke',
        stylers: [
          {
            visibility: 'on',
          },
          {
            color: '#000000',
          },
          {
            lightness: 16,
          },
        ],
      },
      {
        featureType: 'all',
        elementType: 'labels.icon',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'administrative',
        elementType: 'geometry.fill',
        stylers: [
          {
            color: '#000000',
          },
          {
            lightness: 20,
          },
        ],
      },
      {
        featureType: 'administrative',
        elementType: 'geometry.stroke',
        stylers: [
          {
            color: '#000000',
          },
          {
            lightness: 17,
          },
          {
            weight: 1.2,
          },
        ],
      },
      {
        featureType: 'administrative.country',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#5bd8b4',
          },
        ],
      },
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#c4c4c4',
          },
        ],
      },
      {
        featureType: 'administrative.neighborhood',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#5bd8b4',
          },
        ],
      },
      {
        featureType: 'landscape',
        elementType: 'geometry',
        stylers: [
          {
            color: '#000000',
          },
          {
            lightness: 20,
          },
        ],
      },
      {
        featureType: 'poi',
        elementType: 'geometry',
        stylers: [
          {
            color: '#000000',
          },
          {
            lightness: 21,
          },
          {
            visibility: 'on',
          },
        ],
      },
      {
        featureType: 'poi.business',
        elementType: 'geometry',
        stylers: [
          {
            visibility: 'on',
          },
        ],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.fill',
        stylers: [
          {
            color: '#5bd8b4',
          },
          {
            lightness: '0',
          },
        ],
      },
      {
        featureType: 'road.highway',
        elementType: 'geometry.stroke',
        stylers: [
          {
            visibility: 'off',
          },
        ],
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#ffffff',
          },
        ],
      },
      {
        featureType: 'road.highway',
        elementType: 'labels.text.stroke',
        stylers: [
          {
            color: '#5bd8b4',
          },
        ],
      },
      {
        featureType: 'road.arterial',
        elementType: 'geometry',
        stylers: [
          {
            color: '#000000',
          },
          {
            lightness: 18,
          },
        ],
      },
      {
        featureType: 'road.arterial',
        elementType: 'geometry.fill',
        stylers: [
          {
            color: '#484848',
          },
        ],
      },
      {
        featureType: 'road.arterial',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#ffffff',
          },
        ],
      },
      {
        featureType: 'road.arterial',
        elementType: 'labels.text.stroke',
        stylers: [
          {
            color: '#212121',
          },
        ],
      },
      {
        featureType: 'road.local',
        elementType: 'geometry',
        stylers: [
          {
            color: '#000000',
          },
          {
            lightness: 16,
          },
        ],
      },
      {
        featureType: 'road.local',
        elementType: 'labels.text.fill',
        stylers: [
          {
            color: '#999999',
          },
        ],
      },
      {
        featureType: 'transit',
        elementType: 'geometry',
        stylers: [
          {
            color: '#000000',
          },
          {
            lightness: 19,
          },
        ],
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [
          {
            color: '#000000',
          },
          {
            lightness: 17,
          },
        ],
      },
    ],
  };

  // Get the HTML DOM element that will contain your map
  // We are using a div with id="map" seen below in the <body>
  const mapElement = document.getElementById('map-canvas');

  // Create the Google Map using our element and options defined above
  const map = new google.maps.Map(mapElement, mapOptions);

  // Let's also add a marker while we're at it
  const marker = new google.maps.Marker({
    position: heritageCords,
    map,
    title: 'Snazzy!',
  });
}

$('.map-section').click(function() {
  $(this).toggleClass('js-active');
  $(this)
    .find('.mt-open')
    .toggle();
  $(this)
    .find('.mt-close')
    .toggle();
});

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
  initHeightMatch();
});

$(document).ready(() => {
  if ($('#js-parallax-window').length) {
    parallax();
    initCountdown();
  }
});

$(window).scroll(() => {
  if ($('#js-parallax-window').length) {
    parallax();
  }
});
