function initNav() {
	// grabbing the class names from the data attributes
	const navBar = $(".navbar");
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
		console.log("into transition triggered!");
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
		console.log("start transition triggered!");
	}

	// set `scrolling` to true when user scrolls
	$(window).scroll(() => {
		scrolling = true;
	});

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
	const e = parseInt($("#bodyborder-top").height());
	if ($(".split-section").length > 0) {
		let contentWidth = $(".wrapper").width();
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
				".split-onethird, .split-onethird .split-section__half--bg, .split-twothird, .split-twothird .split-section__half--bg"
			).css({
				width: "100%"
			});
		} else {
			$(".split-onethird, .split-onethird .split-section__half--bg").css({
				width: `${smallWidth}px`
			});
			$(".split-twothird, .split-twothird .split-section__half--bg").css({
				width: `${bigWidth}px`
			});
		}
		setTimeout(() => {
			$(".split-section__content").each(function() {
				const n = $(this).height();
				const r =
					parseInt($(this).css("padding-top")) +
					parseInt($(this).css("padding-bottom"));
				const i = n + r;
				const s = $(this)
					.parents(".split-section")
					.height();
				if (i < s && $(window).width() > 861) {
					const o = (s - i) / 2;
					$(this).css({
						marginTop: `${o}px`
					});
				} else {
					$(this).css({
						marginTop: "0px"
					});
				}
			});
		}, 500);
	}
	if ($(window).width() < 861) {
		$(".split-section__half").each(function() {
			const n = $(this).height();
			if (n < 50) {
				$(this).css({
					"min-height": "300px"
				});
			}
		});
	}
}

function initHeightMatch() {
	(function($) {
		$(".js-height-full").height($(window).height());
		$(".js-height-parent").each(function() {
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
	if ($("#js-parallax__window").length > 0) {
		const parallaxBackground = $("#js-parallax__background");
		const parallaxWindow = $("#js-parallax__window");

		const parallaxWindowTopToPageTop = $(parallaxWindow).offset().top;
		const windowTopToPageTop = $(window).scrollTop();
		const parallaxWindowTopToWindowTop =
			parallaxWindowTopToPageTop - windowTopToPageTop;

		const parallaxBackgroundTopToPageTop = $(parallaxBackground).offset().top;
		const windowInnerHeight = window.innerHeight;
		const parallaxBackgroundTopToWindowTop =
			parallaxBackgroundTopToPageTop - windowTopToPageTop;
		const parallaxBackgroundTopToWindowBottom =
			windowInnerHeight - parallaxBackgroundTopToWindowTop;
		const parallaxSpeed = 0.35;

		parallaxBackground.css(
			"top",
			`${-(parallaxWindowTopToWindowTop * parallaxSpeed)}px`
		);
	}
}

function initCountdown() {
	const second = 1000;
	const minute = second * 60;
	const hour = minute * 60;
	const day = hour * 24;

	const countDown = new Date("Aug 18, 2018 08:00:00").getTime();
	const x = setInterval(() => {
		const now = new Date().getTime();
		const distance = countDown - now;

		document.getElementById("countdown-days").innerText = Math.floor(
			distance / day
		);
		document.getElementById("countdown-hours").innerText = Math.floor(
			(distance % day) / hour
		);
		document.getElementById("countdown-minutes").innerText = Math.floor(
			(distance % hour) / minute
		);
		document.getElementById("countdown-seconds").innerText = Math.floor(
			(distance % minute) / second
		);

		// do something later when date is reached
		if (distance < 0) {
			clearInterval(x);
			document.getElementById("countdown-days").innerText = 0;
			document.getElementById("countdown-hours").innerText = 0;
			document.getElementById("countdown-minutes").innerText = 0;
			document.getElementById("countdown-seconds").innerText = 0;
		}
	}, second);
}

function smoothScroll(toElement, speed) {
	const windowObject = window;
	let windowPos = windowObject.pageYOffset;
	const pointer = toElement.getAttribute("href").slice(1);
	const elem = document.getElementById(pointer);
	const elemOffset = elem.offsetTop;

	const counter = setInterval(() => {
		if (windowPos > elemOffset) {
			// from bottom to top
			windowObject.scrollTo(0, windowPos);
			windowPos -= speed;

			if (windowPos <= elemOffset) {
				// scrolling until elemOffset is higher than scrollbar position, cancel interval and set scrollbar to element position
				clearInterval(counter);
				windowObject.scrollTo(0, elemOffset);
			}
		} else {
			// from top to bottom
			windowObject.scrollTo(0, windowPos);
			windowPos += speed;

			if (windowPos >= elemOffset) {
				// scroll until scrollbar is lower than element, cancel interval and set scrollbar to element position
				clearInterval(counter);
				windowObject.scrollTo(0, elemOffset);
			}
		}
	}, 1);
}

// call example
function initSmoothScroll() {
	const navPointer = document.getElementsByClassName("js-smoothscroll");

	for (let i = 0; i < navPointer.length; i += 1) {
		navPointer[i].addEventListener("click", function(e) {
			smoothScroll(this, 18);
			e.preventDefault();
		});
	}
}

function removeUrlHash() {
	let scrollV;
	let scrollH;
	const loc = window.location;
	if ("pushState" in history)
		history.pushState("", document.title, loc.pathname + loc.search);
	else {
		// Prevent scrolling by storing the page's current scroll offset
		scrollV = document.body.scrollTop;
		scrollH = document.body.scrollLeft;

		loc.hash = "";

		// Restore the scroll offset, should be flicker free
		document.body.scrollTop = scrollV;
		document.body.scrollLeft = scrollH;
	}
}

$(".map-section").click(function() {
	$(this).toggleClass("js-active");
	$(this)
		.find(".map-toggle__open")
		.toggle();
	$(this)
		.find(".map-toggle__close")
		.toggle();
});

$(window).load(() => {
	// Page loader

	$(window).trigger("scroll");
	$(window).trigger("resize");
	removeUrlHash();
	initSmoothScroll();

	// Hash menu forwarding
	if (window.location.hash && $(window.location.hash).length) {
		const hashOffset = $(window.location.hash).offset().top;
		$("html, body").animate({
			scrollTop: hashOffset
		});
	}
});

$(document).ready(() => {
	$(window).trigger("resize");
	initNav();
});

$(window).resize(() => {
	splitSection();
	initHeightMatch();
});

$(document).ready(() => {
	if ($("#js-parallax__window").length) {
		parallax();
		initCountdown();
	}
});

$(window).scroll(() => {
	if ($("#js-parallax__window").length) {
		parallax();
	}
});
