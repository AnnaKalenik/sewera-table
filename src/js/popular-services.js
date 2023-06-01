document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.popular-services__wrapper').forEach(slider => {
        new Swiper(slider.querySelector('.swiper'), {
            loop: false,
            allowTouchMove: true,

            navigation: {
                nextEl: slider.querySelector('.popular-services__next'),
                prevEl: slider.querySelector('.popular-services__prev'),
            },
        });
    });
})