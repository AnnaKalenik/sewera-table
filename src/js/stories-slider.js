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
})