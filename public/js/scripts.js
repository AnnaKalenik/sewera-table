function popupsInit(newPopup){
	$(".page-width").css("min-height","100%");
	var bodyH = $(window).outerHeight();
	var pageH = $(".page-width").outerHeight();if(pageH < bodyH) {pageH = bodyH;}
	var scrollH = $(window).scrollTop();
	var popupH = $(newPopup).outerHeight();

	if(pageH < popupH)
	{
		if( $("body").hasClass("show-popups-preload") == true )
		{$(".page-width").css("min-height",popupH+30);pageH = popupH+30;}
	}

	var popupTop = scrollH + 20;
	if( popupH < bodyH ){popupTop = (bodyH-popupH)/2 + scrollH;}
	if( (popupTop+popupH) > pageH ){popupTop = pageH - popupH;}

	if( $(newPopup).hasClass("show") != true )
	{$(newPopup).css("top", popupTop+"px");}
}
function mobInit(){
	$(document).on("click", ".mobile-nav .sub-btn, .mobile-nav.click-btn .have-sub .sub_open", function(){
		if( $(this).parent().hasClass("open") != true )
		{$(this).parent().parent().find(".sub-nav").eq(0).show(200);}
		else
		{$(this).parent().parent().find(".sub-nav").eq(0).hide(200);}
		$(this).parent().toggleClass("open");
		return false;
	});
	$(document).on("click", ".mobile-sbm, .catalog-mobile__close, .mobile-toolbar__item_cataog", function(){
		$('.mobile-toolbar__item_cataog').toggleClass('mobile-toolbar__item_active');
		
		if( $("body").hasClass("show-category") != true )
		{
			$("body").addClass("show-category");
			jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop: 0},0);
			$(".catalog-nav-wrap").show(0);
		}
		else
		{
			$("body").removeClass("show-category");
			$(".catalog-nav-wrap").hide(0);
			var oldScr = $("body").data("scroll");if(oldScr > 0){}else{oldScr = 0;}
			jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop: oldScr},0);
		}
		return false;
	});
}
function upInit(){
	var bodyH = $(window).outerHeight();
	var scroll = $(window).scrollTop();
	if(scroll > bodyH && $("body").hasClass("show-up") != true)
	{$("body").toggleClass("show-up");}
	if(scroll < bodyH && $("body").hasClass("show-up") == true)
	{$("body").removeClass("show-up");}
}
function abc2(n) {
	n += "";
	n = new Array(4 - n.length % 3).join("U") + n;
	return n.replace(/([0-9U]{3})/g, "$1 ").replace(/U/g, "");
}/* 1 000 000 */
function tabsRow(){
	var tabsLen = $(".tabs-row").length;
	for(var i=0;i<tabsLen;i++)
	{
		var tabRow = $(".tabs-row").eq(i);
		var liLen = $(tabRow).find("li").length;
		$(tabRow).find(".line").css("width", (100/liLen)+"%");

		var liLen = $(tabRow).find("li").length;
		var tabInd = $(tabRow).find(".active").index();
		var step = (100/liLen)*tabInd+"%";
		$(tabRow).find(".line").css("left", step);
	}
}
function audioPl(){
	/* Пауза, выключение звука и сдвиг ползунка timeline */
	$(document).on('click','.audio-bl .audio-btn', function () {
		// Меняем иконку
		glyphicon = $(this).find('.glyphicon');
		toggleClass = glyphicon.data('toggle-class');
		glyphicon.data('toggle-class', glyphicon.attr('class')).removeClass().addClass(toggleClass);

		audio = $(this).closest('.audio-bl').find('audio');
		timeline = audio.closest('.audio-bl').find('.audio-line');

		rate = audio.closest('.audio-bl').find('.audio-rate');
		image = audio.closest('.audio-bl_container').find('.audio-bl_img');
		rate.toggleClass('active');
		image.toggleClass('active');

		duration = audio.prop('duration');
		width = timeline.width();

		if( $(this).hasClass("on") != true ){$(this).addClass("on");}

		// Старт/пауза и двигаем ползунок
		if(audio.prop('paused')) {
			audio.trigger('play');
			if( $(this).hasClass("on") != true ){$(this).addClass("on");}
			idInterval = setInterval(function () {
				currentTime = audio.prop('currentTime');
				left = width*currentTime/duration;
				timeline.find('span').css('width', left+'px');
				var date = new Date(currentTime * 1000);
				var dateMin = date.getMinutes();if(dateMin < 10){dateMin = "0"+dateMin;}
				var dateSec = date.getSeconds();if(dateSec < 10){dateSec = "0"+dateSec;}
				audio.closest('.audio-bl').find(".audio-time").html(dateMin+':'+dateSec);
				if (currentTime == duration) {
					$(".audio-btn.on").removeClass("on");
					rate.removeClass('active');
					image.removeClass('active');
					clearInterval(idInterval);
				}
			}, 2);
		} else {
			audio.trigger('pause');
			$(".audio-btn.on").removeClass("on");
			clearInterval(idInterval);
		}

		return false;
	});
	/* Перемотка трека по клику на timeline */
	$(document).on('click','.audio-bl .audio-line', function (e) {
		audioTime = $(this).closest('.audio-bl').find('audio');
		duration = audioTime.prop('duration');
		if (duration > 0) {
			offset = $(this).offset();
			left = e.clientX-offset.left;
			width = $(this).width();
			$(this).find('span').css('width', left+'px');
			currentTime = audio.prop('currentTime');
			audioTime.prop('currentTime', duration*left/width);
		}
		return false;
	});
	$(document).on('click','.audio-bl .audio-rate', function (e) {
		audioTime = $(this).closest('.audio-bl').find('audio');
		let rate = audioTime[0].playbackRate;
		audioTime[0].playbackRate = rate < 2?rate+=0.5:rate=0.5;
		$(this).closest('.audio-bl').find('.audio-rate').text(rate+'x');
	});

}
function tblRow(){
	var tblLen = $(".tbl-row").length;
	for(var i=0;i<tblLen;i++)
	{
		var trHed = $(".tbl-row").eq(i).find(".tbl thead tr").eq(0).find('td').outerHeight() + 10;
		$(".tbl-row").eq(i).find(".tbl thead tr").eq(0).outerHeight(trHed).css({
			'display':'flex',
			'align-items':'center'
		});
		$(".tbl-row").eq(i).find(".tbl thead tr").eq(0).find('td').css({
			'display':'flex',
			'align-items':'center'
		});
		var trLen = $(".tbl-row").eq(i).find(".tbl tbody tr").length;
		var bLen = $(".tbl-row").eq(i).find(".sw-tbl-head").length;
		for(var k=0;k<bLen;k++)
		{$(".tbl-row").eq(i).find(".sw-tbl-head").eq(k).css("min-height",trHed+"px");}
		var bLen = $(".tbl-row").eq(i).find(".sw-tbl-body").length;
		for(var j=0;j<trLen;j++)
		{
			var temp =  $(".tbl-row").eq(i).find(".tbl tbody tr").eq(j).outerHeight();
			for(var k=0;k<bLen;k++)
			{$(".tbl-row").eq(i).find(".sw-tbl-body").eq(k).find(".sw-tr").eq(j).css("min-height",temp+"px");}
		}
	}
}
$(document).ready(function(){
	mobInit();
	upInit();
	tabsRow();
	audioPl();
	tblRow();

	$(document).on("click", ".tabs-row li", function(){
		if( $(this).hasClass("active") != true )
		{
			$(this).parent().find(".active").removeClass("active");
			$(this).toggleClass("active");
			var liLen = $(this).parent().find("li").length;
			var tabInd = $(this).parent().find(".active").index();
			var step = (100/liLen)*tabInd+"%";
			$(this).parent().parent().find(".line").css("left", step);
		}
	});
	$(document).on("mouseenter", ".tabs-row li", function(){
		var liLen = $(this).parent().find("li").length;
		var tabInd = $(this).index();
		var step = (100/liLen)*tabInd+"%";
		$(this).parent().parent().find(".line").css("left", step);
	});
	$(document).on("mouseleave", ".tabs-row li", function(){
		var liLen = $(this).parent().find("li").length;
		var tabInd = $(this).parent().find(".active").index();
		var step = (100/liLen)*tabInd+"%";
		$(this).parent().parent().find(".line").css("left", step);
	});
	//Popups
	$(document).on("click",".popup-link", function(){
		var newPopup = $(this).attr("href");
		if( $("body").hasClass("show-popups-preload") != true ){$("body").toggleClass("show-popups-preload");}
		popupsInit($(newPopup));
		if( $("body").hasClass("show-popups") != true ){$("body").toggleClass("show-popups");if( $(newPopup).hasClass("show") != true ){$(newPopup).toggleClass("show");}}
		else{$(".popup-bl").removeClass("show");$(newPopup).toggleClass("show");}
		$("body").removeClass("show-popups-preload");
		if( $("body").hasClass("show-popups-hide") != true ){$("body").toggleClass("show-popups-hide");}
		return false;
	});
	$(document).on("click",".pr-small .modific-sbm",function(){
		var newBl = $(this).parent().parent().parent().parent().parent();
		$(newBl).toggleClass("fix-active");
		if( $("body").hasClass("show-popups") != true ){$("body").toggleClass("show-popups");}
		if( $("body").hasClass("show-popups-hide") != true ){$("body").toggleClass("show-popups-hide");}
		return false;
	});
	$(document).on("click",".open-link", function(){
		if( $("body").hasClass("filt-active") != true ){$("body").toggleClass("filt-active");}
		if( $("body").hasClass("show-popups") != true ){$("body").toggleClass("show-popups");}
		if( $("body").hasClass("show-popups-hide") != true ){$("body").toggleClass("show-popups-hide");}
		return false;
	});
	
	$(document).on("click",".popup-bl .close,.close-popup", function(){
		$(".popup-bl").removeClass("show");
		$("body").removeClass("filt-active");
		$("body").removeClass("select-active");
		$("body").removeClass("show-popups");
		$("body").removeClass("show-w-popup");
		$("body .fix-active").removeClass("fix-active");
		$("body").removeClass("show-popups-hide");
		$(".page-width").css("min-height","100%");
		return false;
	});
	$(document).on("mouseenter", ".popup-bl,.fix-active .modific-bl", function (e){
		if( $("body").hasClass("show-popups-hide") == true ){$("body").removeClass("show-popups-hide");}
	});
	$(document).on("mouseleave", ".popup-bl,.fix-active .modific-bl", function (e){
		if( $("body").hasClass("show-popups-hide") != true ){$("body").toggleClass("show-popups-hide");}
	});
	$(document).on("click","body", function(){

		$(".show-popups-hide .popup-bl.show").removeClass("show");
		$(".show-popups-hide .page-width").css("min-height","100%");
		$(".show-popups-hide").removeClass("show-popups");
		$(".show-popups-hide .fix-active").removeClass("fix-active");
		$(".show-popups-hide").removeClass("show-popups-hide");
	});

	$(document).on("click",".select-bl .title", function(){
		var newSel = $(this).parent();var temp = $("body").outerWidth();
		if( $(newSel).hasClass("open") != true ){$(newSel).find("ul").fadeIn(150);$(newSel).toggleClass("open");}
		else{$(newSel).find("ul").fadeOut(150);$(newSel).removeClass("open");}

		if( $("body").hasClass("select-active") != true ){$("body").toggleClass("select-active");}
		if( $("body").hasClass("show-popups") != true && temp < 720 ){$("body").toggleClass("show-popups");}
		if( $("body").hasClass("show-popups-hide") != true && temp < 720 ){$("body").toggleClass("show-popups-hide");}

		return false;
	});
	$(document).on("mouseenter",".select-bl .title", function(){
		var newSel = $(this).parent();var temp = $("body").outerWidth();
		if( $(newSel).hasClass("open") != true && temp > 720 ){
			if( $(newSel).hasClass("open") != true ){$(newSel).find("ul").fadeIn(150);$(newSel).toggleClass("open");}
			else{$(newSel).find("ul").fadeOut(150);$(newSel).removeClass("open");}

			if( $("body").hasClass("select-active") != true ){$("body").toggleClass("select-active");}
			if( $("body").hasClass("show-popups") != true && temp < 720 ){$("body").toggleClass("show-popups");}
			if( $("body").hasClass("show-popups-hide") != true && temp < 720 ){$("body").toggleClass("show-popups-hide");}
		}
		return false;
	});
	$(document).on("mouseleave",".select-bl", function(){
		var newSel = $(this);var temp = $("body").outerWidth();
		if( $(newSel).hasClass("open") == true && temp > 720 ){
			$(newSel).find("ul").fadeOut(150);$(newSel).removeClass("open");

			if( $("body").hasClass("select-active") == true ){$("body").removeClass("select-active");}
		}
		return false;
	});
	$(document).on("click",".select-bl li span", function(){
		var newSel = $(this).parent().parent().parent();
		var newVal = $(this).html();
		$(newSel).find(".title span").html(newVal);
		$(newSel).find("ul .active").removeClass("active");
		$(this).parent().toggleClass("active");
		$(newSel).find("ul").hide(200);
		$(newSel).removeClass("open");
		if( $("body").hasClass("select-active") == true ){$("body").removeClass("select-active");}
	});
	$(document).mouseup(function (e){
		var div = $(".select-bl.open").eq(0);
		if (!div.is(e.target) && div.has(e.target).length === 0) {
			$(".select-bl.open ul").hide(200);
			if($(".select-bl.open").length > 0){$(".close-popup").eq(0).trigger("click");}
			$(".select-bl.open").removeClass("open");
		}
	});

	$(document).on("click",".tab-link",function(){
		var newBl = $(this).attr("href");
		var oldBl = "#"+$(".tab-bl.open").eq(0).attr("id");

		var oldActive = "a[href='"+oldBl+"']";
		$(oldActive).removeClass("active");
		$(oldBl).removeClass("open");

		var newActive = "a[href='"+newBl+"']";
		$(newActive).toggleClass("active");
		$(newBl).toggleClass("open");

		return false;
	});
	$(document).on("click",".tabs-nav a",function(){
		if( $(this).hasClass("active") != true )
		{
			var oldLink = $(this).parent().parent().find(".active").eq(0);
			var oldBl = $(oldLink).attr("href");
			$(oldLink).removeClass("active");
			$(oldBl).hide(0);

			var newLink = $(this);
			var newBl = $(this).attr("href");
			$(newLink).toggleClass("active");
			$(newBl).fadeIn(500);
		}
		return false;
	});

	$(document).on("click",".size-bl i",function(){
		var newVal = parseInt($(this).parent().find("input").val());
		if($(this).hasClass("left") == true){if(newVal > 1){newVal--;}else{newVal=1;}}
		if($(this).hasClass("right") == true){if(newVal > 0){newVal++;}else{newVal=1;}}
		$(this).parent().find("input").val(newVal);
	});
	$(document).on("change, keyup",".size-bl input",function(){
		var newVal = $(this).val();
		if(newVal > 0){}else{$(this).val("1");}
	});

	$(document).on("click",".up-link",function(){
		jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop: 0},800);
		return false;
	});

	$(document).on("click","div.i-btn",function(){
		if( $(this).hasClass("open") != true ){$(this).addClass("open");}
		else{$(this).removeClass("open");}
		return false;
	});
	$(document).on("mouseenter",".i-btn.open",function(){
		$("body").removeClass("show-ibtn");
	});
	$(document).on("mouseleave",".i-btn.open",function(){
		if( $("body").hasClass("show-ibtn") != true )
		{$("body").toggleClass("show-ibtn");}
	});

	$(document).on("click",".quest-bl .q-head,.cat-filter .filt-head,.cat-qw .qw-head",function(){
		$(this).parent().toggleClass("open");
	});

	$(document).on("click",".modific-bl .modific-head",function(){
		if( $("body").hasClass("show-ibtn") == true )
		{
			$("div.i-btn").removeClass("open");
			$("body").removeClass("show-ibtn");
		}
		var newBl = $(this).parent();
		if( $(newBl).hasClass("open") != true ){$(newBl).find(".modific-body").show(200);}
		else{$(newBl).find(".modific-body").hide(200);}
		$(newBl).toggleClass("open");
		return false;
	});

	$(document).on("click",".cat-vis span",function(){
		if( $(this).hasClass("active") != true )
		{
			var oldVal = $(this).parent().parent().find(".active").data("val");
			$("body").removeClass(oldVal);
			$(this).parent().parent().find(".active").removeClass("active");
			var newVal = $(this).data("val");
			$("body").toggleClass(newVal);
			$(this).toggleClass("active");
		}
		return false;
	});

	$(document).on("click",".quiz-sbmts .prev",function(){
		var swSlide = $(this).parent().parent().parent().parent();

		var slIndex = $(swSlide).index();

		var oldBl = $(this).parent();
		var result = 0;
		while(result == 0)
		{
			if($(oldBl).hasClass("quiz-show-bl") == true){result = 1;}
			if($(oldBl).hasClass("page-width") == true){result = 1;}
			if(result == 0)
			{oldBl = $(oldBl).parent();}
		}
		var blTop = $(oldBl).offset().top - 160;

		var qizBl = $(oldBl).find(".quiz-slider").eq(0);
		if( $(qizBl).hasClass("result") == true ){$(qizBl).removeClass("result");}

		if(slIndex == 0)
		{$(".quiz-show-bl.open").removeClass("open");$(".quiz-hide-bl.close").removeClass("close");}
		else
		{$(oldBl).find(".sw-quiz .swiper-button.prev").trigger("click");}

		jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop: blTop+"px"},350);
		return false;
	});
	$(document).on("click",".quiz-sbmts .next",function(){
		var oldBl = $(this).parent();
		var result = 0;
		while(result == 0)
		{
			if($(oldBl).hasClass("quiz-show-bl") == true){result = 1;}
			if($(oldBl).hasClass("page-width") == true){result = 1;}
			if(result == 0)
			{oldBl = $(oldBl).parent();}
		}
		var blTop = $(oldBl).offset().top - 160;

		var qizBl = $(oldBl).find(".quiz-slider").eq(0);
		if($(qizBl).find(".swiper-slide:last-child").hasClass("swiper-slide-active") == true || $(qizBl).find(".swiper-slide:last-child").hasClass("swiper-slide-next") == true)
		{
			if( $(qizBl).hasClass("result") != true ){$(qizBl).addClass("result");}
		}
		else
		{
			if( $(qizBl).hasClass("result") == true ){$(qizBl).removeClass("result");}
		}

		$(oldBl).find(".sw-quiz .swiper-button.next").trigger("click");

		jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop: blTop+"px"},350);
		return false;
	});

	$(document).on("click",".nav-more",function(){
		$(this).parent().find(".n-hide").removeClass("n-hide");
		$(this).remove();
		return false;
	});

	$(document).on("click",".foot-nav .nav-head",function(){
		$(this).parent().toggleClass("open");
		return false;
	});

	$(document).on("click",".btn-cat",function(){
		if( $("body").hasClass("show-category") != true )
		{
			var scroll = $(window).scrollTop();
			$('.header-wrap').css('z-index',1000);
			setTimeout(function (){
				$("body").addClass("show-category");
				$("body").attr("data-scroll", scroll);
				var windH = $(window).outerHeight();
				var headH = $(".site-header").outerHeight();
				$(".catalog-nav-wrap .cat-nav-row").css("min-height",(windH-headH)+"px");
				$(".catalog-nav-wrap").show(0);
			},300)

		}
		else
		{
			$("body").removeClass("show-category");
			$('.header-wrap').css('z-index',100);
			$(".catalog-nav-wrap").hide(10,function(){
				$(".catalog-nav-wrap").removeClass("show-sub");
				$(".catalog-nav-wrap .have-sub.open").removeClass("open");
				$(".catalog-nav-wrap .cat-sbm.active").removeClass("active");
				$(".catalog-nav-wrap .nav-tab").hide(0);
			});
		}
		return false;
	});

	$(document).on("click",".nav-main .have-sub .sub_open",function(){
		if( $(this).parents('.have-sub').hasClass("open") != true )
		{
			$(".nav-main .open").removeClass("open");
			$(this).parents('.have-sub').toggleClass("open");
		}
		else
		{
			$(".nav-main .open").removeClass("open");
		}
		return false;
	});
	$(document).on("mouseenter",".nav-main .cat-sbm",function(){
		if( $(this).hasClass("active") != true )
		{
			$(".nav-sub-col .nav-tab").hide(0);
			$(".nav-main .active").removeClass("active");
			$(this).addClass("active");

			var newTab = "#" + $(this).data("val");
			if($(newTab).find(".col").length > 0){
				if( $(".catalog-nav-wrap").hasClass("show-sub") != true )
				{$(".catalog-nav-wrap").addClass("show-sub");}
				$(newTab).show(0);
			}
			else{
				if( $(".catalog-nav-wrap").hasClass("show-sub") == true )
				{$(".catalog-nav-wrap").removeClass("show-sub");}
			}
		}
	});
	$(document).on("click","body.show-category .popups-bg",function(){
		$(".btn-cat").trigger("click");
	});
	$(document).on("click","body.show-category .nav-sub-col",function(){
		if( $(".catalog-nav-wrap").hasClass("show-sub") != true )
		{$(".btn-cat").trigger("click");}
	});

	// $(document).on("keyup",".wind-search .search-form input[type='text']",function(){
	// 	var lenMax = $(this).val().length;
	// 	if(lenMax > 0 && $(".search-result").css("display") == "none" )
	// 	{$(".search-result").show(200);}
	// 	if(lenMax <= 0)
	// 	{$(".search-result").hide(200);}
	// });

	$(document).on("click",".s-wind-btn",function(){
		var valScr = $(window).scrollTop();
		$("body").attr("data-scroll", valScr);
		$("body").toggleClass("show-wsearch");

		// $( "#search" ).animate({
		// 	margin: 0
		// }, 300, function() {
		// 	$('.search-result').slideDown('fast');
		// });

		$('.search-result').slideDown('300');

		$('#search input[name=\'search\']').val('').focus();
	});
	$(document).on("click",".wind-close",function(){
		$(".wind-search .search-form input[type='text']").val("");
		// $(".search-result").hide(0);
		$("body").removeClass("show-wsearch");
		var valScr = parseInt($("body").attr("data-scroll"))+"px";
		// $('#search').animate( { margin: '0 0 0 50%' } , { duration: 0, })
		$('.search-result').slideUp('fast');
		jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop: valScr},0);
	});

	$(document).on("click","body",function(){

		if( $("body").hasClass("show-ibtn") == true )
		{
			$("div.i-btn").removeClass("open");
			$("body").removeClass("show-ibtn");
		}
	});

		$('#search input[name=\'search\']').parent().find('[type="button"]').on('click', function() {

				var url = $('base').attr('href') + 'index.php?route=product/search';

				var value = $('#search input[name=\'search\']').val();

				if (value) {
						url += '&search=' + encodeURIComponent(value)+'&description=true';
				}

				location = url;
		});

		$('#search input[name=\'search\']').on('keydown', function(e) {
				if (e.keyCode == 13) {
						$('#search input[name=\'search\']').parent().find('[type="button"]').trigger('click');
				}
		});

	$(document).on("click",".quiz-btn",function(){
		var newBl = $(this).attr("href");
		var oldBl = $(this).parent();
		var result = 0;
		while(result == 0)
		{
			if($(oldBl).hasClass("quiz-hide-bl") == true){result = 1;}
			if($(oldBl).hasClass("page-width") == true){result = 1;}
			if(result == 0)
			{oldBl = $(oldBl).parent();}
		}
		if($(oldBl).hasClass("close") != true)
		{$(oldBl).addClass("close");}
		// remove()
		if($(newBl).hasClass("open") != true)
		{$(newBl).addClass("open");}

		var blTop = $(newBl).offset().top - 160;
		jQuery("html:not(:animated),body:not(:animated)").animate({scrollTop: blTop},800);
		return false;
	});

	$(document).on("click",".w-btn",function(){

		if( $("body").hasClass("show-category") == true ){$(".btn-cat").trigger("click");}
		var wScr = $(window).scrollTop();
		var posY = $(this).offset().top + $(this).outerHeight() + 8 - wScr;if(posY < 0){posY = 0;}
		var posX = $(".head-sub-bl").offset().left;
		var posBtn = $(window).width() - ($(this).offset().left + $(this).outerWidth());
		var newBl = $(this).attr("href");
        let onsubmit = this.dataset.onsubmit;

		// console.log($(window).width());
		// console.log($(this).offset().left + 285);

		if((posBtn > posX && ($(window).width() >= (285 + parseInt(posBtn)))) || ($(window).width() <= $(this).offset().left + 285)){posX = posBtn;}
		else{
			posX = $(window).width() -  $(this).offset().left - 285;
		}

		if(!newBl){newBl = $(".w-btn").eq(0).attr("href");}
		$(newBl).css("right", posX);

		var btnStyle = "top:"+$(this).offset().top+"px;left:"+$(this).offset().left+"px;width:"+$(this).outerWidth()+"px;height:"+$(this).outerHeight()+"px;font-size:"+$(this).css("font-size")+";font-weight:"+$(this).css("font-weight")+";letter-spacing:"+$(this).css("letter-spacing")+";border-radius:"+$(this).css("border-radius")+";";
		var btnVal = $(this).html();
        let newBtnClass = 'js-btn';
        if(this.classList.contains('green-btn')) newBtnClass += ' green-btn';
		var newBtn = '<span class="'+newBtnClass+'" style="'+btnStyle+'">'+btnVal+'</span>';

		if( $(newBl).hasClass("show") != true ){
			if( $("body").find(".js-btn-bl").length > 0 ){}
			else{$("body").prepend("<div class='js-btn-bl' style='display:block;'></div>");}
			$("body").find(".js-btn-bl").html(newBtn);
			$(newBl).addClass("show");
		}

		if( $("body").hasClass("show-w-popup") != true ){$(this).addClass("show");$("body").addClass("show-w-popup");}
		else {$(this).removeClass("show");$("body").removeClass("show-w-popup");}

		var windH = $(newBl).outerHeight();
		var windHtop = $(this).offset().top - wScr - 10 - windH;
		if(windHtop > 0){posY = windHtop;}
		$(newBl).css("top", posY);
		console.log($(newBl+' form'));
        $(newBl+' form').attr('onsubmit', onsubmit);
		return false;
	});
	$(document).on("click",".w-popup .btn-close",function(){
		$("body").removeClass("show-w-popup");
		$("body").removeClass("show-m-popup");
		$(".w-popup.show").removeClass("show");
		$(".js-btn-bl").html("");
		$(".w-btn").removeClass("show");
	});
	$(document).on("click",".mob-w-btn",function(){
		if( $("body").hasClass("show-m-popup") != true ){$("body").addClass("show-m-popup");}
		else {$("body").removeClass("show-m-popup");}
		return false;
	});
	$(document).on("mouseenter",".w-popup.show",function(){
		if( $(this).hasClass("onhover") != true )
		{$(this).addClass("onhover");}
	});
	$(document).on("mouseleave",".w-popup.show",function(){
		if( $(this).hasClass("onhover") == true )
		{$(this).removeClass("onhover");}
	});
	$(document).on("click","body", function(){

		var wPopupLen = $(".w-popup.show").length;

		if(wPopupLen > 0){
			if( $(".w-popup.show").eq(0).hasClass("onhover") != true ){
				$(".w-popup.show").eq(0).find(".btn-close").trigger("click");
			}
		}
	});


});
$(window).resize(function(){
	upInit();
	tblRow();
	//Popups
	var popupsLen = $(".popup-bl.show").length;for(var i=0;i<popupsLen;i++){popupsInit($(".popup-bl").eq(i));}

	if( $("body").hasClass("show-w-popup") == true ){
		var posX = $(".head-sub-bl").offset().left;
		$(".w-popup").css("right", posX);

		var newBtn = $(".w-btn.show").eq(0);
			var btnTop = $(newBtn).offset().top;
			var btnLeft = $(newBtn).offset().left;
			var btnW = $(newBtn).outerWidth();
			var btnH = $(newBtn).outerHeight();
			var btnFont = $(newBtn).css("font-size");
			$(".js-btn").css("top", btnTop+"px");
			$(".js-btn").css("left", btnLeft+"px");
			$(".js-btn").css("width", btnW+"px");
			$(".js-btn").css("height", btnH+"px");
			$(".js-btn").css("font-size", btnFont);
			$(".js-btn").css("opacity", "1");
	}
});
$(window).load(function(){
	//Popups
	var popupsLen = $(".popup-bl.show").length;for(var i=0;i<popupsLen;i++){popupsInit($(".popup-bl").eq(i));}
});
$(window).scroll(function(){
	upInit();
	if( $("body").hasClass("show-w-popup") == true ){
		var newBtn = $(".w-btn.show").eq(0);
		var newBl = $(".w-popup.show").eq(0);
		var wScr = $(window).scrollTop();
		var posY = $(newBtn).offset().top + $(newBtn).outerHeight() + 8 - wScr;if(posY < 0){posY = 0;}

		var windH = $(newBl).outerHeight();
		var windHtop = $(newBtn).offset().top - wScr - 10 - windH;
		if(windHtop > 0){posY = windHtop;}
		$(newBl).css("top", posY);

		if( $(newBtn).parent().parent().parent().parent().hasClass("head-sub-bl") == true )
		{
			$(".js-btn").css("opacity", "0");
			setTimeout(function(){
				var btnTop = $(newBtn).offset().top;
				var btnLeft = $(newBtn).offset().left;
				$(".js-btn").css("top", btnTop+"px");
				$(".js-btn").css("left", btnLeft+"px");
				$(".js-btn").css("opacity", "1");
			}, 250);
		}
	}
});
$(document).on("keyup",function(e){if( e.key == 'Escape'){$(".popup-bl.show .close").trigger("click");}});


