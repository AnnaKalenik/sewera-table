function accordionToogle () {
    console.log('object');
    if(document.querySelector('.table-block__accordion-head')) {
        let headList = document.querySelectorAll('.table-block__accordion-head');
        let bodyList = document.querySelectorAll('.table-block__accordion-body');

        headList.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                const id = e.target.getAttribute('data-target').replace('#', '');

                headList.forEach(item => item.classList.remove('active'));
                bodyList.forEach(item => item.classList.remove('active'));

                item.classList.add('active');
                document.getElementById(id).classList.add('active');
            })
        })   
    }
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ0YWJsZS1hY2NvcmRpb24uanMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gYWNjb3JkaW9uVG9vZ2xlICgpIHtcclxuICAgIGNvbnNvbGUubG9nKCdvYmplY3QnKTtcclxuICAgIGlmKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50YWJsZS1ibG9ja19fYWNjb3JkaW9uLWhlYWQnKSkge1xyXG4gICAgICAgIGxldCBoZWFkTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJsZS1ibG9ja19fYWNjb3JkaW9uLWhlYWQnKTtcclxuICAgICAgICBsZXQgYm9keUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGFibGUtYmxvY2tfX2FjY29yZGlvbi1ib2R5Jyk7XHJcblxyXG4gICAgICAgIGhlYWRMaXN0LmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaWQgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtdGFyZ2V0JykucmVwbGFjZSgnIycsICcnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBoZWFkTGlzdC5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XHJcbiAgICAgICAgICAgICAgICBib2R5TGlzdC5mb3JFYWNoKGl0ZW0gPT4gaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XHJcblxyXG4gICAgICAgICAgICAgICAgaXRlbS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9KSAgIFxyXG4gICAgfVxyXG59Il0sImZpbGUiOiJ0YWJsZS1hY2NvcmRpb24uanMifQ==