function fetchStats(){
    var $loadingArea = $(".stats-loading-overlay");
    var $statsArea = $(".stats-area");
    var $totalCoins = $statsArea.find(".total-coins");
    var $totalMarkets = $statsArea.find(".total-markets");
    var $totalTradingVolume = $statsArea.find(".total-trading-volume");
    var $totalExchanges = $statsArea.find(".total-exchanges");
    var $totalMarketCap = $statsArea.find(".total-market-cap");

    var $errorArea = $(".error-area");
    var $errorCode = $errorArea.children('.code');
    var $messageCode = $errorArea.children('.message');

    var currency = $(".currency-dropdown option:selected").val();
    var symbol = currency == 'EUR' ? '€' : '$';

    $.ajax({
        url : 'https://api.coinranking.com/v1/public/stats?' + currency,
        success: function(result, status, jqXHR){  
            if(result.status === 'success'){
                $totalCoins.siblings("p").html(result.data.totalCoins);
                $totalMarkets.siblings("p").html(result.data.totalMarkets);
                $totalTradingVolume.siblings("p").html(result.data.total24hVolume.toLocaleString() + "<sup>" + symbol + "</sup>");
                $totalExchanges.siblings("p").html(result.data.totalExchanges);
                $totalMarketCap.siblings("p").html(result.data.totalMarketCap.toLocaleString() + "<sup>" + symbol + "</sup>");
                $loadingArea.addClass("inactive");
                $statsArea.addClass("active");
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

$(document).ready(function(){
    fetchStats();
    $(".refresh").on("click", function(){
        fetchStats();
    });
});
