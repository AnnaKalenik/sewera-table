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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJ3aXNobGlzdC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJ2YXIgd2lzaGxpc3QgPSB7XHJcbiAgICAnYWRkJzogZnVuY3Rpb24ocHJvZHVjdF9pZCwgYnRuKSB7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdXJsOiAnaW5kZXgucGhwP3JvdXRlPWFjY291bnQvd2lzaGxpc3QvYWRkJyxcclxuICAgICAgICAgICAgdHlwZTogJ3Bvc3QnLFxyXG4gICAgICAgICAgICBkYXRhOiAncHJvZHVjdF9pZD0nICsgcHJvZHVjdF9pZCxcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oanNvbikge1xyXG4gICAgICAgICAgICAgICAgaWYoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByb2R1Y3QtcGFnZV9fZmF2b3JpdGVzJykpe1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcm9kdWN0LXBhZ2VfX2Zhdm9yaXRlcycpLmZvckVhY2goKGVsZW0pPT57XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZW0uY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlJylcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfWVsc2V7XHJcbiAgICAgICAgICAgICAgICAgICAgYnRuLmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZScpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbih4aHIsIGFqYXhPcHRpb25zLCB0aHJvd25FcnJvcikge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2codGhyb3duRXJyb3IgKyBcIlxcclxcblwiICsgeGhyLnN0YXR1c1RleHQgKyBcIlxcclxcblwiICsgeGhyLnJlc3BvbnNlVGV4dCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0sXHJcbiAgICAncmVtb3ZlJzogZnVuY3Rpb24oKSB7XHJcblxyXG4gICAgfVxyXG59Il0sImZpbGUiOiJ3aXNobGlzdC5qcyJ9