$(document).ready(windowResize_handler);
$(window).resize(windowResize_handler);

function windowResize_handler() {
    var headH = $(".header-wrap").outerHeight();
    $(".page-width").css("padding-top",headH+"px");

    var newScr = $(window).scrollTop();if(newScr == 0 ) {$(".header-wrap").removeClass("scr");$(".header-wrap").removeClass("scr-on");$(".header-wrap").removeClass("scr-top");}
}

$(window).scroll(function(){
	var oldScr = $("body").data("scroll");if(oldScr > 0){}else{oldScr = 0;}
	var newScr = $(window).scrollTop();
	if( $("body").hasClass("show-category") != true ){$("body").data("scroll", newScr);}
	if(newScr > $(".header-wrap").outerHeight()){
		$(".header-wrap").addClass("scr-fix");
	}else{
		$(".header-wrap").removeClass("scr-fix");
	}
	if(newScr > $(".header-wrap").outerHeight()*1){ //before 3
        if( $(".header-wrap").hasClass("scr") != true )
        {
        	$(".header-wrap").addClass("scr");
        	setTimeout(function(){
        		if( $(".header-wrap").hasClass("scr-on") != true )
        		{$(".header-wrap").addClass("scr-on");}
        	},5);
    	}
	}
	else {
		if( $(".header-wrap").hasClass("scr-top") != true ) {
			$(".header-wrap").removeClass("scr");
			$(".header-wrap").removeClass("scr-on");
		}
	}
    if(newScr <= oldScr){
        if( $(".header-wrap").hasClass("scr-top") != true )
        {$(".header-wrap").addClass("scr-top");}
    }
    else {
    	$(".header-wrap").removeClass("scr-top");
    }

    if(newScr == 0 ) {$(".header-wrap").removeClass("scr");$(".header-wrap").removeClass("scr-on");$(".header-wrap").removeClass("scr-top");}

    windowResize_handler();
});

