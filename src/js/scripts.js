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

