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
            if(data['status'] === 'Success'){
                $coinList.empty();
                var coins = data['coins'];
                $.each(coins, function(index, coinData){
                    var $coinItem = $('<div class="coin-list-item"></div>');
                    var $coinBasicInfo = $('<div class="basic-info"></div>');
                    var $coinMoreInfo = $('<div class="more-info"></div>');

                    var $coinName = $('<div class="name">' + coinData['name'] + "</div>");
                    var $coinSymbol = $('<div class="symbol">' + coinData['symbol'] + "</div>");
                    var $coinIcon = $('<div class="icon">' + '<img src="' + coinData['iconUrl'] + '"/></div>');
                    var $coinPrice = $('<div class="price">' + coinData['price'] + '</div>');
                    var $coinChange = $('<div class="change">' + coinData['change'] + '</div>');
                    var $coinAction = $('<div class="more">More</div>');

                    var $coinDescription = $('<div class="description"><p class="more-info-title">Description:</p><p class="more-info-data">' + coinData['description'] +'</p></div>');
                    var $coinVolume = $('<div class="volume"><p class="more-info-title">Volume:</p><p class="more-info-data"' + coinData['volume'] + '</p></div>');
                    var $coinMarketGap = $('<div class="marketCap"><p class="more-info-title">Market Cap:</p><p class="more-info-data">' + coinData['marketCap'] + '</p></div>');
                    var $coinCirculatingSupply = $('<div class="circulating-supply"><p class="more-info-title">Circulating supply:</p><p class="more-info-data">' + coinData['circulatingSupply'] + '</p></div>');
                    var $coinTotalSupply = $('<div class="total-supply"><p class="more-info-title">Total supply:</p><p class="more-info-data">' + coinData['totalSupply'] + '</p></div>');
                    var $coinFirstSeen = $('<div class="first-seen"><p class="more-info-title">First seen:</p><p class="more-info-data">' + coinData['firstSeen'] + '</p></div>');
                    var $coinNumberOfMarkets = $('<div class="number-of-markets"><p class="more-info-title">Number of markets:</p><p class="more-info-data">' + coinData['numberOfMarkets'] + '</p></div>');
                    var $coinNumberOfExchanges = $('<div class="number-of-exchanges"><p class="more-info-title">Number of exchanges:</p><p class="more-info-data">' + coinData['numberOfExchanges'] + '</p></div>');
                    var $coinHighestPrice = $('<div class="highest-price"><p class="more-info-title">Highest price:</p><p class="more-info-data">' + coinData['allTimeHigh']['price'] + '</p></div>');
                    var $coinHighstPriceDate = $('<div class="highest-price-date"><p class="more-info-title">Highest price data:</p><p class="more-info-data">' + coinData['allTimeHigh']['timestamp'] + '</p></div>');

                    $coinList.append($coinItem);
                    $coinItem.append($coinBasicInfo);
                    $coinItem.append($coinMoreInfo);

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
                    $coinMoreInfo.append($coinHighstPriceDate);
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