if (window.matchMedia("(max-width: 720px)").matches) {
	function jivo_onLoadCallback(){
		// console.log('jivo_onLoadCallback')
		let count = window.jivo_api.getUnreadMessagesCount();
		if(count > 0){
			document.getElementById('jivo__counter').innerHTML = count;
			document.getElementById('jivo_custom_widget').classList.add('mobile-toolbar__item_active');
		}
	}
	
	function jivo_onMessageReceived(){
		document.getElementById('jivo__counter').innerHTML = window.jivo_api.getUnreadMessagesCount();
		document.getElementById('jivo_custom_widget').classList.add('mobile-toolbar__item_active');
	}
	
	function jivo_onClose(){
		document.getElementById('jivo__counter').innerHTML = 0;
		document.getElementById('jivo_custom_widget').classList.remove('mobile-toolbar__item_active');
	}
} 

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzY3JpcHRzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIHBvcHVwc0luaXQobmV3UG9wdXApe1xyXG5cdCQoXCIucGFnZS13aWR0aFwiKS5jc3MoXCJtaW4taGVpZ2h0XCIsXCIxMDAlXCIpO1xyXG5cdHZhciBib2R5SCA9ICQod2luZG93KS5vdXRlckhlaWdodCgpO1xyXG5cdHZhciBwYWdlSCA9ICQoXCIucGFnZS13aWR0aFwiKS5vdXRlckhlaWdodCgpO2lmKHBhZ2VIIDwgYm9keUgpIHtwYWdlSCA9IGJvZHlIO31cclxuXHR2YXIgc2Nyb2xsSCA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcclxuXHR2YXIgcG9wdXBIID0gJChuZXdQb3B1cCkub3V0ZXJIZWlnaHQoKTtcclxuXHJcblx0aWYocGFnZUggPCBwb3B1cEgpXHJcblx0e1xyXG5cdFx0aWYoICQoXCJib2R5XCIpLmhhc0NsYXNzKFwic2hvdy1wb3B1cHMtcHJlbG9hZFwiKSA9PSB0cnVlIClcclxuXHRcdHskKFwiLnBhZ2Utd2lkdGhcIikuY3NzKFwibWluLWhlaWdodFwiLHBvcHVwSCszMCk7cGFnZUggPSBwb3B1cEgrMzA7fVxyXG5cdH1cclxuXHJcblx0dmFyIHBvcHVwVG9wID0gc2Nyb2xsSCArIDIwO1xyXG5cdGlmKCBwb3B1cEggPCBib2R5SCApe3BvcHVwVG9wID0gKGJvZHlILXBvcHVwSCkvMiArIHNjcm9sbEg7fVxyXG5cdGlmKCAocG9wdXBUb3ArcG9wdXBIKSA+IHBhZ2VIICl7cG9wdXBUb3AgPSBwYWdlSCAtIHBvcHVwSDt9XHJcblxyXG5cdGlmKCAkKG5ld1BvcHVwKS5oYXNDbGFzcyhcInNob3dcIikgIT0gdHJ1ZSApXHJcblx0eyQobmV3UG9wdXApLmNzcyhcInRvcFwiLCBwb3B1cFRvcCtcInB4XCIpO31cclxufVxyXG5mdW5jdGlvbiBtb2JJbml0KCl7XHJcblx0JChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi5tb2JpbGUtbmF2IC5zdWItYnRuLCAubW9iaWxlLW5hdi5jbGljay1idG4gLmhhdmUtc3ViIC5zdWJfb3BlblwiLCBmdW5jdGlvbigpe1xyXG5cdFx0aWYoICQodGhpcykucGFyZW50KCkuaGFzQ2xhc3MoXCJvcGVuXCIpICE9IHRydWUgKVxyXG5cdFx0eyQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZChcIi5zdWItbmF2XCIpLmVxKDApLnNob3coMjAwKTt9XHJcblx0XHRlbHNlXHJcblx0XHR7JCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKFwiLnN1Yi1uYXZcIikuZXEoMCkuaGlkZSgyMDApO31cclxuXHRcdCQodGhpcykucGFyZW50KCkudG9nZ2xlQ2xhc3MoXCJvcGVuXCIpO1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH0pO1xyXG5cdCQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIubW9iaWxlLXNibSwgLmNhdGFsb2ctbW9iaWxlX19jbG9zZSwgLm1vYmlsZS10b29sYmFyX19pdGVtX2NhdGFvZ1wiLCBmdW5jdGlvbigpe1xyXG5cdFx0JCgnLm1vYmlsZS10b29sYmFyX19pdGVtX2NhdGFvZycpLnRvZ2dsZUNsYXNzKCdtb2JpbGUtdG9vbGJhcl9faXRlbV9hY3RpdmUnKTtcclxuXHRcdFxyXG5cdFx0aWYoICQoXCJib2R5XCIpLmhhc0NsYXNzKFwic2hvdy1jYXRlZ29yeVwiKSAhPSB0cnVlIClcclxuXHRcdHtcclxuXHRcdFx0JChcImJvZHlcIikuYWRkQ2xhc3MoXCJzaG93LWNhdGVnb3J5XCIpO1xyXG5cdFx0XHRqUXVlcnkoXCJodG1sOm5vdCg6YW5pbWF0ZWQpLGJvZHk6bm90KDphbmltYXRlZClcIikuYW5pbWF0ZSh7c2Nyb2xsVG9wOiAwfSwwKTtcclxuXHRcdFx0JChcIi5jYXRhbG9nLW5hdi13cmFwXCIpLnNob3coMCk7XHJcblx0XHR9XHJcblx0XHRlbHNlXHJcblx0XHR7XHJcblx0XHRcdCQoXCJib2R5XCIpLnJlbW92ZUNsYXNzKFwic2hvdy1jYXRlZ29yeVwiKTtcclxuXHRcdFx0JChcIi5jYXRhbG9nLW5hdi13cmFwXCIpLmhpZGUoMCk7XHJcblx0XHRcdHZhciBvbGRTY3IgPSAkKFwiYm9keVwiKS5kYXRhKFwic2Nyb2xsXCIpO2lmKG9sZFNjciA+IDApe31lbHNle29sZFNjciA9IDA7fVxyXG5cdFx0XHRqUXVlcnkoXCJodG1sOm5vdCg6YW5pbWF0ZWQpLGJvZHk6bm90KDphbmltYXRlZClcIikuYW5pbWF0ZSh7c2Nyb2xsVG9wOiBvbGRTY3J9LDApO1xyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH0pO1xyXG59XHJcbmZ1bmN0aW9uIHVwSW5pdCgpe1xyXG5cdHZhciBib2R5SCA9ICQod2luZG93KS5vdXRlckhlaWdodCgpO1xyXG5cdHZhciBzY3JvbGwgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XHJcblx0aWYoc2Nyb2xsID4gYm9keUggJiYgJChcImJvZHlcIikuaGFzQ2xhc3MoXCJzaG93LXVwXCIpICE9IHRydWUpXHJcblx0eyQoXCJib2R5XCIpLnRvZ2dsZUNsYXNzKFwic2hvdy11cFwiKTt9XHJcblx0aWYoc2Nyb2xsIDwgYm9keUggJiYgJChcImJvZHlcIikuaGFzQ2xhc3MoXCJzaG93LXVwXCIpID09IHRydWUpXHJcblx0eyQoXCJib2R5XCIpLnJlbW92ZUNsYXNzKFwic2hvdy11cFwiKTt9XHJcbn1cclxuZnVuY3Rpb24gYWJjMihuKSB7XHJcblx0biArPSBcIlwiO1xyXG5cdG4gPSBuZXcgQXJyYXkoNCAtIG4ubGVuZ3RoICUgMykuam9pbihcIlVcIikgKyBuO1xyXG5cdHJldHVybiBuLnJlcGxhY2UoLyhbMC05VV17M30pL2csIFwiJDEgXCIpLnJlcGxhY2UoL1UvZywgXCJcIik7XHJcbn0vKiAxIDAwMCAwMDAgKi9cclxuZnVuY3Rpb24gdGFic1Jvdygpe1xyXG5cdHZhciB0YWJzTGVuID0gJChcIi50YWJzLXJvd1wiKS5sZW5ndGg7XHJcblx0Zm9yKHZhciBpPTA7aTx0YWJzTGVuO2krKylcclxuXHR7XHJcblx0XHR2YXIgdGFiUm93ID0gJChcIi50YWJzLXJvd1wiKS5lcShpKTtcclxuXHRcdHZhciBsaUxlbiA9ICQodGFiUm93KS5maW5kKFwibGlcIikubGVuZ3RoO1xyXG5cdFx0JCh0YWJSb3cpLmZpbmQoXCIubGluZVwiKS5jc3MoXCJ3aWR0aFwiLCAoMTAwL2xpTGVuKStcIiVcIik7XHJcblxyXG5cdFx0dmFyIGxpTGVuID0gJCh0YWJSb3cpLmZpbmQoXCJsaVwiKS5sZW5ndGg7XHJcblx0XHR2YXIgdGFiSW5kID0gJCh0YWJSb3cpLmZpbmQoXCIuYWN0aXZlXCIpLmluZGV4KCk7XHJcblx0XHR2YXIgc3RlcCA9ICgxMDAvbGlMZW4pKnRhYkluZCtcIiVcIjtcclxuXHRcdCQodGFiUm93KS5maW5kKFwiLmxpbmVcIikuY3NzKFwibGVmdFwiLCBzdGVwKTtcclxuXHR9XHJcbn1cclxuZnVuY3Rpb24gYXVkaW9QbCgpe1xyXG5cdC8qINCf0LDRg9C30LAsINCy0YvQutC70Y7Rh9C10L3QuNC1INC30LLRg9C60LAg0Lgg0YHQtNCy0LjQsyDQv9C+0LvQt9GD0L3QutCwIHRpbWVsaW5lICovXHJcblx0JChkb2N1bWVudCkub24oJ2NsaWNrJywnLmF1ZGlvLWJsIC5hdWRpby1idG4nLCBmdW5jdGlvbiAoKSB7XHJcblx0XHQvLyDQnNC10L3Rj9C10Lwg0LjQutC+0L3QutGDXHJcblx0XHRnbHlwaGljb24gPSAkKHRoaXMpLmZpbmQoJy5nbHlwaGljb24nKTtcclxuXHRcdHRvZ2dsZUNsYXNzID0gZ2x5cGhpY29uLmRhdGEoJ3RvZ2dsZS1jbGFzcycpO1xyXG5cdFx0Z2x5cGhpY29uLmRhdGEoJ3RvZ2dsZS1jbGFzcycsIGdseXBoaWNvbi5hdHRyKCdjbGFzcycpKS5yZW1vdmVDbGFzcygpLmFkZENsYXNzKHRvZ2dsZUNsYXNzKTtcclxuXHJcblx0XHRhdWRpbyA9ICQodGhpcykuY2xvc2VzdCgnLmF1ZGlvLWJsJykuZmluZCgnYXVkaW8nKTtcclxuXHRcdHRpbWVsaW5lID0gYXVkaW8uY2xvc2VzdCgnLmF1ZGlvLWJsJykuZmluZCgnLmF1ZGlvLWxpbmUnKTtcclxuXHJcblx0XHRyYXRlID0gYXVkaW8uY2xvc2VzdCgnLmF1ZGlvLWJsJykuZmluZCgnLmF1ZGlvLXJhdGUnKTtcclxuXHRcdGltYWdlID0gYXVkaW8uY2xvc2VzdCgnLmF1ZGlvLWJsX2NvbnRhaW5lcicpLmZpbmQoJy5hdWRpby1ibF9pbWcnKTtcclxuXHRcdHJhdGUudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cdFx0aW1hZ2UudG9nZ2xlQ2xhc3MoJ2FjdGl2ZScpO1xyXG5cclxuXHRcdGR1cmF0aW9uID0gYXVkaW8ucHJvcCgnZHVyYXRpb24nKTtcclxuXHRcdHdpZHRoID0gdGltZWxpbmUud2lkdGgoKTtcclxuXHJcblx0XHRpZiggJCh0aGlzKS5oYXNDbGFzcyhcIm9uXCIpICE9IHRydWUgKXskKHRoaXMpLmFkZENsYXNzKFwib25cIik7fVxyXG5cclxuXHRcdC8vINCh0YLQsNGA0YIv0L/QsNGD0LfQsCDQuCDQtNCy0LjQs9Cw0LXQvCDQv9C+0LvQt9GD0L3QvtC6XHJcblx0XHRpZihhdWRpby5wcm9wKCdwYXVzZWQnKSkge1xyXG5cdFx0XHRhdWRpby50cmlnZ2VyKCdwbGF5Jyk7XHJcblx0XHRcdGlmKCAkKHRoaXMpLmhhc0NsYXNzKFwib25cIikgIT0gdHJ1ZSApeyQodGhpcykuYWRkQ2xhc3MoXCJvblwiKTt9XHJcblx0XHRcdGlkSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0Y3VycmVudFRpbWUgPSBhdWRpby5wcm9wKCdjdXJyZW50VGltZScpO1xyXG5cdFx0XHRcdGxlZnQgPSB3aWR0aCpjdXJyZW50VGltZS9kdXJhdGlvbjtcclxuXHRcdFx0XHR0aW1lbGluZS5maW5kKCdzcGFuJykuY3NzKCd3aWR0aCcsIGxlZnQrJ3B4Jyk7XHJcblx0XHRcdFx0dmFyIGRhdGUgPSBuZXcgRGF0ZShjdXJyZW50VGltZSAqIDEwMDApO1xyXG5cdFx0XHRcdHZhciBkYXRlTWluID0gZGF0ZS5nZXRNaW51dGVzKCk7aWYoZGF0ZU1pbiA8IDEwKXtkYXRlTWluID0gXCIwXCIrZGF0ZU1pbjt9XHJcblx0XHRcdFx0dmFyIGRhdGVTZWMgPSBkYXRlLmdldFNlY29uZHMoKTtpZihkYXRlU2VjIDwgMTApe2RhdGVTZWMgPSBcIjBcIitkYXRlU2VjO31cclxuXHRcdFx0XHRhdWRpby5jbG9zZXN0KCcuYXVkaW8tYmwnKS5maW5kKFwiLmF1ZGlvLXRpbWVcIikuaHRtbChkYXRlTWluKyc6JytkYXRlU2VjKTtcclxuXHRcdFx0XHRpZiAoY3VycmVudFRpbWUgPT0gZHVyYXRpb24pIHtcclxuXHRcdFx0XHRcdCQoXCIuYXVkaW8tYnRuLm9uXCIpLnJlbW92ZUNsYXNzKFwib25cIik7XHJcblx0XHRcdFx0XHRyYXRlLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0XHRcdGltYWdlLnJlbW92ZUNsYXNzKCdhY3RpdmUnKTtcclxuXHRcdFx0XHRcdGNsZWFySW50ZXJ2YWwoaWRJbnRlcnZhbCk7XHJcblx0XHRcdFx0fVxyXG5cdFx0XHR9LCAyKTtcclxuXHRcdH0gZWxzZSB7XHJcblx0XHRcdGF1ZGlvLnRyaWdnZXIoJ3BhdXNlJyk7XHJcblx0XHRcdCQoXCIuYXVkaW8tYnRuLm9uXCIpLnJlbW92ZUNsYXNzKFwib25cIik7XHJcblx0XHRcdGNsZWFySW50ZXJ2YWwoaWRJbnRlcnZhbCk7XHJcblx0XHR9XHJcblxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH0pO1xyXG5cdC8qINCf0LXRgNC10LzQvtGC0LrQsCDRgtGA0LXQutCwINC/0L4g0LrQu9C40LrRgyDQvdCwIHRpbWVsaW5lICovXHJcblx0JChkb2N1bWVudCkub24oJ2NsaWNrJywnLmF1ZGlvLWJsIC5hdWRpby1saW5lJywgZnVuY3Rpb24gKGUpIHtcclxuXHRcdGF1ZGlvVGltZSA9ICQodGhpcykuY2xvc2VzdCgnLmF1ZGlvLWJsJykuZmluZCgnYXVkaW8nKTtcclxuXHRcdGR1cmF0aW9uID0gYXVkaW9UaW1lLnByb3AoJ2R1cmF0aW9uJyk7XHJcblx0XHRpZiAoZHVyYXRpb24gPiAwKSB7XHJcblx0XHRcdG9mZnNldCA9ICQodGhpcykub2Zmc2V0KCk7XHJcblx0XHRcdGxlZnQgPSBlLmNsaWVudFgtb2Zmc2V0LmxlZnQ7XHJcblx0XHRcdHdpZHRoID0gJCh0aGlzKS53aWR0aCgpO1xyXG5cdFx0XHQkKHRoaXMpLmZpbmQoJ3NwYW4nKS5jc3MoJ3dpZHRoJywgbGVmdCsncHgnKTtcclxuXHRcdFx0Y3VycmVudFRpbWUgPSBhdWRpby5wcm9wKCdjdXJyZW50VGltZScpO1xyXG5cdFx0XHRhdWRpb1RpbWUucHJvcCgnY3VycmVudFRpbWUnLCBkdXJhdGlvbipsZWZ0L3dpZHRoKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9KTtcclxuXHQkKGRvY3VtZW50KS5vbignY2xpY2snLCcuYXVkaW8tYmwgLmF1ZGlvLXJhdGUnLCBmdW5jdGlvbiAoZSkge1xyXG5cdFx0YXVkaW9UaW1lID0gJCh0aGlzKS5jbG9zZXN0KCcuYXVkaW8tYmwnKS5maW5kKCdhdWRpbycpO1xyXG5cdFx0bGV0IHJhdGUgPSBhdWRpb1RpbWVbMF0ucGxheWJhY2tSYXRlO1xyXG5cdFx0YXVkaW9UaW1lWzBdLnBsYXliYWNrUmF0ZSA9IHJhdGUgPCAyP3JhdGUrPTAuNTpyYXRlPTAuNTtcclxuXHRcdCQodGhpcykuY2xvc2VzdCgnLmF1ZGlvLWJsJykuZmluZCgnLmF1ZGlvLXJhdGUnKS50ZXh0KHJhdGUrJ3gnKTtcclxuXHR9KTtcclxuXHJcbn1cclxuZnVuY3Rpb24gdGJsUm93KCl7XHJcblx0dmFyIHRibExlbiA9ICQoXCIudGJsLXJvd1wiKS5sZW5ndGg7XHJcblx0Zm9yKHZhciBpPTA7aTx0YmxMZW47aSsrKVxyXG5cdHtcclxuXHRcdHZhciB0ckhlZCA9ICQoXCIudGJsLXJvd1wiKS5lcShpKS5maW5kKFwiLnRibCB0aGVhZCB0clwiKS5lcSgwKS5maW5kKCd0ZCcpLm91dGVySGVpZ2h0KCkgKyAxMDtcclxuXHRcdCQoXCIudGJsLXJvd1wiKS5lcShpKS5maW5kKFwiLnRibCB0aGVhZCB0clwiKS5lcSgwKS5vdXRlckhlaWdodCh0ckhlZCkuY3NzKHtcclxuXHRcdFx0J2Rpc3BsYXknOidmbGV4JyxcclxuXHRcdFx0J2FsaWduLWl0ZW1zJzonY2VudGVyJ1xyXG5cdFx0fSk7XHJcblx0XHQkKFwiLnRibC1yb3dcIikuZXEoaSkuZmluZChcIi50YmwgdGhlYWQgdHJcIikuZXEoMCkuZmluZCgndGQnKS5jc3Moe1xyXG5cdFx0XHQnZGlzcGxheSc6J2ZsZXgnLFxyXG5cdFx0XHQnYWxpZ24taXRlbXMnOidjZW50ZXInXHJcblx0XHR9KTtcclxuXHRcdHZhciB0ckxlbiA9ICQoXCIudGJsLXJvd1wiKS5lcShpKS5maW5kKFwiLnRibCB0Ym9keSB0clwiKS5sZW5ndGg7XHJcblx0XHR2YXIgYkxlbiA9ICQoXCIudGJsLXJvd1wiKS5lcShpKS5maW5kKFwiLnN3LXRibC1oZWFkXCIpLmxlbmd0aDtcclxuXHRcdGZvcih2YXIgaz0wO2s8YkxlbjtrKyspXHJcblx0XHR7JChcIi50Ymwtcm93XCIpLmVxKGkpLmZpbmQoXCIuc3ctdGJsLWhlYWRcIikuZXEoaykuY3NzKFwibWluLWhlaWdodFwiLHRySGVkK1wicHhcIik7fVxyXG5cdFx0dmFyIGJMZW4gPSAkKFwiLnRibC1yb3dcIikuZXEoaSkuZmluZChcIi5zdy10YmwtYm9keVwiKS5sZW5ndGg7XHJcblx0XHRmb3IodmFyIGo9MDtqPHRyTGVuO2orKylcclxuXHRcdHtcclxuXHRcdFx0dmFyIHRlbXAgPSAgJChcIi50Ymwtcm93XCIpLmVxKGkpLmZpbmQoXCIudGJsIHRib2R5IHRyXCIpLmVxKGopLm91dGVySGVpZ2h0KCk7XHJcblx0XHRcdGZvcih2YXIgaz0wO2s8YkxlbjtrKyspXHJcblx0XHRcdHskKFwiLnRibC1yb3dcIikuZXEoaSkuZmluZChcIi5zdy10YmwtYm9keVwiKS5lcShrKS5maW5kKFwiLnN3LXRyXCIpLmVxKGopLmNzcyhcIm1pbi1oZWlnaHRcIix0ZW1wK1wicHhcIik7fVxyXG5cdFx0fVxyXG5cdH1cclxufVxyXG4kKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpe1xyXG5cdG1vYkluaXQoKTtcclxuXHR1cEluaXQoKTtcclxuXHR0YWJzUm93KCk7XHJcblx0YXVkaW9QbCgpO1xyXG5cdHRibFJvdygpO1xyXG5cclxuXHQkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsIFwiLnRhYnMtcm93IGxpXCIsIGZ1bmN0aW9uKCl7XHJcblx0XHRpZiggJCh0aGlzKS5oYXNDbGFzcyhcImFjdGl2ZVwiKSAhPSB0cnVlIClcclxuXHRcdHtcclxuXHRcdFx0JCh0aGlzKS5wYXJlbnQoKS5maW5kKFwiLmFjdGl2ZVwiKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHRcdFx0JCh0aGlzKS50b2dnbGVDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHRcdFx0dmFyIGxpTGVuID0gJCh0aGlzKS5wYXJlbnQoKS5maW5kKFwibGlcIikubGVuZ3RoO1xyXG5cdFx0XHR2YXIgdGFiSW5kID0gJCh0aGlzKS5wYXJlbnQoKS5maW5kKFwiLmFjdGl2ZVwiKS5pbmRleCgpO1xyXG5cdFx0XHR2YXIgc3RlcCA9ICgxMDAvbGlMZW4pKnRhYkluZCtcIiVcIjtcclxuXHRcdFx0JCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKFwiLmxpbmVcIikuY3NzKFwibGVmdFwiLCBzdGVwKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHQkKGRvY3VtZW50KS5vbihcIm1vdXNlZW50ZXJcIiwgXCIudGFicy1yb3cgbGlcIiwgZnVuY3Rpb24oKXtcclxuXHRcdHZhciBsaUxlbiA9ICQodGhpcykucGFyZW50KCkuZmluZChcImxpXCIpLmxlbmd0aDtcclxuXHRcdHZhciB0YWJJbmQgPSAkKHRoaXMpLmluZGV4KCk7XHJcblx0XHR2YXIgc3RlcCA9ICgxMDAvbGlMZW4pKnRhYkluZCtcIiVcIjtcclxuXHRcdCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZChcIi5saW5lXCIpLmNzcyhcImxlZnRcIiwgc3RlcCk7XHJcblx0fSk7XHJcblx0JChkb2N1bWVudCkub24oXCJtb3VzZWxlYXZlXCIsIFwiLnRhYnMtcm93IGxpXCIsIGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgbGlMZW4gPSAkKHRoaXMpLnBhcmVudCgpLmZpbmQoXCJsaVwiKS5sZW5ndGg7XHJcblx0XHR2YXIgdGFiSW5kID0gJCh0aGlzKS5wYXJlbnQoKS5maW5kKFwiLmFjdGl2ZVwiKS5pbmRleCgpO1xyXG5cdFx0dmFyIHN0ZXAgPSAoMTAwL2xpTGVuKSp0YWJJbmQrXCIlXCI7XHJcblx0XHQkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoXCIubGluZVwiKS5jc3MoXCJsZWZ0XCIsIHN0ZXApO1xyXG5cdH0pO1xyXG5cdC8vUG9wdXBzXHJcblx0JChkb2N1bWVudCkub24oXCJjbGlja1wiLFwiLnBvcHVwLWxpbmtcIiwgZnVuY3Rpb24oKXtcclxuXHRcdHZhciBuZXdQb3B1cCA9ICQodGhpcykuYXR0cihcImhyZWZcIik7XHJcblx0XHRpZiggJChcImJvZHlcIikuaGFzQ2xhc3MoXCJzaG93LXBvcHVwcy1wcmVsb2FkXCIpICE9IHRydWUgKXskKFwiYm9keVwiKS50b2dnbGVDbGFzcyhcInNob3ctcG9wdXBzLXByZWxvYWRcIik7fVxyXG5cdFx0cG9wdXBzSW5pdCgkKG5ld1BvcHVwKSk7XHJcblx0XHRpZiggJChcImJvZHlcIikuaGFzQ2xhc3MoXCJzaG93LXBvcHVwc1wiKSAhPSB0cnVlICl7JChcImJvZHlcIikudG9nZ2xlQ2xhc3MoXCJzaG93LXBvcHVwc1wiKTtpZiggJChuZXdQb3B1cCkuaGFzQ2xhc3MoXCJzaG93XCIpICE9IHRydWUgKXskKG5ld1BvcHVwKS50b2dnbGVDbGFzcyhcInNob3dcIik7fX1cclxuXHRcdGVsc2V7JChcIi5wb3B1cC1ibFwiKS5yZW1vdmVDbGFzcyhcInNob3dcIik7JChuZXdQb3B1cCkudG9nZ2xlQ2xhc3MoXCJzaG93XCIpO31cclxuXHRcdCQoXCJib2R5XCIpLnJlbW92ZUNsYXNzKFwic2hvdy1wb3B1cHMtcHJlbG9hZFwiKTtcclxuXHRcdGlmKCAkKFwiYm9keVwiKS5oYXNDbGFzcyhcInNob3ctcG9wdXBzLWhpZGVcIikgIT0gdHJ1ZSApeyQoXCJib2R5XCIpLnRvZ2dsZUNsYXNzKFwic2hvdy1wb3B1cHMtaGlkZVwiKTt9XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fSk7XHJcblx0JChkb2N1bWVudCkub24oXCJjbGlja1wiLFwiLnByLXNtYWxsIC5tb2RpZmljLXNibVwiLGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgbmV3QmwgPSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLnBhcmVudCgpLnBhcmVudCgpLnBhcmVudCgpO1xyXG5cdFx0JChuZXdCbCkudG9nZ2xlQ2xhc3MoXCJmaXgtYWN0aXZlXCIpO1xyXG5cdFx0aWYoICQoXCJib2R5XCIpLmhhc0NsYXNzKFwic2hvdy1wb3B1cHNcIikgIT0gdHJ1ZSApeyQoXCJib2R5XCIpLnRvZ2dsZUNsYXNzKFwic2hvdy1wb3B1cHNcIik7fVxyXG5cdFx0aWYoICQoXCJib2R5XCIpLmhhc0NsYXNzKFwic2hvdy1wb3B1cHMtaGlkZVwiKSAhPSB0cnVlICl7JChcImJvZHlcIikudG9nZ2xlQ2xhc3MoXCJzaG93LXBvcHVwcy1oaWRlXCIpO31cclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9KTtcclxuXHQkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsXCIub3Blbi1saW5rXCIsIGZ1bmN0aW9uKCl7XHJcblx0XHRpZiggJChcImJvZHlcIikuaGFzQ2xhc3MoXCJmaWx0LWFjdGl2ZVwiKSAhPSB0cnVlICl7JChcImJvZHlcIikudG9nZ2xlQ2xhc3MoXCJmaWx0LWFjdGl2ZVwiKTt9XHJcblx0XHRpZiggJChcImJvZHlcIikuaGFzQ2xhc3MoXCJzaG93LXBvcHVwc1wiKSAhPSB0cnVlICl7JChcImJvZHlcIikudG9nZ2xlQ2xhc3MoXCJzaG93LXBvcHVwc1wiKTt9XHJcblx0XHRpZiggJChcImJvZHlcIikuaGFzQ2xhc3MoXCJzaG93LXBvcHVwcy1oaWRlXCIpICE9IHRydWUgKXskKFwiYm9keVwiKS50b2dnbGVDbGFzcyhcInNob3ctcG9wdXBzLWhpZGVcIik7fVxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH0pO1xyXG5cdFxyXG5cdCQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIixcIi5wb3B1cC1ibCAuY2xvc2UsLmNsb3NlLXBvcHVwXCIsIGZ1bmN0aW9uKCl7XHJcblx0XHQkKFwiLnBvcHVwLWJsXCIpLnJlbW92ZUNsYXNzKFwic2hvd1wiKTtcclxuXHRcdCQoXCJib2R5XCIpLnJlbW92ZUNsYXNzKFwiZmlsdC1hY3RpdmVcIik7XHJcblx0XHQkKFwiYm9keVwiKS5yZW1vdmVDbGFzcyhcInNlbGVjdC1hY3RpdmVcIik7XHJcblx0XHQkKFwiYm9keVwiKS5yZW1vdmVDbGFzcyhcInNob3ctcG9wdXBzXCIpO1xyXG5cdFx0JChcImJvZHlcIikucmVtb3ZlQ2xhc3MoXCJzaG93LXctcG9wdXBcIik7XHJcblx0XHQkKFwiYm9keSAuZml4LWFjdGl2ZVwiKS5yZW1vdmVDbGFzcyhcImZpeC1hY3RpdmVcIik7XHJcblx0XHQkKFwiYm9keVwiKS5yZW1vdmVDbGFzcyhcInNob3ctcG9wdXBzLWhpZGVcIik7XHJcblx0XHQkKFwiLnBhZ2Utd2lkdGhcIikuY3NzKFwibWluLWhlaWdodFwiLFwiMTAwJVwiKTtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9KTtcclxuXHQkKGRvY3VtZW50KS5vbihcIm1vdXNlZW50ZXJcIiwgXCIucG9wdXAtYmwsLmZpeC1hY3RpdmUgLm1vZGlmaWMtYmxcIiwgZnVuY3Rpb24gKGUpe1xyXG5cdFx0aWYoICQoXCJib2R5XCIpLmhhc0NsYXNzKFwic2hvdy1wb3B1cHMtaGlkZVwiKSA9PSB0cnVlICl7JChcImJvZHlcIikucmVtb3ZlQ2xhc3MoXCJzaG93LXBvcHVwcy1oaWRlXCIpO31cclxuXHR9KTtcclxuXHQkKGRvY3VtZW50KS5vbihcIm1vdXNlbGVhdmVcIiwgXCIucG9wdXAtYmwsLmZpeC1hY3RpdmUgLm1vZGlmaWMtYmxcIiwgZnVuY3Rpb24gKGUpe1xyXG5cdFx0aWYoICQoXCJib2R5XCIpLmhhc0NsYXNzKFwic2hvdy1wb3B1cHMtaGlkZVwiKSAhPSB0cnVlICl7JChcImJvZHlcIikudG9nZ2xlQ2xhc3MoXCJzaG93LXBvcHVwcy1oaWRlXCIpO31cclxuXHR9KTtcclxuXHQkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsXCJib2R5XCIsIGZ1bmN0aW9uKCl7XHJcblxyXG5cdFx0JChcIi5zaG93LXBvcHVwcy1oaWRlIC5wb3B1cC1ibC5zaG93XCIpLnJlbW92ZUNsYXNzKFwic2hvd1wiKTtcclxuXHRcdCQoXCIuc2hvdy1wb3B1cHMtaGlkZSAucGFnZS13aWR0aFwiKS5jc3MoXCJtaW4taGVpZ2h0XCIsXCIxMDAlXCIpO1xyXG5cdFx0JChcIi5zaG93LXBvcHVwcy1oaWRlXCIpLnJlbW92ZUNsYXNzKFwic2hvdy1wb3B1cHNcIik7XHJcblx0XHQkKFwiLnNob3ctcG9wdXBzLWhpZGUgLmZpeC1hY3RpdmVcIikucmVtb3ZlQ2xhc3MoXCJmaXgtYWN0aXZlXCIpO1xyXG5cdFx0JChcIi5zaG93LXBvcHVwcy1oaWRlXCIpLnJlbW92ZUNsYXNzKFwic2hvdy1wb3B1cHMtaGlkZVwiKTtcclxuXHR9KTtcclxuXHJcblx0JChkb2N1bWVudCkub24oXCJjbGlja1wiLFwiLnNlbGVjdC1ibCAudGl0bGVcIiwgZnVuY3Rpb24oKXtcclxuXHRcdHZhciBuZXdTZWwgPSAkKHRoaXMpLnBhcmVudCgpO3ZhciB0ZW1wID0gJChcImJvZHlcIikub3V0ZXJXaWR0aCgpO1xyXG5cdFx0aWYoICQobmV3U2VsKS5oYXNDbGFzcyhcIm9wZW5cIikgIT0gdHJ1ZSApeyQobmV3U2VsKS5maW5kKFwidWxcIikuZmFkZUluKDE1MCk7JChuZXdTZWwpLnRvZ2dsZUNsYXNzKFwib3BlblwiKTt9XHJcblx0XHRlbHNleyQobmV3U2VsKS5maW5kKFwidWxcIikuZmFkZU91dCgxNTApOyQobmV3U2VsKS5yZW1vdmVDbGFzcyhcIm9wZW5cIik7fVxyXG5cclxuXHRcdGlmKCAkKFwiYm9keVwiKS5oYXNDbGFzcyhcInNlbGVjdC1hY3RpdmVcIikgIT0gdHJ1ZSApeyQoXCJib2R5XCIpLnRvZ2dsZUNsYXNzKFwic2VsZWN0LWFjdGl2ZVwiKTt9XHJcblx0XHRpZiggJChcImJvZHlcIikuaGFzQ2xhc3MoXCJzaG93LXBvcHVwc1wiKSAhPSB0cnVlICYmIHRlbXAgPCA3MjAgKXskKFwiYm9keVwiKS50b2dnbGVDbGFzcyhcInNob3ctcG9wdXBzXCIpO31cclxuXHRcdGlmKCAkKFwiYm9keVwiKS5oYXNDbGFzcyhcInNob3ctcG9wdXBzLWhpZGVcIikgIT0gdHJ1ZSAmJiB0ZW1wIDwgNzIwICl7JChcImJvZHlcIikudG9nZ2xlQ2xhc3MoXCJzaG93LXBvcHVwcy1oaWRlXCIpO31cclxuXHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fSk7XHJcblx0JChkb2N1bWVudCkub24oXCJtb3VzZWVudGVyXCIsXCIuc2VsZWN0LWJsIC50aXRsZVwiLCBmdW5jdGlvbigpe1xyXG5cdFx0dmFyIG5ld1NlbCA9ICQodGhpcykucGFyZW50KCk7dmFyIHRlbXAgPSAkKFwiYm9keVwiKS5vdXRlcldpZHRoKCk7XHJcblx0XHRpZiggJChuZXdTZWwpLmhhc0NsYXNzKFwib3BlblwiKSAhPSB0cnVlICYmIHRlbXAgPiA3MjAgKXtcclxuXHRcdFx0aWYoICQobmV3U2VsKS5oYXNDbGFzcyhcIm9wZW5cIikgIT0gdHJ1ZSApeyQobmV3U2VsKS5maW5kKFwidWxcIikuZmFkZUluKDE1MCk7JChuZXdTZWwpLnRvZ2dsZUNsYXNzKFwib3BlblwiKTt9XHJcblx0XHRcdGVsc2V7JChuZXdTZWwpLmZpbmQoXCJ1bFwiKS5mYWRlT3V0KDE1MCk7JChuZXdTZWwpLnJlbW92ZUNsYXNzKFwib3BlblwiKTt9XHJcblxyXG5cdFx0XHRpZiggJChcImJvZHlcIikuaGFzQ2xhc3MoXCJzZWxlY3QtYWN0aXZlXCIpICE9IHRydWUgKXskKFwiYm9keVwiKS50b2dnbGVDbGFzcyhcInNlbGVjdC1hY3RpdmVcIik7fVxyXG5cdFx0XHRpZiggJChcImJvZHlcIikuaGFzQ2xhc3MoXCJzaG93LXBvcHVwc1wiKSAhPSB0cnVlICYmIHRlbXAgPCA3MjAgKXskKFwiYm9keVwiKS50b2dnbGVDbGFzcyhcInNob3ctcG9wdXBzXCIpO31cclxuXHRcdFx0aWYoICQoXCJib2R5XCIpLmhhc0NsYXNzKFwic2hvdy1wb3B1cHMtaGlkZVwiKSAhPSB0cnVlICYmIHRlbXAgPCA3MjAgKXskKFwiYm9keVwiKS50b2dnbGVDbGFzcyhcInNob3ctcG9wdXBzLWhpZGVcIik7fVxyXG5cdFx0fVxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH0pO1xyXG5cdCQoZG9jdW1lbnQpLm9uKFwibW91c2VsZWF2ZVwiLFwiLnNlbGVjdC1ibFwiLCBmdW5jdGlvbigpe1xyXG5cdFx0dmFyIG5ld1NlbCA9ICQodGhpcyk7dmFyIHRlbXAgPSAkKFwiYm9keVwiKS5vdXRlcldpZHRoKCk7XHJcblx0XHRpZiggJChuZXdTZWwpLmhhc0NsYXNzKFwib3BlblwiKSA9PSB0cnVlICYmIHRlbXAgPiA3MjAgKXtcclxuXHRcdFx0JChuZXdTZWwpLmZpbmQoXCJ1bFwiKS5mYWRlT3V0KDE1MCk7JChuZXdTZWwpLnJlbW92ZUNsYXNzKFwib3BlblwiKTtcclxuXHJcblx0XHRcdGlmKCAkKFwiYm9keVwiKS5oYXNDbGFzcyhcInNlbGVjdC1hY3RpdmVcIikgPT0gdHJ1ZSApeyQoXCJib2R5XCIpLnJlbW92ZUNsYXNzKFwic2VsZWN0LWFjdGl2ZVwiKTt9XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fSk7XHJcblx0JChkb2N1bWVudCkub24oXCJjbGlja1wiLFwiLnNlbGVjdC1ibCBsaSBzcGFuXCIsIGZ1bmN0aW9uKCl7XHJcblx0XHR2YXIgbmV3U2VsID0gJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5wYXJlbnQoKTtcclxuXHRcdHZhciBuZXdWYWwgPSAkKHRoaXMpLmh0bWwoKTtcclxuXHRcdCQobmV3U2VsKS5maW5kKFwiLnRpdGxlIHNwYW5cIikuaHRtbChuZXdWYWwpO1xyXG5cdFx0JChuZXdTZWwpLmZpbmQoXCJ1bCAuYWN0aXZlXCIpLnJlbW92ZUNsYXNzKFwiYWN0aXZlXCIpO1xyXG5cdFx0JCh0aGlzKS5wYXJlbnQoKS50b2dnbGVDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHRcdCQobmV3U2VsKS5maW5kKFwidWxcIikuaGlkZSgyMDApO1xyXG5cdFx0JChuZXdTZWwpLnJlbW92ZUNsYXNzKFwib3BlblwiKTtcclxuXHRcdGlmKCAkKFwiYm9keVwiKS5oYXNDbGFzcyhcInNlbGVjdC1hY3RpdmVcIikgPT0gdHJ1ZSApeyQoXCJib2R5XCIpLnJlbW92ZUNsYXNzKFwic2VsZWN0LWFjdGl2ZVwiKTt9XHJcblx0fSk7XHJcblx0JChkb2N1bWVudCkubW91c2V1cChmdW5jdGlvbiAoZSl7XHJcblx0XHR2YXIgZGl2ID0gJChcIi5zZWxlY3QtYmwub3BlblwiKS5lcSgwKTtcclxuXHRcdGlmICghZGl2LmlzKGUudGFyZ2V0KSAmJiBkaXYuaGFzKGUudGFyZ2V0KS5sZW5ndGggPT09IDApIHtcclxuXHRcdFx0JChcIi5zZWxlY3QtYmwub3BlbiB1bFwiKS5oaWRlKDIwMCk7XHJcblx0XHRcdGlmKCQoXCIuc2VsZWN0LWJsLm9wZW5cIikubGVuZ3RoID4gMCl7JChcIi5jbG9zZS1wb3B1cFwiKS5lcSgwKS50cmlnZ2VyKFwiY2xpY2tcIik7fVxyXG5cdFx0XHQkKFwiLnNlbGVjdC1ibC5vcGVuXCIpLnJlbW92ZUNsYXNzKFwib3BlblwiKTtcclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblx0JChkb2N1bWVudCkub24oXCJjbGlja1wiLFwiLnRhYi1saW5rXCIsZnVuY3Rpb24oKXtcclxuXHRcdHZhciBuZXdCbCA9ICQodGhpcykuYXR0cihcImhyZWZcIik7XHJcblx0XHR2YXIgb2xkQmwgPSBcIiNcIiskKFwiLnRhYi1ibC5vcGVuXCIpLmVxKDApLmF0dHIoXCJpZFwiKTtcclxuXHJcblx0XHR2YXIgb2xkQWN0aXZlID0gXCJhW2hyZWY9J1wiK29sZEJsK1wiJ11cIjtcclxuXHRcdCQob2xkQWN0aXZlKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHRcdCQob2xkQmwpLnJlbW92ZUNsYXNzKFwib3BlblwiKTtcclxuXHJcblx0XHR2YXIgbmV3QWN0aXZlID0gXCJhW2hyZWY9J1wiK25ld0JsK1wiJ11cIjtcclxuXHRcdCQobmV3QWN0aXZlKS50b2dnbGVDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHRcdCQobmV3QmwpLnRvZ2dsZUNsYXNzKFwib3BlblwiKTtcclxuXHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fSk7XHJcblx0JChkb2N1bWVudCkub24oXCJjbGlja1wiLFwiLnRhYnMtbmF2IGFcIixmdW5jdGlvbigpe1xyXG5cdFx0aWYoICQodGhpcykuaGFzQ2xhc3MoXCJhY3RpdmVcIikgIT0gdHJ1ZSApXHJcblx0XHR7XHJcblx0XHRcdHZhciBvbGRMaW5rID0gJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5maW5kKFwiLmFjdGl2ZVwiKS5lcSgwKTtcclxuXHRcdFx0dmFyIG9sZEJsID0gJChvbGRMaW5rKS5hdHRyKFwiaHJlZlwiKTtcclxuXHRcdFx0JChvbGRMaW5rKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHRcdFx0JChvbGRCbCkuaGlkZSgwKTtcclxuXHJcblx0XHRcdHZhciBuZXdMaW5rID0gJCh0aGlzKTtcclxuXHRcdFx0dmFyIG5ld0JsID0gJCh0aGlzKS5hdHRyKFwiaHJlZlwiKTtcclxuXHRcdFx0JChuZXdMaW5rKS50b2dnbGVDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHRcdFx0JChuZXdCbCkuZmFkZUluKDUwMCk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fSk7XHJcblxyXG5cdCQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIixcIi5zaXplLWJsIGlcIixmdW5jdGlvbigpe1xyXG5cdFx0dmFyIG5ld1ZhbCA9IHBhcnNlSW50KCQodGhpcykucGFyZW50KCkuZmluZChcImlucHV0XCIpLnZhbCgpKTtcclxuXHRcdGlmKCQodGhpcykuaGFzQ2xhc3MoXCJsZWZ0XCIpID09IHRydWUpe2lmKG5ld1ZhbCA+IDEpe25ld1ZhbC0tO31lbHNle25ld1ZhbD0xO319XHJcblx0XHRpZigkKHRoaXMpLmhhc0NsYXNzKFwicmlnaHRcIikgPT0gdHJ1ZSl7aWYobmV3VmFsID4gMCl7bmV3VmFsKys7fWVsc2V7bmV3VmFsPTE7fX1cclxuXHRcdCQodGhpcykucGFyZW50KCkuZmluZChcImlucHV0XCIpLnZhbChuZXdWYWwpO1xyXG5cdH0pO1xyXG5cdCQoZG9jdW1lbnQpLm9uKFwiY2hhbmdlLCBrZXl1cFwiLFwiLnNpemUtYmwgaW5wdXRcIixmdW5jdGlvbigpe1xyXG5cdFx0dmFyIG5ld1ZhbCA9ICQodGhpcykudmFsKCk7XHJcblx0XHRpZihuZXdWYWwgPiAwKXt9ZWxzZXskKHRoaXMpLnZhbChcIjFcIik7fVxyXG5cdH0pO1xyXG5cclxuXHQkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsXCIudXAtbGlua1wiLGZ1bmN0aW9uKCl7XHJcblx0XHRqUXVlcnkoXCJodG1sOm5vdCg6YW5pbWF0ZWQpLGJvZHk6bm90KDphbmltYXRlZClcIikuYW5pbWF0ZSh7c2Nyb2xsVG9wOiAwfSw4MDApO1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH0pO1xyXG5cclxuXHQkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsXCJkaXYuaS1idG5cIixmdW5jdGlvbigpe1xyXG5cdFx0aWYoICQodGhpcykuaGFzQ2xhc3MoXCJvcGVuXCIpICE9IHRydWUgKXskKHRoaXMpLmFkZENsYXNzKFwib3BlblwiKTt9XHJcblx0XHRlbHNleyQodGhpcykucmVtb3ZlQ2xhc3MoXCJvcGVuXCIpO31cclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9KTtcclxuXHQkKGRvY3VtZW50KS5vbihcIm1vdXNlZW50ZXJcIixcIi5pLWJ0bi5vcGVuXCIsZnVuY3Rpb24oKXtcclxuXHRcdCQoXCJib2R5XCIpLnJlbW92ZUNsYXNzKFwic2hvdy1pYnRuXCIpO1xyXG5cdH0pO1xyXG5cdCQoZG9jdW1lbnQpLm9uKFwibW91c2VsZWF2ZVwiLFwiLmktYnRuLm9wZW5cIixmdW5jdGlvbigpe1xyXG5cdFx0aWYoICQoXCJib2R5XCIpLmhhc0NsYXNzKFwic2hvdy1pYnRuXCIpICE9IHRydWUgKVxyXG5cdFx0eyQoXCJib2R5XCIpLnRvZ2dsZUNsYXNzKFwic2hvdy1pYnRuXCIpO31cclxuXHR9KTtcclxuXHJcblx0JChkb2N1bWVudCkub24oXCJjbGlja1wiLFwiLnF1ZXN0LWJsIC5xLWhlYWQsLmNhdC1maWx0ZXIgLmZpbHQtaGVhZCwuY2F0LXF3IC5xdy1oZWFkXCIsZnVuY3Rpb24oKXtcclxuXHRcdCQodGhpcykucGFyZW50KCkudG9nZ2xlQ2xhc3MoXCJvcGVuXCIpO1xyXG5cdH0pO1xyXG5cclxuXHQkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsXCIubW9kaWZpYy1ibCAubW9kaWZpYy1oZWFkXCIsZnVuY3Rpb24oKXtcclxuXHRcdGlmKCAkKFwiYm9keVwiKS5oYXNDbGFzcyhcInNob3ctaWJ0blwiKSA9PSB0cnVlIClcclxuXHRcdHtcclxuXHRcdFx0JChcImRpdi5pLWJ0blwiKS5yZW1vdmVDbGFzcyhcIm9wZW5cIik7XHJcblx0XHRcdCQoXCJib2R5XCIpLnJlbW92ZUNsYXNzKFwic2hvdy1pYnRuXCIpO1xyXG5cdFx0fVxyXG5cdFx0dmFyIG5ld0JsID0gJCh0aGlzKS5wYXJlbnQoKTtcclxuXHRcdGlmKCAkKG5ld0JsKS5oYXNDbGFzcyhcIm9wZW5cIikgIT0gdHJ1ZSApeyQobmV3QmwpLmZpbmQoXCIubW9kaWZpYy1ib2R5XCIpLnNob3coMjAwKTt9XHJcblx0XHRlbHNleyQobmV3QmwpLmZpbmQoXCIubW9kaWZpYy1ib2R5XCIpLmhpZGUoMjAwKTt9XHJcblx0XHQkKG5ld0JsKS50b2dnbGVDbGFzcyhcIm9wZW5cIik7XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fSk7XHJcblxyXG5cdCQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIixcIi5jYXQtdmlzIHNwYW5cIixmdW5jdGlvbigpe1xyXG5cdFx0aWYoICQodGhpcykuaGFzQ2xhc3MoXCJhY3RpdmVcIikgIT0gdHJ1ZSApXHJcblx0XHR7XHJcblx0XHRcdHZhciBvbGRWYWwgPSAkKHRoaXMpLnBhcmVudCgpLnBhcmVudCgpLmZpbmQoXCIuYWN0aXZlXCIpLmRhdGEoXCJ2YWxcIik7XHJcblx0XHRcdCQoXCJib2R5XCIpLnJlbW92ZUNsYXNzKG9sZFZhbCk7XHJcblx0XHRcdCQodGhpcykucGFyZW50KCkucGFyZW50KCkuZmluZChcIi5hY3RpdmVcIikucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XHJcblx0XHRcdHZhciBuZXdWYWwgPSAkKHRoaXMpLmRhdGEoXCJ2YWxcIik7XHJcblx0XHRcdCQoXCJib2R5XCIpLnRvZ2dsZUNsYXNzKG5ld1ZhbCk7XHJcblx0XHRcdCQodGhpcykudG9nZ2xlQ2xhc3MoXCJhY3RpdmVcIik7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fSk7XHJcblxyXG5cdCQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIixcIi5xdWl6LXNibXRzIC5wcmV2XCIsZnVuY3Rpb24oKXtcclxuXHRcdHZhciBzd1NsaWRlID0gJCh0aGlzKS5wYXJlbnQoKS5wYXJlbnQoKS5wYXJlbnQoKS5wYXJlbnQoKTtcclxuXHJcblx0XHR2YXIgc2xJbmRleCA9ICQoc3dTbGlkZSkuaW5kZXgoKTtcclxuXHJcblx0XHR2YXIgb2xkQmwgPSAkKHRoaXMpLnBhcmVudCgpO1xyXG5cdFx0dmFyIHJlc3VsdCA9IDA7XHJcblx0XHR3aGlsZShyZXN1bHQgPT0gMClcclxuXHRcdHtcclxuXHRcdFx0aWYoJChvbGRCbCkuaGFzQ2xhc3MoXCJxdWl6LXNob3ctYmxcIikgPT0gdHJ1ZSl7cmVzdWx0ID0gMTt9XHJcblx0XHRcdGlmKCQob2xkQmwpLmhhc0NsYXNzKFwicGFnZS13aWR0aFwiKSA9PSB0cnVlKXtyZXN1bHQgPSAxO31cclxuXHRcdFx0aWYocmVzdWx0ID09IDApXHJcblx0XHRcdHtvbGRCbCA9ICQob2xkQmwpLnBhcmVudCgpO31cclxuXHRcdH1cclxuXHRcdHZhciBibFRvcCA9ICQob2xkQmwpLm9mZnNldCgpLnRvcCAtIDE2MDtcclxuXHJcblx0XHR2YXIgcWl6QmwgPSAkKG9sZEJsKS5maW5kKFwiLnF1aXotc2xpZGVyXCIpLmVxKDApO1xyXG5cdFx0aWYoICQocWl6QmwpLmhhc0NsYXNzKFwicmVzdWx0XCIpID09IHRydWUgKXskKHFpekJsKS5yZW1vdmVDbGFzcyhcInJlc3VsdFwiKTt9XHJcblxyXG5cdFx0aWYoc2xJbmRleCA9PSAwKVxyXG5cdFx0eyQoXCIucXVpei1zaG93LWJsLm9wZW5cIikucmVtb3ZlQ2xhc3MoXCJvcGVuXCIpOyQoXCIucXVpei1oaWRlLWJsLmNsb3NlXCIpLnJlbW92ZUNsYXNzKFwiY2xvc2VcIik7fVxyXG5cdFx0ZWxzZVxyXG5cdFx0eyQob2xkQmwpLmZpbmQoXCIuc3ctcXVpeiAuc3dpcGVyLWJ1dHRvbi5wcmV2XCIpLnRyaWdnZXIoXCJjbGlja1wiKTt9XHJcblxyXG5cdFx0alF1ZXJ5KFwiaHRtbDpub3QoOmFuaW1hdGVkKSxib2R5Om5vdCg6YW5pbWF0ZWQpXCIpLmFuaW1hdGUoe3Njcm9sbFRvcDogYmxUb3ArXCJweFwifSwzNTApO1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH0pO1xyXG5cdCQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIixcIi5xdWl6LXNibXRzIC5uZXh0XCIsZnVuY3Rpb24oKXtcclxuXHRcdHZhciBvbGRCbCA9ICQodGhpcykucGFyZW50KCk7XHJcblx0XHR2YXIgcmVzdWx0ID0gMDtcclxuXHRcdHdoaWxlKHJlc3VsdCA9PSAwKVxyXG5cdFx0e1xyXG5cdFx0XHRpZigkKG9sZEJsKS5oYXNDbGFzcyhcInF1aXotc2hvdy1ibFwiKSA9PSB0cnVlKXtyZXN1bHQgPSAxO31cclxuXHRcdFx0aWYoJChvbGRCbCkuaGFzQ2xhc3MoXCJwYWdlLXdpZHRoXCIpID09IHRydWUpe3Jlc3VsdCA9IDE7fVxyXG5cdFx0XHRpZihyZXN1bHQgPT0gMClcclxuXHRcdFx0e29sZEJsID0gJChvbGRCbCkucGFyZW50KCk7fVxyXG5cdFx0fVxyXG5cdFx0dmFyIGJsVG9wID0gJChvbGRCbCkub2Zmc2V0KCkudG9wIC0gMTYwO1xyXG5cclxuXHRcdHZhciBxaXpCbCA9ICQob2xkQmwpLmZpbmQoXCIucXVpei1zbGlkZXJcIikuZXEoMCk7XHJcblx0XHRpZigkKHFpekJsKS5maW5kKFwiLnN3aXBlci1zbGlkZTpsYXN0LWNoaWxkXCIpLmhhc0NsYXNzKFwic3dpcGVyLXNsaWRlLWFjdGl2ZVwiKSA9PSB0cnVlIHx8ICQocWl6QmwpLmZpbmQoXCIuc3dpcGVyLXNsaWRlOmxhc3QtY2hpbGRcIikuaGFzQ2xhc3MoXCJzd2lwZXItc2xpZGUtbmV4dFwiKSA9PSB0cnVlKVxyXG5cdFx0e1xyXG5cdFx0XHRpZiggJChxaXpCbCkuaGFzQ2xhc3MoXCJyZXN1bHRcIikgIT0gdHJ1ZSApeyQocWl6QmwpLmFkZENsYXNzKFwicmVzdWx0XCIpO31cclxuXHRcdH1cclxuXHRcdGVsc2VcclxuXHRcdHtcclxuXHRcdFx0aWYoICQocWl6QmwpLmhhc0NsYXNzKFwicmVzdWx0XCIpID09IHRydWUgKXskKHFpekJsKS5yZW1vdmVDbGFzcyhcInJlc3VsdFwiKTt9XHJcblx0XHR9XHJcblxyXG5cdFx0JChvbGRCbCkuZmluZChcIi5zdy1xdWl6IC5zd2lwZXItYnV0dG9uLm5leHRcIikudHJpZ2dlcihcImNsaWNrXCIpO1xyXG5cclxuXHRcdGpRdWVyeShcImh0bWw6bm90KDphbmltYXRlZCksYm9keTpub3QoOmFuaW1hdGVkKVwiKS5hbmltYXRlKHtzY3JvbGxUb3A6IGJsVG9wK1wicHhcIn0sMzUwKTtcclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9KTtcclxuXHJcblx0JChkb2N1bWVudCkub24oXCJjbGlja1wiLFwiLm5hdi1tb3JlXCIsZnVuY3Rpb24oKXtcclxuXHRcdCQodGhpcykucGFyZW50KCkuZmluZChcIi5uLWhpZGVcIikucmVtb3ZlQ2xhc3MoXCJuLWhpZGVcIik7XHJcblx0XHQkKHRoaXMpLnJlbW92ZSgpO1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH0pO1xyXG5cclxuXHQkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsXCIuZm9vdC1uYXYgLm5hdi1oZWFkXCIsZnVuY3Rpb24oKXtcclxuXHRcdCQodGhpcykucGFyZW50KCkudG9nZ2xlQ2xhc3MoXCJvcGVuXCIpO1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH0pO1xyXG5cclxuXHQkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsXCIuYnRuLWNhdFwiLGZ1bmN0aW9uKCl7XHJcblx0XHRpZiggJChcImJvZHlcIikuaGFzQ2xhc3MoXCJzaG93LWNhdGVnb3J5XCIpICE9IHRydWUgKVxyXG5cdFx0e1xyXG5cdFx0XHR2YXIgc2Nyb2xsID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG5cdFx0XHQkKCcuaGVhZGVyLXdyYXAnKS5jc3MoJ3otaW5kZXgnLDEwMDApO1xyXG5cdFx0XHRzZXRUaW1lb3V0KGZ1bmN0aW9uICgpe1xyXG5cdFx0XHRcdCQoXCJib2R5XCIpLmFkZENsYXNzKFwic2hvdy1jYXRlZ29yeVwiKTtcclxuXHRcdFx0XHQkKFwiYm9keVwiKS5hdHRyKFwiZGF0YS1zY3JvbGxcIiwgc2Nyb2xsKTtcclxuXHRcdFx0XHR2YXIgd2luZEggPSAkKHdpbmRvdykub3V0ZXJIZWlnaHQoKTtcclxuXHRcdFx0XHR2YXIgaGVhZEggPSAkKFwiLnNpdGUtaGVhZGVyXCIpLm91dGVySGVpZ2h0KCk7XHJcblx0XHRcdFx0JChcIi5jYXRhbG9nLW5hdi13cmFwIC5jYXQtbmF2LXJvd1wiKS5jc3MoXCJtaW4taGVpZ2h0XCIsKHdpbmRILWhlYWRIKStcInB4XCIpO1xyXG5cdFx0XHRcdCQoXCIuY2F0YWxvZy1uYXYtd3JhcFwiKS5zaG93KDApO1xyXG5cdFx0XHR9LDMwMClcclxuXHJcblx0XHR9XHJcblx0XHRlbHNlXHJcblx0XHR7XHJcblx0XHRcdCQoXCJib2R5XCIpLnJlbW92ZUNsYXNzKFwic2hvdy1jYXRlZ29yeVwiKTtcclxuXHRcdFx0JCgnLmhlYWRlci13cmFwJykuY3NzKCd6LWluZGV4JywxMDApO1xyXG5cdFx0XHQkKFwiLmNhdGFsb2ctbmF2LXdyYXBcIikuaGlkZSgxMCxmdW5jdGlvbigpe1xyXG5cdFx0XHRcdCQoXCIuY2F0YWxvZy1uYXYtd3JhcFwiKS5yZW1vdmVDbGFzcyhcInNob3ctc3ViXCIpO1xyXG5cdFx0XHRcdCQoXCIuY2F0YWxvZy1uYXYtd3JhcCAuaGF2ZS1zdWIub3BlblwiKS5yZW1vdmVDbGFzcyhcIm9wZW5cIik7XHJcblx0XHRcdFx0JChcIi5jYXRhbG9nLW5hdi13cmFwIC5jYXQtc2JtLmFjdGl2ZVwiKS5yZW1vdmVDbGFzcyhcImFjdGl2ZVwiKTtcclxuXHRcdFx0XHQkKFwiLmNhdGFsb2ctbmF2LXdyYXAgLm5hdi10YWJcIikuaGlkZSgwKTtcclxuXHRcdFx0fSk7XHJcblx0XHR9XHJcblx0XHRyZXR1cm4gZmFsc2U7XHJcblx0fSk7XHJcblxyXG5cdCQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIixcIi5uYXYtbWFpbiAuaGF2ZS1zdWIgLnN1Yl9vcGVuXCIsZnVuY3Rpb24oKXtcclxuXHRcdGlmKCAkKHRoaXMpLnBhcmVudHMoJy5oYXZlLXN1YicpLmhhc0NsYXNzKFwib3BlblwiKSAhPSB0cnVlIClcclxuXHRcdHtcclxuXHRcdFx0JChcIi5uYXYtbWFpbiAub3BlblwiKS5yZW1vdmVDbGFzcyhcIm9wZW5cIik7XHJcblx0XHRcdCQodGhpcykucGFyZW50cygnLmhhdmUtc3ViJykudG9nZ2xlQ2xhc3MoXCJvcGVuXCIpO1xyXG5cdFx0fVxyXG5cdFx0ZWxzZVxyXG5cdFx0e1xyXG5cdFx0XHQkKFwiLm5hdi1tYWluIC5vcGVuXCIpLnJlbW92ZUNsYXNzKFwib3BlblwiKTtcclxuXHRcdH1cclxuXHRcdHJldHVybiBmYWxzZTtcclxuXHR9KTtcclxuXHQkKGRvY3VtZW50KS5vbihcIm1vdXNlZW50ZXJcIixcIi5uYXYtbWFpbiAuY2F0LXNibVwiLGZ1bmN0aW9uKCl7XHJcblx0XHRpZiggJCh0aGlzKS5oYXNDbGFzcyhcImFjdGl2ZVwiKSAhPSB0cnVlIClcclxuXHRcdHtcclxuXHRcdFx0JChcIi5uYXYtc3ViLWNvbCAubmF2LXRhYlwiKS5oaWRlKDApO1xyXG5cdFx0XHQkKFwiLm5hdi1tYWluIC5hY3RpdmVcIikucmVtb3ZlQ2xhc3MoXCJhY3RpdmVcIik7XHJcblx0XHRcdCQodGhpcykuYWRkQ2xhc3MoXCJhY3RpdmVcIik7XHJcblxyXG5cdFx0XHR2YXIgbmV3VGFiID0gXCIjXCIgKyAkKHRoaXMpLmRhdGEoXCJ2YWxcIik7XHJcblx0XHRcdGlmKCQobmV3VGFiKS5maW5kKFwiLmNvbFwiKS5sZW5ndGggPiAwKXtcclxuXHRcdFx0XHRpZiggJChcIi5jYXRhbG9nLW5hdi13cmFwXCIpLmhhc0NsYXNzKFwic2hvdy1zdWJcIikgIT0gdHJ1ZSApXHJcblx0XHRcdFx0eyQoXCIuY2F0YWxvZy1uYXYtd3JhcFwiKS5hZGRDbGFzcyhcInNob3ctc3ViXCIpO31cclxuXHRcdFx0XHQkKG5ld1RhYikuc2hvdygwKTtcclxuXHRcdFx0fVxyXG5cdFx0XHRlbHNle1xyXG5cdFx0XHRcdGlmKCAkKFwiLmNhdGFsb2ctbmF2LXdyYXBcIikuaGFzQ2xhc3MoXCJzaG93LXN1YlwiKSA9PSB0cnVlIClcclxuXHRcdFx0XHR7JChcIi5jYXRhbG9nLW5hdi13cmFwXCIpLnJlbW92ZUNsYXNzKFwic2hvdy1zdWJcIik7fVxyXG5cdFx0XHR9XHJcblx0XHR9XHJcblx0fSk7XHJcblx0JChkb2N1bWVudCkub24oXCJjbGlja1wiLFwiYm9keS5zaG93LWNhdGVnb3J5IC5wb3B1cHMtYmdcIixmdW5jdGlvbigpe1xyXG5cdFx0JChcIi5idG4tY2F0XCIpLnRyaWdnZXIoXCJjbGlja1wiKTtcclxuXHR9KTtcclxuXHQkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsXCJib2R5LnNob3ctY2F0ZWdvcnkgLm5hdi1zdWItY29sXCIsZnVuY3Rpb24oKXtcclxuXHRcdGlmKCAkKFwiLmNhdGFsb2ctbmF2LXdyYXBcIikuaGFzQ2xhc3MoXCJzaG93LXN1YlwiKSAhPSB0cnVlIClcclxuXHRcdHskKFwiLmJ0bi1jYXRcIikudHJpZ2dlcihcImNsaWNrXCIpO31cclxuXHR9KTtcclxuXHJcblx0Ly8gJChkb2N1bWVudCkub24oXCJrZXl1cFwiLFwiLndpbmQtc2VhcmNoIC5zZWFyY2gtZm9ybSBpbnB1dFt0eXBlPSd0ZXh0J11cIixmdW5jdGlvbigpe1xyXG5cdC8vIFx0dmFyIGxlbk1heCA9ICQodGhpcykudmFsKCkubGVuZ3RoO1xyXG5cdC8vIFx0aWYobGVuTWF4ID4gMCAmJiAkKFwiLnNlYXJjaC1yZXN1bHRcIikuY3NzKFwiZGlzcGxheVwiKSA9PSBcIm5vbmVcIiApXHJcblx0Ly8gXHR7JChcIi5zZWFyY2gtcmVzdWx0XCIpLnNob3coMjAwKTt9XHJcblx0Ly8gXHRpZihsZW5NYXggPD0gMClcclxuXHQvLyBcdHskKFwiLnNlYXJjaC1yZXN1bHRcIikuaGlkZSgyMDApO31cclxuXHQvLyB9KTtcclxuXHJcblx0JChkb2N1bWVudCkub24oXCJjbGlja1wiLFwiLnMtd2luZC1idG5cIixmdW5jdGlvbigpe1xyXG5cdFx0dmFyIHZhbFNjciA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcclxuXHRcdCQoXCJib2R5XCIpLmF0dHIoXCJkYXRhLXNjcm9sbFwiLCB2YWxTY3IpO1xyXG5cdFx0JChcImJvZHlcIikudG9nZ2xlQ2xhc3MoXCJzaG93LXdzZWFyY2hcIik7XHJcblxyXG5cdFx0Ly8gJCggXCIjc2VhcmNoXCIgKS5hbmltYXRlKHtcclxuXHRcdC8vIFx0bWFyZ2luOiAwXHJcblx0XHQvLyB9LCAzMDAsIGZ1bmN0aW9uKCkge1xyXG5cdFx0Ly8gXHQkKCcuc2VhcmNoLXJlc3VsdCcpLnNsaWRlRG93bignZmFzdCcpO1xyXG5cdFx0Ly8gfSk7XHJcblxyXG5cdFx0JCgnLnNlYXJjaC1yZXN1bHQnKS5zbGlkZURvd24oJzMwMCcpO1xyXG5cclxuXHRcdCQoJyNzZWFyY2ggaW5wdXRbbmFtZT1cXCdzZWFyY2hcXCddJykudmFsKCcnKS5mb2N1cygpO1xyXG5cdH0pO1xyXG5cdCQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIixcIi53aW5kLWNsb3NlXCIsZnVuY3Rpb24oKXtcclxuXHRcdCQoXCIud2luZC1zZWFyY2ggLnNlYXJjaC1mb3JtIGlucHV0W3R5cGU9J3RleHQnXVwiKS52YWwoXCJcIik7XHJcblx0XHQvLyAkKFwiLnNlYXJjaC1yZXN1bHRcIikuaGlkZSgwKTtcclxuXHRcdCQoXCJib2R5XCIpLnJlbW92ZUNsYXNzKFwic2hvdy13c2VhcmNoXCIpO1xyXG5cdFx0dmFyIHZhbFNjciA9IHBhcnNlSW50KCQoXCJib2R5XCIpLmF0dHIoXCJkYXRhLXNjcm9sbFwiKSkrXCJweFwiO1xyXG5cdFx0Ly8gJCgnI3NlYXJjaCcpLmFuaW1hdGUoIHsgbWFyZ2luOiAnMCAwIDAgNTAlJyB9ICwgeyBkdXJhdGlvbjogMCwgfSlcclxuXHRcdCQoJy5zZWFyY2gtcmVzdWx0Jykuc2xpZGVVcCgnZmFzdCcpO1xyXG5cdFx0alF1ZXJ5KFwiaHRtbDpub3QoOmFuaW1hdGVkKSxib2R5Om5vdCg6YW5pbWF0ZWQpXCIpLmFuaW1hdGUoe3Njcm9sbFRvcDogdmFsU2NyfSwwKTtcclxuXHR9KTtcclxuXHJcblx0JChkb2N1bWVudCkub24oXCJjbGlja1wiLFwiYm9keVwiLGZ1bmN0aW9uKCl7XHJcblxyXG5cdFx0aWYoICQoXCJib2R5XCIpLmhhc0NsYXNzKFwic2hvdy1pYnRuXCIpID09IHRydWUgKVxyXG5cdFx0e1xyXG5cdFx0XHQkKFwiZGl2LmktYnRuXCIpLnJlbW92ZUNsYXNzKFwib3BlblwiKTtcclxuXHRcdFx0JChcImJvZHlcIikucmVtb3ZlQ2xhc3MoXCJzaG93LWlidG5cIik7XHJcblx0XHR9XHJcblx0fSk7XHJcblxyXG5cdFx0JCgnI3NlYXJjaCBpbnB1dFtuYW1lPVxcJ3NlYXJjaFxcJ10nKS5wYXJlbnQoKS5maW5kKCdbdHlwZT1cImJ1dHRvblwiXScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG5cclxuXHRcdFx0XHR2YXIgdXJsID0gJCgnYmFzZScpLmF0dHIoJ2hyZWYnKSArICdpbmRleC5waHA/cm91dGU9cHJvZHVjdC9zZWFyY2gnO1xyXG5cclxuXHRcdFx0XHR2YXIgdmFsdWUgPSAkKCcjc2VhcmNoIGlucHV0W25hbWU9XFwnc2VhcmNoXFwnXScpLnZhbCgpO1xyXG5cclxuXHRcdFx0XHRpZiAodmFsdWUpIHtcclxuXHRcdFx0XHRcdFx0dXJsICs9ICcmc2VhcmNoPScgKyBlbmNvZGVVUklDb21wb25lbnQodmFsdWUpKycmZGVzY3JpcHRpb249dHJ1ZSc7XHJcblx0XHRcdFx0fVxyXG5cclxuXHRcdFx0XHRsb2NhdGlvbiA9IHVybDtcclxuXHRcdH0pO1xyXG5cclxuXHRcdCQoJyNzZWFyY2ggaW5wdXRbbmFtZT1cXCdzZWFyY2hcXCddJykub24oJ2tleWRvd24nLCBmdW5jdGlvbihlKSB7XHJcblx0XHRcdFx0aWYgKGUua2V5Q29kZSA9PSAxMykge1xyXG5cdFx0XHRcdFx0XHQkKCcjc2VhcmNoIGlucHV0W25hbWU9XFwnc2VhcmNoXFwnXScpLnBhcmVudCgpLmZpbmQoJ1t0eXBlPVwiYnV0dG9uXCJdJykudHJpZ2dlcignY2xpY2snKTtcclxuXHRcdFx0XHR9XHJcblx0XHR9KTtcclxuXHJcblx0JChkb2N1bWVudCkub24oXCJjbGlja1wiLFwiLnF1aXotYnRuXCIsZnVuY3Rpb24oKXtcclxuXHRcdHZhciBuZXdCbCA9ICQodGhpcykuYXR0cihcImhyZWZcIik7XHJcblx0XHR2YXIgb2xkQmwgPSAkKHRoaXMpLnBhcmVudCgpO1xyXG5cdFx0dmFyIHJlc3VsdCA9IDA7XHJcblx0XHR3aGlsZShyZXN1bHQgPT0gMClcclxuXHRcdHtcclxuXHRcdFx0aWYoJChvbGRCbCkuaGFzQ2xhc3MoXCJxdWl6LWhpZGUtYmxcIikgPT0gdHJ1ZSl7cmVzdWx0ID0gMTt9XHJcblx0XHRcdGlmKCQob2xkQmwpLmhhc0NsYXNzKFwicGFnZS13aWR0aFwiKSA9PSB0cnVlKXtyZXN1bHQgPSAxO31cclxuXHRcdFx0aWYocmVzdWx0ID09IDApXHJcblx0XHRcdHtvbGRCbCA9ICQob2xkQmwpLnBhcmVudCgpO31cclxuXHRcdH1cclxuXHRcdGlmKCQob2xkQmwpLmhhc0NsYXNzKFwiY2xvc2VcIikgIT0gdHJ1ZSlcclxuXHRcdHskKG9sZEJsKS5hZGRDbGFzcyhcImNsb3NlXCIpO31cclxuXHRcdC8vIHJlbW92ZSgpXHJcblx0XHRpZigkKG5ld0JsKS5oYXNDbGFzcyhcIm9wZW5cIikgIT0gdHJ1ZSlcclxuXHRcdHskKG5ld0JsKS5hZGRDbGFzcyhcIm9wZW5cIik7fVxyXG5cclxuXHRcdHZhciBibFRvcCA9ICQobmV3QmwpLm9mZnNldCgpLnRvcCAtIDE2MDtcclxuXHRcdGpRdWVyeShcImh0bWw6bm90KDphbmltYXRlZCksYm9keTpub3QoOmFuaW1hdGVkKVwiKS5hbmltYXRlKHtzY3JvbGxUb3A6IGJsVG9wfSw4MDApO1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH0pO1xyXG5cclxuXHQkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsXCIudy1idG5cIixmdW5jdGlvbigpe1xyXG5cclxuXHRcdGlmKCAkKFwiYm9keVwiKS5oYXNDbGFzcyhcInNob3ctY2F0ZWdvcnlcIikgPT0gdHJ1ZSApeyQoXCIuYnRuLWNhdFwiKS50cmlnZ2VyKFwiY2xpY2tcIik7fVxyXG5cdFx0dmFyIHdTY3IgPSAkKHdpbmRvdykuc2Nyb2xsVG9wKCk7XHJcblx0XHR2YXIgcG9zWSA9ICQodGhpcykub2Zmc2V0KCkudG9wICsgJCh0aGlzKS5vdXRlckhlaWdodCgpICsgOCAtIHdTY3I7aWYocG9zWSA8IDApe3Bvc1kgPSAwO31cclxuXHRcdHZhciBwb3NYID0gJChcIi5oZWFkLXN1Yi1ibFwiKS5vZmZzZXQoKS5sZWZ0O1xyXG5cdFx0dmFyIHBvc0J0biA9ICQod2luZG93KS53aWR0aCgpIC0gKCQodGhpcykub2Zmc2V0KCkubGVmdCArICQodGhpcykub3V0ZXJXaWR0aCgpKTtcclxuXHRcdHZhciBuZXdCbCA9ICQodGhpcykuYXR0cihcImhyZWZcIik7XHJcbiAgICAgICAgbGV0IG9uc3VibWl0ID0gdGhpcy5kYXRhc2V0Lm9uc3VibWl0O1xyXG5cclxuXHRcdC8vIGNvbnNvbGUubG9nKCQod2luZG93KS53aWR0aCgpKTtcclxuXHRcdC8vIGNvbnNvbGUubG9nKCQodGhpcykub2Zmc2V0KCkubGVmdCArIDI4NSk7XHJcblxyXG5cdFx0aWYoKHBvc0J0biA+IHBvc1ggJiYgKCQod2luZG93KS53aWR0aCgpID49ICgyODUgKyBwYXJzZUludChwb3NCdG4pKSkpIHx8ICgkKHdpbmRvdykud2lkdGgoKSA8PSAkKHRoaXMpLm9mZnNldCgpLmxlZnQgKyAyODUpKXtwb3NYID0gcG9zQnRuO31cclxuXHRcdGVsc2V7XHJcblx0XHRcdHBvc1ggPSAkKHdpbmRvdykud2lkdGgoKSAtICAkKHRoaXMpLm9mZnNldCgpLmxlZnQgLSAyODU7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYoIW5ld0JsKXtuZXdCbCA9ICQoXCIudy1idG5cIikuZXEoMCkuYXR0cihcImhyZWZcIik7fVxyXG5cdFx0JChuZXdCbCkuY3NzKFwicmlnaHRcIiwgcG9zWCk7XHJcblxyXG5cdFx0dmFyIGJ0blN0eWxlID0gXCJ0b3A6XCIrJCh0aGlzKS5vZmZzZXQoKS50b3ArXCJweDtsZWZ0OlwiKyQodGhpcykub2Zmc2V0KCkubGVmdCtcInB4O3dpZHRoOlwiKyQodGhpcykub3V0ZXJXaWR0aCgpK1wicHg7aGVpZ2h0OlwiKyQodGhpcykub3V0ZXJIZWlnaHQoKStcInB4O2ZvbnQtc2l6ZTpcIiskKHRoaXMpLmNzcyhcImZvbnQtc2l6ZVwiKStcIjtmb250LXdlaWdodDpcIiskKHRoaXMpLmNzcyhcImZvbnQtd2VpZ2h0XCIpK1wiO2xldHRlci1zcGFjaW5nOlwiKyQodGhpcykuY3NzKFwibGV0dGVyLXNwYWNpbmdcIikrXCI7Ym9yZGVyLXJhZGl1czpcIiskKHRoaXMpLmNzcyhcImJvcmRlci1yYWRpdXNcIikrXCI7XCI7XHJcblx0XHR2YXIgYnRuVmFsID0gJCh0aGlzKS5odG1sKCk7XHJcbiAgICAgICAgbGV0IG5ld0J0bkNsYXNzID0gJ2pzLWJ0bic7XHJcbiAgICAgICAgaWYodGhpcy5jbGFzc0xpc3QuY29udGFpbnMoJ2dyZWVuLWJ0bicpKSBuZXdCdG5DbGFzcyArPSAnIGdyZWVuLWJ0bic7XHJcblx0XHR2YXIgbmV3QnRuID0gJzxzcGFuIGNsYXNzPVwiJytuZXdCdG5DbGFzcysnXCIgc3R5bGU9XCInK2J0blN0eWxlKydcIj4nK2J0blZhbCsnPC9zcGFuPic7XHJcblxyXG5cdFx0aWYoICQobmV3QmwpLmhhc0NsYXNzKFwic2hvd1wiKSAhPSB0cnVlICl7XHJcblx0XHRcdGlmKCAkKFwiYm9keVwiKS5maW5kKFwiLmpzLWJ0bi1ibFwiKS5sZW5ndGggPiAwICl7fVxyXG5cdFx0XHRlbHNleyQoXCJib2R5XCIpLnByZXBlbmQoXCI8ZGl2IGNsYXNzPSdqcy1idG4tYmwnIHN0eWxlPSdkaXNwbGF5OmJsb2NrOyc+PC9kaXY+XCIpO31cclxuXHRcdFx0JChcImJvZHlcIikuZmluZChcIi5qcy1idG4tYmxcIikuaHRtbChuZXdCdG4pO1xyXG5cdFx0XHQkKG5ld0JsKS5hZGRDbGFzcyhcInNob3dcIik7XHJcblx0XHR9XHJcblxyXG5cdFx0aWYoICQoXCJib2R5XCIpLmhhc0NsYXNzKFwic2hvdy13LXBvcHVwXCIpICE9IHRydWUgKXskKHRoaXMpLmFkZENsYXNzKFwic2hvd1wiKTskKFwiYm9keVwiKS5hZGRDbGFzcyhcInNob3ctdy1wb3B1cFwiKTt9XHJcblx0XHRlbHNlIHskKHRoaXMpLnJlbW92ZUNsYXNzKFwic2hvd1wiKTskKFwiYm9keVwiKS5yZW1vdmVDbGFzcyhcInNob3ctdy1wb3B1cFwiKTt9XHJcblxyXG5cdFx0dmFyIHdpbmRIID0gJChuZXdCbCkub3V0ZXJIZWlnaHQoKTtcclxuXHRcdHZhciB3aW5kSHRvcCA9ICQodGhpcykub2Zmc2V0KCkudG9wIC0gd1NjciAtIDEwIC0gd2luZEg7XHJcblx0XHRpZih3aW5kSHRvcCA+IDApe3Bvc1kgPSB3aW5kSHRvcDt9XHJcblx0XHQkKG5ld0JsKS5jc3MoXCJ0b3BcIiwgcG9zWSk7XHJcblx0XHRjb25zb2xlLmxvZygkKG5ld0JsKycgZm9ybScpKTtcclxuICAgICAgICAkKG5ld0JsKycgZm9ybScpLmF0dHIoJ29uc3VibWl0Jywgb25zdWJtaXQpO1xyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH0pO1xyXG5cdCQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIixcIi53LXBvcHVwIC5idG4tY2xvc2VcIixmdW5jdGlvbigpe1xyXG5cdFx0JChcImJvZHlcIikucmVtb3ZlQ2xhc3MoXCJzaG93LXctcG9wdXBcIik7XHJcblx0XHQkKFwiYm9keVwiKS5yZW1vdmVDbGFzcyhcInNob3ctbS1wb3B1cFwiKTtcclxuXHRcdCQoXCIudy1wb3B1cC5zaG93XCIpLnJlbW92ZUNsYXNzKFwic2hvd1wiKTtcclxuXHRcdCQoXCIuanMtYnRuLWJsXCIpLmh0bWwoXCJcIik7XHJcblx0XHQkKFwiLnctYnRuXCIpLnJlbW92ZUNsYXNzKFwic2hvd1wiKTtcclxuXHR9KTtcclxuXHQkKGRvY3VtZW50KS5vbihcImNsaWNrXCIsXCIubW9iLXctYnRuXCIsZnVuY3Rpb24oKXtcclxuXHRcdGlmKCAkKFwiYm9keVwiKS5oYXNDbGFzcyhcInNob3ctbS1wb3B1cFwiKSAhPSB0cnVlICl7JChcImJvZHlcIikuYWRkQ2xhc3MoXCJzaG93LW0tcG9wdXBcIik7fVxyXG5cdFx0ZWxzZSB7JChcImJvZHlcIikucmVtb3ZlQ2xhc3MoXCJzaG93LW0tcG9wdXBcIik7fVxyXG5cdFx0cmV0dXJuIGZhbHNlO1xyXG5cdH0pO1xyXG5cdCQoZG9jdW1lbnQpLm9uKFwibW91c2VlbnRlclwiLFwiLnctcG9wdXAuc2hvd1wiLGZ1bmN0aW9uKCl7XHJcblx0XHRpZiggJCh0aGlzKS5oYXNDbGFzcyhcIm9uaG92ZXJcIikgIT0gdHJ1ZSApXHJcblx0XHR7JCh0aGlzKS5hZGRDbGFzcyhcIm9uaG92ZXJcIik7fVxyXG5cdH0pO1xyXG5cdCQoZG9jdW1lbnQpLm9uKFwibW91c2VsZWF2ZVwiLFwiLnctcG9wdXAuc2hvd1wiLGZ1bmN0aW9uKCl7XHJcblx0XHRpZiggJCh0aGlzKS5oYXNDbGFzcyhcIm9uaG92ZXJcIikgPT0gdHJ1ZSApXHJcblx0XHR7JCh0aGlzKS5yZW1vdmVDbGFzcyhcIm9uaG92ZXJcIik7fVxyXG5cdH0pO1xyXG5cdCQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIixcImJvZHlcIiwgZnVuY3Rpb24oKXtcclxuXHJcblx0XHR2YXIgd1BvcHVwTGVuID0gJChcIi53LXBvcHVwLnNob3dcIikubGVuZ3RoO1xyXG5cclxuXHRcdGlmKHdQb3B1cExlbiA+IDApe1xyXG5cdFx0XHRpZiggJChcIi53LXBvcHVwLnNob3dcIikuZXEoMCkuaGFzQ2xhc3MoXCJvbmhvdmVyXCIpICE9IHRydWUgKXtcclxuXHRcdFx0XHQkKFwiLnctcG9wdXAuc2hvd1wiKS5lcSgwKS5maW5kKFwiLmJ0bi1jbG9zZVwiKS50cmlnZ2VyKFwiY2xpY2tcIik7XHJcblx0XHRcdH1cclxuXHRcdH1cclxuXHR9KTtcclxuXHJcblxyXG59KTtcclxuJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpe1xyXG5cdHVwSW5pdCgpO1xyXG5cdHRibFJvdygpO1xyXG5cdC8vUG9wdXBzXHJcblx0dmFyIHBvcHVwc0xlbiA9ICQoXCIucG9wdXAtYmwuc2hvd1wiKS5sZW5ndGg7Zm9yKHZhciBpPTA7aTxwb3B1cHNMZW47aSsrKXtwb3B1cHNJbml0KCQoXCIucG9wdXAtYmxcIikuZXEoaSkpO31cclxuXHJcblx0aWYoICQoXCJib2R5XCIpLmhhc0NsYXNzKFwic2hvdy13LXBvcHVwXCIpID09IHRydWUgKXtcclxuXHRcdHZhciBwb3NYID0gJChcIi5oZWFkLXN1Yi1ibFwiKS5vZmZzZXQoKS5sZWZ0O1xyXG5cdFx0JChcIi53LXBvcHVwXCIpLmNzcyhcInJpZ2h0XCIsIHBvc1gpO1xyXG5cclxuXHRcdHZhciBuZXdCdG4gPSAkKFwiLnctYnRuLnNob3dcIikuZXEoMCk7XHJcblx0XHRcdHZhciBidG5Ub3AgPSAkKG5ld0J0bikub2Zmc2V0KCkudG9wO1xyXG5cdFx0XHR2YXIgYnRuTGVmdCA9ICQobmV3QnRuKS5vZmZzZXQoKS5sZWZ0O1xyXG5cdFx0XHR2YXIgYnRuVyA9ICQobmV3QnRuKS5vdXRlcldpZHRoKCk7XHJcblx0XHRcdHZhciBidG5IID0gJChuZXdCdG4pLm91dGVySGVpZ2h0KCk7XHJcblx0XHRcdHZhciBidG5Gb250ID0gJChuZXdCdG4pLmNzcyhcImZvbnQtc2l6ZVwiKTtcclxuXHRcdFx0JChcIi5qcy1idG5cIikuY3NzKFwidG9wXCIsIGJ0blRvcCtcInB4XCIpO1xyXG5cdFx0XHQkKFwiLmpzLWJ0blwiKS5jc3MoXCJsZWZ0XCIsIGJ0bkxlZnQrXCJweFwiKTtcclxuXHRcdFx0JChcIi5qcy1idG5cIikuY3NzKFwid2lkdGhcIiwgYnRuVytcInB4XCIpO1xyXG5cdFx0XHQkKFwiLmpzLWJ0blwiKS5jc3MoXCJoZWlnaHRcIiwgYnRuSCtcInB4XCIpO1xyXG5cdFx0XHQkKFwiLmpzLWJ0blwiKS5jc3MoXCJmb250LXNpemVcIiwgYnRuRm9udCk7XHJcblx0XHRcdCQoXCIuanMtYnRuXCIpLmNzcyhcIm9wYWNpdHlcIiwgXCIxXCIpO1xyXG5cdH1cclxufSk7XHJcbiQod2luZG93KS5sb2FkKGZ1bmN0aW9uKCl7XHJcblx0Ly9Qb3B1cHNcclxuXHR2YXIgcG9wdXBzTGVuID0gJChcIi5wb3B1cC1ibC5zaG93XCIpLmxlbmd0aDtmb3IodmFyIGk9MDtpPHBvcHVwc0xlbjtpKyspe3BvcHVwc0luaXQoJChcIi5wb3B1cC1ibFwiKS5lcShpKSk7fVxyXG59KTtcclxuJCh3aW5kb3cpLnNjcm9sbChmdW5jdGlvbigpe1xyXG5cdHVwSW5pdCgpO1xyXG5cdGlmKCAkKFwiYm9keVwiKS5oYXNDbGFzcyhcInNob3ctdy1wb3B1cFwiKSA9PSB0cnVlICl7XHJcblx0XHR2YXIgbmV3QnRuID0gJChcIi53LWJ0bi5zaG93XCIpLmVxKDApO1xyXG5cdFx0dmFyIG5ld0JsID0gJChcIi53LXBvcHVwLnNob3dcIikuZXEoMCk7XHJcblx0XHR2YXIgd1NjciA9ICQod2luZG93KS5zY3JvbGxUb3AoKTtcclxuXHRcdHZhciBwb3NZID0gJChuZXdCdG4pLm9mZnNldCgpLnRvcCArICQobmV3QnRuKS5vdXRlckhlaWdodCgpICsgOCAtIHdTY3I7aWYocG9zWSA8IDApe3Bvc1kgPSAwO31cclxuXHJcblx0XHR2YXIgd2luZEggPSAkKG5ld0JsKS5vdXRlckhlaWdodCgpO1xyXG5cdFx0dmFyIHdpbmRIdG9wID0gJChuZXdCdG4pLm9mZnNldCgpLnRvcCAtIHdTY3IgLSAxMCAtIHdpbmRIO1xyXG5cdFx0aWYod2luZEh0b3AgPiAwKXtwb3NZID0gd2luZEh0b3A7fVxyXG5cdFx0JChuZXdCbCkuY3NzKFwidG9wXCIsIHBvc1kpO1xyXG5cclxuXHRcdGlmKCAkKG5ld0J0bikucGFyZW50KCkucGFyZW50KCkucGFyZW50KCkucGFyZW50KCkuaGFzQ2xhc3MoXCJoZWFkLXN1Yi1ibFwiKSA9PSB0cnVlIClcclxuXHRcdHtcclxuXHRcdFx0JChcIi5qcy1idG5cIikuY3NzKFwib3BhY2l0eVwiLCBcIjBcIik7XHJcblx0XHRcdHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuXHRcdFx0XHR2YXIgYnRuVG9wID0gJChuZXdCdG4pLm9mZnNldCgpLnRvcDtcclxuXHRcdFx0XHR2YXIgYnRuTGVmdCA9ICQobmV3QnRuKS5vZmZzZXQoKS5sZWZ0O1xyXG5cdFx0XHRcdCQoXCIuanMtYnRuXCIpLmNzcyhcInRvcFwiLCBidG5Ub3ArXCJweFwiKTtcclxuXHRcdFx0XHQkKFwiLmpzLWJ0blwiKS5jc3MoXCJsZWZ0XCIsIGJ0bkxlZnQrXCJweFwiKTtcclxuXHRcdFx0XHQkKFwiLmpzLWJ0blwiKS5jc3MoXCJvcGFjaXR5XCIsIFwiMVwiKTtcclxuXHRcdFx0fSwgMjUwKTtcclxuXHRcdH1cclxuXHR9XHJcbn0pO1xyXG4kKGRvY3VtZW50KS5vbihcImtleXVwXCIsZnVuY3Rpb24oZSl7aWYoIGUua2V5ID09ICdFc2NhcGUnKXskKFwiLnBvcHVwLWJsLnNob3cgLmNsb3NlXCIpLnRyaWdnZXIoXCJjbGlja1wiKTt9fSk7XHJcblxyXG5cclxuJChkb2N1bWVudCkucmVhZHkod2luZG93UmVzaXplX2hhbmRsZXIpO1xyXG4kKHdpbmRvdykucmVzaXplKHdpbmRvd1Jlc2l6ZV9oYW5kbGVyKTtcclxuXHJcbmZ1bmN0aW9uIHdpbmRvd1Jlc2l6ZV9oYW5kbGVyKCkge1xyXG4gICAgdmFyIGhlYWRIID0gJChcIi5oZWFkZXItd3JhcFwiKS5vdXRlckhlaWdodCgpO1xyXG4gICAgJChcIi5wYWdlLXdpZHRoXCIpLmNzcyhcInBhZGRpbmctdG9wXCIsaGVhZEgrXCJweFwiKTtcclxuXHJcbiAgICB2YXIgbmV3U2NyID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO2lmKG5ld1NjciA9PSAwICkgeyQoXCIuaGVhZGVyLXdyYXBcIikucmVtb3ZlQ2xhc3MoXCJzY3JcIik7JChcIi5oZWFkZXItd3JhcFwiKS5yZW1vdmVDbGFzcyhcInNjci1vblwiKTskKFwiLmhlYWRlci13cmFwXCIpLnJlbW92ZUNsYXNzKFwic2NyLXRvcFwiKTt9XHJcbn1cclxuXHJcbiQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKXtcclxuXHR2YXIgb2xkU2NyID0gJChcImJvZHlcIikuZGF0YShcInNjcm9sbFwiKTtpZihvbGRTY3IgPiAwKXt9ZWxzZXtvbGRTY3IgPSAwO31cclxuXHR2YXIgbmV3U2NyID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG5cdGlmKCAkKFwiYm9keVwiKS5oYXNDbGFzcyhcInNob3ctY2F0ZWdvcnlcIikgIT0gdHJ1ZSApeyQoXCJib2R5XCIpLmRhdGEoXCJzY3JvbGxcIiwgbmV3U2NyKTt9XHJcblx0aWYobmV3U2NyID4gJChcIi5oZWFkZXItd3JhcFwiKS5vdXRlckhlaWdodCgpKXtcclxuXHRcdCQoXCIuaGVhZGVyLXdyYXBcIikuYWRkQ2xhc3MoXCJzY3ItZml4XCIpO1xyXG5cdH1lbHNle1xyXG5cdFx0JChcIi5oZWFkZXItd3JhcFwiKS5yZW1vdmVDbGFzcyhcInNjci1maXhcIik7XHJcblx0fVxyXG5cdGlmKG5ld1NjciA+ICQoXCIuaGVhZGVyLXdyYXBcIikub3V0ZXJIZWlnaHQoKSoxKXsgLy9iZWZvcmUgM1xyXG4gICAgICAgIGlmKCAkKFwiLmhlYWRlci13cmFwXCIpLmhhc0NsYXNzKFwic2NyXCIpICE9IHRydWUgKVxyXG4gICAgICAgIHtcclxuICAgICAgICBcdCQoXCIuaGVhZGVyLXdyYXBcIikuYWRkQ2xhc3MoXCJzY3JcIik7XHJcbiAgICAgICAgXHRzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgXHRcdGlmKCAkKFwiLmhlYWRlci13cmFwXCIpLmhhc0NsYXNzKFwic2NyLW9uXCIpICE9IHRydWUgKVxyXG4gICAgICAgIFx0XHR7JChcIi5oZWFkZXItd3JhcFwiKS5hZGRDbGFzcyhcInNjci1vblwiKTt9XHJcbiAgICAgICAgXHR9LDUpO1xyXG4gICAgXHR9XHJcblx0fVxyXG5cdGVsc2Uge1xyXG5cdFx0aWYoICQoXCIuaGVhZGVyLXdyYXBcIikuaGFzQ2xhc3MoXCJzY3ItdG9wXCIpICE9IHRydWUgKSB7XHJcblx0XHRcdCQoXCIuaGVhZGVyLXdyYXBcIikucmVtb3ZlQ2xhc3MoXCJzY3JcIik7XHJcblx0XHRcdCQoXCIuaGVhZGVyLXdyYXBcIikucmVtb3ZlQ2xhc3MoXCJzY3Itb25cIik7XHJcblx0XHR9XHJcblx0fVxyXG4gICAgaWYobmV3U2NyIDw9IG9sZFNjcil7XHJcbiAgICAgICAgaWYoICQoXCIuaGVhZGVyLXdyYXBcIikuaGFzQ2xhc3MoXCJzY3ItdG9wXCIpICE9IHRydWUgKVxyXG4gICAgICAgIHskKFwiLmhlYWRlci13cmFwXCIpLmFkZENsYXNzKFwic2NyLXRvcFwiKTt9XHJcbiAgICB9XHJcbiAgICBlbHNlIHtcclxuICAgIFx0JChcIi5oZWFkZXItd3JhcFwiKS5yZW1vdmVDbGFzcyhcInNjci10b3BcIik7XHJcbiAgICB9XHJcblxyXG4gICAgaWYobmV3U2NyID09IDAgKSB7JChcIi5oZWFkZXItd3JhcFwiKS5yZW1vdmVDbGFzcyhcInNjclwiKTskKFwiLmhlYWRlci13cmFwXCIpLnJlbW92ZUNsYXNzKFwic2NyLW9uXCIpOyQoXCIuaGVhZGVyLXdyYXBcIikucmVtb3ZlQ2xhc3MoXCJzY3ItdG9wXCIpO31cclxuXHJcbiAgICB3aW5kb3dSZXNpemVfaGFuZGxlcigpO1xyXG59KTtcclxuXHJcbmlmICh3aW5kb3cubWF0Y2hNZWRpYShcIihtYXgtd2lkdGg6IDcyMHB4KVwiKS5tYXRjaGVzKSB7XHJcblx0ZnVuY3Rpb24gaml2b19vbkxvYWRDYWxsYmFjaygpe1xyXG5cdFx0Ly8gY29uc29sZS5sb2coJ2ppdm9fb25Mb2FkQ2FsbGJhY2snKVxyXG5cdFx0bGV0IGNvdW50ID0gd2luZG93Lmppdm9fYXBpLmdldFVucmVhZE1lc3NhZ2VzQ291bnQoKTtcclxuXHRcdGlmKGNvdW50ID4gMCl7XHJcblx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqaXZvX19jb3VudGVyJykuaW5uZXJIVE1MID0gY291bnQ7XHJcblx0XHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqaXZvX2N1c3RvbV93aWRnZXQnKS5jbGFzc0xpc3QuYWRkKCdtb2JpbGUtdG9vbGJhcl9faXRlbV9hY3RpdmUnKTtcclxuXHRcdH1cclxuXHR9XHJcblx0XHJcblx0ZnVuY3Rpb24gaml2b19vbk1lc3NhZ2VSZWNlaXZlZCgpe1xyXG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ppdm9fX2NvdW50ZXInKS5pbm5lckhUTUwgPSB3aW5kb3cuaml2b19hcGkuZ2V0VW5yZWFkTWVzc2FnZXNDb3VudCgpO1xyXG5cdFx0ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ppdm9fY3VzdG9tX3dpZGdldCcpLmNsYXNzTGlzdC5hZGQoJ21vYmlsZS10b29sYmFyX19pdGVtX2FjdGl2ZScpO1xyXG5cdH1cclxuXHRcclxuXHRmdW5jdGlvbiBqaXZvX29uQ2xvc2UoKXtcclxuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqaXZvX19jb3VudGVyJykuaW5uZXJIVE1MID0gMDtcclxuXHRcdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdqaXZvX2N1c3RvbV93aWRnZXQnKS5jbGFzc0xpc3QucmVtb3ZlKCdtb2JpbGUtdG9vbGJhcl9faXRlbV9hY3RpdmUnKTtcclxuXHR9XHJcbn0gXHJcblxyXG4iXSwiZmlsZSI6InNjcmlwdHMuanMifQ==
