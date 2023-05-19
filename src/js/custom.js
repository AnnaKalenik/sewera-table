$(document).ready(function () {
    $(document).on('click', '.modification_load', function () {
        var product_id = $(this).data('id');
        var category_id = $(this).data('category_id');
        var category_data = '';
        if(category_id){
            category_data = '&category_id='+category_id;
        }
        var parent_item = $(this).parents('.pr-small');
        $.ajax({
            url: '/index.php?route=product/product/getProduct',
            type: 'post',
            data: 'product_id=' + product_id + category_data,
            success: function (result) {
                console.log(result)
                if (result) {
                    var div = document.createElement('div');
                    div.innerHTML = result;

                    parent_item.find('.img').html($(div).find('.img').html());
                    parent_item.find('.txt').html($(div).find('.txt').html());
                    parent_item.find('.btns-row').html($(div).find('.btns-row').html());
                    parent_item.find('.modific-bl').html($(div).find('.modific-bl').html());
                    tabsRow();
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
            }
        });
    });

    $(document).on('submit', ".form-submit", function () {
        var th = $(this);
        // $('.load__preloader').fadeIn('', function () {
        $.ajax({
            type: "POST",
            url: '/index.php?route=common/footer/form_submit',
            data: th.serialize(),
            dataType: 'json',
        }).done(function (json) {
            if (json['success']) {
                // alert('Ваше сообщение отправлено!');
                let html = '<div class="form_w">' + json['html'] + '</div>'
                th.parent().html(html);
                setTimeout(function () {
					$('.success-checkbox[value="0"]').trigger('click');
                }, 10000);
                // setTimeout(function () {
                // 		th.trigger("reset");
                // 		$('.load__preloader').fadeOut("slow");
                // }, 1000);
            }
        });
        // });
        return false;
    });
    $(document).on("submit", ".form-submit-question", function () {
        var th = $(this);
        // $('.load__preloader').fadeIn('', function () {
        $.ajax({
            type: "POST",
            url: '/index.php?route=common/footer/form_submit',
            data: th.serialize(),
            dataType: 'json',
        }).done(function (json) {
            if (json['success']) {
                th.parent().html(json['html']);
                setTimeout(function () {
					$('.success-checkbox[value="0"]').trigger('click');
                }, 10000);
                // setTimeout(function () {
                // 		$('.load__preloader').fadeOut("slow");
                // }, 500);
            }
        });
        // });
        return false;
    });
    $(document).on("click", ".success-checkbox", function () {
        var th = $(this).parents('form');
        // $('.load__preloader').fadeIn('', function () {
        $.ajax({
            type: "POST",
            url: '/index.php?route=common/footer/form_submit_success',
            // data: 'checkbox=' + th.val(),
            data: th.serialize(),
            dataType: 'json',
        }).done(function (json) {
            if (json['success']) {
                th.parent().html(json['html']);
                // setTimeout(function () {
                // 		$('.load__preloader').fadeOut("slow");
                // }, 500);
            }
        });
        // });
        return false;
    });
    $(document).on("submit", ".form-submit-top", function () {
        var th = $(this);
        $.ajax({
            type: "POST",
            url: '/index.php?route=common/footer/form_submit_top',
            data: th.serialize(),
            dataType: 'json',
        }).done(function (json) {
            if (json['success']) {
                th.parent().html(json['html']);
                setTimeout(function () {
                    $('.success-checkbox-top[value="0"]').trigger('click');
                }, 10000);
                // setTimeout(function () {
                // 		$('.load__preloader').fadeOut("slow");
                // }, 500);
            }
        });
        // });
        return false;
    });

    $(document).on("submit", ".form-submit-recaptcha", function () {
        window.currentForm = this;
        if(config_captcha_enabled) {
            window.event.preventDefault();
            grecaptcha.execute();
        }
        else {
            window[this.querySelector('.g-recaptcha').dataset.callback]();
        }
        return false;
    });

    $(document).on("submit", ".form-submit-quiz-uni", function () {
        var th = $(this);
        $.ajax({
            type: "POST",
            url: '/index.php?route=common/footer/form_submit_quiz_uni',
            data: th.serialize(),
            dataType: 'json',
        }).done(function (json) {
            if (json['success']) {
                // th.find('.quiz-uni').append(json['html']);
                th.find('.quiz-uni').html(json['html']);
            }
        });
        return false;
    });

    let quhT = null;
    $('.quiz-uni-help').on('mouseover', function(){
        quhT = (new Date()).getTime();
        this.firstElementChild.style.display = 'block';
    });
    $('.quiz-uni-help').on('mouseout', function(){
        this.firstElementChild.style.display = 'none';
    });
    $('.quiz-uni-help').on('click', function(){
        if((new Date()).getTime() - quhT > 500) this.firstElementChild.style.display = this.firstElementChild.style.display=='none'?'block':'none';
    });


    $(document).on("click", ".success-checkbox-top", function () {
        var th = $(this).parents('form');
        // $('.load__preloader').fadeIn('', function () {
        $.ajax({
            type: "POST",
            url: '/index.php?route=common/footer/form_submit_success_top',
            // data: 'checkbox=' + th.val(),
            data: th.serialize(),
            dataType: 'json',
        }).done(function (json) {
            if (json['success']) {
                th.parent().html(json['html']);
                // setTimeout(function () {
                // 		$('.load__preloader').fadeOut("slow");
                // }, 500);
            }
        });
        // });
        return false;
    });

    $(document).on("submit", ".form-quiz", function () {
        var th = $(this);
        $('.load__preloader').fadeIn('', function () {
            $.ajax({
                type: "POST",
                url: '/index.php?route=common/footer/quiz_submit',
                data: th.serialize(),
                dataType: 'json',
            }).done(function (json) {
                if (json['success']) {
                    th.css('display', 'none');
                    th.next('.quiz_thanks').css('display', 'block');
                    setTimeout(function () {
                        $('.load__preloader').fadeOut("slow");
                    }, 500);
                }
            });
        });
        return false;
    });

    $(document).on("submit", ".modal-block__form", function () {
        var th = $(this);
        $('.load__preloader').fadeIn('', function () {
            $.ajax({
                type: "POST",
                url: '/index.php?route=common/footer/form_submit_modal',
                data: th.serialize(),
                dataType: 'json',
            }).done(function (json) {
                if (json['success']) {
                    th.trigger("reset");
                    $(".modal-block").removeClass("modal-block_active");
                    $("#thanksForm").addClass('modal-block_active');
                    setTimeout(function () {
                        $('.load__preloader').fadeOut("slow");
                    }, 500);
                }
            });
        });
        return false;
    });

    $(document).on('click', '.other_quiz', function (e) {
        e.preventDefault();
        var id_quiz = $(this).data('id');

        var th = $(this);
        $('.load__preloader').fadeIn('', function () {
            $.ajax({
                url: '/index.php?route=product/quiz',
                type: 'POST',
                data: 'quiz_id=' + id_quiz,
                success: function (result) {
                    if (result) {
                        th.parents('.quiz_parent').find('.quiz_overlay').html(result);
                        th.parents('.quiz_parent').find('.quiz_overlay').find('.link_source').val(window.location.href);
                        setTimeout(function () {
                            $('.load__preloader').fadeOut("slow");
                        }, 500);
                    }
                }
            });
        });

    });

    $(document).on('click', '.clicked_question', function (e) {
        e.preventDefault();
        var id_module = $(this).data('module');
        var id_question = $(this).data('key');
        $('.load__preloader').fadeIn('', function () {
            $.ajax({
                url: '/index.php?route=product/quiz/click',
                type: 'POST',
                data: 'id_module=' + id_module + '&id_question=' + id_question,
                success: function () {
                    setTimeout(function () {
                        $('.load__preloader').fadeOut("slow");
                    }, 500);
                }
            });
        });

    });

    $.fn.setCursorPosition = function (pos) {
        if ($(this).get(0).setSelectionRange && $(this).val().replace(/\D/g, '').length != 11) {
            $(this).get(0).setSelectionRange(pos, pos);
        }
    };

    $.mask.definitions['N'] = '[/0-6|9/]';

    $(".phone_mask").click(function () {
        $(this).setCursorPosition(2);
    }).mask("+7 N99 999-99-99");


    $("#send_telephone").keyup(function () {
        if ($(this).val().replace(/\D/g, '').length == 11) {
            $('#get_code').removeAttr('disabled')
        } else {
            $('#get_code').attr('disabled', 'disabled')
        }
    })

    $("#send_telephone").click(function () {
        $(this).setCursorPosition(2);
    }).mask("+7 N99 999-99-99");

    $("#sms_code").keyup(function () {
        if ($(this).val().length == 6) {
            $('#send_code').removeAttr('disabled')
        } else {
            $('#send_code').attr('disabled', 'disabled')
        }
    })
    $("#sms_code").mask("999999", {placeholder: ""})

    if (window.matchMedia("(max-width: 720px)").matches) {
        $('.h-3-container').html('<h1 class="h-3">'+$('.h-2-main').text()+'</h1>');
        $('.h-2-main').remove();
    }


    $('a[href*=#module]').bind("click", function(e){
        var anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top - 70
        }, 400);
        e.preventDefault();
    });
    $('a[href*=#category]').bind("click", function(e){
        var anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $(anchor.attr('href')).offset().top - 70
        }, 400);
        e.preventDefault();
    });


});


function formSubmitRecaptcha_part2(token){
    if(config_captcha_enabled) window.currentForm.elements['g-recaptcha-response'].value = grecaptcha.getResponse();
    $.ajax({
        type: "POST",
        url: '/index.php?route=common/footer/form_submit_top',
        data: $(window.currentForm).serialize(),
        dataType: 'json',
    }).done(function (json) {
        if (json['success']) {
            $(window.currentForm).parent().html(json['html']);
            setTimeout(function () {
                $('.success-checkbox-top[value="0"]').trigger('click');
            }, 10000);
            // setTimeout(function () {
            // 		$('.load__preloader').fadeOut("slow");
            // }, 500);
        }
    });
    // });
    return false;
}