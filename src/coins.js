$.fn.fetchCoins = function(){

    var $errorArea = $(".error-area");
    var $errorCode = $errorArea.children('.code');
    var $messageCode = $errorArea.children('.message');

    $.ajax({
        url : 'https://api.coinranking.com/v1/public/coins',
        success: function(result, status, jqXHR){
            console.log(result);
        },
        error: function(xhr, status, error){
            $errorArea.html(status + " " + error);
        }
    });
}

$(document).ready(function(){
    $.fn.fetchCoins();

    $('.more').on('click', function(){
        $moreInfo = $(this).parent().siblings('.more-info');
        if($moreInfo.hasClass('more-info-active')){
            $moreInfo.removeClass('more-info-active');
        }
        else $moreInfo.addClass('more-info-active');
        // $(this).parent().siblings('.more-info').slideToggle();
    });
});