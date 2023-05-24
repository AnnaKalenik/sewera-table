document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.popular-services__wrapper').forEach(slider => {
        new Swiper(slider.querySelector('.swiper'), {
            loop: true,
            allowTouchMove: true,

            navigation: {
                nextEl: slider.querySelector('.popular-services__next'),
                prevEl: slider.querySelector('.popular-services__prev'),
            },
        });
    });
})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJwb3B1bGFyLXNlcnZpY2VzIGNvcHkuanMiXSwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wb3B1bGFyLXNlcnZpY2VzX193cmFwcGVyJykuZm9yRWFjaChzbGlkZXIgPT4ge1xyXG4gICAgICAgIG5ldyBTd2lwZXIoc2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJy5zd2lwZXInKSwge1xyXG4gICAgICAgICAgICBsb29wOiB0cnVlLFxyXG4gICAgICAgICAgICBhbGxvd1RvdWNoTW92ZTogdHJ1ZSxcclxuXHJcbiAgICAgICAgICAgIG5hdmlnYXRpb246IHtcclxuICAgICAgICAgICAgICAgIG5leHRFbDogc2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJy5wb3B1bGFyLXNlcnZpY2VzX19uZXh0JyksXHJcbiAgICAgICAgICAgICAgICBwcmV2RWw6IHNsaWRlci5xdWVyeVNlbGVjdG9yKCcucG9wdWxhci1zZXJ2aWNlc19fcHJldicpLFxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn0pIl0sImZpbGUiOiJwb3B1bGFyLXNlcnZpY2VzIGNvcHkuanMifQ==