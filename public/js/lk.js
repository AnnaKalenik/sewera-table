function cabColScroll(){
    if( jQuery(".cab-col-scroll").css("display") == "block" ){
        var scrBox = jQuery(".cab-col-scroll").eq(0);
        var scrBl = jQuery(scrBox).parent();
        var boxH = jQuery(scrBox).outerHeight();
        var blH = jQuery(scrBl).parent().outerHeight();
        blH = blH - boxH;
        var blT = jQuery(scrBl).offset().top - 23;
        var scroll = jQuery(window).scrollTop();
        var top = scroll - blT;
        if(top < 0){top = 0;}if(top > blH){top = blH;}

        var headH = jQuery(".header-wrap").outerHeight();

        // header-wrap scr scr-on scr-top
        if( jQuery(".header-wrap").hasClass("scr") == true && (jQuery(".header-wrap").hasClass("scr-top") == true || jQuery(".header-wrap").hasClass("scr-fix") == true)){
            if( blT > (scroll) )
            {
                headH = blT - scroll - headH;
                if(headH < 0){headH = 0;}
                else{headH = headH*(-1);}
            }
            top = top + headH;
            if(top < 0){top = 0;}
        }

        jQuery(scrBox).css("transform", "translateY("+top+"px)");
    }
}
// function itemResize(){
//     $('.horizontal-item').each(function (){
//         if (window.matchMedia("(min-width: 768px)").matches) {
//             $(this).find('.horizontal-slider__image').height(parseInt($(this).find('.horizontal-item__info').innerHeight()) - 30);
//         }else{
//             $(this).find('.horizontal-slider__image').height('190px');
//         }
//     });
// }

