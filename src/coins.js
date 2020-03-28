function getPriceElement(price){
    return parseFloat(price).toFixed(4);
}

function getChangeElement(change){
    if(change > 0){
        return '<span class="positive-change">' + '+' + change.toFixed(2) + '</span>';
    }
    else if(change < 0) {
        return  '<span class="negative-change">' + change.toFixed(2) + '</span>';
    }
    else return '<span class="no-change">' + change.toFixed(2) + '</span>'
}

$.fn.fetchCoins = function(){

    var $coinList = $('.coin-list');

    var $errorArea = $(".error-area");
    var $errorCode = $errorArea.children('.code');
    var $messageCode = $errorArea.children('.message');

    $.ajax({
        url : 'https://api.coinranking.com/v1/public/coins',
        success: function(data, status, jqXHR){

            console.log(data);
            console.log(data['status']);

            if(data['status'] === 'success'){

                var coins = data['data']['coins'];

                var $coinItem, $coinBasicInfo, $coinMoreInfo;
                var $coinName, $coinSymbol, $coinIcon, $coinPrice, $coinChange, $coinAction;
                var $coinDescription, $coinVolume, $coinMarketGap, $coinCirculatingSupply, $coinTotalSupply,
                    $coinFirstSeen, $coinNumberOfMarkets, $coinNumberOfExchanges, $coinHighestPrice, $coinHighestPriceDate;

                $('.coin-list-item').remove();

                $.each(coins, function(index, coinData){

                    $coinItem = $('<div class="coin-list-item"></div>');
                    $coinBasicInfo = $('<div class="basic-info"></div>');
                    $coinMoreInfo = $('<div class="more-info"></div>');

                    $coinName = $('<div class="name"><span>' + coinData['name'] + '</span></div>');
                    $coinSymbol = $('<div class="symbol"><span>' + coinData['symbol'] + '</span></div>');
                    $coinIcon = $('<div class="icon">' + '<img src="' + coinData['iconUrl'] + '"/></div>');
                    $coinPrice = $('<div class="price"><span>' + getPriceElement(coinData['price']) + '</span></div>');
                    $coinChange = $('<div class="change">' + getChangeElement(coinData['change']) + '</div>');
                    $coinAction = $('<div class="more"><span>More</span></div>');

                    $coinDescription = $('<div class="description"><p class="more-info-title">Description:</p><p class="more-info-data">' + coinData['description'] +'</p></div>');
                    $coinVolume = $('<div class="volume"><p class="more-info-title">Volume:</p><p class="more-info-data">' + coinData['volume'] + '</p></div>');
                    $coinMarketGap = $('<div class="marketCap"><p class="more-info-title">Market Cap:</p><p class="more-info-data">' + coinData['marketCap'] + '</p></div>');
                    $coinCirculatingSupply = $('<div class="circulating-supply"><p class="more-info-title">Circulating supply:</p><p class="more-info-data">' + coinData['circulatingSupply'] + '</p></div>');
                    $coinTotalSupply = $('<div class="total-supply"><p class="more-info-title">Total supply:</p><p class="more-info-data">' + coinData['totalSupply'] + '</p></div>');
                    $coinFirstSeen = $('<div class="first-seen"><p class="more-info-title">First seen:</p><p class="more-info-data">' + coinData['firstSeen'] + '</p></div>');
                    $coinNumberOfMarkets = $('<div class="number-of-markets"><p class="more-info-title">Number of markets:</p><p class="more-info-data">' + coinData['numberOfMarkets'] + '</p></div>');
                    $coinNumberOfExchanges = $('<div class="number-of-exchanges"><p class="more-info-title">Number of exchanges:</p><p class="more-info-data">' + coinData['numberOfExchanges'] + '</p></div>');
                    $coinHighestPrice = $('<div class="highest-price"><p class="more-info-title">Highest price:</p><p class="more-info-data">' + coinData['allTimeHigh']['price'] + '</p></div>');
                    $coinHighestPriceDate = $('<div class="highest-price-date"><p class="more-info-title">Highest price data:</p><p class="more-info-data">' + coinData['allTimeHigh']['timestamp'] + '</p></div>');

                    
                    $coinBasicInfo.append($coinName);
                    $coinBasicInfo.append($coinSymbol);
                    $coinBasicInfo.append($coinIcon);
                    $coinBasicInfo.append($coinPrice);
                    $coinBasicInfo.append($coinChange);
                    $coinBasicInfo.append($coinAction);

                    $coinMoreInfo.append($coinDescription);
                    $coinMoreInfo.append($coinVolume);
                    $coinMoreInfo.append($coinMarketGap);
                    $coinMoreInfo.append($coinCirculatingSupply);
                    $coinMoreInfo.append($coinTotalSupply);
                    $coinMoreInfo.append($coinFirstSeen);
                    $coinMoreInfo.append($coinNumberOfMarkets);
                    $coinMoreInfo.append($coinNumberOfExchanges);
                    $coinMoreInfo.append($coinHighestPrice);
                    $coinMoreInfo.append($coinHighestPriceDate);

                    $coinItem.append($coinBasicInfo);
                    $coinItem.append($coinMoreInfo);

                    $coinList.append($coinItem);
                });
            }
            else{

            }
        },
        error: function(xhr, status, error){
            $errorArea.html(status + " " + error);
        }
    });
}

$.fn.attachMoreListener = function() {
    $('body').on('click', '.more', function(){
        $moreInfo = $(this).parent().siblings('.more-info');
        if($moreInfo.hasClass('more-info-active')){
            $moreInfo.removeClass('more-info-active');
        }
        else $moreInfo.addClass('more-info-active');;
    });
}

$(document).ready(function(){
    $.fn.fetchCoins();
    $.fn.attachMoreListener();    
});