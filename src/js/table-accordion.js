document.addEventListener('DOMContentLoaded', () => {
    function accordionToggle() {
        if(document.querySelector('.table-block__item')) {
            const items = Array.from(document.querySelectorAll('.table-block__item'));

            items.forEach((item) => {
                item.addEventListener('click', (e) => {
                    let currentHead = item.querySelector('.table-block__head');
                    let currentContentList = item.querySelectorAll('.table-block__body-content');

                    if (e.target === currentHead.querySelectorAll('li')[0] || e.target === currentHead.querySelectorAll('li')[1]) {
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