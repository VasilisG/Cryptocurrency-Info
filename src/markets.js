const pageMarketSize = 100;
var currentMarketPage = 0;

function getQuantityElement(elem){
    return elem === null ? '-' :  elem.toLocaleString();
}

$.fn.fetchMarkets = function(page){

    var $errorArea = $(".error-area");
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
                var totalPages = parseInt(totalMarkets / pageMarketSize) + 1;

                var markets = data['data']['markets'];

                var $sourceName, $sourceIcon, $sourceVolume, $sourcePrice, $sourceMarketShare;
                var $marketItem, $marketBasicInfo;

                $('.market-pagination #market-current-page').val(page + 1);
                $('.market-pagination .total-pages').text(totalPages);

                $('.market-list-item').remove();

                $.each(markets, function(index, marketData){

                    $marketItem = $('<div class="market-list-item"></div>');
                    $marketBasicInfo = $('<div class="basic-info"></div>');

                    $sourceName = $('<div class="source-name"><span>' + marketData['sourceName'] + '</span></div>');
                    $sourceIcon = $('<div class="source-icon"><img src="' + marketData['sourceIconUrl'] + '"/></div>');
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

            }
        },
        error: function(xhr, status, error){
            $errorArea.html(status + " " + error);
        }
    });
}

$(document).ready(function(){
    $.fn.fetchMarkets(currentMarketPage);
});