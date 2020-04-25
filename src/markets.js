const pageSize = 100;
var currentCoinPage = 0;

function getQuantityElement(elem){
    return elem === null ? '-' :  elem.toLocaleString();
}

$.fn.fetchMarkets = function(page){

    var $marketList = $('.market-list');
    var $marketLoadingOverlay = $('.market-loading-overlay');

    var sorting = '?order=' + $('.market-sort-selector .sort-dropdown option:selected').val();
    var order = '$orderDirection=' + $('.market-order-selector .order-dropdown option:selected').val();
    var limit = '&limit=100';
    var offset = '&offset=' + page * pageSize;

    $marketList.addClass('stand-by');
    $marketLoadingOverlay.addClass('overlay-active');

    $.ajax({
        url : 'https://api.coinranking.com/v1/public/coins' + sorting + order + limit + offset,
        success: function(data, status, jqXHR){

            $marketList.removeClass('stand-by');
            $marketLoadingOverlay.removeClass('overlay-active');

            if(data['status'] == 'success'){

                var markets = data['data']['markets'];

                var $sourceName, $sourceIcon, $sourceVolume, $sourcePrice, $sourceMarketShare;
                var $marketItem, $marketBasicInfo;

                $('.market-pagination #coin-current-page').val(page + 1);
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

        }
    });
}

$(document).ready(function(){

});