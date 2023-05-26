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