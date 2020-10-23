document.addEventListener("DOMContentLoaded", function () {


	let nIndex = 3;


	let nav = document.querySelector('.nav'),
		navLine = document.querySelector('.nav__line'),
		navItem = document.querySelectorAll('.nav__item');
	let navLineFooter = document.querySelector('.nav__line-footer'),
		navItemFooter = document.querySelectorAll('.nav__item-footer');
	navLineFooter.style.width = `${navItem[0].offsetWidth}px`;

	function myMagicLineFunction(navItem, navLine) {
		navItem.forEach(el => {
			el.addEventListener('mouseenter', (e) => {
				navLine.style.width = `${e.currentTarget.offsetWidth}px`;
				navLine.style.left = `${e.currentTarget.offsetLeft}px`;
			});
			el.addEventListener('mouseleave', () => {
				navLine.style.width = `0`;
			});
		})
	}

	myMagicLineFunction(navItem, navLine);
	myMagicLineFunction(navItemFooter, navLineFooter);

	//snippet for view active menu


	$('.search-icon').on('click', function () {
		$('.search-field').stop().slideToggle();
		$('.search-field input[type=text]').focus();
		$('.mobile-menu').css({'max-width': '0', 'padding-left': '0'});

	});
	$(document).keyup(function (e) {
		if (e.keyCode === 27) {
			$('.search-field').slideUp();
		}
	}).click(function () {
		$('.search-field').slideUp();
	})
	$('.search-wrap').click(function (e) {
		e.stopPropagation();
	});

	$('.top-line').after(`<div class='mobile-menu'><div class='close'>x</div></div>`);
	$('.top-menu').clone().appendTo('.mobile-menu');
	$('.mobile-menu-button').on('click', function () {
		$('.mobile-menu').css({'max-width': '250px', 'width': '100%', 'padding-left': '15px'})
			.children().fadeIn();
	});
	$('.close').click(function () {
		$('.mobile-menu').css({'max-width': '0', 'padding-left': '0'});
		$(this).parent().children().fadeOut();
	});





	$(window).on('scroll', function () {
		let topLine = document.querySelector('.top-line');
		let heightTopLine = topLine.clientHeight;
		let heightBlock = document.querySelector('.first-position-header');
		let heightBlockTop = heightBlock.clientHeight;
		let logo = document.querySelector('.nav-wrapper_logo');
		let heightLogo = logo.clientHeight;
		console.log(heightLogo);


		if ($(this).scrollTop() >= heightBlockTop) {
			$(topLine).addClass('fixed');
			$(logo).css({'margin-top': heightTopLine + 'px'});
		} else {
			$(topLine).removeClass('fixed');
			$(logo).css({'margin-top': 0});
		}

		let navPageTop = document.querySelector('.tabs')
		let heightTitle = document.querySelector('.post-title').clientHeight;
		let heightQuote = document.querySelector('.post-quote').clientHeight;
		let heightBreadCrumbs = document.querySelector('.breadcrumbs').clientHeight;
		var heightBlockSum = (heightBlockTop + heightTopLine
			+ heightTitle + heightQuote + heightBreadCrumbs
			+ heightLogo + 23);


		if ($(this).scrollTop() >= heightBlockSum) {
			$(navPageTop).addClass('fixed-nav');
		} else {
			$(navPageTop).removeClass('fixed-nav');
		}


	});


	function sliderLoadFunction() {
		let swiper = new Swiper('.swiper-container_custom', {
			slidesPerView: 'auto',
			slidesPerGroup: 1,
			spaceBetween: 2,
			initialSlide: 0,
			keyboard: {
				enabled: true,
			},
			watchSlidesProgress: true,

			pagination: {
				el: '.swiper-pagination',
				clickable: true,
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
		});
	};


//tab in the post trips about rever Vorscla
	$('.tab').click(function () {


		let tabChildren = $('.tab').children();
		let lastTabChild = $('.tab:last-child');
		let tabPrev = $(this).prev();
		let tabNext = $(this).next();
		let tabFirstChild = $('.tab:first-child');
		let num = $(this).index();
		$(tabFirstChild).css({'border-left': '1px solid #333', 'border-radius': '5px 0 0 0'})
		$('.tab').removeClass('tab-active')
			.css({
				'border-left': 'unset',
				'border-right': 'unset',
				'border-radius': '5px 5px 0px 0px'
			});
		$(tabChildren).css({'border-right': '1px solid #fff'});
		$(this).addClass('tab-active').children().css({'border': 'unset'});
		$('.day').removeClass('day-active').eq(num).addClass('day-active');
		$(tabPrev).css({
			'border-right': '1px solid #fff',
			'border-radius': '5px 5px  5px 0'
		}).children().css({'border-right': 'unset'});
		$(tabNext).css({
			'border-left': '1px solid #fff',
			'border-radius': '5px 5px 0 5px'
		});
		$(lastTabChild).children().css({'border': 'unset'});

		/*window.scrollTo(0,0);*/

		sliderLoadFunction();
	});

	$(".tab").click(function() {
		$("html, body").animate({ scrollTop: 0 }, "slow");
		return false;
	});

// swipers always at the end--------
	sliderLoadFunction();


});




