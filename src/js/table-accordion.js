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