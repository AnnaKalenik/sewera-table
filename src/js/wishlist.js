var wishlist = {
    'add': function(product_id, btn) {
        $.ajax({
            url: 'index.php?route=account/wishlist/add',
            type: 'post',
            data: 'product_id=' + product_id,
            dataType: 'json',
            success: function(json) {
                if(document.querySelector('.product-page__favorites')){
                    document.querySelectorAll('.product-page__favorites').forEach((elem)=>{
                        elem.classList.toggle('active')
                    })
                }else{
                    btn.classList.toggle('active')
                }
            },
            error: function(xhr, ajaxOptions, thrownError) {
                console.log(thrownError + "\r\n" + xhr.statusText + "\r\n" + xhr.responseText);
            }
        });
    },
    'remove': function() {

    }
}