const pageExchangeSize = 100;
var currentExchangePage = 0;

function getQuantityElement(elem){
    return elem === null ? '-' :  elem.toLocaleString();
}

function getImage(elem){
    return elem != null ? elem : './assets/no-logo.jpg';
}

function fetchExchanges(page){

    var $errorArea = $(".error-area");
    var $errorCode = $errorArea.children('.code');
    var $messageCode = $errorArea.children('.message');

    var $exchangeList = $('.exchange-list');
    var $exchangeLoadingOverlay = $('.exchange-loading-overlay');

    var sorting = '?order=' + $('.exchange-sort-selector .sort-dropdown option:selected').val();
    var order = '&orderDirection=' + $('.exchange-order-selector .order-dropdown option:selected').val();
    var limit = '&limit=100';
    var offset = '&offset=' + page * pageExchangeSize;

    $exchangeList.addClass('stand-by');
    $exchangeLoadingOverlay.addClass('overlay-active');

    $.ajax({
        url : 'https://api.coinranking.com/v1/public/exchanges' + sorting + order + limit + offset,
        success: function(data, status, jqXHR){

            $exchangeList.removeClass('stand-by');
            $exchangeLoadingOverlay.removeClass('overlay-active');

            if(data['status'] == 'success'){

                var stats = data['data']['stats']
                var totalExchanges = stats['total'];
                var totalExchangePages = parseInt(totalExchanges / pageExchangeSize) + 1;

                var exchanges = data['data']['exchanges'];

                var $exchangeItem, $exchangeBasicInfo;

                $('.exchange-pagination #exchange-current-page').val(page + 1);
                $('.exchange-pagination .total-pages').text(totalExchangePages);

                $('.exchange-list-item').remove();

                $.each(exchanges, function(index, exchangeData){

                    $exchangeItem = $('<div class="exchange-list-item"></div>');
                    $exchangeBasicInfo = $('<div class="basic-info"></div>');

                    $exchangeName = $('<div class="exchange-name"><span>' + exchangeData['name'] + '</span></div>');
                    $exchangeIcon = $('<div class="exchange-icon"><img src="' + getImage(exchangeData['iconUrl']) + '"/></div>');
                    $exchangeVolume = $('<div class="exchange-volume"><span>' + getQuantityElement(exchangeData['volume']) + '</span></div>');
                    $exchangePrice = $('<div class="exchange-number-of-markets"><span>' + exchangeData['numberOfMarkets'] + '</span></div>');
                    $exchangeMarketShare = $('<div class="exchange-market-share"><span>' + getQuantityElement(exchangeData['marketShare']) + '</span></div>');
                    $exchangeWebsite = $('<div class="exchange-website"><a href="' + exchangeData['websiteUrl'] + '" target="_blank"><span>Visit Website<i class="fa fas fa-link"></i></span></a></div>');
                    

                    $exchangeBasicInfo.append($exchangeName);
                    $exchangeBasicInfo.append($exchangeIcon);
                    $exchangeBasicInfo.append($exchangeVolume);
                    $exchangeBasicInfo.append($exchangePrice);
                    $exchangeBasicInfo.append($exchangeMarketShare);
                    $exchangeBasicInfo.append($exchangeWebsite);

                    $exchangeItem.append($exchangeBasicInfo);
                    $exchangeList.append($exchangeItem);
                });
            }
            else {
                $errorCode.text(result.code);
                $messageCode.text(result.message);
                $errorArea.addClass("active");
            }
        },
        error: function(xhr, status, error){
            $errorArea.html(status + " " + error);
        }
    });
}

function attachExchangeRefreshButtonListener() {
    $('.exchange-refresh').on('click', function(){
        var currentPage = parseInt($('#exchange-current-page').val());
        currentExchangePage = currentPage - 1;
        fetchExchanges(currentExchangePage);
    });
}

function attachExchangePrevPageListener() {
    $('.exchange-pagination .prev').on('click', function(){
        var currentPage = parseInt($('#exchange-current-page').val());
        if(currentPage > 1) {
            currentPage--;
            currentExchangePage = currentPage - 1;
            fetchExchanges(currentExchangePage);
        }
    });
}

function attachExchangeNextPageListener() {
    $('.exchange-pagination .next').on('click', function(){
        var currentPage = parseInt($('#exchange-current-page').val());
        var totalExchangePages = parseInt($('.exchange-pagination .total-pages').text());
        if(currentPage < totalExchangePages){
            currentPage++;
            currentExchangePage = currentPage - 1;
            fetchExchanges(currentExchangePage);
        }
    });
}

function attachExchangeKeyListener() {
    $('#exchange-current-page').keypress(function(event){
        if(event.which == 13){
            var totalExchangePages = parseInt($('.exchange-pagination .total-pages').text());
            var fieldData = $(this).val();
            var isNumber = /^\d+$/.test(fieldData);
            if(isNumber){
                var pageNumber = parseInt(fieldData);
                if(pageNumber < 1 || pageNumber > totalExchangePages){
                    $(this).val(currentExchangePage+1);
                }
                else {
                    currentExchangePage = $(this).val()-1;
                    fetchExchanges(currentExchangePage);
                }
            }
        }
    });
}

$(document).ready(function(){
    fetchExchanges(currentExchangePage);
    attachExchangeRefreshButtonListener(); 
    attachExchangePrevPageListener();
    attachExchangeNextPageListener();  
    attachExchangeKeyListener(); 
});