document.addEventListener("DOMContentLoaded", function () {


	let nav = document.querySelector('.nav'),
		navLine = document.querySelector('.nav__line'),
		navItem = document.querySelectorAll('.nav__item');
	navLine.style.width = `${navItem[0].offsetWidth}px`;

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
				navLine.style.width = `0px`;
				navLine.style.left = `${navItem[0].offsetWidth}px`;
			})
		})

	}

	myMagicLineFunction(navItem, navLine);
	myMagicLineFunction(navItemFooter, navLineFooter);

	$('.search-icon').on('click', function () {
		$('.search-field').stop().slideToggle();
		$('.search-field input[type=text]').focus();
		$('.mobile-menu').css({'max-width': '0', 'padding-left':'0'});

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
		$('.mobile-menu').css({'max-width': '250px', 'width': '100%', 'padding-left':'15px'});
		$('.mobile-menu').children().fadeIn();
	});
	$('.close').click(function () {
		$('.mobile-menu').css({'max-width': '0', 'padding-left':'0'});
		$(this).parent().children().fadeOut();
	});


	$(window).on('scroll', function() {
		let topLine = document.querySelector('.top-line');
		let heightBlock = document.querySelector('.first-position-header');
		let heightBlockTop = heightBlock.clientHeight;
		if($(this).scrollTop() >= heightBlockTop){
			$(topLine).addClass('fixed');
		}else{
			$(topLine).removeClass('fixed');
		}
	})
});

