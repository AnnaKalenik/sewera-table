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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJwb3B1bGFyLXNlcnZpY2VzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucG9wdWxhci1zZXJ2aWNlc19fd3JhcHBlcicpLmZvckVhY2goc2xpZGVyID0+IHtcclxuICAgICAgICBuZXcgU3dpcGVyKHNsaWRlci5xdWVyeVNlbGVjdG9yKCcuc3dpcGVyJyksIHtcclxuICAgICAgICAgICAgbG9vcDogdHJ1ZSxcclxuICAgICAgICAgICAgYWxsb3dUb3VjaE1vdmU6IHRydWUsXHJcblxyXG4gICAgICAgICAgICBuYXZpZ2F0aW9uOiB7XHJcbiAgICAgICAgICAgICAgICBuZXh0RWw6IHNsaWRlci5xdWVyeVNlbGVjdG9yKCcucG9wdWxhci1zZXJ2aWNlc19fbmV4dCcpLFxyXG4gICAgICAgICAgICAgICAgcHJldkVsOiBzbGlkZXIucXVlcnlTZWxlY3RvcignLnBvcHVsYXItc2VydmljZXNfX3ByZXYnKSxcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG59KSJdLCJmaWxlIjoicG9wdWxhci1zZXJ2aWNlcy5qcyJ9