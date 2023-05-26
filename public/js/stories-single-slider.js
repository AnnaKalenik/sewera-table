document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.stories__wrapper').forEach(slider => {
        new Swiper(slider.querySelector('.swiper'), {
            loop: false,
            allowTouchMove: false,

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
})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzdG9yaWVzLXNpbmdsZS1zbGlkZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zdG9yaWVzX193cmFwcGVyJykuZm9yRWFjaChzbGlkZXIgPT4ge1xyXG4gICAgICAgIG5ldyBTd2lwZXIoc2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJy5zd2lwZXInKSwge1xyXG4gICAgICAgICAgICBsb29wOiBmYWxzZSxcclxuICAgICAgICAgICAgYWxsb3dUb3VjaE1vdmU6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgZWw6IFwiLnN3aXBlci1wYWdpbmF0aW9uXCIsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcImZyYWN0aW9uXCIsXHJcbiAgICAgICAgICAgICAgICByZW5kZXJGcmFjdGlvbjogZnVuY3Rpb24gKGN1cnJlbnRDbGFzcywgdG90YWxDbGFzcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBgPHNwYW4gY2xhc3M9XCIke2N1cnJlbnRDbGFzc31cIj48L3NwYW4+YCArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICcg0LjQtyAnICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYDxzcGFuIGNsYXNzPVwiJHt0b3RhbENsYXNzfVwiPjwvc3Bhbj5gO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICAgICAgICAgIG5leHRFbDogc2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJy5zdG9yaWVzX19uYXYtYnRuLm5leHQnKSxcclxuICAgICAgICAgICAgICAgIHByZXZFbDogc2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJy5zdG9yaWVzX19uYXYtYnRuLnByZXYnKSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICBjb25zdCBsaW5rc0xpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuc3Rvcmllc19fbGluaycpO1xyXG5cclxuICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnZpZGVvLW1vZGFsJyk7XHJcbiAgICBjb25zdCBidG5DbG9zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy52aWRlby1tb2RhbF9fY2xvc2UnKTtcclxuICAgIGNvbnN0IHBsYXllciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy52aWRlby1ibG9ja19fcGxheWVyJyk7XHJcblxyXG4gICAgY29uc3QgYnRuU291bmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudmlkZW8tbW9kYWxfX3NvdW5kJyk7XHJcbiAgICBjb25zdCBpY29uTXV0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy52aWRlby1tb2RhbF9faWNvbi1tdXRlZCcpO1xyXG4gICAgY29uc3QgaWNvbkxvdWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudmlkZW8tbW9kYWxfX2ljb24tbG91ZCcpO1xyXG5cclxuICAgIGNvbnN0IGJ0blBsYXlQYXVzZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy52aWRlby1ibG9ja19fYnV0dG9uJyk7XHJcbiAgICBjb25zdCBwbGF5ZXJMaW5lUHJvZ3Jlc3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudmlkZW8tbW9kYWxfX25hdmlnYXRpb24tbGluZS1wcm9ncmVzcycpO1xyXG5cclxuICAgIGZ1bmN0aW9uIHRvZ2dsZUNsYXNzT3BlbigpIHtcclxuICAgICAgICBtb2RhbC5jbGFzc0xpc3QudG9nZ2xlKCdvcGVuJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkU3JjVmlkZW8oc3JjVmlkZW8pIHtcclxuICAgICAgICBwbGF5ZXIuc3JjID0gc3JjVmlkZW87XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcGxheVZpZGVvKCkge1xyXG4gICAgICAgIHBsYXllci5wbGF5KCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc3RvcFZpZGVvKCkge1xyXG4gICAgICAgIHBsYXllci5wYXVzZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZWxMb2FkaW5nKCkge1xyXG4gICAgICAgIGNvbnN0IHBlcmNlbnQgPSAocGxheWVyLmN1cnJlbnRUaW1lIC8gcGxheWVyLmR1cmF0aW9uKSAqIDEwMDtcclxuICAgICAgICBwbGF5ZXJMaW5lUHJvZ3Jlc3Muc3R5bGUuZmxleEJhc2lzID0gYCR7cGVyY2VudH0lYDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBvcGVuTW9kYWwoKSB7XHJcbiAgICAgICAgbGV0IHNyY1ZpZGVvID0gdGhpcy5kYXRhc2V0LnZpZGVvO1xyXG5cclxuICAgICAgICB0b2dnbGVDbGFzc09wZW4oKTtcclxuICAgICAgICBhZGRTcmNWaWRlbyhzcmNWaWRlbyk7XHJcbiAgICAgICAgcGxheVZpZGVvKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xvc2VNb2RhbCgpIHtcclxuICAgICAgICBzdG9wVmlkZW8oKTtcclxuICAgICAgICBPZmZTb3VuZCgpO1xyXG4gICAgICAgIHBsYXllci5jdXJyZW50VGltZSA9IDA7XHJcbiAgICAgICAgcGxheWVyTGluZVByb2dyZXNzLnN0eWxlLmZsZXhCYXNpcyA9IGAwJWA7XHJcbiAgICAgICAgdG9nZ2xlQ2xhc3NPcGVuKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdG9nZ2xlU291bmQoKSB7XHJcbiAgICAgICAgaWYgKHBsYXllci5tdXRlZCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICBwbGF5ZXIubXV0ZWQgPSBmYWxzZVxyXG4gICAgICAgICAgICBpY29uTXV0ZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICBpY29uTG91ZC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBwbGF5ZXIubXV0ZWQgPSB0cnVlXHJcbiAgICAgICAgICAgIGljb25NdXRlLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgICAgICBpY29uTG91ZC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH1cclxuICAgIH0gXHJcblxyXG4gICAgZnVuY3Rpb24gT2ZmU291bmQoKSB7XHJcbiAgICAgICAgcGxheWVyLm11dGVkID0gdHJ1ZVxyXG4gICAgICAgIGljb25NdXRlLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIGljb25Mb3VkLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICB9XHJcblxyXG4gICAgbGlua3NMaXN0LmZvckVhY2gobGluayA9PiBsaW5rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb3Blbk1vZGFsKSk7XHJcbiAgICBwbGF5ZXIuYWRkRXZlbnRMaXN0ZW5lcigndGltZXVwZGF0ZScsIHVwZGF0ZWxMb2FkaW5nKTtcclxuICAgIGJ0bkNsb3NlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VNb2RhbCk7XHJcbiAgICBidG5Tb3VuZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZVNvdW5kKTtcclxuICAgIHBsYXllci5hZGRFdmVudExpc3RlbmVyKCdlbmRlZCcsIGNsb3NlTW9kYWwpO1xyXG5cclxuICAgIGJ0blBsYXlQYXVzZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWRvd24nLCBzdG9wVmlkZW8pO1xyXG4gICAgYnRuUGxheVBhdXNlLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBzdG9wVmlkZW8pO1xyXG5cclxuICAgIGJ0blBsYXlQYXVzZS5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgcGxheVZpZGVvKTtcclxuICAgIGJ0blBsYXlQYXVzZS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHBsYXlWaWRlbyk7XHJcblxyXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChldmVudCkgPT4geyAgXHJcbiAgICAgICAgaWYgKGV2ZW50LmNvZGUgPT0gJ1NwYWNlJyAmJiBtb2RhbC5jbGFzc0xpc3QuY29udGFpbnMoJ29wZW4nKSkge1xyXG4gICAgICAgICAgICBwbGF5ZXIucGF1c2VkICE9PSB0cnVlID8gc3RvcFZpZGVvKCkgOiBwbGF5VmlkZW8oKTsgIC8q0J7RgdGC0LDQvdC+0LLQutCwL9Cy0L7RgdC/0YDQvtC40LfQstC10LTQtdC90LjQtSDQstC40LTQtdC+INC/0YDQuCDQvdCw0LbQsNGC0LjQuCDQutC70LDQstC40YjQuCDQv9GA0L7QsdC10LsqL1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG5cclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZXZlbnQpID0+IHsgIFxyXG4gICAgICAgIGlmIChldmVudC5jb2RlID09ICdFc2NhcGUnICYmIG1vZGFsLmNsYXNzTGlzdC5jb250YWlucygnb3BlbicpKSBjbG9zZU1vZGFsKCk7IC8q0JfQsNC60YDRi9GC0LjQtSDQvNC+0LTQsNC70LrQuCDQuCDRgdC+0YLQsNC90L7QstC60LAg0LLQuNC00LXQviDQv9GA0Lgg0L3QsNC20LDRgtC40Lgg0LrQu9Cw0LLQuNGI0LggRXNjKi9cclxuICAgIH0pO1xyXG59KSJdLCJmaWxlIjoic3Rvcmllcy1zaW5nbGUtc2xpZGVyLmpzIn0=