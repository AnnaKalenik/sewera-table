document.addEventListener('DOMContentLoaded', () => {
    // Tooltip
    function toggleTooltip() {
        let icon = document.querySelector('.product-page__tooltip-icon');
        let textBlock = document.querySelector('.product-page__tooltip-text');

        const toggle = () => {
            icon.classList.toggle('product-page__tooltip-icon_active');
            textBlock.classList.toggle('product-page__tooltip-text_active');
        }
          
        if (icon) {
            icon.addEventListener('click', (e) => {
                e.stopPropagation();
              
                toggle();
            });

            document.addEventListener('click', (e) => {
                let target = e.target;
                let its_textBlock = target == textBlock || textBlock.contains(target);
                let textBlock_is_active = textBlock.classList.contains('product-page__tooltip-text_active');
                
                if (!its_textBlock && textBlock_is_active) {
                    toggle();
                }
            })
        }
    }
    toggleTooltip();

    // Modification
    function toggleBtnModific() {
        if(document.querySelector('.product-page__modific-list1')) {
            let list1 = document.querySelectorAll('.product-page__modific-list1 .product-page__modific-item');
            list1.forEach(item => {
                item.addEventListener('click', () => {
                    list1.forEach(item => item.classList.remove('product-page__modific-item_active'));
                    item.classList.add('product-page__modific-item_active');
                })
            });
        }

        if(document.querySelector('.product-page__modific-list2')) {
            let list2 = document.querySelectorAll('.product-page__modific-list2 .product-page__modific-item');

            list2.forEach(item => {
                item.addEventListener('click', () => {
                    list2.forEach(item => item.classList.remove('product-page__modific-item_active'));
                    item.classList.add('product-page__modific-item_active');
                })
            });
        }
    }
    toggleBtnModific();

    // Specification
    function btnAllSpecific() {
        if (document.querySelector('.product-page__specific-btn')) {
            let btn = document.querySelector('.product-page__specific-btn');
            let tabWrap = document.querySelector('.product-page__tabs-wrap');
            let tab = document.querySelectorAll('.product-page__triggers-item')[1];
    
            btn.addEventListener('click', () => {
                tabWrap.scrollIntoView({ behavior: 'smooth', block: "start" });
                tab.click();
            })
        }
    }
    btnAllSpecific();

    // Tabs
    function toggleTabs() {
        if(document.querySelector('.product-page__triggers-item')) {
            let tabList = document.querySelectorAll('.product-page__triggers-item');
            let contentList = document.querySelectorAll('.product-page__content-item');
    
            tabList.forEach(item => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    const id = e.target.getAttribute('href').replace('#', '');
    
                    tabList.forEach(item => item.classList.remove('product-page__triggers-item_active'));
                    contentList.forEach(item => item.classList.remove('product-page__content-item_active'));
    
                    item.classList.add('product-page__triggers-item_active');
                    document.getElementById(id).classList.add('product-page__content-item_active');
                })
            })
    
            if (document.querySelector('.product-page__triggers-item')) {
                document.querySelector('.product-page__triggers-item').click();
            }    
        }
    }

    toggleTabs();

    function countProducts() {
        if(document.querySelector('.product-page__input')) {
            const btnsPlus = document.querySelectorAll('.product-page__plus');
            const btnsMinus = document.querySelectorAll('.product-page__minus');
            const inputs = document.querySelectorAll('.product-page__input');
        
            btnsPlus.forEach(btn => btn.addEventListener("click", () => {
                let input = btn.closest('.product-page__amount').querySelector('.product-page__input');
                input.value = Number(input.value) + 1;
            }))
        
            btnsMinus.forEach(btn => btn.addEventListener("click", () => {
                let input = btn.closest('.product-page__amount').querySelector('.product-page__input');
        
                if(input.value <= 1) return;
                input.value = Number(input.value) - 1;
            }))
    
            inputs.forEach(input => input.addEventListener("change", () => {
                if(input.value <= 1) input.value = 1;
                input.value = Math.ceil(input.value);
            }))    
        }
    }
    
    countProducts();

    // const tabFeedbacks = document.getElementById('tab-4');
    //
    // function openForm() {
    //     if (tabFeedbacks) {
	// 		const btn = document.querySelector('.product-feedbacks__btn-green');
	// 		const blockBtn = document.querySelector('.product-feedbacks__btn-block');
	// 		const blockForm = document.querySelector('.product-feedbacks__form');
	//
	// 		btn.addEventListener('click', () => {
    //             blockForm.classList.add('product-feedbacks__form_open');
    //             blockBtn.classList.add('product-feedbacks__btn-block_hidden');
	// 		});
    //
    //         form();
	// 	}
	// }
    //
	// openForm();
    //
    // function form() {
    //
    //     if (tabFeedbacks) {
	// 		const inputImage = document.querySelector('#formFileReview');
	// 		const preview = document.querySelector('#output');
    //
	// 		inputImage.addEventListener('change', () => {
    //             let count = inputImage.files.length;
	// 			uploadFile(count);
	// 			preview.addEventListener('DOMSubtreeModified', deletePhoto);
	// 		});
    //
	// 		function uploadFile (count) {
	// 			preview.innerHTML = `
    //                 <div class="form__count-files">
    //                     Загружено файлов: ${count}
	// 			        <button type="button" class="form__delete">Удалить</button>
    //                 </div>
	// 			`;
	// 		}
    //
    //         //удаление изображения
	// 	    function deletePhoto() {
	// 	    	const btnDelete = document.querySelector('.form__delete');
	// 	    	if(btnDelete) {
	// 	    		btnDelete.addEventListener('click', () => {
	// 	    			preview.innerHTML = '';
	// 	    			inputImage.value = '';
	// 	    		})
	// 	    	}
	// 	    }
	// 	}
	// }
    //
	// form();
    //
    // function btnExpand() {
    //     if (tabFeedbacks) {
    //         const feedbacksList = document.querySelectorAll('.product-feedbacks__review');
    //
    //         feedbacksList.forEach(feedback => {
    //             const scrollElem = feedback.querySelector('.product-feedbacks__rating');
    //             const textBlock = feedback.querySelector('.product-feedbacks__text-block');
    //             const btn = feedback.querySelector('.product-feedbacks__btn-expand');
    //
    //             if (textBlock !== null || btn !== null && textBlock.offsetHeight > 265) {
    //                 btn.classList.add('product-feedbacks__btn-expand_active');
    //             }
    //
    //             if (btn !== null && btn.classList.contains('product-feedbacks__btn-expand_active')) {
    //                 btn.addEventListener("click", () => {
    //                     textBlock.classList.toggle('open');
    //
    //                     if(textBlock.classList.contains('open')) {
    //                         btn.innerHTML = 'Свернуть отзыв';
    //                     } else {
    //                         btn.innerHTML = 'Показать полностью';
    //                         scrollElem.scrollIntoView({block: "center", behavior: "smooth"});
    //                     }
    //                 })
    //             }
    //         });
    //     }
    // }
    //
    // btnExpand();

    const galleryThumbsProduct = new Swiper('.product-page__gallery-nav .swiper', {
        spaceBetween: 0,
        slidesPerView: 3,
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
    
        breakpoints: {
            320: {
                spaceBetween: 21.51,
            },
            1021: {
                spaceBetween: 23.01,
            },
            1351: {
                spaceBetween: 32.76,
            }
        },
    });
    
    const galleryTopProduct = new Swiper('.product-page__gallery-for .swiper', {
        spaceBetween: 0,
        navigation: {nextEl: '.product-page__gallery-nav .swiper-button.next', prevEl: '.product-page__gallery-nav .swiper-button.prev',},
        thumbs: {swiper: galleryThumbsProduct}
    });
    
    const tabsSlider = new Swiper('.product-page__tabs', {
        slidesPerView: "auto",
        freeMode: true,
        spaceBetween: 0,
    
        breakpoints: {
            320: {
                grabCursor: true,
                allowTouchMove: true,
            },
            769: {
                grabCursor: false,
                allowTouchMove: false,
            }
        },
    });
    
    // document.querySelectorAll('.product-feedbacks__slider-wrap').forEach(slider => {
    //     new Swiper(slider.querySelector('.swiper'), {
    //         loop: false,
    //         allowTouchMove: true,
    //
    //         breakpoints: {
    //             320: {
    //                 slidesPerView: 4,
    //                 spaceBetween: 3.61,
    //             },
    //             483: {
    //                 slidesPerView: 5,
    //                 spaceBetween: 17.67,
    //             },
    //             605: {
    //                 slidesPerView: 6,
    //                 spaceBetween: 17.67,
    //             },
    //             686: {
    //                 slidesPerView: 7,
    //                 spaceBetween: 17.67,
    //             },
    //             768: {
    //                 slidesPerView: 8,
    //                 spaceBetween: 17.67,
    //             },
    //             1021: {
    //                 slidesPerView: 9,
    //                 spaceBetween: 11,
    //             },
    //             1351: {
    //                 slidesPerView: 10,
    //                 spaceBetween: 25.91,
    //             }
    //         },
    //
    //         navigation: {
    //             nextEl: slider.querySelector('.swiper-button.next'),
    //             prevEl: slider.querySelector('.swiper-button.prev'),
    //         },
    //     });
    // });
})

