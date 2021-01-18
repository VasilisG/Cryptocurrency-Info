const pageMarketSize = 100;
var currentMarketPage = 0;

function getQuantityElement(elem){
    return elem === null ? '-' :  elem.toLocaleString();
}

function getImage(elem){
    return elem != null ? elem : './assets/no-logo.jpg';
}

function fetchMarkets(page){

    var $errorArea = $(".error-area");
    var $errorCode = $errorArea.children('.code');
    var $messageCode = $errorArea.children('.message');

    var $marketList = $('.market-list');
    var $marketLoadingOverlay = $('.market-loading-overlay');

    var sorting = '?order=' + $('.market-sort-selector .sort-dropdown option:selected').val();
    var order = '&orderDirection=' + $('.market-order-selector .order-dropdown option:selected').val();
    var limit = '&limit=100';
    var offset = '&offset=' + page * pageMarketSize;

    $marketList.addClass('stand-by');
    $marketLoadingOverlay.addClass('overlay-active');

    $.ajax({
        url : 'https://api.coinranking.com/v1/public/markets' + sorting + order + limit + offset,
        success: function(data, status, jqXHR){

            $marketList.removeClass('stand-by');
            $marketLoadingOverlay.removeClass('overlay-active');

            if(data['status'] == 'success'){

                var stats = data['data']['stats']
                var totalMarkets = stats['total'];
                var totalMarketPages = parseInt(totalMarkets / pageMarketSize) + 1;

                var markets = data['data']['markets'];

                var $sourceName, $sourceIcon, $sourceVolume, $sourcePrice, $sourceMarketShare;
                var $marketItem, $marketBasicInfo;

                $('.market-pagination #market-current-page').val(page + 1);
                $('.market-pagination .total-pages').text(totalMarketPages);

                $('.market-list-item').remove();

                $.each(markets, function(index, marketData){

                    $marketItem = $('<div class="market-list-item"></div>');
                    $marketBasicInfo = $('<div class="basic-info"></div>');

                    $sourceName = $('<div class="source-name"><span>' + marketData['sourceName'] + '</span></div>');
                    $sourceIcon = $('<div class="source-icon"><img src="' + getImage(marketData['sourceIconUrl']) + '"/></div>');
                    $sourceVolume = $('<div class="source-volume"><span>' + getQuantityElement(marketData['volume']) + '</span></div>');
                    $sourcePrice = $('<div class="source-price"><span>' + getQuantityElement(marketData['price']) + '</span></div>');
                    $sourceMarketShare = $('<div class="source-market-share"><span>' + getQuantityElement(marketData['marketShare']) + '</span></div>');

                    $marketBasicInfo.append($sourceName);
                    $marketBasicInfo.append($sourceIcon);
                    $marketBasicInfo.append($sourceVolume);
                    $marketBasicInfo.append($sourcePrice);
                    $marketBasicInfo.append($sourceMarketShare);

                    $marketItem.append($marketBasicInfo);
                    $marketList.append($marketItem);
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

function attachMarketRefreshButtonListener() {
    $('.market-refresh').on('click', function(){
        var currentPage = parseInt($('#market-current-page').val());
        currentMarketPage = currentPage - 1;
        fetchMarkets(currentMarketPage);
    });
}

function attachMarketPrevPageListener() {
    $('.market-pagination .prev').on('click', function(){
        var currentPage = parseInt($('#market-current-page').val());
        if(currentPage > 1) {
            currentPage--;
            currentMarketPage = currentPage - 1;
            fetchMarkets(currentMarketPage);
        }
    });
}

function attachMarketNextPageListener() {
    $('.market-pagination .next').on('click', function(){
        var currentPage = parseInt($('#market-current-page').val());
        var totalMarketPages = parseInt($('.market-pagination .total-pages').text());
        if(currentPage < totalMarketPages){
            currentPage++;
            currentMarketPage = currentPage - 1;
            fetchMarkets(currentMarketPage);
        }
    });
}

function attachMarketKeyListener() {
    $('#market-current-page').keypress(function(event){
        if(event.which == 13){
            var totalMarketPages = parseInt($('.market-pagination .total-pages').text());
            var fieldData = $(this).val();
            var isNumber = /^\d+$/.test(fieldData);
            if(isNumber){
                var pageNumber = parseInt(fieldData);
                if(pageNumber < 1 || pageNumber > totalMarketPages){
                    $(this).val(currentMarketPage+1);
                }
                else {
                    currentMarketPage = $(this).val()-1;
                    fetchMarkets(currentMarketPage);
                }
            }
        }
    });
}

$(document).ready(function(){
    fetchMarkets(currentMarketPage);
    attachMarketRefreshButtonListener(); 
    attachMarketPrevPageListener();
    attachMarketNextPageListener();  
    attachMarketKeyListener(); 
});