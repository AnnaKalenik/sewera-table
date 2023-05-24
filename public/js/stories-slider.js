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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzdG9yaWVzLXNsaWRlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnN0b3JpZXNfX3dyYXBwZXInKS5mb3JFYWNoKHNsaWRlciA9PiB7XHJcbiAgICAgICAgbmV3IFN3aXBlcihzbGlkZXIucXVlcnlTZWxlY3RvcignLnN3aXBlcicpLCB7XHJcbiAgICAgICAgICAgIGxvb3A6IGZhbHNlLFxyXG4gICAgICAgICAgICBhbGxvd1RvdWNoTW92ZTogZmFsc2UsXHJcblxyXG4gICAgICAgICAgICBwYWdpbmF0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBlbDogXCIuc3dpcGVyLXBhZ2luYXRpb25cIixcclxuICAgICAgICAgICAgICAgIHR5cGU6IFwiZnJhY3Rpb25cIixcclxuICAgICAgICAgICAgICAgIHJlbmRlckZyYWN0aW9uOiBmdW5jdGlvbiAoY3VycmVudENsYXNzLCB0b3RhbENsYXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGA8c3BhbiBjbGFzcz1cIiR7Y3VycmVudENsYXNzfVwiPjwvc3Bhbj5gICtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJyDQuNC3ICcgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBgPHNwYW4gY2xhc3M9XCIke3RvdGFsQ2xhc3N9XCI+PC9zcGFuPmA7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgbmV4dEVsOiBzbGlkZXIucXVlcnlTZWxlY3RvcignLnN0b3JpZXNfX25hdi1idG4ubmV4dCcpLFxyXG4gICAgICAgICAgICAgICAgcHJldkVsOiBzbGlkZXIucXVlcnlTZWxlY3RvcignLnN0b3JpZXNfX25hdi1idG4ucHJldicpLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn0pIl0sImZpbGUiOiJzdG9yaWVzLXNsaWRlci5qcyJ9