function productReviewPagination(page, product_id) {
    let url = `/index.php?route=product/product/review&page=${page}&product_id=${product_id}`

    let productReviewWrap = document.getElementById('product-review-wrap')

    let xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.send()

    xhr.onload = () => {
        let result = xhr.response
        console.log(result)
        let content = new DOMParser();
        content = content.parseFromString(result, "text/html").getElementById('product-review-wrap').querySelectorAll('.product-feedbacks__review');

        productReviewWrap.innerHTML = ''

        content.forEach((html)=>{
            productReviewWrap.insertAdjacentHTML('beforeend', html.outerHTML)
        })

        let productReviewPagination = new DOMParser();

        document.getElementById('product-review-pagination').innerHTML = ''

        productReviewPagination = productReviewPagination.parseFromString(result, "text/html").getElementById('product-review-pagination');

        document.getElementById('product-review-pagination').innerHTML = productReviewPagination.outerHTML

    }
}

function sendFormProductReview(){
    let formProductReview = document.getElementById('product-form-review')

    let files = document.getElementById('formFileReview').files

    let formData = new FormData(formProductReview);

    formData.append('images[]', files)

    let url = '/index.php?route=product/product/add_review'

    formProductReview.querySelector('button').disabled = "disabled"

    let xhr = new XMLHttpRequest();
    xhr.open('POST', url);
    xhr.send(formData)

    xhr.onload = () => {
        let result = xhr.response
        result = JSON.parse(result)

        formProductReview.querySelector('button').disabled = "disabled"

        let formReview = document.getElementById('product-review-wrap')

        console.log(result)
        if(result['success']){
            document.getElementById('form-review-error').style.display = "none"
            document.getElementById('product-review-wrap').insertAdjacentHTML('afterbegin', result['success'])

            formProductReview.querySelectorAll('input[type="text"]').forEach((elem)=>{
                console.log(elem)
                elem.value = ''
            })

            formProductReview.querySelectorAll('textarea').forEach((elem)=>{
                console.log(elem)
                elem.value = ''
                elem.innerHTML = ''
            })

            document.querySelector('.product-page__triggers-score').innerText = Number(document.querySelector('.product-page__triggers-score').innerText) + 1

            document.querySelectorAll('.product-feedbacks__slider-wrap').forEach(slider => {
                new Swiper(slider.querySelector('.swiper'), {
                    loop: false,
                    allowTouchMove: true,

                    breakpoints: {
                        320: {
                            slidesPerView: 4,
                            spaceBetween: 3.61,
                        },
                        483: {
                            slidesPerView: 5,
                            spaceBetween: 17.67,
                        },
                        605: {
                            slidesPerView: 6,
                            spaceBetween: 17.67,
                        },
                        686: {
                            slidesPerView: 7,
                            spaceBetween: 17.67,
                        },
                        768: {
                            slidesPerView: 8,
                            spaceBetween: 17.67,
                        },
                        1021: {
                            slidesPerView: 9,
                            spaceBetween: 11,
                        },
                        1351: {
                            slidesPerView: 10,
                            spaceBetween: 25.91,
                        }
                    },

                    navigation: {
                        nextEl: slider.querySelector('.swiper-button.next'),
                        prevEl: slider.querySelector('.swiper-button.prev'),
                    },
                });
            });

            document.querySelector('.product-feedbacks__form').classList.remove('product-feedbacks__form_open')
            // document.querySelector('.product-feedbacks__btn-block').classList.remove('product-feedbacks__btn-block_hidden')
        }else{
            if (result['error']){
                document.getElementById('form-review-error').style.display = "block"
                document.getElementById('form-review-error').innerText = result['error']
            }
            formProductReview.querySelector('button').disabled = false
        }
    };

    xhr.onprogress = () => {
        console.log('Загрузка')
    }

    xhr.onerror = () => {
        load = false
        document.querySelector('.loader').classList.remove('active')
        console.log('Ошибка', xhr.status)
    }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJhcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgICAvLyBUb29sdGlwXG4gICAgZnVuY3Rpb24gdG9nZ2xlVG9vbHRpcCgpIHtcbiAgICAgICAgbGV0IGljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdC1wYWdlX190b29sdGlwLWljb24nKTtcbiAgICAgICAgbGV0IHRleHRCbG9jayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0LXBhZ2VfX3Rvb2x0aXAtdGV4dCcpO1xuXG4gICAgICAgIGNvbnN0IHRvZ2dsZSA9ICgpID0+IHtcbiAgICAgICAgICAgIGljb24uY2xhc3NMaXN0LnRvZ2dsZSgncHJvZHVjdC1wYWdlX190b29sdGlwLWljb25fYWN0aXZlJyk7XG4gICAgICAgICAgICB0ZXh0QmxvY2suY2xhc3NMaXN0LnRvZ2dsZSgncHJvZHVjdC1wYWdlX190b29sdGlwLXRleHRfYWN0aXZlJyk7XG4gICAgICAgIH1cbiAgICAgICAgICBcbiAgICAgICAgaWYgKGljb24pIHtcbiAgICAgICAgICAgIGljb24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIHRvZ2dsZSgpO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgdGFyZ2V0ID0gZS50YXJnZXQ7XG4gICAgICAgICAgICAgICAgbGV0IGl0c190ZXh0QmxvY2sgPSB0YXJnZXQgPT0gdGV4dEJsb2NrIHx8IHRleHRCbG9jay5jb250YWlucyh0YXJnZXQpO1xuICAgICAgICAgICAgICAgIGxldCB0ZXh0QmxvY2tfaXNfYWN0aXZlID0gdGV4dEJsb2NrLmNsYXNzTGlzdC5jb250YWlucygncHJvZHVjdC1wYWdlX190b29sdGlwLXRleHRfYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgaWYgKCFpdHNfdGV4dEJsb2NrICYmIHRleHRCbG9ja19pc19hY3RpdmUpIHtcbiAgICAgICAgICAgICAgICAgICAgdG9nZ2xlKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSlcbiAgICAgICAgfVxuICAgIH1cbiAgICB0b2dnbGVUb29sdGlwKCk7XG5cbiAgICAvLyBNb2RpZmljYXRpb25cbiAgICBmdW5jdGlvbiB0b2dnbGVCdG5Nb2RpZmljKCkge1xuICAgICAgICBpZihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdC1wYWdlX19tb2RpZmljLWxpc3QxJykpIHtcbiAgICAgICAgICAgIGxldCBsaXN0MSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9kdWN0LXBhZ2VfX21vZGlmaWMtbGlzdDEgLnByb2R1Y3QtcGFnZV9fbW9kaWZpYy1pdGVtJyk7XG4gICAgICAgICAgICBsaXN0MS5mb3JFYWNoKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGxpc3QxLmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ3Byb2R1Y3QtcGFnZV9fbW9kaWZpYy1pdGVtX2FjdGl2ZScpKTtcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKCdwcm9kdWN0LXBhZ2VfX21vZGlmaWMtaXRlbV9hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBpZihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdC1wYWdlX19tb2RpZmljLWxpc3QyJykpIHtcbiAgICAgICAgICAgIGxldCBsaXN0MiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9kdWN0LXBhZ2VfX21vZGlmaWMtbGlzdDIgLnByb2R1Y3QtcGFnZV9fbW9kaWZpYy1pdGVtJyk7XG5cbiAgICAgICAgICAgIGxpc3QyLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgbGlzdDIuZm9yRWFjaChpdGVtID0+IGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgncHJvZHVjdC1wYWdlX19tb2RpZmljLWl0ZW1fYWN0aXZlJykpO1xuICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJ3Byb2R1Y3QtcGFnZV9fbW9kaWZpYy1pdGVtX2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1cbiAgICB0b2dnbGVCdG5Nb2RpZmljKCk7XG5cbiAgICAvLyBTcGVjaWZpY2F0aW9uXG4gICAgZnVuY3Rpb24gYnRuQWxsU3BlY2lmaWMoKSB7XG4gICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdC1wYWdlX19zcGVjaWZpYy1idG4nKSkge1xuICAgICAgICAgICAgbGV0IGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0LXBhZ2VfX3NwZWNpZmljLWJ0bicpO1xuICAgICAgICAgICAgbGV0IHRhYldyYXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdC1wYWdlX190YWJzLXdyYXAnKTtcbiAgICAgICAgICAgIGxldCB0YWIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvZHVjdC1wYWdlX190cmlnZ2Vycy1pdGVtJylbMV07XG4gICAgXG4gICAgICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGFiV3JhcC5zY3JvbGxJbnRvVmlldyh7IGJlaGF2aW9yOiAnc21vb3RoJywgYmxvY2s6IFwic3RhcnRcIiB9KTtcbiAgICAgICAgICAgICAgICB0YWIuY2xpY2soKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG4gICAgYnRuQWxsU3BlY2lmaWMoKTtcblxuICAgIC8vIFRhYnNcbiAgICBmdW5jdGlvbiB0b2dnbGVUYWJzKCkge1xuICAgICAgICBpZihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdC1wYWdlX190cmlnZ2Vycy1pdGVtJykpIHtcbiAgICAgICAgICAgIGxldCB0YWJMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2R1Y3QtcGFnZV9fdHJpZ2dlcnMtaXRlbScpO1xuICAgICAgICAgICAgbGV0IGNvbnRlbnRMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2R1Y3QtcGFnZV9fY29udGVudC1pdGVtJyk7XG4gICAgXG4gICAgICAgICAgICB0YWJMaXN0LmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaWQgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2hyZWYnKS5yZXBsYWNlKCcjJywgJycpO1xuICAgIFxuICAgICAgICAgICAgICAgICAgICB0YWJMaXN0LmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ3Byb2R1Y3QtcGFnZV9fdHJpZ2dlcnMtaXRlbV9hY3RpdmUnKSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRMaXN0LmZvckVhY2goaXRlbSA9PiBpdGVtLmNsYXNzTGlzdC5yZW1vdmUoJ3Byb2R1Y3QtcGFnZV9fY29udGVudC1pdGVtX2FjdGl2ZScpKTtcbiAgICBcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKCdwcm9kdWN0LXBhZ2VfX3RyaWdnZXJzLWl0ZW1fYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKS5jbGFzc0xpc3QuYWRkKCdwcm9kdWN0LXBhZ2VfX2NvbnRlbnQtaXRlbV9hY3RpdmUnKTtcbiAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgfSlcbiAgICBcbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdC1wYWdlX190cmlnZ2Vycy1pdGVtJykpIHtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdC1wYWdlX190cmlnZ2Vycy1pdGVtJykuY2xpY2soKTtcbiAgICAgICAgICAgIH0gICAgXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICB0b2dnbGVUYWJzKCk7XG5cbiAgICBmdW5jdGlvbiBjb3VudFByb2R1Y3RzKCkge1xuICAgICAgICBpZihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdC1wYWdlX19pbnB1dCcpKSB7XG4gICAgICAgICAgICBjb25zdCBidG5zUGx1cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9kdWN0LXBhZ2VfX3BsdXMnKTtcbiAgICAgICAgICAgIGNvbnN0IGJ0bnNNaW51cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9kdWN0LXBhZ2VfX21pbnVzJyk7XG4gICAgICAgICAgICBjb25zdCBpbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvZHVjdC1wYWdlX19pbnB1dCcpO1xuICAgICAgICBcbiAgICAgICAgICAgIGJ0bnNQbHVzLmZvckVhY2goYnRuID0+IGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBpbnB1dCA9IGJ0bi5jbG9zZXN0KCcucHJvZHVjdC1wYWdlX19hbW91bnQnKS5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdC1wYWdlX19pbnB1dCcpO1xuICAgICAgICAgICAgICAgIGlucHV0LnZhbHVlID0gTnVtYmVyKGlucHV0LnZhbHVlKSArIDE7XG4gICAgICAgICAgICB9KSlcbiAgICAgICAgXG4gICAgICAgICAgICBidG5zTWludXMuZm9yRWFjaChidG4gPT4gYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGlucHV0ID0gYnRuLmNsb3Nlc3QoJy5wcm9kdWN0LXBhZ2VfX2Ftb3VudCcpLnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0LXBhZ2VfX2lucHV0Jyk7XG4gICAgICAgIFxuICAgICAgICAgICAgICAgIGlmKGlucHV0LnZhbHVlIDw9IDEpIHJldHVybjtcbiAgICAgICAgICAgICAgICBpbnB1dC52YWx1ZSA9IE51bWJlcihpbnB1dC52YWx1ZSkgLSAxO1xuICAgICAgICAgICAgfSkpXG4gICAgXG4gICAgICAgICAgICBpbnB1dHMuZm9yRWFjaChpbnB1dCA9PiBpbnB1dC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsICgpID0+IHtcbiAgICAgICAgICAgICAgICBpZihpbnB1dC52YWx1ZSA8PSAxKSBpbnB1dC52YWx1ZSA9IDE7XG4gICAgICAgICAgICAgICAgaW5wdXQudmFsdWUgPSBNYXRoLmNlaWwoaW5wdXQudmFsdWUpO1xuICAgICAgICAgICAgfSkpICAgIFxuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGNvdW50UHJvZHVjdHMoKTtcblxuICAgIC8vIGNvbnN0IHRhYkZlZWRiYWNrcyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0YWItNCcpO1xuICAgIC8vXG4gICAgLy8gZnVuY3Rpb24gb3BlbkZvcm0oKSB7XG4gICAgLy8gICAgIGlmICh0YWJGZWVkYmFja3MpIHtcblx0Ly8gXHRcdGNvbnN0IGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0LWZlZWRiYWNrc19fYnRuLWdyZWVuJyk7XG5cdC8vIFx0XHRjb25zdCBibG9ja0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0LWZlZWRiYWNrc19fYnRuLWJsb2NrJyk7XG5cdC8vIFx0XHRjb25zdCBibG9ja0Zvcm0gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdC1mZWVkYmFja3NfX2Zvcm0nKTtcblx0Ly9cblx0Ly8gXHRcdGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAvLyAgICAgICAgICAgICBibG9ja0Zvcm0uY2xhc3NMaXN0LmFkZCgncHJvZHVjdC1mZWVkYmFja3NfX2Zvcm1fb3BlbicpO1xuICAgIC8vICAgICAgICAgICAgIGJsb2NrQnRuLmNsYXNzTGlzdC5hZGQoJ3Byb2R1Y3QtZmVlZGJhY2tzX19idG4tYmxvY2tfaGlkZGVuJyk7XG5cdC8vIFx0XHR9KTtcbiAgICAvL1xuICAgIC8vICAgICAgICAgZm9ybSgpO1xuXHQvLyBcdH1cblx0Ly8gfVxuICAgIC8vXG5cdC8vIG9wZW5Gb3JtKCk7XG4gICAgLy9cbiAgICAvLyBmdW5jdGlvbiBmb3JtKCkge1xuICAgIC8vXG4gICAgLy8gICAgIGlmICh0YWJGZWVkYmFja3MpIHtcblx0Ly8gXHRcdGNvbnN0IGlucHV0SW1hZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZm9ybUZpbGVSZXZpZXcnKTtcblx0Ly8gXHRcdGNvbnN0IHByZXZpZXcgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjb3V0cHV0Jyk7XG4gICAgLy9cblx0Ly8gXHRcdGlucHV0SW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgIC8vICAgICAgICAgICAgIGxldCBjb3VudCA9IGlucHV0SW1hZ2UuZmlsZXMubGVuZ3RoO1xuXHQvLyBcdFx0XHR1cGxvYWRGaWxlKGNvdW50KTtcblx0Ly8gXHRcdFx0cHJldmlldy5hZGRFdmVudExpc3RlbmVyKCdET01TdWJ0cmVlTW9kaWZpZWQnLCBkZWxldGVQaG90byk7XG5cdC8vIFx0XHR9KTtcbiAgICAvL1xuXHQvLyBcdFx0ZnVuY3Rpb24gdXBsb2FkRmlsZSAoY291bnQpIHtcblx0Ly8gXHRcdFx0cHJldmlldy5pbm5lckhUTUwgPSBgXG4gICAgLy8gICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmb3JtX19jb3VudC1maWxlc1wiPlxuICAgIC8vICAgICAgICAgICAgICAgICAgICAg0JfQsNCz0YDRg9C20LXQvdC+INGE0LDQudC70L7QsjogJHtjb3VudH1cblx0Ly8gXHRcdFx0ICAgICAgICA8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImZvcm1fX2RlbGV0ZVwiPtCj0LTQsNC70LjRgtGMPC9idXR0b24+XG4gICAgLy8gICAgICAgICAgICAgICAgIDwvZGl2PlxuXHQvLyBcdFx0XHRgO1xuXHQvLyBcdFx0fVxuICAgIC8vXG4gICAgLy8gICAgICAgICAvL9GD0LTQsNC70LXQvdC40LUg0LjQt9C+0LHRgNCw0LbQtdC90LjRj1xuXHQvLyBcdCAgICBmdW5jdGlvbiBkZWxldGVQaG90bygpIHtcblx0Ly8gXHQgICAgXHRjb25zdCBidG5EZWxldGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9ybV9fZGVsZXRlJyk7XG5cdC8vIFx0ICAgIFx0aWYoYnRuRGVsZXRlKSB7XG5cdC8vIFx0ICAgIFx0XHRidG5EZWxldGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XG5cdC8vIFx0ICAgIFx0XHRcdHByZXZpZXcuaW5uZXJIVE1MID0gJyc7XG5cdC8vIFx0ICAgIFx0XHRcdGlucHV0SW1hZ2UudmFsdWUgPSAnJztcblx0Ly8gXHQgICAgXHRcdH0pXG5cdC8vIFx0ICAgIFx0fVxuXHQvLyBcdCAgICB9XG5cdC8vIFx0fVxuXHQvLyB9XG4gICAgLy9cblx0Ly8gZm9ybSgpO1xuICAgIC8vXG4gICAgLy8gZnVuY3Rpb24gYnRuRXhwYW5kKCkge1xuICAgIC8vICAgICBpZiAodGFiRmVlZGJhY2tzKSB7XG4gICAgLy8gICAgICAgICBjb25zdCBmZWVkYmFja3NMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2R1Y3QtZmVlZGJhY2tzX19yZXZpZXcnKTtcbiAgICAvL1xuICAgIC8vICAgICAgICAgZmVlZGJhY2tzTGlzdC5mb3JFYWNoKGZlZWRiYWNrID0+IHtcbiAgICAvLyAgICAgICAgICAgICBjb25zdCBzY3JvbGxFbGVtID0gZmVlZGJhY2sucXVlcnlTZWxlY3RvcignLnByb2R1Y3QtZmVlZGJhY2tzX19yYXRpbmcnKTtcbiAgICAvLyAgICAgICAgICAgICBjb25zdCB0ZXh0QmxvY2sgPSBmZWVkYmFjay5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdC1mZWVkYmFja3NfX3RleHQtYmxvY2snKTtcbiAgICAvLyAgICAgICAgICAgICBjb25zdCBidG4gPSBmZWVkYmFjay5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdC1mZWVkYmFja3NfX2J0bi1leHBhbmQnKTtcbiAgICAvL1xuICAgIC8vICAgICAgICAgICAgIGlmICh0ZXh0QmxvY2sgIT09IG51bGwgfHwgYnRuICE9PSBudWxsICYmIHRleHRCbG9jay5vZmZzZXRIZWlnaHQgPiAyNjUpIHtcbiAgICAvLyAgICAgICAgICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoJ3Byb2R1Y3QtZmVlZGJhY2tzX19idG4tZXhwYW5kX2FjdGl2ZScpO1xuICAgIC8vICAgICAgICAgICAgIH1cbiAgICAvL1xuICAgIC8vICAgICAgICAgICAgIGlmIChidG4gIT09IG51bGwgJiYgYnRuLmNsYXNzTGlzdC5jb250YWlucygncHJvZHVjdC1mZWVkYmFja3NfX2J0bi1leHBhbmRfYWN0aXZlJykpIHtcbiAgICAvLyAgICAgICAgICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICB0ZXh0QmxvY2suY2xhc3NMaXN0LnRvZ2dsZSgnb3BlbicpO1xuICAgIC8vXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBpZih0ZXh0QmxvY2suY2xhc3NMaXN0LmNvbnRhaW5zKCdvcGVuJykpIHtcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICBidG4uaW5uZXJIVE1MID0gJ9Ch0LLQtdGA0L3Rg9GC0Ywg0L7RgtC30YvQsic7XG4gICAgLy8gICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIGJ0bi5pbm5lckhUTUwgPSAn0J/QvtC60LDQt9Cw0YLRjCDQv9C+0LvQvdC+0YHRgtGM0Y4nO1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgIHNjcm9sbEVsZW0uc2Nyb2xsSW50b1ZpZXcoe2Jsb2NrOiBcImNlbnRlclwiLCBiZWhhdmlvcjogXCJzbW9vdGhcIn0pO1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgfVxuICAgIC8vICAgICAgICAgICAgICAgICB9KVxuICAgIC8vICAgICAgICAgICAgIH1cbiAgICAvLyAgICAgICAgIH0pO1xuICAgIC8vICAgICB9XG4gICAgLy8gfVxuICAgIC8vXG4gICAgLy8gYnRuRXhwYW5kKCk7XG5cbiAgICBjb25zdCBnYWxsZXJ5VGh1bWJzUHJvZHVjdCA9IG5ldyBTd2lwZXIoJy5wcm9kdWN0LXBhZ2VfX2dhbGxlcnktbmF2IC5zd2lwZXInLCB7XG4gICAgICAgIHNwYWNlQmV0d2VlbjogMCxcbiAgICAgICAgc2xpZGVzUGVyVmlldzogMyxcbiAgICAgICAgZnJlZU1vZGU6IHRydWUsXG4gICAgICAgIHdhdGNoU2xpZGVzVmlzaWJpbGl0eTogdHJ1ZSxcbiAgICAgICAgd2F0Y2hTbGlkZXNQcm9ncmVzczogdHJ1ZSxcbiAgICBcbiAgICAgICAgYnJlYWtwb2ludHM6IHtcbiAgICAgICAgICAgIDMyMDoge1xuICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMjEuNTEsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgMTAyMToge1xuICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMjMuMDEsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgMTM1MToge1xuICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMzIuNzYsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgfSk7XG4gICAgXG4gICAgY29uc3QgZ2FsbGVyeVRvcFByb2R1Y3QgPSBuZXcgU3dpcGVyKCcucHJvZHVjdC1wYWdlX19nYWxsZXJ5LWZvciAuc3dpcGVyJywge1xuICAgICAgICBzcGFjZUJldHdlZW46IDAsXG4gICAgICAgIG5hdmlnYXRpb246IHtuZXh0RWw6ICcucHJvZHVjdC1wYWdlX19nYWxsZXJ5LW5hdiAuc3dpcGVyLWJ1dHRvbi5uZXh0JywgcHJldkVsOiAnLnByb2R1Y3QtcGFnZV9fZ2FsbGVyeS1uYXYgLnN3aXBlci1idXR0b24ucHJldicsfSxcbiAgICAgICAgdGh1bWJzOiB7c3dpcGVyOiBnYWxsZXJ5VGh1bWJzUHJvZHVjdH1cbiAgICB9KTtcbiAgICBcbiAgICBjb25zdCB0YWJzU2xpZGVyID0gbmV3IFN3aXBlcignLnByb2R1Y3QtcGFnZV9fdGFicycsIHtcbiAgICAgICAgc2xpZGVzUGVyVmlldzogXCJhdXRvXCIsXG4gICAgICAgIGZyZWVNb2RlOiB0cnVlLFxuICAgICAgICBzcGFjZUJldHdlZW46IDAsXG4gICAgXG4gICAgICAgIGJyZWFrcG9pbnRzOiB7XG4gICAgICAgICAgICAzMjA6IHtcbiAgICAgICAgICAgICAgICBncmFiQ3Vyc29yOiB0cnVlLFxuICAgICAgICAgICAgICAgIGFsbG93VG91Y2hNb3ZlOiB0cnVlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIDc2OToge1xuICAgICAgICAgICAgICAgIGdyYWJDdXJzb3I6IGZhbHNlLFxuICAgICAgICAgICAgICAgIGFsbG93VG91Y2hNb3ZlOiBmYWxzZSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICB9KTtcbiAgICBcbiAgICAvLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJvZHVjdC1mZWVkYmFja3NfX3NsaWRlci13cmFwJykuZm9yRWFjaChzbGlkZXIgPT4ge1xuICAgIC8vICAgICBuZXcgU3dpcGVyKHNsaWRlci5xdWVyeVNlbGVjdG9yKCcuc3dpcGVyJyksIHtcbiAgICAvLyAgICAgICAgIGxvb3A6IGZhbHNlLFxuICAgIC8vICAgICAgICAgYWxsb3dUb3VjaE1vdmU6IHRydWUsXG4gICAgLy9cbiAgICAvLyAgICAgICAgIGJyZWFrcG9pbnRzOiB7XG4gICAgLy8gICAgICAgICAgICAgMzIwOiB7XG4gICAgLy8gICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDQsXG4gICAgLy8gICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMy42MSxcbiAgICAvLyAgICAgICAgICAgICB9LFxuICAgIC8vICAgICAgICAgICAgIDQ4Mzoge1xuICAgIC8vICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiA1LFxuICAgIC8vICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDE3LjY3LFxuICAgIC8vICAgICAgICAgICAgIH0sXG4gICAgLy8gICAgICAgICAgICAgNjA1OiB7XG4gICAgLy8gICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDYsXG4gICAgLy8gICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTcuNjcsXG4gICAgLy8gICAgICAgICAgICAgfSxcbiAgICAvLyAgICAgICAgICAgICA2ODY6IHtcbiAgICAvLyAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogNyxcbiAgICAvLyAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNy42NyxcbiAgICAvLyAgICAgICAgICAgICB9LFxuICAgIC8vICAgICAgICAgICAgIDc2ODoge1xuICAgIC8vICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiA4LFxuICAgIC8vICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDE3LjY3LFxuICAgIC8vICAgICAgICAgICAgIH0sXG4gICAgLy8gICAgICAgICAgICAgMTAyMToge1xuICAgIC8vICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiA5LFxuICAgIC8vICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDExLFxuICAgIC8vICAgICAgICAgICAgIH0sXG4gICAgLy8gICAgICAgICAgICAgMTM1MToge1xuICAgIC8vICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiAxMCxcbiAgICAvLyAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAyNS45MSxcbiAgICAvLyAgICAgICAgICAgICB9XG4gICAgLy8gICAgICAgICB9LFxuICAgIC8vXG4gICAgLy8gICAgICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgLy8gICAgICAgICAgICAgbmV4dEVsOiBzbGlkZXIucXVlcnlTZWxlY3RvcignLnN3aXBlci1idXR0b24ubmV4dCcpLFxuICAgIC8vICAgICAgICAgICAgIHByZXZFbDogc2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJy5zd2lwZXItYnV0dG9uLnByZXYnKSxcbiAgICAvLyAgICAgICAgIH0sXG4gICAgLy8gICAgIH0pO1xuICAgIC8vIH0pO1xufSlcblxuZnVuY3Rpb24gcHJvZHVjdFJldmlld1BhZ2luYXRpb24ocGFnZSwgcHJvZHVjdF9pZCkge1xuICAgIGxldCB1cmwgPSBgL2luZGV4LnBocD9yb3V0ZT1wcm9kdWN0L3Byb2R1Y3QvcmV2aWV3JnBhZ2U9JHtwYWdlfSZwcm9kdWN0X2lkPSR7cHJvZHVjdF9pZH1gXG5cbiAgICBsZXQgcHJvZHVjdFJldmlld1dyYXAgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvZHVjdC1yZXZpZXctd3JhcCcpXG5cbiAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgeGhyLm9wZW4oJ1BPU1QnLCB1cmwpO1xuICAgIHhoci5zZW5kKClcblxuICAgIHhoci5vbmxvYWQgPSAoKSA9PiB7XG4gICAgICAgIGxldCByZXN1bHQgPSB4aHIucmVzcG9uc2VcbiAgICAgICAgY29uc29sZS5sb2cocmVzdWx0KVxuICAgICAgICBsZXQgY29udGVudCA9IG5ldyBET01QYXJzZXIoKTtcbiAgICAgICAgY29udGVudCA9IGNvbnRlbnQucGFyc2VGcm9tU3RyaW5nKHJlc3VsdCwgXCJ0ZXh0L2h0bWxcIikuZ2V0RWxlbWVudEJ5SWQoJ3Byb2R1Y3QtcmV2aWV3LXdyYXAnKS5xdWVyeVNlbGVjdG9yQWxsKCcucHJvZHVjdC1mZWVkYmFja3NfX3JldmlldycpO1xuXG4gICAgICAgIHByb2R1Y3RSZXZpZXdXcmFwLmlubmVySFRNTCA9ICcnXG5cbiAgICAgICAgY29udGVudC5mb3JFYWNoKChodG1sKT0+e1xuICAgICAgICAgICAgcHJvZHVjdFJldmlld1dyYXAuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBodG1sLm91dGVySFRNTClcbiAgICAgICAgfSlcblxuICAgICAgICBsZXQgcHJvZHVjdFJldmlld1BhZ2luYXRpb24gPSBuZXcgRE9NUGFyc2VyKCk7XG5cbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2R1Y3QtcmV2aWV3LXBhZ2luYXRpb24nKS5pbm5lckhUTUwgPSAnJ1xuXG4gICAgICAgIHByb2R1Y3RSZXZpZXdQYWdpbmF0aW9uID0gcHJvZHVjdFJldmlld1BhZ2luYXRpb24ucGFyc2VGcm9tU3RyaW5nKHJlc3VsdCwgXCJ0ZXh0L2h0bWxcIikuZ2V0RWxlbWVudEJ5SWQoJ3Byb2R1Y3QtcmV2aWV3LXBhZ2luYXRpb24nKTtcblxuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvZHVjdC1yZXZpZXctcGFnaW5hdGlvbicpLmlubmVySFRNTCA9IHByb2R1Y3RSZXZpZXdQYWdpbmF0aW9uLm91dGVySFRNTFxuXG4gICAgfVxufVxuXG5mdW5jdGlvbiBzZW5kRm9ybVByb2R1Y3RSZXZpZXcoKXtcbiAgICBsZXQgZm9ybVByb2R1Y3RSZXZpZXcgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvZHVjdC1mb3JtLXJldmlldycpXG5cbiAgICBsZXQgZmlsZXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9ybUZpbGVSZXZpZXcnKS5maWxlc1xuXG4gICAgbGV0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKGZvcm1Qcm9kdWN0UmV2aWV3KTtcblxuICAgIGZvcm1EYXRhLmFwcGVuZCgnaW1hZ2VzW10nLCBmaWxlcylcblxuICAgIGxldCB1cmwgPSAnL2luZGV4LnBocD9yb3V0ZT1wcm9kdWN0L3Byb2R1Y3QvYWRkX3JldmlldydcblxuICAgIGZvcm1Qcm9kdWN0UmV2aWV3LnF1ZXJ5U2VsZWN0b3IoJ2J1dHRvbicpLmRpc2FibGVkID0gXCJkaXNhYmxlZFwiXG5cbiAgICBsZXQgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XG4gICAgeGhyLm9wZW4oJ1BPU1QnLCB1cmwpO1xuICAgIHhoci5zZW5kKGZvcm1EYXRhKVxuXG4gICAgeGhyLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgbGV0IHJlc3VsdCA9IHhoci5yZXNwb25zZVxuICAgICAgICByZXN1bHQgPSBKU09OLnBhcnNlKHJlc3VsdClcblxuICAgICAgICBmb3JtUHJvZHVjdFJldmlldy5xdWVyeVNlbGVjdG9yKCdidXR0b24nKS5kaXNhYmxlZCA9IFwiZGlzYWJsZWRcIlxuXG4gICAgICAgIGxldCBmb3JtUmV2aWV3ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Byb2R1Y3QtcmV2aWV3LXdyYXAnKVxuXG4gICAgICAgIGNvbnNvbGUubG9nKHJlc3VsdClcbiAgICAgICAgaWYocmVzdWx0WydzdWNjZXNzJ10pe1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zvcm0tcmV2aWV3LWVycm9yJykuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiXG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJvZHVjdC1yZXZpZXctd3JhcCcpLmluc2VydEFkamFjZW50SFRNTCgnYWZ0ZXJiZWdpbicsIHJlc3VsdFsnc3VjY2VzcyddKVxuXG4gICAgICAgICAgICBmb3JtUHJvZHVjdFJldmlldy5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFt0eXBlPVwidGV4dFwiXScpLmZvckVhY2goKGVsZW0pPT57XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZWxlbSlcbiAgICAgICAgICAgICAgICBlbGVtLnZhbHVlID0gJydcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGZvcm1Qcm9kdWN0UmV2aWV3LnF1ZXJ5U2VsZWN0b3JBbGwoJ3RleHRhcmVhJykuZm9yRWFjaCgoZWxlbSk9PntcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlbGVtKVxuICAgICAgICAgICAgICAgIGVsZW0udmFsdWUgPSAnJ1xuICAgICAgICAgICAgICAgIGVsZW0uaW5uZXJIVE1MID0gJydcbiAgICAgICAgICAgIH0pXG5cbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0LXBhZ2VfX3RyaWdnZXJzLXNjb3JlJykuaW5uZXJUZXh0ID0gTnVtYmVyKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcm9kdWN0LXBhZ2VfX3RyaWdnZXJzLXNjb3JlJykuaW5uZXJUZXh0KSArIDFcblxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByb2R1Y3QtZmVlZGJhY2tzX19zbGlkZXItd3JhcCcpLmZvckVhY2goc2xpZGVyID0+IHtcbiAgICAgICAgICAgICAgICBuZXcgU3dpcGVyKHNsaWRlci5xdWVyeVNlbGVjdG9yKCcuc3dpcGVyJyksIHtcbiAgICAgICAgICAgICAgICAgICAgbG9vcDogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgIGFsbG93VG91Y2hNb3ZlOiB0cnVlLFxuXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrcG9pbnRzOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAzMjA6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiA0LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMy42MSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICA0ODM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiA1LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTcuNjcsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgNjA1OiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogNixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGFjZUJldHdlZW46IDE3LjY3LFxuICAgICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgICAgIDY4Njoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDcsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxNy42NyxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICA3Njg6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzbGlkZXNQZXJWaWV3OiA4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwYWNlQmV0d2VlbjogMTcuNjcsXG4gICAgICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgICAgMTAyMToge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNsaWRlc1BlclZpZXc6IDksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAxMSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgICAxMzUxOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2xpZGVzUGVyVmlldzogMTAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BhY2VCZXR3ZWVuOiAyNS45MSxcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuZXh0RWw6IHNsaWRlci5xdWVyeVNlbGVjdG9yKCcuc3dpcGVyLWJ1dHRvbi5uZXh0JyksXG4gICAgICAgICAgICAgICAgICAgICAgICBwcmV2RWw6IHNsaWRlci5xdWVyeVNlbGVjdG9yKCcuc3dpcGVyLWJ1dHRvbi5wcmV2JyksXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2R1Y3QtZmVlZGJhY2tzX19mb3JtJykuY2xhc3NMaXN0LnJlbW92ZSgncHJvZHVjdC1mZWVkYmFja3NfX2Zvcm1fb3BlbicpXG4gICAgICAgICAgICAvLyBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJvZHVjdC1mZWVkYmFja3NfX2J0bi1ibG9jaycpLmNsYXNzTGlzdC5yZW1vdmUoJ3Byb2R1Y3QtZmVlZGJhY2tzX19idG4tYmxvY2tfaGlkZGVuJylcbiAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICBpZiAocmVzdWx0WydlcnJvciddKXtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9ybS1yZXZpZXctZXJyb3InKS5zdHlsZS5kaXNwbGF5ID0gXCJibG9ja1wiXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zvcm0tcmV2aWV3LWVycm9yJykuaW5uZXJUZXh0ID0gcmVzdWx0WydlcnJvciddXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3JtUHJvZHVjdFJldmlldy5xdWVyeVNlbGVjdG9yKCdidXR0b24nKS5kaXNhYmxlZCA9IGZhbHNlXG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgeGhyLm9ucHJvZ3Jlc3MgPSAoKSA9PiB7XG4gICAgICAgIGNvbnNvbGUubG9nKCfQl9Cw0LPRgNGD0LfQutCwJylcbiAgICB9XG5cbiAgICB4aHIub25lcnJvciA9ICgpID0+IHtcbiAgICAgICAgbG9hZCA9IGZhbHNlXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5sb2FkZXInKS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxuICAgICAgICBjb25zb2xlLmxvZygn0J7RiNC40LHQutCwJywgeGhyLnN0YXR1cylcbiAgICB9XG59Il0sImZpbGUiOiJhcHAuanMifQ==