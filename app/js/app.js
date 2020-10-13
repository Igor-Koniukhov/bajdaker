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




	// swipers always at the end--------

	var swiper = new Swiper('.swiper-container_custom', {
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











});




/*
//prices of our products:
$('.moneyGr').text('грн');
//money value depends of country

$('.price-light-tgreen').text(10);
$('.price-azotfiksator-biomag').text(174);
$('.price-azotfiksator-biomag-dry').text(200);
$('.price-fitodoctor').text(150);
$('.price-fitodoctor-dry').text(200);
$('.price-fitodoctor-dry-20').text(16);
$('.price-kvinergy-root').text(120);
$('.price-shan-tong-root').text(120);
$('.price-pao-tong-root').text(120);
$('.price-pawlownia-tree').text(60);
$('.price-shan-tong-tree').text(60);
$('.price-pao-tong-tree').text(60);
$('.price-gumat-k-1l').text(80);
$('.price-gumat-k-200ml').text(20);
$('.price-gumat-k-dry').text(320);


//--------end--of-prices

$(function () {
	//variable which used in the photoChange function
	let imgUrl = {
		musicTool: 'url(img/blog/pavlovnia-kvin/muzikalnii-instrumenti-iz-paulownii.png)',
		woodMade: 'url(img/blog/pavlovnia-kvin/izdelia-iz-paulownii.png)',
		shanTongWood: 'url(img/blog/pavlovnia-kvin/shan-tong-drevesina.jpg)',
		krugliak: 'url(img/blog/pavlovnia-kvin/krugliak-po-godam-3.png)',
		extractLeave: 'url(img/blog/pavlovnia-kvin/labor-glasses.png)',
		powderFromExtract: 'url(img/blog/pavlovnia-kvin/extract-listiev-pavlovnii.png)',
		cowInPaulownia: 'url(img/blog/pavlovnia-kvin/telnok-est-paulowniu-1.png)',
		pigEatingPaulownia: 'url(img/blog/pavlovnia-kvin/upotreblenie-paulowni-2i.png)',
		cowsInTrees: 'url(img/blog/pavlovnia-kvin/krupniy-rogatiy-scot-kormitsiy-paulowniey.jpg)',
		beeOnPaulownia: 'url(img/blog/pavlovnia-kvin/pcheli-na-pavlovnii.png)',
		honeyInCells: 'url(img/blog/pavlovnia-kvin/med-soty.png)'
	};

//function which change picture on hover
	function photoChange(selector, adress1, adress2) {
		$(selector).hover(function () {
			$(selector).css('background-image', adress1);
		}, function () {
			$(selector).css('background-image', adress2);
		});
	};

	photoChange('.wood-music-tools', imgUrl.woodMade, imgUrl.musicTool);
	photoChange('.krugliak', imgUrl.shanTongWood, imgUrl.krugliak);
	photoChange('.medicine-drugs', imgUrl.powderFromExtract, imgUrl.extractLeave);
	photoChange('.animals-eating', imgUrl.cowsInTrees, imgUrl.cowInPaulownia);
	photoChange('.bees-eating', imgUrl.beeOnPaulownia, imgUrl.honeyInCells);


	$('.logo-litera').map(function () {
		let ths = $(this);
		ths.html(ths.html().replace('i', '<span class="red-litera">i</span>'));
	});
	$('.markup-num').each(function () {
		let ths = $(this);
		ths.html(ths.html().replace('6', '<span>6</span>'));
	});

	$('.search').on('click', function () {
		$('.search-field').stop().slideToggle();
		$('.search-field input[type=text]').focus();
		$('.mobile-menu').stop().slideUp();

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
	$('.top-line').after('<div class="mobile-menu d-lg-none"></div>');
	$('.top-menu').clone().appendTo('.mobile-menu');
	$('.mobile-menu-button').click(function () {
		$('.mobile-menu').stop().slideToggle();
	});


	$('.col-item').hover(function () {
		ths = $(this);
		lnk = ths.closest('.col-item').find('h4 a');

		lnk.addClass('hover');
	}, function () {
		lnk.removeClass('hover');
	});

	$('.swiper-button_custom').on('click', function () {
		$(this).addClass('active');
		let removeActive = function () {
			$('.swiper-button_custom').removeClass('active');
		};
		let timeoutId = setTimeout(removeActive, 300);

	});


});


$("body").prognroll({
	height: 3,
	color: "#ec1c1c",
	custom: false
});




let topBlock = document.querySelector('.top-line');
let offsetTopBlock = topBlock.offsetTop;
$('.mobile-menu-button').on('click', function () {
	if ($(window).scrollTop() <= offsetTopBlock) {
		$('.mobile-menu').addClass('fixed-on-hover');
		let offsetBottom = $(window).scrollTop();
		let topLineHeight = 65;
		let positionMobMenu = (offsetTopBlock - offsetBottom) + topLineHeight;
		$('.fixed-on-hover').css({'top': positionMobMenu + 'px'});

	} else {
		$('.fixed-on-hover').css({'top': 'unset'});
		$('.mobile-menu').removeClass('fixed-on-hover');
	}

})


$(window).on('scroll', function () {
	$('.fixed-on-hover').css({'top': '65px'});
	$('.mobile-menu').removeClass('fixed-on-hover').slideUp();
	if ($(this).scrollTop() >= offsetTopBlock) {
		$('.top-line').next().next().css({'margin-top': '65px', 'transition': '.3s all ease;'});
		$(topBlock).addClass('fixed')
		$(".mobile-menu").addClass('fixed');
	} else {
		$(topBlock).removeClass('fixed');
		$(".mobile-menu").removeClass('fixed');
		$('.top-line').next().next().css({'margin-top': '0', 'transition': '.3s all ease;'});
	}
	;

});

//snippet for view active menu
$('.main-menu li').removeClass('active');
var path = window.location.pathname;
$('.main-menu li a').each(function () {
	var href = $(this).attr('href');
	if (path.slice(1).substring(0, href.length) === href) {
		$(this).parent('li').addClass('active');
	}
});


//that script add price and value in form
$('.btn-buy').on('click', function () {
	//main content  hidden
	$('.main-page-wrapper').css({'display': 'none'});
	$('.article-content').css({'display': 'none'});
	// form is appeared as content instead main content
	$('.popup-wrapper').removeClass('d-none').addClass('popup-form');
	$('.form-wrapper').removeClass('d-none');
	// sources were specified - from which places will be taken value for cells
	let ths = $(this);
	let price = ths.parent().find('.price').html() * 1;
	let pack = ths.parent().find('.pack').html();
	let moneyGr = $('.moneyGr').html();
	let productName = ths.parent().parent().find('h3').html();

	//destinations were specified as cells in send form for the buy card and assigned value
	$('#moneyGr').val(moneyGr);
	$('#pack').val(pack);
	$('#nameProduct').val(productName);
	$('#priceP').val(price);

	if ($('#multiplyOfOrder').value == null) {

		$('#multiplyOfOrder').val(price);
	}
	//concrete places were specified with 'this' to value taken
	$('#numbers').val(1)
	let inputNum = document.querySelector('#numbers');
	inputNum.onchange = function () {
		let multiplyOfOrder = $('#multiplyOfOrder');
		let numbersOfproduct = inputNum.value * 1;
		let multiplyOf = numbersOfproduct * price;
		multiplyOfOrder.val(multiplyOf);
	}

});

$('.btn-buy').click(function (e) {
	e.stopPropagation();
});
$('.close').on('click', function () {
	let popupWrapper = document.body.getElementsByClassName('popup-wrapper')[0];
	$(popupWrapper).removeClass('popup-form').addClass('d-none');
	$('.main-page-wrapper').css({'display': 'block'});
	$('.article-content').css({'display': 'block'});
})




$(function () {

	document.getElementById('ajax-contact-form-2').addEventListener('submit', function (evt) {
		var http = new XMLHttpRequest(), f = this;
		var th = $(this);
		evt.preventDefault();
		http.open("POST", "contactbuy.php", true);
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


*/
