const pageSize = 100;
var currentCoinPage = 0;

function getPriceElement(price, currencySymbol){
    return isNaN(price) || price === null ? '-' : currencySymbol + ' ' + parseFloat(price).toLocaleString();
}

function getIntElement(elem, currencySymbol){
    return elem === null ? '-' : currencySymbol + ' ' + elem;
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
    else if(change == 0){
        return '<span class="no-change">' + change.toFixed(2) + '</span>';
    }
    else return '<span class="no-change">-</span>';
}

function getDescriptionElement(description){
    return description === null ? '-' : description;
}

function getQuantityElement(elem, currencySymbol){
    return elem === null ? '-' : currencySymbol + ' ' + elem.toLocaleString();
}

function getImage(elem){
    return elem != null ? elem : './assets/no-logo.jpg';
}

function fetchCoins(page){

    var $coinList = $('.coin-list');
    var $coinLoadingOverlay = $('.coin-loading-overlay');

    var $errorArea = $(".error-area");
    var $errorCode = $errorArea.children('.code');
    var $messageCode = $errorArea.children('.message');

    var baseCurrency = $(".coin-currency-dropdown option:selected").val();
    var baseCurrencyFilter = '?base=' + $(".coin-currency-dropdown option:selected").val();
    var timePeriod = '&timePeriod=' + $(".period-dropdown option:selected").val();
    var sorting = '&sort=' + $(".sort-dropdown option:selected").val();
    var order = '&order=' + $(".order-dropdown option:selected").val();
    var limit = '&limit=100';
    var offset = '&offset=' + page * pageSize;

    var currencySymbol = baseCurrency == 'USD' ? '$' : '€';

    $coinList.addClass('stand-by');
    $coinLoadingOverlay.addClass('overlay-active');


    $.ajax({
        url : 'https://api.coinranking.com/v1/public/coins' + baseCurrencyFilter + timePeriod + sorting + order + limit + offset,
        success: function(data, status, jqXHR){

            $coinList.removeClass('stand-by');
            $coinLoadingOverlay.removeClass('overlay-active');

            if(data['status'] === 'success'){

                var stats = data['data']['stats']
                var totalCoins = stats['total'];

                totalPages = parseInt(totalCoins / pageSize) + 1;
                var coins = data['data']['coins'];

                var $coinItem, $coinBasicInfo, $coinMoreInfo;
                var $coinName, $coinSymbol, $coinIcon, $coinPrice, $coinChange, $coinAction;
                var $coinDescription, $coinVolume, $coinMarketGap, $coinCirculatingSupply, $coinTotalSupply,
                    $coinFirstSeen, $coinNumberOfMarkets, $coinNumberOfExchanges, $coinHighestPrice, $coinHighestPriceDate;

                $('#coin-current-page').val(page + 1);
                $('.coin-pagination .total-pages').text(totalPages);

                $('.coin-list-item').remove();

                $.each(coins, function(index, coinData){

                    $coinItem = $('<div class="coin-list-item"></div>');
                    $coinBasicInfo = $('<div class="basic-info"></div>');
                    $coinMoreInfo = $('<div class="more-info"></div>');

                    $coinName = $('<div class="name"><span>' + coinData['name'] + '</span></div>');
                    $coinSymbol = $('<div class="symbol"><span>' + coinData['symbol'] + '</span></div>');
                    $coinIcon = $('<div class="icon">' + '<img src="' + getImage(coinData['iconUrl']) + '"/></div>');
                    $coinPrice = $('<div class="price"><span>' + getPriceElement(coinData['price'], currencySymbol) + '</span></div>');
                    $coinChange = $('<div class="change">' + getChangeElement(coinData['change']) + '</div>');
                    $coinAction = $('<div class="more"><span>More<i class="fa fas fa-chevron-down"></i></span></div>');

                    $coinDescription = $('<div class="description"><p class="more-info-title">Description:</p><div class="more-info-data-container"><p class="more-info-data">' + getDescriptionElement(coinData['description']) +'</p></div></div>');
                    $coinVolume = $('<div class="volume"><p class="more-info-title">Volume:</p><p class="more-info-data">' + getQuantityElement(coinData['volume'], '') + '</p></div>');
                    $coinMarketGap = $('<div class="marketCap"><p class="more-info-title">Market Cap:</p><p class="more-info-data">' + getQuantityElement(coinData['marketCap'], currencySymbol) + '</p></div>');
                    $coinCirculatingSupply = $('<div class="circulating-supply"><p class="more-info-title">Circulating supply:</p><p class="more-info-data">' + getQuantityElement(coinData['circulatingSupply'], currencySymbol) + '</p></div>');
                    $coinTotalSupply = $('<div class="total-supply"><p class="more-info-title">Total supply:</p><p class="more-info-data">' + getQuantityElement(coinData['totalSupply'], currencySymbol) + '</p></div>');
                    $coinFirstSeen = $('<div class="first-seen"><p class="more-info-title">First seen:</p><p class="more-info-data">' + getDateElement(coinData['firstSeen']) + '</p></div>');
                    $coinNumberOfMarkets = $('<div class="number-of-markets"><p class="more-info-title">Number of markets:</p><p class="more-info-data">' + getIntElement(coinData['numberOfMarkets'], '') + '</p></div>');
                    $coinNumberOfExchanges = $('<div class="number-of-exchanges"><p class="more-info-title">Number of exchanges:</p><p class="more-info-data">' + getIntElement(coinData['numberOfExchanges'], '') + '</p></div>');
                    $coinHighestPrice = $('<div class="highest-price"><p class="more-info-title">Highest price:</p><p class="more-info-data">' + getPriceElement(coinData['allTimeHigh']['price'], currencySymbol) + '</p></div>');
                    $coinHighestPriceDate = $('<div class="highest-price-date"><p class="more-info-title">Highest price date:</p><p class="more-info-data">' + getDateElement(coinData['allTimeHigh']['timestamp']) + '</p></div>');

                    
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

function getCoins(interval){
    fetchCoins();
    setInterval(function(){
        fetchStats();  
    },interval);
}

function attachMoreListener() {
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

function attachRefreshButtonListener() {
    $('.coin-refresh').on('click', function(){
        var currentPage = parseInt($('#coin-current-page').val());
        currentCoinPage = currentPage - 1;
        fetchCoins(currentCoinPage);
    });
}

function attachPrevPageListener() {
    $('.coin-pagination .prev').on('click', function(){
        var currentPage = parseInt($('#coin-current-page').val());
        if(currentPage > 1) {
            currentPage--;
            currentCoinPage = currentPage - 1;
            fetchCoins(currentCoinPage);
        }
    });
}

function attachNextPageListener() {
    $('.coin-pagination .next').on('click', function(){
        var currentPage = parseInt($('#coin-current-page').val());
        var totalPages = parseInt($('.coin-pagination .total-pages').text());
        if(currentPage < totalPages){
            currentPage++;
            currentCoinPage = currentPage - 1;
            fetchCoins(currentCoinPage);
        }
    });
}

function attachKeyListener() {
    $('#coin-current-page').keypress(function(event){
        if(event.which == 13){
            var totalPages = parseInt($('.coin-pagination .total-pages').text());
            var fieldData = $(this).val();
            var isNumber = /^\d+$/.test(fieldData);
            if(isNumber){
                var pageNumber = parseInt(fieldData);
                if(pageNumber < 1 || pageNumber > totalPages){
                    $(this).val(currentCoinPage+1);
                }
                else {
                    currentCoinPage = $(this).val()-1;
                    fetchCoins(currentCoinPage);
                }
            }
        }
    });
}

$(document).ready(function(){
    fetchCoins(currentCoinPage);
    attachRefreshButtonListener();
    attachMoreListener(); 
    attachPrevPageListener();
    attachNextPageListener();  
    attachKeyListener(); 
});