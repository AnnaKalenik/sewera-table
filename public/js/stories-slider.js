document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.stories__wrapper').forEach(slider => {
        new Swiper(slider.querySelector('.swiper'), {
            loop: false,
            allowTouchMove: true,

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJzdG9yaWVzLXNsaWRlci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnN0b3JpZXNfX3dyYXBwZXInKS5mb3JFYWNoKHNsaWRlciA9PiB7XHJcbiAgICAgICAgbmV3IFN3aXBlcihzbGlkZXIucXVlcnlTZWxlY3RvcignLnN3aXBlcicpLCB7XHJcbiAgICAgICAgICAgIGxvb3A6IGZhbHNlLFxyXG4gICAgICAgICAgICBhbGxvd1RvdWNoTW92ZTogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgIHBhZ2luYXRpb246IHtcclxuICAgICAgICAgICAgICAgIGVsOiBcIi5zd2lwZXItcGFnaW5hdGlvblwiLFxyXG4gICAgICAgICAgICAgICAgdHlwZTogXCJmcmFjdGlvblwiLFxyXG4gICAgICAgICAgICAgICAgcmVuZGVyRnJhY3Rpb246IGZ1bmN0aW9uIChjdXJyZW50Q2xhc3MsIHRvdGFsQ2xhc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gYDxzcGFuIGNsYXNzPVwiJHtjdXJyZW50Q2xhc3N9XCI+PC9zcGFuPmAgK1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnINC40LcgJyArXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGA8c3BhbiBjbGFzcz1cIiR7dG90YWxDbGFzc31cIj48L3NwYW4+YDtcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBuZXh0RWw6IHNsaWRlci5xdWVyeVNlbGVjdG9yKCcuc3Rvcmllc19fbmF2LWJ0bi5uZXh0JyksXHJcbiAgICAgICAgICAgICAgICBwcmV2RWw6IHNsaWRlci5xdWVyeVNlbGVjdG9yKCcuc3Rvcmllc19fbmF2LWJ0bi5wcmV2JyksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufSkiXSwiZmlsZSI6InN0b3JpZXMtc2xpZGVyLmpzIn0=