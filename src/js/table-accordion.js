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