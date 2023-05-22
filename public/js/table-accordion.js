document.addEventListener('DOMContentLoaded', () => {
    function accordionToggle() {
        if(document.querySelector('.table-block__item')) {
            const items = Array.from(document.querySelectorAll('.table-block__item'));

            items.forEach((item) => {
                item.addEventListener('click', () => {
                    let currentHead = item.querySelector('.table-block__head');
                    let currentContentList = item.querySelectorAll('.table-block__body-content');

                    currentHead.classList.toggle('open');

                    currentContentList.forEach((content) => {
                        if (content.style.maxHeight) {
                            content.style.maxHeight = null;
                            content.classList.remove('open');
                        } else {
                            content.style.maxHeight = content.scrollHeight + 'px';
                            content.classList.add('open');
                        }
                    })  
                });
            });
        }
    }
    accordionToggle();
})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ0YWJsZS1hY2NvcmRpb24uanMiXSwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcclxuICAgIGZ1bmN0aW9uIGFjY29yZGlvblRvZ2dsZSgpIHtcclxuICAgICAgICBpZihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFibGUtYmxvY2tfX2l0ZW0nKSkge1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtcyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYmxlLWJsb2NrX19pdGVtJykpO1xyXG5cclxuICAgICAgICAgICAgaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgY3VycmVudEhlYWQgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy50YWJsZS1ibG9ja19faGVhZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50Q29udGVudExpc3QgPSBpdGVtLnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJsZS1ibG9ja19fYm9keS1jb250ZW50Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRIZWFkLmNsYXNzTGlzdC50b2dnbGUoJ29wZW4nKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudENvbnRlbnRMaXN0LmZvckVhY2goKGNvbnRlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbnRlbnQuc3R5bGUubWF4SGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LnN0eWxlLm1heEhlaWdodCA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuc3R5bGUubWF4SGVpZ2h0ID0gY29udGVudC5zY3JvbGxIZWlnaHQgKyAncHgnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5jbGFzc0xpc3QuYWRkKCdvcGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KSAgXHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgYWNjb3JkaW9uVG9nZ2xlKCk7XHJcbn0pIl0sImZpbGUiOiJ0YWJsZS1hY2NvcmRpb24uanMifQ==