document.addEventListener("DOMContentLoaded", function () {
/*//mutation observer snippet---------------
	const targetEl = document.querySelector('body');

	function callback(mutations, observer) {
		console.log(mutations);
	}

	const observer = new MutationObserver(callback);
	observer.observe(targetEl, {
		childList: true,
		attributes: true,
		characterData: true,
		subtree: true,
		attributeFilter: [""],
		characterDataOldValue: true
	});


//mutation observer snippet---------------*/


	let navLine = document.querySelector('.nav__line'),
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

	let articleTitle = document.querySelector('h2');
	let articleTitleHeight = articleTitle.getBoundingClientRect().top;
	let topLine = document.querySelector('.top-line');
	let heightTopLine = topLine.getBoundingClientRect().height;
	let TopTopLine = topLine.getBoundingClientRect().top;
	let navPageTop = document.querySelector('.tabs');
	let scrollUpButton = document.querySelector('.roll-up');
//snippet which prevent glue with the header on reload

	window.addEventListener("beforeunload", function (event) {
		console.log("All resources finished loading!");
		window.scrollTo(0, 0);
	});


	window.addEventListener('scroll', function (event) {
		let logo = document.querySelector('.nav-wrapper_logo');
		let scrollUpButton = document.querySelector('.roll-up');
		let scrollUpButtonBottom = scrollUpButton.getBoundingClientRect().bottom;

		let footer = document.querySelector('footer');
		let footerRedPoint = footer.getBoundingClientRect().top;
		if ($(this).scrollTop() >= TopTopLine) {
			$(topLine).addClass('fixed');
			$(scrollUpButton).css({'display': 'block'});

			$(logo).css({'margin-top': heightTopLine + 'px'});
		} else {
			$(topLine).removeClass('fixed');
			$(logo).css({'margin-top': 0});
			$(scrollUpButton).css({'display': 'none'});
		}
		let navPageTop = document.querySelector('.tabs');
		if ($(this).scrollTop() >= articleTitleHeight) {
			$(navPageTop).addClass('fixed-nav');
		} else {
			$(navPageTop).removeClass('fixed-nav');
		}

		if (footerRedPoint <= scrollUpButtonBottom) {
			scrollUpButton.style.backgroundColor = 'red';


		} else {
			scrollUpButton.style.backgroundColor = 'unset';
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


//tab in the post trips about river Vorscla
	$('.tab').click(function () {
		let tb = $('.tab');
		let tabChildren = $(tb).children();
		let lastTabChild = $('.tab:last-child');
		let tabPrev = $(this).prev();
		let tabNext = $(this).next();
		let tabFirstChild = $('.tab:first-child');
		let num = $(this).index();
		$(tabFirstChild).css({'border-left': '1px solid #333', 'border-radius': '5px 0 0 0'})
		$(tb).removeClass('tab-active')
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


	let scrollUpFunction = (but) => {
		$(but).click(function () {
			$("html, body").animate({scrollTop: 0}, "slow");
			return false;
		});
	}
	scrollUpFunction('.tab');
	scrollUpFunction(scrollUpButton);


// swipers always at the end--------
	sliderLoadFunction();
	let windowWidth = window.outerWidth;
	console.log(windowWidth);


	$('.img-responsiv').dblclick(function () {
		if (windowWidth >= 576) {
			$(this).toggleClass('img-fixed');
		}

	});


	$(function () {

		document.getElementById('ajax-contact-form').addEventListener('submit', function (evt) {
			var http = new XMLHttpRequest(), f = this;
			var th = $(this);
			evt.preventDefault();
			http.open("POST", "contact.php", true);
			http.onreadystatechange = function () {
				if (http.readyState == 4 && http.status == 200) {
					alert(http.responseText);
					if (http.responseText.indexOf(f.nameFF.value) == 0) { // очистить поля формы, если в ответе первым словом будет имя отправителя (nameFF)
						th.trigger("reset");
					}
				}
			}
			http.onerror = function () {
				alert('Ошибка, попробуйте еще раз');
			}
			http.send(new FormData(f));
		}, false);

	});

	let ownerEmail = $('.owner-email').html();


	let mainColor = '#0e2257';
	let trigger = document.querySelector('.trigger');
	$(trigger).on('click', function () {
		$('.form-wrapper').removeClass('d-none');
		$('.main-page-wrapper').addClass('d-none');
		$('.trigger-wrapper').addClass('d-none');
		$('body').css({'background-color': mainColor});
		$('.article-content').addClass('d-none');

		$('#contactOwner').val(ownerEmail);
	})
	$('.cancel').on('click', function () {
		$('.form-wrapper').addClass('d-none');
		$('.main-page-wrapper').removeClass('d-none');
		$('.trigger-wrapper').removeClass('d-none');
		$('body').css({'background-color': 'initial'});
		$('.article-content').removeClass('d-none');
	})
 if($('body').hasClass('is-category')){
 	$('video').css({'height':'200px'});
 }

});

let url ={
	link: ["https://drive.google.com/file/d/1rfwf6Ptri5jMSXCSSKNyjSxX_BUzDWJv/view?usp=sharing",
		"https://drive.google.com/file/d/15Oyecs5nZEonB4t24sr1sJyx3VRe4r3w/view?usp=sharing"],

	openNewWindow(x) {
		document.getElementsByClassName('open-new-window')[x].onclick =  () => {
			window.open(this.link[x]);

		}
	},
}







