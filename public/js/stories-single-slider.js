document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.stories__wrapper').forEach(slider => {
        new Swiper(slider.querySelector('.swiper'), {
            loop: false,
            allowTouchMove: false,

            breakpoints: {
                320: {
                    allowTouchMove: true,
                },
                577: {
                    allowTouchMove: false,
                },
            },

            pagination: {
                el: ".swiper-pagination",
                type: "fraction",
                renderFraction: function (currentClass, totalClass) {
                    return `<span class="${currentClass}"></span>` +
                        ' из ' +
                        `<span class="${totalClass}"></span>`;
                },
            },

            navigation: {
                nextEl: slider.querySelector('.stories__nav-btn.next'),
                prevEl: slider.querySelector('.stories__nav-btn.prev'),
            },
        });
    });

    function videoModal() {
        const linksList = document.querySelectorAll('.stories__link');

        const modal = document.querySelector('.video-modal');
        const btnClose = document.querySelector('.video-modal__close');
        const player = document.querySelector('.video-block__player');
    
        const btnSound = document.querySelector('.video-modal__sound');
        const iconMute = document.querySelector('.video-modal__icon-muted');
        const iconLoud = document.querySelector('.video-modal__icon-loud');
    
        const btnPlayPause = document.querySelector('.video-block__button');
        const playerLineProgress = document.querySelector('.video-modal__navigation-line-progress');
    
        function toggleClassOpen() {
            modal.classList.toggle('open');
        }
    
        function addSrcVideo(srcVideo) {
            player.src = srcVideo;
        }
    
        function playVideo() {
            player.play();
        }
    
        function stopVideo() {
            player.pause();
        }
    
        function updatelLoading() {
            const percent = (player.currentTime / player.duration) * 100;
            playerLineProgress.style.flexBasis = `${percent}%`;
        }
    
        function openModal() {
            let srcVideo = this.dataset.video;
    
            toggleClassOpen();
            addSrcVideo(srcVideo);
            playVideo();
        }
    
        function closeModal() {
            stopVideo();
            OffSound();
            player.currentTime = 0;
            playerLineProgress.style.flexBasis = `0%`;
            toggleClassOpen();
        }
    
        function toggleSound() {
            if (player.muted === true) {
                player.muted = false
                iconMute.style.display = 'none';
                iconLoud.style.display = 'block';
            } else {
                player.muted = true
                iconMute.style.display = 'block';
                iconLoud.style.display = 'none';
            }
        } 
    
        function OffSound() {
            player.muted = true
            iconMute.style.display = 'block';
            iconLoud.style.display = 'none';
        }
    
        linksList.forEach(link => link.addEventListener('click', openModal));
        player.addEventListener('timeupdate', updatelLoading);
        btnClose.addEventListener('click', closeModal);
        btnSound.addEventListener('click', toggleSound);
        player.addEventListener('ended', closeModal);
    
        btnPlayPause.addEventListener('mousedown', stopVideo);
        btnPlayPause.addEventListener('touchstart', stopVideo);
    
        btnPlayPause.addEventListener('mouseup', playVideo);
        btnPlayPause.addEventListener('touchend', playVideo);
    
        document.addEventListener('keydown', (event) => {  
            if (event.code == 'Space' && modal.classList.contains('open')) {
                player.paused !== true ? stopVideo() : playVideo();  /*Остановка/воспроизведение видео при нажатии клавиши пробел*/
            }
        });
    
        document.addEventListener('keydown', (event) => {  
            if (event.code == 'Escape' && modal.classList.contains('open')) closeModal(); /*Закрытие модалки и сотановка видео при нажатии клавиши Esc*/
        });
    }
    videoModal();
})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzdG9yaWVzLXNpbmdsZS1zbGlkZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zdG9yaWVzX193cmFwcGVyJykuZm9yRWFjaChzbGlkZXIgPT4ge1xyXG4gICAgICAgIG5ldyBTd2lwZXIoc2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJy5zd2lwZXInKSwge1xyXG4gICAgICAgICAgICBsb29wOiBmYWxzZSxcclxuICAgICAgICAgICAgYWxsb3dUb3VjaE1vdmU6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgYnJlYWtwb2ludHM6IHtcclxuICAgICAgICAgICAgICAgIDMyMDoge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsbG93VG91Y2hNb3ZlOiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIDU3Nzoge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsbG93VG91Y2hNb3ZlOiBmYWxzZSxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBlbDogXCIuc3dpcGVyLXBhZ2luYXRpb25cIixcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwiZnJhY3Rpb25cIixcclxuICAgICAgICAgICAgICAgIHJlbmRlckZyYWN0aW9uOiBmdW5jdGlvbiAoY3VycmVudENsYXNzLCB0b3RhbENsYXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGA8c3BhbiBjbGFzcz1cIiR7Y3VycmVudENsYXNzfVwiPjwvc3Bhbj5gICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJyDQuNC3ICcgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBgPHNwYW4gY2xhc3M9XCIke3RvdGFsQ2xhc3N9XCI+PC9zcGFuPmA7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgbmV4dEVsOiBzbGlkZXIucXVlcnlTZWxlY3RvcignLnN0b3JpZXNfX25hdi1idG4ubmV4dCcpLFxyXG4gICAgICAgICAgICAgICAgcHJldkVsOiBzbGlkZXIucXVlcnlTZWxlY3RvcignLnN0b3JpZXNfX25hdi1idG4ucHJldicpLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gdmlkZW9Nb2RhbCgpIHtcclxuICAgICAgICBjb25zdCBsaW5rc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc3Rvcmllc19fbGluaycpO1xyXG5cclxuICAgICAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy52aWRlby1tb2RhbCcpO1xyXG4gICAgICAgIGNvbnN0IGJ0bkNsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnZpZGVvLW1vZGFsX19jbG9zZScpO1xyXG4gICAgICAgIGNvbnN0IHBsYXllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy52aWRlby1ibG9ja19fcGxheWVyJyk7XHJcbiAgICBcclxuICAgICAgICBjb25zdCBidG5Tb3VuZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy52aWRlby1tb2RhbF9fc291bmQnKTtcclxuICAgICAgICBjb25zdCBpY29uTXV0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy52aWRlby1tb2RhbF9faWNvbi1tdXRlZCcpO1xyXG4gICAgICAgIGNvbnN0IGljb25Mb3VkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnZpZGVvLW1vZGFsX19pY29uLWxvdWQnKTtcclxuICAgIFxyXG4gICAgICAgIGNvbnN0IGJ0blBsYXlQYXVzZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy52aWRlby1ibG9ja19fYnV0dG9uJyk7XHJcbiAgICAgICAgY29uc3QgcGxheWVyTGluZVByb2dyZXNzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnZpZGVvLW1vZGFsX19uYXZpZ2F0aW9uLWxpbmUtcHJvZ3Jlc3MnKTtcclxuICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIHRvZ2dsZUNsYXNzT3BlbigpIHtcclxuICAgICAgICAgICAgbW9kYWwuY2xhc3NMaXN0LnRvZ2dsZSgnb3BlbicpO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIGFkZFNyY1ZpZGVvKHNyY1ZpZGVvKSB7XHJcbiAgICAgICAgICAgIHBsYXllci5zcmMgPSBzcmNWaWRlbztcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBmdW5jdGlvbiBwbGF5VmlkZW8oKSB7XHJcbiAgICAgICAgICAgIHBsYXllci5wbGF5KCk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgZnVuY3Rpb24gc3RvcFZpZGVvKCkge1xyXG4gICAgICAgICAgICBwbGF5ZXIucGF1c2UoKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBmdW5jdGlvbiB1cGRhdGVsTG9hZGluZygpIHtcclxuICAgICAgICAgICAgY29uc3QgcGVyY2VudCA9IChwbGF5ZXIuY3VycmVudFRpbWUgLyBwbGF5ZXIuZHVyYXRpb24pICogMTAwO1xyXG4gICAgICAgICAgICBwbGF5ZXJMaW5lUHJvZ3Jlc3Muc3R5bGUuZmxleEJhc2lzID0gYCR7cGVyY2VudH0lYDtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBmdW5jdGlvbiBvcGVuTW9kYWwoKSB7XHJcbiAgICAgICAgICAgIGxldCBzcmNWaWRlbyA9IHRoaXMuZGF0YXNldC52aWRlbztcclxuICAgIFxyXG4gICAgICAgICAgICB0b2dnbGVDbGFzc09wZW4oKTtcclxuICAgICAgICAgICAgYWRkU3JjVmlkZW8oc3JjVmlkZW8pO1xyXG4gICAgICAgICAgICBwbGF5VmlkZW8oKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBmdW5jdGlvbiBjbG9zZU1vZGFsKCkge1xyXG4gICAgICAgICAgICBzdG9wVmlkZW8oKTtcclxuICAgICAgICAgICAgT2ZmU291bmQoKTtcclxuICAgICAgICAgICAgcGxheWVyLmN1cnJlbnRUaW1lID0gMDtcclxuICAgICAgICAgICAgcGxheWVyTGluZVByb2dyZXNzLnN0eWxlLmZsZXhCYXNpcyA9IGAwJWA7XHJcbiAgICAgICAgICAgIHRvZ2dsZUNsYXNzT3BlbigpO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIHRvZ2dsZVNvdW5kKCkge1xyXG4gICAgICAgICAgICBpZiAocGxheWVyLm11dGVkID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIubXV0ZWQgPSBmYWxzZVxyXG4gICAgICAgICAgICAgICAgaWNvbk11dGUuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgICAgIGljb25Mb3VkLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcGxheWVyLm11dGVkID0gdHJ1ZVxyXG4gICAgICAgICAgICAgICAgaWNvbk11dGUuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgICAgICAgICBpY29uTG91ZC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBcclxuICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIE9mZlNvdW5kKCkge1xyXG4gICAgICAgICAgICBwbGF5ZXIubXV0ZWQgPSB0cnVlXHJcbiAgICAgICAgICAgIGljb25NdXRlLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgICAgICBpY29uTG91ZC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGxpbmtzTGlzdC5mb3JFYWNoKGxpbmsgPT4gbGluay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9wZW5Nb2RhbCkpO1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudExpc3RlbmVyKCd0aW1ldXBkYXRlJywgdXBkYXRlbExvYWRpbmcpO1xyXG4gICAgICAgIGJ0bkNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VNb2RhbCk7XHJcbiAgICAgICAgYnRuU291bmQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGVTb3VuZCk7XHJcbiAgICAgICAgcGxheWVyLmFkZEV2ZW50TGlzdGVuZXIoJ2VuZGVkJywgY2xvc2VNb2RhbCk7XHJcbiAgICBcclxuICAgICAgICBidG5QbGF5UGF1c2UuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vkb3duJywgc3RvcFZpZGVvKTtcclxuICAgICAgICBidG5QbGF5UGF1c2UuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIHN0b3BWaWRlbyk7XHJcbiAgICBcclxuICAgICAgICBidG5QbGF5UGF1c2UuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHBsYXlWaWRlbyk7XHJcbiAgICAgICAgYnRuUGxheVBhdXNlLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgcGxheVZpZGVvKTtcclxuICAgIFxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZXZlbnQpID0+IHsgIFxyXG4gICAgICAgICAgICBpZiAoZXZlbnQuY29kZSA9PSAnU3BhY2UnICYmIG1vZGFsLmNsYXNzTGlzdC5jb250YWlucygnb3BlbicpKSB7XHJcbiAgICAgICAgICAgICAgICBwbGF5ZXIucGF1c2VkICE9PSB0cnVlID8gc3RvcFZpZGVvKCkgOiBwbGF5VmlkZW8oKTsgIC8q0J7RgdGC0LDQvdC+0LLQutCwL9Cy0L7RgdC/0YDQvtC40LfQstC10LTQtdC90LjQtSDQstC40LTQtdC+INC/0YDQuCDQvdCw0LbQsNGC0LjQuCDQutC70LDQstC40YjQuCDQv9GA0L7QsdC10LsqL1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICBcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGV2ZW50KSA9PiB7ICBcclxuICAgICAgICAgICAgaWYgKGV2ZW50LmNvZGUgPT0gJ0VzY2FwZScgJiYgbW9kYWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdvcGVuJykpIGNsb3NlTW9kYWwoKTsgLyrQl9Cw0LrRgNGL0YLQuNC1INC80L7QtNCw0LvQutC4INC4INGB0L7RgtCw0L3QvtCy0LrQsCDQstC40LTQtdC+INC/0YDQuCDQvdCw0LbQsNGC0LjQuCDQutC70LDQstC40YjQuCBFc2MqL1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgdmlkZW9Nb2RhbCgpO1xyXG59KSJdLCJmaWxlIjoic3Rvcmllcy1zaW5nbGUtc2xpZGVyLmpzIn0=