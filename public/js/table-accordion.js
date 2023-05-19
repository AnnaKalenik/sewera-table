document.addEventListener('DOMContentLoaded', () => {
    function accordionToggle() {
        if(document.querySelector('.table-block__accordion-head')) {
            let headList = document.querySelectorAll('.table-block__accordion-head');
    
            headList.forEach(item => {
                item.addEventListener('click', () => {
                    const data = item.dataset.head;
                    const id = data.replace('#', '');
                    console.log(id);
    
                    item.classList.toggle('open');
                    if(document.getElementById(id)) {
                        document.getElementById(id).classList.toggle('open');
                    }
                })
            })   
        }
    }
    accordionToggle();
})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ0YWJsZS1hY2NvcmRpb24uanMiXSwic291cmNlc0NvbnRlbnQiOlsiZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcclxuICAgIGZ1bmN0aW9uIGFjY29yZGlvblRvZ2dsZSgpIHtcclxuICAgICAgICBpZihkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGFibGUtYmxvY2tfX2FjY29yZGlvbi1oZWFkJykpIHtcclxuICAgICAgICAgICAgbGV0IGhlYWRMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRhYmxlLWJsb2NrX19hY2NvcmRpb24taGVhZCcpO1xyXG4gICAgXHJcbiAgICAgICAgICAgIGhlYWRMaXN0LmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBpdGVtLmRhdGFzZXQuaGVhZDtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpZCA9IGRhdGEucmVwbGFjZSgnIycsICcnKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpZCk7XHJcbiAgICBcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmNsYXNzTGlzdC50b2dnbGUoJ29wZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICBpZihkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpLmNsYXNzTGlzdC50b2dnbGUoJ29wZW4nKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KSAgIFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGFjY29yZGlvblRvZ2dsZSgpO1xyXG59KSJdLCJmaWxlIjoidGFibGUtYWNjb3JkaW9uLmpzIn0=