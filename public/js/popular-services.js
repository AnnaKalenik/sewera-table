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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJwb3B1bGFyLXNlcnZpY2VzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucG9wdWxhci1zZXJ2aWNlc19fd3JhcHBlcicpLmZvckVhY2goc2xpZGVyID0+IHtcclxuICAgICAgICBuZXcgU3dpcGVyKHNsaWRlci5xdWVyeVNlbGVjdG9yKCcuc3dpcGVyJyksIHtcclxuICAgICAgICAgICAgbG9vcDogZmFsc2UsXHJcbiAgICAgICAgICAgIGFsbG93VG91Y2hNb3ZlOiB0cnVlLFxyXG5cclxuICAgICAgICAgICAgbmF2aWdhdGlvbjoge1xyXG4gICAgICAgICAgICAgICAgbmV4dEVsOiBzbGlkZXIucXVlcnlTZWxlY3RvcignLnBvcHVsYXItc2VydmljZXNfX25leHQnKSxcclxuICAgICAgICAgICAgICAgIHByZXZFbDogc2xpZGVyLnF1ZXJ5U2VsZWN0b3IoJy5wb3B1bGFyLXNlcnZpY2VzX19wcmV2JyksXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufSkiXSwiZmlsZSI6InBvcHVsYXItc2VydmljZXMuanMifQ==