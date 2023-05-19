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

