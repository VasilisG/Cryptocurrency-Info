function getPriceElement(price){
    return parseFloat(price).toLocaleString();
}

function getDateElement(timestamp){
    var date = new Date(timestamp);
    var year = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(date);
    var month = new Intl.DateTimeFormat('en', { month: '2-digit' }).format(date);
    var day = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(date);
    return [day, month, year].join(' / ');
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

function getDescriptionElement(description){
    return description === null ? '-' : description;
}

function getQuantityElement(elem){
    return elem === null ? '-' : elem.toLocaleString();
}

$.fn.fetchCoins = function(page){

    const pageSize = 100;

    var $coinList = $('.coin-list');

    var $errorArea = $(".error-area");
    var $errorCode = $errorArea.children('.code');
    var $messageCode = $errorArea.children('.message');

    var baseCurrency = '?base=' + $(".currency-dropdown option:selected").val();
    var timePeriod = '&timePeriod?=' + $(".period-dropdown option:selected").val();
    var sorting = '&sort=' + $(".sort-dropdown option:selected").val();
    var order = '&order=' + $(".order-dropdown option:selected").val();
    var limit = '&limit=100';
    var offset = '$offset=' + page;

    $.ajax({
        url : 'https://api.coinranking.com/v1/public/coins' + baseCurrency + timePeriod + sorting + order + limit + offset,
        success: function(data, status, jqXHR){

            console.log(data);
            console.log(data['status']);

            if(data['status'] === 'success'){

                var stats = data['data']['stats']
                var totalCoins = stats['total'];
                var totalPages = parseInt(totalCoins / pageSize) + 1;

                var coins = data['data']['coins'];

                var $coinItem, $coinBasicInfo, $coinMoreInfo;
                var $coinName, $coinSymbol, $coinIcon, $coinPrice, $coinChange, $coinAction;
                var $coinDescription, $coinVolume, $coinMarketGap, $coinCirculatingSupply, $coinTotalSupply,
                    $coinFirstSeen, $coinNumberOfMarkets, $coinNumberOfExchanges, $coinHighestPrice, $coinHighestPriceDate;

                $('#coin-current-page').val(page + 1);
                $('.total-pages').text(totalPages);

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
                    $coinAction = $('<div class="more"><span>More<i class="fa fas fa-chevron-down"></i></span></div>');

                    $coinDescription = $('<div class="description"><p class="more-info-title">Description:</p><p class="more-info-data">' + getDescriptionElement(coinData['description']) +'</p></div>');
                    $coinVolume = $('<div class="volume"><p class="more-info-title">Volume:</p><p class="more-info-data">' + getQuantityElement(coinData['volume']) + '</p></div>');
                    $coinMarketGap = $('<div class="marketCap"><p class="more-info-title">Market Cap:</p><p class="more-info-data">' + getQuantityElement(coinData['marketCap']) + '</p></div>');
                    $coinCirculatingSupply = $('<div class="circulating-supply"><p class="more-info-title">Circulating supply:</p><p class="more-info-data">' + getQuantityElement(coinData['circulatingSupply']) + '</p></div>');
                    $coinTotalSupply = $('<div class="total-supply"><p class="more-info-title">Total supply:</p><p class="more-info-data">' + getQuantityElement(coinData['totalSupply']) + '</p></div>');
                    $coinFirstSeen = $('<div class="first-seen"><p class="more-info-title">First seen:</p><p class="more-info-data">' + getDateElement(coinData['firstSeen']) + '</p></div>');
                    $coinNumberOfMarkets = $('<div class="number-of-markets"><p class="more-info-title">Number of markets:</p><p class="more-info-data">' + coinData['numberOfMarkets'] + '</p></div>');
                    $coinNumberOfExchanges = $('<div class="number-of-exchanges"><p class="more-info-title">Number of exchanges:</p><p class="more-info-data">' + coinData['numberOfExchanges'] + '</p></div>');
                    $coinHighestPrice = $('<div class="highest-price"><p class="more-info-title">Highest price:</p><p class="more-info-data">' + getPriceElement(coinData['allTimeHigh']['price']) + '</p></div>');
                    $coinHighestPriceDate = $('<div class="highest-price-date"><p class="more-info-title">Highest price data:</p><p class="more-info-data">' + getDateElement(coinData['allTimeHigh']['timestamp']) + '</p></div>');

                    
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

$.fn.getCoins = function(interval){
    $.fn.fetchCoins();
    setInterval(function(){
        $.fn.fetchStats();  
    },interval);
}

$.fn.attachMoreListener = function() {
    $('body').on('click', '.more', function(){
        $moreInfo = $(this).parent().siblings('.more-info');
        if($moreInfo.hasClass('more-info-active')){
            $moreInfo.removeClass('more-info-active');
            $(this).html('<span>More<i class="fa fas fa-chevron-down"></i></span>');
        }
        else {
            $moreInfo.addClass('more-info-active');
            $(this).html('<span>Less<i class="fa fas fa-chevron-up"></i></span>');
        } 
    });
}

$.fn.attachRefreshButtonListener = function() {
    $('.coin-refresh').on('click', function(){
        $.fn.fetchCoins();
    });
}

$.fn.attachPrevPageListener = function() {
    $('.prev').on('click', function(){
        var currentPage = parseInt($('#coin-current-page').val());
        if(currentPage > 1) {
            currentPage--;
            $.fn.fetchCoins(currentPage - 1);
        }
    });
}

$.fn.attachNextPageListener = function() {
    $('.next').on('click', function(){
        var currentPage = parseInt($('#coin-current-page').val());
        var totalPages = parseInt($('.total-pages').val());
        if(currentPage < totalPages){
            currentPage++;
            $.fn.fetchCoins(currentPage - 1);
        }
    });
}

$(document).ready(function(){
    $.fn.fetchCoins(0);
    $.fn.attachRefreshButtonListener();
    $.fn.attachMoreListener();    
});