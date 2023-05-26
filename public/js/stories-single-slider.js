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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzdG9yaWVzLXNpbmdsZS1zbGlkZXIuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zdG9yaWVzX193cmFwcGVyJykuZm9yRWFjaChzbGlkZXIgPT4ge1xyXG4gICAgICAgIG5ldyBTd2lwZXIoc2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJy5zd2lwZXInKSwge1xyXG4gICAgICAgICAgICBsb29wOiBmYWxzZSxcclxuICAgICAgICAgICAgYWxsb3dUb3VjaE1vdmU6IGZhbHNlLFxyXG5cclxuICAgICAgICAgICAgcGFnaW5hdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgZWw6IFwiLnN3aXBlci1wYWdpbmF0aW9uXCIsXHJcbiAgICAgICAgICAgICAgICB0eXBlOiBcImZyYWN0aW9uXCIsXHJcbiAgICAgICAgICAgICAgICByZW5kZXJGcmFjdGlvbjogZnVuY3Rpb24gKGN1cnJlbnRDbGFzcywgdG90YWxDbGFzcykge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBgPHNwYW4gY2xhc3M9XCIke2N1cnJlbnRDbGFzc31cIj48L3NwYW4+YCArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICcg0LjQtyAnICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYDxzcGFuIGNsYXNzPVwiJHt0b3RhbENsYXNzfVwiPjwvc3Bhbj5gO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICAgICAgICAgIG5leHRFbDogc2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJy5zdG9yaWVzX19uYXYtYnRuLm5leHQnKSxcclxuICAgICAgICAgICAgICAgIHByZXZFbDogc2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJy5zdG9yaWVzX19uYXYtYnRuLnByZXYnKSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIHZpZGVvTW9kYWwoKSB7XHJcbiAgICAgICAgY29uc3QgbGlua3NMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnN0b3JpZXNfX2xpbmsnKTtcclxuXHJcbiAgICAgICAgY29uc3QgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudmlkZW8tbW9kYWwnKTtcclxuICAgICAgICBjb25zdCBidG5DbG9zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy52aWRlby1tb2RhbF9fY2xvc2UnKTtcclxuICAgICAgICBjb25zdCBwbGF5ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudmlkZW8tYmxvY2tfX3BsYXllcicpO1xyXG4gICAgXHJcbiAgICAgICAgY29uc3QgYnRuU291bmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudmlkZW8tbW9kYWxfX3NvdW5kJyk7XHJcbiAgICAgICAgY29uc3QgaWNvbk11dGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudmlkZW8tbW9kYWxfX2ljb24tbXV0ZWQnKTtcclxuICAgICAgICBjb25zdCBpY29uTG91ZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy52aWRlby1tb2RhbF9faWNvbi1sb3VkJyk7XHJcbiAgICBcclxuICAgICAgICBjb25zdCBidG5QbGF5UGF1c2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudmlkZW8tYmxvY2tfX2J1dHRvbicpO1xyXG4gICAgICAgIGNvbnN0IHBsYXllckxpbmVQcm9ncmVzcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy52aWRlby1tb2RhbF9fbmF2aWdhdGlvbi1saW5lLXByb2dyZXNzJyk7XHJcbiAgICBcclxuICAgICAgICBmdW5jdGlvbiB0b2dnbGVDbGFzc09wZW4oKSB7XHJcbiAgICAgICAgICAgIG1vZGFsLmNsYXNzTGlzdC50b2dnbGUoJ29wZW4nKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBmdW5jdGlvbiBhZGRTcmNWaWRlbyhzcmNWaWRlbykge1xyXG4gICAgICAgICAgICBwbGF5ZXIuc3JjID0gc3JjVmlkZW87XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgZnVuY3Rpb24gcGxheVZpZGVvKCkge1xyXG4gICAgICAgICAgICBwbGF5ZXIucGxheSgpO1xyXG4gICAgICAgIH1cclxuICAgIFxyXG4gICAgICAgIGZ1bmN0aW9uIHN0b3BWaWRlbygpIHtcclxuICAgICAgICAgICAgcGxheWVyLnBhdXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgZnVuY3Rpb24gdXBkYXRlbExvYWRpbmcoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBlcmNlbnQgPSAocGxheWVyLmN1cnJlbnRUaW1lIC8gcGxheWVyLmR1cmF0aW9uKSAqIDEwMDtcclxuICAgICAgICAgICAgcGxheWVyTGluZVByb2dyZXNzLnN0eWxlLmZsZXhCYXNpcyA9IGAke3BlcmNlbnR9JWA7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgZnVuY3Rpb24gb3Blbk1vZGFsKCkge1xyXG4gICAgICAgICAgICBsZXQgc3JjVmlkZW8gPSB0aGlzLmRhdGFzZXQudmlkZW87XHJcbiAgICBcclxuICAgICAgICAgICAgdG9nZ2xlQ2xhc3NPcGVuKCk7XHJcbiAgICAgICAgICAgIGFkZFNyY1ZpZGVvKHNyY1ZpZGVvKTtcclxuICAgICAgICAgICAgcGxheVZpZGVvKCk7XHJcbiAgICAgICAgfVxyXG4gICAgXHJcbiAgICAgICAgZnVuY3Rpb24gY2xvc2VNb2RhbCgpIHtcclxuICAgICAgICAgICAgc3RvcFZpZGVvKCk7XHJcbiAgICAgICAgICAgIE9mZlNvdW5kKCk7XHJcbiAgICAgICAgICAgIHBsYXllci5jdXJyZW50VGltZSA9IDA7XHJcbiAgICAgICAgICAgIHBsYXllckxpbmVQcm9ncmVzcy5zdHlsZS5mbGV4QmFzaXMgPSBgMCVgO1xyXG4gICAgICAgICAgICB0b2dnbGVDbGFzc09wZW4oKTtcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBmdW5jdGlvbiB0b2dnbGVTb3VuZCgpIHtcclxuICAgICAgICAgICAgaWYgKHBsYXllci5tdXRlZCA9PT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgcGxheWVyLm11dGVkID0gZmFsc2VcclxuICAgICAgICAgICAgICAgIGljb25NdXRlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICBpY29uTG91ZC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHBsYXllci5tdXRlZCA9IHRydWVcclxuICAgICAgICAgICAgICAgIGljb25NdXRlLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgICAgICAgICAgaWNvbkxvdWQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gXHJcbiAgICBcclxuICAgICAgICBmdW5jdGlvbiBPZmZTb3VuZCgpIHtcclxuICAgICAgICAgICAgcGxheWVyLm11dGVkID0gdHJ1ZVxyXG4gICAgICAgICAgICBpY29uTXV0ZS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICAgICAgaWNvbkxvdWQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9XHJcbiAgICBcclxuICAgICAgICBsaW5rc0xpc3QuZm9yRWFjaChsaW5rID0+IGxpbmsuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvcGVuTW9kYWwpKTtcclxuICAgICAgICBwbGF5ZXIuYWRkRXZlbnRMaXN0ZW5lcigndGltZXVwZGF0ZScsIHVwZGF0ZWxMb2FkaW5nKTtcclxuICAgICAgICBidG5DbG9zZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlTW9kYWwpO1xyXG4gICAgICAgIGJ0blNvdW5kLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlU291bmQpO1xyXG4gICAgICAgIHBsYXllci5hZGRFdmVudExpc3RlbmVyKCdlbmRlZCcsIGNsb3NlTW9kYWwpO1xyXG4gICAgXHJcbiAgICAgICAgYnRuUGxheVBhdXNlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlZG93bicsIHN0b3BWaWRlbyk7XHJcbiAgICAgICAgYnRuUGxheVBhdXNlLmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBzdG9wVmlkZW8pO1xyXG4gICAgXHJcbiAgICAgICAgYnRuUGxheVBhdXNlLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBwbGF5VmlkZW8pO1xyXG4gICAgICAgIGJ0blBsYXlQYXVzZS5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHBsYXlWaWRlbyk7XHJcbiAgICBcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGV2ZW50KSA9PiB7ICBcclxuICAgICAgICAgICAgaWYgKGV2ZW50LmNvZGUgPT0gJ1NwYWNlJyAmJiBtb2RhbC5jbGFzc0xpc3QuY29udGFpbnMoJ29wZW4nKSkge1xyXG4gICAgICAgICAgICAgICAgcGxheWVyLnBhdXNlZCAhPT0gdHJ1ZSA/IHN0b3BWaWRlbygpIDogcGxheVZpZGVvKCk7ICAvKtCe0YHRgtCw0L3QvtCy0LrQsC/QstC+0YHQv9GA0L7QuNC30LLQtdC00LXQvdC40LUg0LLQuNC00LXQviDQv9GA0Lgg0L3QsNC20LDRgtC40Lgg0LrQu9Cw0LLQuNGI0Lgg0L/RgNC+0LHQtdC7Ki9cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChldmVudCkgPT4geyAgXHJcbiAgICAgICAgICAgIGlmIChldmVudC5jb2RlID09ICdFc2NhcGUnICYmIG1vZGFsLmNsYXNzTGlzdC5jb250YWlucygnb3BlbicpKSBjbG9zZU1vZGFsKCk7IC8q0JfQsNC60YDRi9GC0LjQtSDQvNC+0LTQsNC70LrQuCDQuCDRgdC+0YLQsNC90L7QstC60LAg0LLQuNC00LXQviDQv9GA0Lgg0L3QsNC20LDRgtC40Lgg0LrQu9Cw0LLQuNGI0LggRXNjKi9cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHZpZGVvTW9kYWwoKTtcclxufSkiXSwiZmlsZSI6InN0b3JpZXMtc2luZ2xlLXNsaWRlci5qcyJ9