jQuery(document).ready(function(){
    cabColScroll();
    // setTimeout(function () {
    //     itemResize();
    // });
    jQuery(document).on("click",".size-meter_btn", function(){
        let input = jQuery(this).parent().find("input");
        let oldVal = parseInt(input.val());
        let noload = input.data('noload');
        let unit = input.data('unit')?' '+input.data('unit'):'';

       if( jQuery(this).hasClass("minus") == true ){oldVal--;}
       if( jQuery(this).hasClass("plus") == true ){oldVal++;}
       if(oldVal < 1){oldVal = 1;}
       input.data("value", oldVal);
       input.val(oldVal + unit);

       load_price(input,oldVal, noload);
       input.trigger('change');
    });
    jQuery(document).on("keyup",".size-meter input", function(){
        let input = jQuery(this);
        let oldVal = parseInt(input.val());
        let noload = input.data('noload');
        if(oldVal < 1){
            oldVal = 1;
            // input.val(oldVal)
        }

        load_price(input,oldVal, noload);
        input.trigger('change');
    });

    jQuery(document).on("focus",".size-meter input", function(){
        let input = jQuery(this);
        let oldVal = parseInt(input.val());
        input.val(oldVal)
    });

    jQuery(document).on("blur",".size-meter input", function(){
        let input = jQuery(this);
        let oldVal = parseInt(input.val());
        let unit = input.data('unit')?' '+input.data('unit'):'';
        if(oldVal < 1){
            oldVal = 1;
        }
        input.val(oldVal + unit)
    });

    jQuery(document).on("keypress",".size-meter input", function(){
        var key, keyChar;
        if (!event) var event = window.event;
        if (event.keyCode) key = event.keyCode;
        else if (event.which) key = event.which;

        if(key >= 48 && key <= 57){
            return true;
        }else{
            return false;
        }

        keyChar = String.fromCharCode(key);
        if (!/\d/.test(keyChar)) {
            return false;
        }

    });

    jQuery('.size-meter input').each(function(){
        let noload = jQuery(this).data('noload');
        let oldVal = jQuery(this).data("value");
        let unit = jQuery(this).data('unit')?' '+jQuery(this).data('unit'):'';
        jQuery(this).data("value", oldVal);
        jQuery(this).val(oldVal + unit);
        let input = jQuery(this);
        load_price(input,oldVal, noload);
    });

    function load_price(input,oldVal, noload=false){
        let specialPrice = input.data("special");
        let price = input.data("price");
        let horizontal = input.data("horizontal");
        let specialVal = oldVal * parseInt(specialPrice);
        let priceVal = oldVal * parseInt(price);
        let html = '';
        // let html2 = '';
        if(!horizontal){
            if(specialVal){
                html += '<span class="new">'+new Intl.NumberFormat('ru-RU').format(specialVal)+ ' руб.' +'</span><span class="old">'+new Intl.NumberFormat('ru-RU').format(priceVal) + ' руб.'+'</span>';
                // html2 += 'КУПИТЬ ЗА ' + new Intl.NumberFormat('ru-RU').format(specialVal)+ ' руб.';
            }else{
                html += '<span class="new">'+new Intl.NumberFormat('ru-RU').format(priceVal) + ' руб.</span>';
                // html2 += 'КУПИТЬ ЗА ' + new Intl.NumberFormat('ru-RU').format(priceVal)+ ' руб.';
            }

            if(!noload){
                input.parents('.pr-about-product').find('.btn-load').html(html);
                // input.parents('.pr-about-product').find('.btn-load2').html(html2);
                input.parents('.pr-small').find('a.btn').html(html);
            }
        }else{
            if(specialVal){
                html += new Intl.NumberFormat('ru-RU').format(specialVal) + ' руб.';
            }else{
                html += new Intl.NumberFormat('ru-RU').format(priceVal) + ' руб.';
            }

            if(!noload){
                input.parents('.horizontal-item').find('.horizontal-item__price span').html(html);
            }
        }


        //
    }
    jQuery(document).on("click",".cab-col-btn", function(){
        if( jQuery("body").hasClass("show-cab-col") != true ){
            jQuery(this).text("СКРЫТЬ");
        }
        else {
            jQuery(this).text("ВЫБРАНО");
        }
        jQuery("body").toggleClass("show-cab-col");
        return false;
    });

    jQuery(document).on("click",".cab-order__sbmts.w-btn", function(){
        jQuery(".js-btn").addClass("cab-order__sbmts");
        jQuery(".js-btn").css("height", "auto");
        jQuery(".js-btn").css("box-sizing", "border-box");
    });


    jQuery(".form-submit-lk").submit(function () {
        var th = $(this);
        $('.load__preloader').fadeIn('', function () {
            $.ajax({
                type: "POST",
                url: '/index.php?route=checkout/cart/order',
                data: th.serialize(),
                dataType: 'json',
            }).done(function (json) {
                    if(json['error']){
                        alert(json['error']);
                    }
                if (json['success']) {
                    alert('Ваш заказ оформлен! Мы свяжемся с вами и детальнее обсудим заказ');
                    setTimeout(function () {
                        th.trigger("reset");
                        $('.load__preloader').fadeOut("slow");
                    }, 1000);
                }
            });
        });
        return false;
    });

    new Swiper('.horizontal-item .swiper', {
        spaceBetween: 10,
        slidesPerView: 'auto',
        navigation: {
            nextEl: '.horizontal-slider__next',
            prevEl: '.horizontal-slider__prev',
        },
        pagination: {
            el: '.horizontal-slider__dots',
            type: 'bullets',
        },
    });

    $(document).on('click','.open-modal', function (){
        const id = $(this).data('id');
        const form = $(this).data('form');
        if(id){
            if(form){
                $(id).find('input[name="form"]').val(form);
            }else{
                $(id).find('input[name="form"]').val('');
            }
            $(id).addClass('modal-block_active');
        }
    });
    $('body').mouseup(function(e) {
        const modal = $(".modal-block__content");
        if (!modal.is(e.target) && modal.has(e.target).length === 0) {
            $(".modal-block").removeClass("modal-block_active");
        }
    });
    $(document).on('click','.modal-block__close_btn', function (){
        $(".modal-block").removeClass("modal-block_active");
    });
    $(document).on('keydown', function (e){
        if(e.keyCode === 27) {
            $(".modal-block").removeClass("modal-block_active");
        }
    });
});
jQuery(window).scroll(function(){
    cabColScroll();
});
jQuery(window).on("resize",function(){
    cabColScroll();
    // itemResize();
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJsay5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBjYWJDb2xTY3JvbGwoKXtcclxuICAgIGlmKCBqUXVlcnkoXCIuY2FiLWNvbC1zY3JvbGxcIikuY3NzKFwiZGlzcGxheVwiKSA9PSBcImJsb2NrXCIgKXtcclxuICAgICAgICB2YXIgc2NyQm94ID0galF1ZXJ5KFwiLmNhYi1jb2wtc2Nyb2xsXCIpLmVxKDApO1xyXG4gICAgICAgIHZhciBzY3JCbCA9IGpRdWVyeShzY3JCb3gpLnBhcmVudCgpO1xyXG4gICAgICAgIHZhciBib3hIID0galF1ZXJ5KHNjckJveCkub3V0ZXJIZWlnaHQoKTtcclxuICAgICAgICB2YXIgYmxIID0galF1ZXJ5KHNjckJsKS5wYXJlbnQoKS5vdXRlckhlaWdodCgpO1xyXG4gICAgICAgIGJsSCA9IGJsSCAtIGJveEg7XHJcbiAgICAgICAgdmFyIGJsVCA9IGpRdWVyeShzY3JCbCkub2Zmc2V0KCkudG9wIC0gMjM7XHJcbiAgICAgICAgdmFyIHNjcm9sbCA9IGpRdWVyeSh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG4gICAgICAgIHZhciB0b3AgPSBzY3JvbGwgLSBibFQ7XHJcbiAgICAgICAgaWYodG9wIDwgMCl7dG9wID0gMDt9aWYodG9wID4gYmxIKXt0b3AgPSBibEg7fVxyXG5cclxuICAgICAgICB2YXIgaGVhZEggPSBqUXVlcnkoXCIuaGVhZGVyLXdyYXBcIikub3V0ZXJIZWlnaHQoKTtcclxuXHJcbiAgICAgICAgLy8gaGVhZGVyLXdyYXAgc2NyIHNjci1vbiBzY3ItdG9wXHJcbiAgICAgICAgaWYoIGpRdWVyeShcIi5oZWFkZXItd3JhcFwiKS5oYXNDbGFzcyhcInNjclwiKSA9PSB0cnVlICYmIChqUXVlcnkoXCIuaGVhZGVyLXdyYXBcIikuaGFzQ2xhc3MoXCJzY3ItdG9wXCIpID09IHRydWUgfHwgalF1ZXJ5KFwiLmhlYWRlci13cmFwXCIpLmhhc0NsYXNzKFwic2NyLWZpeFwiKSA9PSB0cnVlKSl7XHJcbiAgICAgICAgICAgIGlmKCBibFQgPiAoc2Nyb2xsKSApXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGhlYWRIID0gYmxUIC0gc2Nyb2xsIC0gaGVhZEg7XHJcbiAgICAgICAgICAgICAgICBpZihoZWFkSCA8IDApe2hlYWRIID0gMDt9XHJcbiAgICAgICAgICAgICAgICBlbHNle2hlYWRIID0gaGVhZEgqKC0xKTt9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdG9wID0gdG9wICsgaGVhZEg7XHJcbiAgICAgICAgICAgIGlmKHRvcCA8IDApe3RvcCA9IDA7fVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgalF1ZXJ5KHNjckJveCkuY3NzKFwidHJhbnNmb3JtXCIsIFwidHJhbnNsYXRlWShcIit0b3ArXCJweClcIik7XHJcbiAgICB9XHJcbn1cclxuLy8gZnVuY3Rpb24gaXRlbVJlc2l6ZSgpe1xyXG4vLyAgICAgJCgnLmhvcml6b250YWwtaXRlbScpLmVhY2goZnVuY3Rpb24gKCl7XHJcbi8vICAgICAgICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1pbi13aWR0aDogNzY4cHgpXCIpLm1hdGNoZXMpIHtcclxuLy8gICAgICAgICAgICAgJCh0aGlzKS5maW5kKCcuaG9yaXpvbnRhbC1zbGlkZXJfX2ltYWdlJykuaGVpZ2h0KHBhcnNlSW50KCQodGhpcykuZmluZCgnLmhvcml6b250YWwtaXRlbV9faW5mbycpLmlubmVySGVpZ2h0KCkpIC0gMzApO1xyXG4vLyAgICAgICAgIH1lbHNle1xyXG4vLyAgICAgICAgICAgICAkKHRoaXMpLmZpbmQoJy5ob3Jpem9udGFsLXNsaWRlcl9faW1hZ2UnKS5oZWlnaHQoJzE5MHB4Jyk7XHJcbi8vICAgICAgICAgfVxyXG4vLyAgICAgfSk7XHJcbi8vIH1cclxuXHJcbmpRdWVyeShkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKXtcclxuICAgIGNhYkNvbFNjcm9sbCgpO1xyXG4gICAgLy8gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAvLyAgICAgaXRlbVJlc2l6ZSgpO1xyXG4gICAgLy8gfSk7XHJcbiAgICBqUXVlcnkoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIixcIi5zaXplLW1ldGVyX2J0blwiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgIGxldCBpbnB1dCA9IGpRdWVyeSh0aGlzKS5wYXJlbnQoKS5maW5kKFwiaW5wdXRcIik7XHJcbiAgICAgICAgbGV0IG9sZFZhbCA9IHBhcnNlSW50KGlucHV0LnZhbCgpKTtcclxuICAgICAgICBsZXQgbm9sb2FkID0gaW5wdXQuZGF0YSgnbm9sb2FkJyk7XHJcbiAgICAgICAgbGV0IHVuaXQgPSBpbnB1dC5kYXRhKCd1bml0Jyk/JyAnK2lucHV0LmRhdGEoJ3VuaXQnKTonJztcclxuXHJcbiAgICAgICBpZiggalF1ZXJ5KHRoaXMpLmhhc0NsYXNzKFwibWludXNcIikgPT0gdHJ1ZSApe29sZFZhbC0tO31cclxuICAgICAgIGlmKCBqUXVlcnkodGhpcykuaGFzQ2xhc3MoXCJwbHVzXCIpID09IHRydWUgKXtvbGRWYWwrKzt9XHJcbiAgICAgICBpZihvbGRWYWwgPCAxKXtvbGRWYWwgPSAxO31cclxuICAgICAgIGlucHV0LmRhdGEoXCJ2YWx1ZVwiLCBvbGRWYWwpO1xyXG4gICAgICAgaW5wdXQudmFsKG9sZFZhbCArIHVuaXQpO1xyXG5cclxuICAgICAgIGxvYWRfcHJpY2UoaW5wdXQsb2xkVmFsLCBub2xvYWQpO1xyXG4gICAgICAgaW5wdXQudHJpZ2dlcignY2hhbmdlJyk7XHJcbiAgICB9KTtcclxuICAgIGpRdWVyeShkb2N1bWVudCkub24oXCJrZXl1cFwiLFwiLnNpemUtbWV0ZXIgaW5wdXRcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgaW5wdXQgPSBqUXVlcnkodGhpcyk7XHJcbiAgICAgICAgbGV0IG9sZFZhbCA9IHBhcnNlSW50KGlucHV0LnZhbCgpKTtcclxuICAgICAgICBsZXQgbm9sb2FkID0gaW5wdXQuZGF0YSgnbm9sb2FkJyk7XHJcbiAgICAgICAgaWYob2xkVmFsIDwgMSl7XHJcbiAgICAgICAgICAgIG9sZFZhbCA9IDE7XHJcbiAgICAgICAgICAgIC8vIGlucHV0LnZhbChvbGRWYWwpXHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBsb2FkX3ByaWNlKGlucHV0LG9sZFZhbCwgbm9sb2FkKTtcclxuICAgICAgICBpbnB1dC50cmlnZ2VyKCdjaGFuZ2UnKTtcclxuICAgIH0pO1xyXG5cclxuICAgIGpRdWVyeShkb2N1bWVudCkub24oXCJmb2N1c1wiLFwiLnNpemUtbWV0ZXIgaW5wdXRcIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgaW5wdXQgPSBqUXVlcnkodGhpcyk7XHJcbiAgICAgICAgbGV0IG9sZFZhbCA9IHBhcnNlSW50KGlucHV0LnZhbCgpKTtcclxuICAgICAgICBpbnB1dC52YWwob2xkVmFsKVxyXG4gICAgfSk7XHJcblxyXG4gICAgalF1ZXJ5KGRvY3VtZW50KS5vbihcImJsdXJcIixcIi5zaXplLW1ldGVyIGlucHV0XCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgbGV0IGlucHV0ID0galF1ZXJ5KHRoaXMpO1xyXG4gICAgICAgIGxldCBvbGRWYWwgPSBwYXJzZUludChpbnB1dC52YWwoKSk7XHJcbiAgICAgICAgbGV0IHVuaXQgPSBpbnB1dC5kYXRhKCd1bml0Jyk/JyAnK2lucHV0LmRhdGEoJ3VuaXQnKTonJztcclxuICAgICAgICBpZihvbGRWYWwgPCAxKXtcclxuICAgICAgICAgICAgb2xkVmFsID0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaW5wdXQudmFsKG9sZFZhbCArIHVuaXQpXHJcbiAgICB9KTtcclxuXHJcbiAgICBqUXVlcnkoZG9jdW1lbnQpLm9uKFwia2V5cHJlc3NcIixcIi5zaXplLW1ldGVyIGlucHV0XCIsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdmFyIGtleSwga2V5Q2hhcjtcclxuICAgICAgICBpZiAoIWV2ZW50KSB2YXIgZXZlbnQgPSB3aW5kb3cuZXZlbnQ7XHJcbiAgICAgICAgaWYgKGV2ZW50LmtleUNvZGUpIGtleSA9IGV2ZW50LmtleUNvZGU7XHJcbiAgICAgICAgZWxzZSBpZiAoZXZlbnQud2hpY2gpIGtleSA9IGV2ZW50LndoaWNoO1xyXG5cclxuICAgICAgICBpZihrZXkgPj0gNDggJiYga2V5IDw9IDU3KXtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGtleUNoYXIgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGtleSk7XHJcbiAgICAgICAgaWYgKCEvXFxkLy50ZXN0KGtleUNoYXIpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgalF1ZXJ5KCcuc2l6ZS1tZXRlciBpbnB1dCcpLmVhY2goZnVuY3Rpb24oKXtcclxuICAgICAgICBsZXQgbm9sb2FkID0galF1ZXJ5KHRoaXMpLmRhdGEoJ25vbG9hZCcpO1xyXG4gICAgICAgIGxldCBvbGRWYWwgPSBqUXVlcnkodGhpcykuZGF0YShcInZhbHVlXCIpO1xyXG4gICAgICAgIGxldCB1bml0ID0galF1ZXJ5KHRoaXMpLmRhdGEoJ3VuaXQnKT8nICcralF1ZXJ5KHRoaXMpLmRhdGEoJ3VuaXQnKTonJztcclxuICAgICAgICBqUXVlcnkodGhpcykuZGF0YShcInZhbHVlXCIsIG9sZFZhbCk7XHJcbiAgICAgICAgalF1ZXJ5KHRoaXMpLnZhbChvbGRWYWwgKyB1bml0KTtcclxuICAgICAgICBsZXQgaW5wdXQgPSBqUXVlcnkodGhpcyk7XHJcbiAgICAgICAgbG9hZF9wcmljZShpbnB1dCxvbGRWYWwsIG5vbG9hZCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBsb2FkX3ByaWNlKGlucHV0LG9sZFZhbCwgbm9sb2FkPWZhbHNlKXtcclxuICAgICAgICBsZXQgc3BlY2lhbFByaWNlID0gaW5wdXQuZGF0YShcInNwZWNpYWxcIik7XHJcbiAgICAgICAgbGV0IHByaWNlID0gaW5wdXQuZGF0YShcInByaWNlXCIpO1xyXG4gICAgICAgIGxldCBob3Jpem9udGFsID0gaW5wdXQuZGF0YShcImhvcml6b250YWxcIik7XHJcbiAgICAgICAgbGV0IHNwZWNpYWxWYWwgPSBvbGRWYWwgKiBwYXJzZUludChzcGVjaWFsUHJpY2UpO1xyXG4gICAgICAgIGxldCBwcmljZVZhbCA9IG9sZFZhbCAqIHBhcnNlSW50KHByaWNlKTtcclxuICAgICAgICBsZXQgaHRtbCA9ICcnO1xyXG4gICAgICAgIC8vIGxldCBodG1sMiA9ICcnO1xyXG4gICAgICAgIGlmKCFob3Jpem9udGFsKXtcclxuICAgICAgICAgICAgaWYoc3BlY2lhbFZhbCl7XHJcbiAgICAgICAgICAgICAgICBodG1sICs9ICc8c3BhbiBjbGFzcz1cIm5ld1wiPicrbmV3IEludGwuTnVtYmVyRm9ybWF0KCdydS1SVScpLmZvcm1hdChzcGVjaWFsVmFsKSsgJyDRgNGD0LEuJyArJzwvc3Bhbj48c3BhbiBjbGFzcz1cIm9sZFwiPicrbmV3IEludGwuTnVtYmVyRm9ybWF0KCdydS1SVScpLmZvcm1hdChwcmljZVZhbCkgKyAnINGA0YPQsS4nKyc8L3NwYW4+JztcclxuICAgICAgICAgICAgICAgIC8vIGh0bWwyICs9ICfQmtCj0J/QmNCi0Kwg0JfQkCAnICsgbmV3IEludGwuTnVtYmVyRm9ybWF0KCdydS1SVScpLmZvcm1hdChzcGVjaWFsVmFsKSsgJyDRgNGD0LEuJztcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICBodG1sICs9ICc8c3BhbiBjbGFzcz1cIm5ld1wiPicrbmV3IEludGwuTnVtYmVyRm9ybWF0KCdydS1SVScpLmZvcm1hdChwcmljZVZhbCkgKyAnINGA0YPQsS48L3NwYW4+JztcclxuICAgICAgICAgICAgICAgIC8vIGh0bWwyICs9ICfQmtCj0J/QmNCi0Kwg0JfQkCAnICsgbmV3IEludGwuTnVtYmVyRm9ybWF0KCdydS1SVScpLmZvcm1hdChwcmljZVZhbCkrICcg0YDRg9CxLic7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmKCFub2xvYWQpe1xyXG4gICAgICAgICAgICAgICAgaW5wdXQucGFyZW50cygnLnByLWFib3V0LXByb2R1Y3QnKS5maW5kKCcuYnRuLWxvYWQnKS5odG1sKGh0bWwpO1xyXG4gICAgICAgICAgICAgICAgLy8gaW5wdXQucGFyZW50cygnLnByLWFib3V0LXByb2R1Y3QnKS5maW5kKCcuYnRuLWxvYWQyJykuaHRtbChodG1sMik7XHJcbiAgICAgICAgICAgICAgICBpbnB1dC5wYXJlbnRzKCcucHItc21hbGwnKS5maW5kKCdhLmJ0bicpLmh0bWwoaHRtbCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgaWYoc3BlY2lhbFZhbCl7XHJcbiAgICAgICAgICAgICAgICBodG1sICs9IG5ldyBJbnRsLk51bWJlckZvcm1hdCgncnUtUlUnKS5mb3JtYXQoc3BlY2lhbFZhbCkgKyAnINGA0YPQsS4nO1xyXG4gICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgIGh0bWwgKz0gbmV3IEludGwuTnVtYmVyRm9ybWF0KCdydS1SVScpLmZvcm1hdChwcmljZVZhbCkgKyAnINGA0YPQsS4nO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZighbm9sb2FkKXtcclxuICAgICAgICAgICAgICAgIGlucHV0LnBhcmVudHMoJy5ob3Jpem9udGFsLWl0ZW0nKS5maW5kKCcuaG9yaXpvbnRhbC1pdGVtX19wcmljZSBzcGFuJykuaHRtbChodG1sKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcblxyXG4gICAgICAgIC8vXHJcbiAgICB9XHJcbiAgICBqUXVlcnkoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIixcIi5jYWItY29sLWJ0blwiLCBmdW5jdGlvbigpe1xyXG4gICAgICAgIGlmKCBqUXVlcnkoXCJib2R5XCIpLmhhc0NsYXNzKFwic2hvdy1jYWItY29sXCIpICE9IHRydWUgKXtcclxuICAgICAgICAgICAgalF1ZXJ5KHRoaXMpLnRleHQoXCLQodCa0KDQq9Ci0KxcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBqUXVlcnkodGhpcykudGV4dChcItCS0KvQkdCg0JDQndCeXCIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBqUXVlcnkoXCJib2R5XCIpLnRvZ2dsZUNsYXNzKFwic2hvdy1jYWItY29sXCIpO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0pO1xyXG5cclxuICAgIGpRdWVyeShkb2N1bWVudCkub24oXCJjbGlja1wiLFwiLmNhYi1vcmRlcl9fc2JtdHMudy1idG5cIiwgZnVuY3Rpb24oKXtcclxuICAgICAgICBqUXVlcnkoXCIuanMtYnRuXCIpLmFkZENsYXNzKFwiY2FiLW9yZGVyX19zYm10c1wiKTtcclxuICAgICAgICBqUXVlcnkoXCIuanMtYnRuXCIpLmNzcyhcImhlaWdodFwiLCBcImF1dG9cIik7XHJcbiAgICAgICAgalF1ZXJ5KFwiLmpzLWJ0blwiKS5jc3MoXCJib3gtc2l6aW5nXCIsIFwiYm9yZGVyLWJveFwiKTtcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICBqUXVlcnkoXCIuZm9ybS1zdWJtaXQtbGtcIikuc3VibWl0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgdGggPSAkKHRoaXMpO1xyXG4gICAgICAgICQoJy5sb2FkX19wcmVsb2FkZXInKS5mYWRlSW4oJycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgdXJsOiAnL2luZGV4LnBocD9yb3V0ZT1jaGVja291dC9jYXJ0L29yZGVyJyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHRoLnNlcmlhbGl6ZSgpLFxyXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgfSkuZG9uZShmdW5jdGlvbiAoanNvbikge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmKGpzb25bJ2Vycm9yJ10pe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChqc29uWydlcnJvciddKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoanNvblsnc3VjY2VzcyddKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ9CS0LDRiCDQt9Cw0LrQsNC3INC+0YTQvtGA0LzQu9C10L0hINCc0Ysg0YHQstGP0LbQtdC80YHRjyDRgSDQstCw0LzQuCDQuCDQtNC10YLQsNC70YzQvdC10LUg0L7QsdGB0YPQtNC40Lwg0LfQsNC60LDQtycpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aC50cmlnZ2VyKFwicmVzZXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5sb2FkX19wcmVsb2FkZXInKS5mYWRlT3V0KFwic2xvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCAxMDAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgbmV3IFN3aXBlcignLmhvcml6b250YWwtaXRlbSAuc3dpcGVyJywge1xyXG4gICAgICAgIHNwYWNlQmV0d2VlbjogMTAsXHJcbiAgICAgICAgc2xpZGVzUGVyVmlldzogJ2F1dG8nLFxyXG4gICAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICAgICAgbmV4dEVsOiAnLmhvcml6b250YWwtc2xpZGVyX19uZXh0JyxcclxuICAgICAgICAgICAgcHJldkVsOiAnLmhvcml6b250YWwtc2xpZGVyX19wcmV2JyxcclxuICAgICAgICB9LFxyXG4gICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgZWw6ICcuaG9yaXpvbnRhbC1zbGlkZXJfX2RvdHMnLFxyXG4gICAgICAgICAgICB0eXBlOiAnYnVsbGV0cycsXHJcbiAgICAgICAgfSxcclxuICAgIH0pO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKCdjbGljaycsJy5vcGVuLW1vZGFsJywgZnVuY3Rpb24gKCl7XHJcbiAgICAgICAgY29uc3QgaWQgPSAkKHRoaXMpLmRhdGEoJ2lkJyk7XHJcbiAgICAgICAgY29uc3QgZm9ybSA9ICQodGhpcykuZGF0YSgnZm9ybScpO1xyXG4gICAgICAgIGlmKGlkKXtcclxuICAgICAgICAgICAgaWYoZm9ybSl7XHJcbiAgICAgICAgICAgICAgICAkKGlkKS5maW5kKCdpbnB1dFtuYW1lPVwiZm9ybVwiXScpLnZhbChmb3JtKTtcclxuICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAkKGlkKS5maW5kKCdpbnB1dFtuYW1lPVwiZm9ybVwiXScpLnZhbCgnJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgJChpZCkuYWRkQ2xhc3MoJ21vZGFsLWJsb2NrX2FjdGl2ZScpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgJCgnYm9keScpLm1vdXNldXAoZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGNvbnN0IG1vZGFsID0gJChcIi5tb2RhbC1ibG9ja19fY29udGVudFwiKTtcclxuICAgICAgICBpZiAoIW1vZGFsLmlzKGUudGFyZ2V0KSAmJiBtb2RhbC5oYXMoZS50YXJnZXQpLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAkKFwiLm1vZGFsLWJsb2NrXCIpLnJlbW92ZUNsYXNzKFwibW9kYWwtYmxvY2tfYWN0aXZlXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywnLm1vZGFsLWJsb2NrX19jbG9zZV9idG4nLCBmdW5jdGlvbiAoKXtcclxuICAgICAgICAkKFwiLm1vZGFsLWJsb2NrXCIpLnJlbW92ZUNsYXNzKFwibW9kYWwtYmxvY2tfYWN0aXZlXCIpO1xyXG4gICAgfSk7XHJcbiAgICAkKGRvY3VtZW50KS5vbigna2V5ZG93bicsIGZ1bmN0aW9uIChlKXtcclxuICAgICAgICBpZihlLmtleUNvZGUgPT09IDI3KSB7XHJcbiAgICAgICAgICAgICQoXCIubW9kYWwtYmxvY2tcIikucmVtb3ZlQ2xhc3MoXCJtb2RhbC1ibG9ja19hY3RpdmVcIik7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn0pO1xyXG5qUXVlcnkod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKXtcclxuICAgIGNhYkNvbFNjcm9sbCgpO1xyXG59KTtcclxualF1ZXJ5KHdpbmRvdykub24oXCJyZXNpemVcIixmdW5jdGlvbigpe1xyXG4gICAgY2FiQ29sU2Nyb2xsKCk7XHJcbiAgICAvLyBpdGVtUmVzaXplKCk7XHJcbn0pO1xyXG5cclxuIl0sImZpbGUiOiJsay5qcyJ9
