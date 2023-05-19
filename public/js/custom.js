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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJjdXN0b20uanMiXSwic291cmNlc0NvbnRlbnQiOlsiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24gKCkge1xyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5tb2RpZmljYXRpb25fbG9hZCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgcHJvZHVjdF9pZCA9ICQodGhpcykuZGF0YSgnaWQnKTtcclxuICAgICAgICB2YXIgY2F0ZWdvcnlfaWQgPSAkKHRoaXMpLmRhdGEoJ2NhdGVnb3J5X2lkJyk7XHJcbiAgICAgICAgdmFyIGNhdGVnb3J5X2RhdGEgPSAnJztcclxuICAgICAgICBpZihjYXRlZ29yeV9pZCl7XHJcbiAgICAgICAgICAgIGNhdGVnb3J5X2RhdGEgPSAnJmNhdGVnb3J5X2lkPScrY2F0ZWdvcnlfaWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBwYXJlbnRfaXRlbSA9ICQodGhpcykucGFyZW50cygnLnByLXNtYWxsJyk7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiAnL2luZGV4LnBocD9yb3V0ZT1wcm9kdWN0L3Byb2R1Y3QvZ2V0UHJvZHVjdCcsXHJcbiAgICAgICAgICAgIHR5cGU6ICdwb3N0JyxcclxuICAgICAgICAgICAgZGF0YTogJ3Byb2R1Y3RfaWQ9JyArIHByb2R1Y3RfaWQgKyBjYXRlZ29yeV9kYXRhLFxyXG4gICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXN1bHQpXHJcbiAgICAgICAgICAgICAgICBpZiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRpdi5pbm5lckhUTUwgPSByZXN1bHQ7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHBhcmVudF9pdGVtLmZpbmQoJy5pbWcnKS5odG1sKCQoZGl2KS5maW5kKCcuaW1nJykuaHRtbCgpKTtcclxuICAgICAgICAgICAgICAgICAgICBwYXJlbnRfaXRlbS5maW5kKCcudHh0JykuaHRtbCgkKGRpdikuZmluZCgnLnR4dCcpLmh0bWwoKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcGFyZW50X2l0ZW0uZmluZCgnLmJ0bnMtcm93JykuaHRtbCgkKGRpdikuZmluZCgnLmJ0bnMtcm93JykuaHRtbCgpKTtcclxuICAgICAgICAgICAgICAgICAgICBwYXJlbnRfaXRlbS5maW5kKCcubW9kaWZpYy1ibCcpLmh0bWwoJChkaXYpLmZpbmQoJy5tb2RpZmljLWJsJykuaHRtbCgpKTtcclxuICAgICAgICAgICAgICAgICAgICB0YWJzUm93KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbiAoeGhyLCBhamF4T3B0aW9ucywgdGhyb3duRXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHRocm93bkVycm9yICsgXCJcXHJcXG5cIiArIHhoci5zdGF0dXNUZXh0ICsgXCJcXHJcXG5cIiArIHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignc3VibWl0JywgXCIuZm9ybS1zdWJtaXRcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciB0aCA9ICQodGhpcyk7XHJcbiAgICAgICAgLy8gJCgnLmxvYWRfX3ByZWxvYWRlcicpLmZhZGVJbignJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICB1cmw6ICcvaW5kZXgucGhwP3JvdXRlPWNvbW1vbi9mb290ZXIvZm9ybV9zdWJtaXQnLFxyXG4gICAgICAgICAgICBkYXRhOiB0aC5zZXJpYWxpemUoKSxcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICB9KS5kb25lKGZ1bmN0aW9uIChqc29uKSB7XHJcbiAgICAgICAgICAgIGlmIChqc29uWydzdWNjZXNzJ10pIHtcclxuICAgICAgICAgICAgICAgIC8vIGFsZXJ0KCfQktCw0YjQtSDRgdC+0L7QsdGJ0LXQvdC40LUg0L7RgtC/0YDQsNCy0LvQtdC90L4hJyk7XHJcbiAgICAgICAgICAgICAgICBsZXQgaHRtbCA9ICc8ZGl2IGNsYXNzPVwiZm9ybV93XCI+JyArIGpzb25bJ2h0bWwnXSArICc8L2Rpdj4nXHJcbiAgICAgICAgICAgICAgICB0aC5wYXJlbnQoKS5odG1sKGh0bWwpO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHQkKCcuc3VjY2Vzcy1jaGVja2JveFt2YWx1ZT1cIjBcIl0nKS50cmlnZ2VyKCdjbGljaycpO1xyXG4gICAgICAgICAgICAgICAgfSwgMTAwMDApO1xyXG4gICAgICAgICAgICAgICAgLy8gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBcdFx0dGgudHJpZ2dlcihcInJlc2V0XCIpO1xyXG4gICAgICAgICAgICAgICAgLy8gXHRcdCQoJy5sb2FkX19wcmVsb2FkZXInKS5mYWRlT3V0KFwic2xvd1wiKTtcclxuICAgICAgICAgICAgICAgIC8vIH0sIDEwMDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSk7XHJcbiAgICAkKGRvY3VtZW50KS5vbihcInN1Ym1pdFwiLCBcIi5mb3JtLXN1Ym1pdC1xdWVzdGlvblwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHRoID0gJCh0aGlzKTtcclxuICAgICAgICAvLyAkKCcubG9hZF9fcHJlbG9hZGVyJykuZmFkZUluKCcnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIHVybDogJy9pbmRleC5waHA/cm91dGU9Y29tbW9uL2Zvb3Rlci9mb3JtX3N1Ym1pdCcsXHJcbiAgICAgICAgICAgIGRhdGE6IHRoLnNlcmlhbGl6ZSgpLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgIH0pLmRvbmUoZnVuY3Rpb24gKGpzb24pIHtcclxuICAgICAgICAgICAgaWYgKGpzb25bJ3N1Y2Nlc3MnXSkge1xyXG4gICAgICAgICAgICAgICAgdGgucGFyZW50KCkuaHRtbChqc29uWydodG1sJ10pO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcblx0XHRcdFx0XHQkKCcuc3VjY2Vzcy1jaGVja2JveFt2YWx1ZT1cIjBcIl0nKS50cmlnZ2VyKCdjbGljaycpO1xyXG4gICAgICAgICAgICAgICAgfSwgMTAwMDApO1xyXG4gICAgICAgICAgICAgICAgLy8gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBcdFx0JCgnLmxvYWRfX3ByZWxvYWRlcicpLmZhZGVPdXQoXCJzbG93XCIpO1xyXG4gICAgICAgICAgICAgICAgLy8gfSwgNTAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIH0pO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0pO1xyXG4gICAgJChkb2N1bWVudCkub24oXCJjbGlja1wiLCBcIi5zdWNjZXNzLWNoZWNrYm94XCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgdGggPSAkKHRoaXMpLnBhcmVudHMoJ2Zvcm0nKTtcclxuICAgICAgICAvLyAkKCcubG9hZF9fcHJlbG9hZGVyJykuZmFkZUluKCcnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIHVybDogJy9pbmRleC5waHA/cm91dGU9Y29tbW9uL2Zvb3Rlci9mb3JtX3N1Ym1pdF9zdWNjZXNzJyxcclxuICAgICAgICAgICAgLy8gZGF0YTogJ2NoZWNrYm94PScgKyB0aC52YWwoKSxcclxuICAgICAgICAgICAgZGF0YTogdGguc2VyaWFsaXplKCksXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgfSkuZG9uZShmdW5jdGlvbiAoanNvbikge1xyXG4gICAgICAgICAgICBpZiAoanNvblsnc3VjY2VzcyddKSB7XHJcbiAgICAgICAgICAgICAgICB0aC5wYXJlbnQoKS5odG1sKGpzb25bJ2h0bWwnXSk7XHJcbiAgICAgICAgICAgICAgICAvLyBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIC8vIFx0XHQkKCcubG9hZF9fcHJlbG9hZGVyJykuZmFkZU91dChcInNsb3dcIik7XHJcbiAgICAgICAgICAgICAgICAvLyB9LCA1MDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSk7XHJcbiAgICAkKGRvY3VtZW50KS5vbihcInN1Ym1pdFwiLCBcIi5mb3JtLXN1Ym1pdC10b3BcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciB0aCA9ICQodGhpcyk7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgICAgIHVybDogJy9pbmRleC5waHA/cm91dGU9Y29tbW9uL2Zvb3Rlci9mb3JtX3N1Ym1pdF90b3AnLFxyXG4gICAgICAgICAgICBkYXRhOiB0aC5zZXJpYWxpemUoKSxcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICB9KS5kb25lKGZ1bmN0aW9uIChqc29uKSB7XHJcbiAgICAgICAgICAgIGlmIChqc29uWydzdWNjZXNzJ10pIHtcclxuICAgICAgICAgICAgICAgIHRoLnBhcmVudCgpLmh0bWwoanNvblsnaHRtbCddKTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5zdWNjZXNzLWNoZWNrYm94LXRvcFt2YWx1ZT1cIjBcIl0nKS50cmlnZ2VyKCdjbGljaycpO1xyXG4gICAgICAgICAgICAgICAgfSwgMTAwMDApO1xyXG4gICAgICAgICAgICAgICAgLy8gc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBcdFx0JCgnLmxvYWRfX3ByZWxvYWRlcicpLmZhZGVPdXQoXCJzbG93XCIpO1xyXG4gICAgICAgICAgICAgICAgLy8gfSwgNTAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIH0pO1xyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKFwic3VibWl0XCIsIFwiLmZvcm0tc3VibWl0LXJlY2FwdGNoYVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgd2luZG93LmN1cnJlbnRGb3JtID0gdGhpcztcclxuICAgICAgICBpZihjb25maWdfY2FwdGNoYV9lbmFibGVkKSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5ldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICBncmVjYXB0Y2hhLmV4ZWN1dGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIHdpbmRvd1t0aGlzLnF1ZXJ5U2VsZWN0b3IoJy5nLXJlY2FwdGNoYScpLmRhdGFzZXQuY2FsbGJhY2tdKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0pO1xyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKFwic3VibWl0XCIsIFwiLmZvcm0tc3VibWl0LXF1aXotdW5pXCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgdGggPSAkKHRoaXMpO1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICB1cmw6ICcvaW5kZXgucGhwP3JvdXRlPWNvbW1vbi9mb290ZXIvZm9ybV9zdWJtaXRfcXVpel91bmknLFxyXG4gICAgICAgICAgICBkYXRhOiB0aC5zZXJpYWxpemUoKSxcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICB9KS5kb25lKGZ1bmN0aW9uIChqc29uKSB7XHJcbiAgICAgICAgICAgIGlmIChqc29uWydzdWNjZXNzJ10pIHtcclxuICAgICAgICAgICAgICAgIC8vIHRoLmZpbmQoJy5xdWl6LXVuaScpLmFwcGVuZChqc29uWydodG1sJ10pO1xyXG4gICAgICAgICAgICAgICAgdGguZmluZCgnLnF1aXotdW5pJykuaHRtbChqc29uWydodG1sJ10pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgbGV0IHF1aFQgPSBudWxsO1xyXG4gICAgJCgnLnF1aXotdW5pLWhlbHAnKS5vbignbW91c2VvdmVyJywgZnVuY3Rpb24oKXtcclxuICAgICAgICBxdWhUID0gKG5ldyBEYXRlKCkpLmdldFRpbWUoKTtcclxuICAgICAgICB0aGlzLmZpcnN0RWxlbWVudENoaWxkLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgfSk7XHJcbiAgICAkKCcucXVpei11bmktaGVscCcpLm9uKCdtb3VzZW91dCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgdGhpcy5maXJzdEVsZW1lbnRDaGlsZC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgfSk7XHJcbiAgICAkKCcucXVpei11bmktaGVscCcpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgaWYoKG5ldyBEYXRlKCkpLmdldFRpbWUoKSAtIHF1aFQgPiA1MDApIHRoaXMuZmlyc3RFbGVtZW50Q2hpbGQuc3R5bGUuZGlzcGxheSA9IHRoaXMuZmlyc3RFbGVtZW50Q2hpbGQuc3R5bGUuZGlzcGxheT09J25vbmUnPydibG9jayc6J25vbmUnO1xyXG4gICAgfSk7XHJcblxyXG5cclxuICAgICQoZG9jdW1lbnQpLm9uKFwiY2xpY2tcIiwgXCIuc3VjY2Vzcy1jaGVja2JveC10b3BcIiwgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciB0aCA9ICQodGhpcykucGFyZW50cygnZm9ybScpO1xyXG4gICAgICAgIC8vICQoJy5sb2FkX19wcmVsb2FkZXInKS5mYWRlSW4oJycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgdXJsOiAnL2luZGV4LnBocD9yb3V0ZT1jb21tb24vZm9vdGVyL2Zvcm1fc3VibWl0X3N1Y2Nlc3NfdG9wJyxcclxuICAgICAgICAgICAgLy8gZGF0YTogJ2NoZWNrYm94PScgKyB0aC52YWwoKSxcclxuICAgICAgICAgICAgZGF0YTogdGguc2VyaWFsaXplKCksXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgfSkuZG9uZShmdW5jdGlvbiAoanNvbikge1xyXG4gICAgICAgICAgICBpZiAoanNvblsnc3VjY2VzcyddKSB7XHJcbiAgICAgICAgICAgICAgICB0aC5wYXJlbnQoKS5odG1sKGpzb25bJ2h0bWwnXSk7XHJcbiAgICAgICAgICAgICAgICAvLyBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIC8vIFx0XHQkKCcubG9hZF9fcHJlbG9hZGVyJykuZmFkZU91dChcInNsb3dcIik7XHJcbiAgICAgICAgICAgICAgICAvLyB9LCA1MDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gfSk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oXCJzdWJtaXRcIiwgXCIuZm9ybS1xdWl6XCIsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICB2YXIgdGggPSAkKHRoaXMpO1xyXG4gICAgICAgICQoJy5sb2FkX19wcmVsb2FkZXInKS5mYWRlSW4oJycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwiUE9TVFwiLFxyXG4gICAgICAgICAgICAgICAgdXJsOiAnL2luZGV4LnBocD9yb3V0ZT1jb21tb24vZm9vdGVyL3F1aXpfc3VibWl0JyxcclxuICAgICAgICAgICAgICAgIGRhdGE6IHRoLnNlcmlhbGl6ZSgpLFxyXG4gICAgICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgfSkuZG9uZShmdW5jdGlvbiAoanNvbikge1xyXG4gICAgICAgICAgICAgICAgaWYgKGpzb25bJ3N1Y2Nlc3MnXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoLmNzcygnZGlzcGxheScsICdub25lJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGgubmV4dCgnLnF1aXpfdGhhbmtzJykuY3NzKCdkaXNwbGF5JywgJ2Jsb2NrJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICQoJy5sb2FkX19wcmVsb2FkZXInKS5mYWRlT3V0KFwic2xvd1wiKTtcclxuICAgICAgICAgICAgICAgICAgICB9LCA1MDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbihcInN1Ym1pdFwiLCBcIi5tb2RhbC1ibG9ja19fZm9ybVwiLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIHRoID0gJCh0aGlzKTtcclxuICAgICAgICAkKCcubG9hZF9fcHJlbG9hZGVyJykuZmFkZUluKCcnLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcIlBPU1RcIixcclxuICAgICAgICAgICAgICAgIHVybDogJy9pbmRleC5waHA/cm91dGU9Y29tbW9uL2Zvb3Rlci9mb3JtX3N1Ym1pdF9tb2RhbCcsXHJcbiAgICAgICAgICAgICAgICBkYXRhOiB0aC5zZXJpYWxpemUoKSxcclxuICAgICAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIH0pLmRvbmUoZnVuY3Rpb24gKGpzb24pIHtcclxuICAgICAgICAgICAgICAgIGlmIChqc29uWydzdWNjZXNzJ10pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aC50cmlnZ2VyKFwicmVzZXRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgJChcIi5tb2RhbC1ibG9ja1wiKS5yZW1vdmVDbGFzcyhcIm1vZGFsLWJsb2NrX2FjdGl2ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAkKFwiI3RoYW5rc0Zvcm1cIikuYWRkQ2xhc3MoJ21vZGFsLWJsb2NrX2FjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcubG9hZF9fcHJlbG9hZGVyJykuZmFkZU91dChcInNsb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSk7XHJcblxyXG4gICAgJChkb2N1bWVudCkub24oJ2NsaWNrJywgJy5vdGhlcl9xdWl6JywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgdmFyIGlkX3F1aXogPSAkKHRoaXMpLmRhdGEoJ2lkJyk7XHJcblxyXG4gICAgICAgIHZhciB0aCA9ICQodGhpcyk7XHJcbiAgICAgICAgJCgnLmxvYWRfX3ByZWxvYWRlcicpLmZhZGVJbignJywgZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgdXJsOiAnL2luZGV4LnBocD9yb3V0ZT1wcm9kdWN0L3F1aXonLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgZGF0YTogJ3F1aXpfaWQ9JyArIGlkX3F1aXosXHJcbiAgICAgICAgICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAocmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aC5wYXJlbnRzKCcucXVpel9wYXJlbnQnKS5maW5kKCcucXVpel9vdmVybGF5JykuaHRtbChyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aC5wYXJlbnRzKCcucXVpel9wYXJlbnQnKS5maW5kKCcucXVpel9vdmVybGF5JykuZmluZCgnLmxpbmtfc291cmNlJykudmFsKHdpbmRvdy5sb2NhdGlvbi5ocmVmKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAkKCcubG9hZF9fcHJlbG9hZGVyJykuZmFkZU91dChcInNsb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDUwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9KTtcclxuXHJcbiAgICAkKGRvY3VtZW50KS5vbignY2xpY2snLCAnLmNsaWNrZWRfcXVlc3Rpb24nLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB2YXIgaWRfbW9kdWxlID0gJCh0aGlzKS5kYXRhKCdtb2R1bGUnKTtcclxuICAgICAgICB2YXIgaWRfcXVlc3Rpb24gPSAkKHRoaXMpLmRhdGEoJ2tleScpO1xyXG4gICAgICAgICQoJy5sb2FkX19wcmVsb2FkZXInKS5mYWRlSW4oJycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgIHVybDogJy9pbmRleC5waHA/cm91dGU9cHJvZHVjdC9xdWl6L2NsaWNrJyxcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcclxuICAgICAgICAgICAgICAgIGRhdGE6ICdpZF9tb2R1bGU9JyArIGlkX21vZHVsZSArICcmaWRfcXVlc3Rpb249JyArIGlkX3F1ZXN0aW9uLFxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAkKCcubG9hZF9fcHJlbG9hZGVyJykuZmFkZU91dChcInNsb3dcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgfSk7XHJcblxyXG4gICAgJC5mbi5zZXRDdXJzb3JQb3NpdGlvbiA9IGZ1bmN0aW9uIChwb3MpIHtcclxuICAgICAgICBpZiAoJCh0aGlzKS5nZXQoMCkuc2V0U2VsZWN0aW9uUmFuZ2UgJiYgJCh0aGlzKS52YWwoKS5yZXBsYWNlKC9cXEQvZywgJycpLmxlbmd0aCAhPSAxMSkge1xyXG4gICAgICAgICAgICAkKHRoaXMpLmdldCgwKS5zZXRTZWxlY3Rpb25SYW5nZShwb3MsIHBvcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICAkLm1hc2suZGVmaW5pdGlvbnNbJ04nXSA9ICdbLzAtNnw5L10nO1xyXG5cclxuICAgICQoXCIucGhvbmVfbWFza1wiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCh0aGlzKS5zZXRDdXJzb3JQb3NpdGlvbigyKTtcclxuICAgIH0pLm1hc2soXCIrNyBOOTkgOTk5LTk5LTk5XCIpO1xyXG5cclxuXHJcbiAgICAkKFwiI3NlbmRfdGVsZXBob25lXCIpLmtleXVwKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoJCh0aGlzKS52YWwoKS5yZXBsYWNlKC9cXEQvZywgJycpLmxlbmd0aCA9PSAxMSkge1xyXG4gICAgICAgICAgICAkKCcjZ2V0X2NvZGUnKS5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCgnI2dldF9jb2RlJykuYXR0cignZGlzYWJsZWQnLCAnZGlzYWJsZWQnKVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcblxyXG4gICAgJChcIiNzZW5kX3RlbGVwaG9uZVwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgJCh0aGlzKS5zZXRDdXJzb3JQb3NpdGlvbigyKTtcclxuICAgIH0pLm1hc2soXCIrNyBOOTkgOTk5LTk5LTk5XCIpO1xyXG5cclxuICAgICQoXCIjc21zX2NvZGVcIikua2V5dXAoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICgkKHRoaXMpLnZhbCgpLmxlbmd0aCA9PSA2KSB7XHJcbiAgICAgICAgICAgICQoJyNzZW5kX2NvZGUnKS5yZW1vdmVBdHRyKCdkaXNhYmxlZCcpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCgnI3NlbmRfY29kZScpLmF0dHIoJ2Rpc2FibGVkJywgJ2Rpc2FibGVkJylcclxuICAgICAgICB9XHJcbiAgICB9KVxyXG4gICAgJChcIiNzbXNfY29kZVwiKS5tYXNrKFwiOTk5OTk5XCIsIHtwbGFjZWhvbGRlcjogXCJcIn0pXHJcblxyXG4gICAgaWYgKHdpbmRvdy5tYXRjaE1lZGlhKFwiKG1heC13aWR0aDogNzIwcHgpXCIpLm1hdGNoZXMpIHtcclxuICAgICAgICAkKCcuaC0zLWNvbnRhaW5lcicpLmh0bWwoJzxoMSBjbGFzcz1cImgtM1wiPicrJCgnLmgtMi1tYWluJykudGV4dCgpKyc8L2gxPicpO1xyXG4gICAgICAgICQoJy5oLTItbWFpbicpLnJlbW92ZSgpO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAkKCdhW2hyZWYqPSNtb2R1bGVdJykuYmluZChcImNsaWNrXCIsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIHZhciBhbmNob3IgPSAkKHRoaXMpO1xyXG4gICAgICAgICQoJ2h0bWwsIGJvZHknKS5zdG9wKCkuYW5pbWF0ZSh7XHJcbiAgICAgICAgICAgIHNjcm9sbFRvcDogJChhbmNob3IuYXR0cignaHJlZicpKS5vZmZzZXQoKS50b3AgLSA3MFxyXG4gICAgICAgIH0sIDQwMCk7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgfSk7XHJcbiAgICAkKCdhW2hyZWYqPSNjYXRlZ29yeV0nKS5iaW5kKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgdmFyIGFuY2hvciA9ICQodGhpcyk7XHJcbiAgICAgICAgJCgnaHRtbCwgYm9keScpLnN0b3AoKS5hbmltYXRlKHtcclxuICAgICAgICAgICAgc2Nyb2xsVG9wOiAkKGFuY2hvci5hdHRyKCdocmVmJykpLm9mZnNldCgpLnRvcCAtIDcwXHJcbiAgICAgICAgfSwgNDAwKTtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICB9KTtcclxuXHJcblxyXG59KTtcclxuXHJcblxyXG5mdW5jdGlvbiBmb3JtU3VibWl0UmVjYXB0Y2hhX3BhcnQyKHRva2VuKXtcclxuICAgIGlmKGNvbmZpZ19jYXB0Y2hhX2VuYWJsZWQpIHdpbmRvdy5jdXJyZW50Rm9ybS5lbGVtZW50c1snZy1yZWNhcHRjaGEtcmVzcG9uc2UnXS52YWx1ZSA9IGdyZWNhcHRjaGEuZ2V0UmVzcG9uc2UoKTtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdHlwZTogXCJQT1NUXCIsXHJcbiAgICAgICAgdXJsOiAnL2luZGV4LnBocD9yb3V0ZT1jb21tb24vZm9vdGVyL2Zvcm1fc3VibWl0X3RvcCcsXHJcbiAgICAgICAgZGF0YTogJCh3aW5kb3cuY3VycmVudEZvcm0pLnNlcmlhbGl6ZSgpLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICB9KS5kb25lKGZ1bmN0aW9uIChqc29uKSB7XHJcbiAgICAgICAgaWYgKGpzb25bJ3N1Y2Nlc3MnXSkge1xyXG4gICAgICAgICAgICAkKHdpbmRvdy5jdXJyZW50Rm9ybSkucGFyZW50KCkuaHRtbChqc29uWydodG1sJ10pO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICQoJy5zdWNjZXNzLWNoZWNrYm94LXRvcFt2YWx1ZT1cIjBcIl0nKS50cmlnZ2VyKCdjbGljaycpO1xyXG4gICAgICAgICAgICB9LCAxMDAwMCk7XHJcbiAgICAgICAgICAgIC8vIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAvLyBcdFx0JCgnLmxvYWRfX3ByZWxvYWRlcicpLmZhZGVPdXQoXCJzbG93XCIpO1xyXG4gICAgICAgICAgICAvLyB9LCA1MDApO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgLy8gfSk7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbn0iXSwiZmlsZSI6ImN1c3RvbS5qcyJ9