document.addEventListener('DOMContentLoaded', () => {
    function accordionToggle() {
        if(document.querySelector('.table-block__item')) {
            const items = Array.from(document.querySelectorAll('.table-block__item'));

            items.forEach((item) => {
                item.addEventListener('click', (e) => {
                    let currentHead = item.querySelector('.table-block__head').querySelectorAll('li')[0];
                    let currentContentList = item.querySelectorAll('.table-block__body-content');

                    if (e.target === currentHead) {
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
                    }
                });
            });
        }
    }
    accordionToggle();
})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ0YWJsZS1hY2NvcmRpb24uanMiXSwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcclxuICAgIGZ1bmN0aW9uIGFjY29yZGlvblRvZ2dsZSgpIHtcclxuICAgICAgICBpZihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFibGUtYmxvY2tfX2l0ZW0nKSkge1xyXG4gICAgICAgICAgICBjb25zdCBpdGVtcyA9IEFycmF5LmZyb20oZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYmxlLWJsb2NrX19pdGVtJykpO1xyXG5cclxuICAgICAgICAgICAgaXRlbXMuZm9yRWFjaCgoaXRlbSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRIZWFkID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcudGFibGUtYmxvY2tfX2hlYWQnKS5xdWVyeVNlbGVjdG9yQWxsKCdsaScpWzBdO1xyXG4gICAgICAgICAgICAgICAgICAgIGxldCBjdXJyZW50Q29udGVudExpc3QgPSBpdGVtLnF1ZXJ5U2VsZWN0b3JBbGwoJy50YWJsZS1ibG9ja19fYm9keS1jb250ZW50Jyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldCA9PT0gY3VycmVudEhlYWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudEhlYWQuY2xhc3NMaXN0LnRvZ2dsZSgnb3BlbicpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudENvbnRlbnRMaXN0LmZvckVhY2goKGNvbnRlbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChjb250ZW50LnN0eWxlLm1heEhlaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuc3R5bGUubWF4SGVpZ2h0ID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb250ZW50LmNsYXNzTGlzdC5yZW1vdmUoJ29wZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5zdHlsZS5tYXhIZWlnaHQgPSBjb250ZW50LnNjcm9sbEhlaWdodCArICdweCc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29udGVudC5jbGFzc0xpc3QuYWRkKCdvcGVuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pIFxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBhY2NvcmRpb25Ub2dnbGUoKTtcclxufSkiXSwiZmlsZSI6InRhYmxlLWFjY29yZGlvbi5qcyJ9