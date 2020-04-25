const pageSize = 100;
var currentCoinPage = 0;

$.fn.fetchMarkets = function(page){

    var sorting = '?order=' + $('.market-sort-selector .sort-dropdown option:selected').val();
    var order = '$orderDirection=' + $('.market-order-selector .order-dropdown option:selected').val();
    var limit = '&limit=100';
    var offset = '&offset=' + page * pageSize;

    $.ajax({
        url : 'https://api.coinranking.com/v1/public/coins' + sorting + order + limit + offset,
        success: function(data, status, jqXHR){

        }
    });
}

$(document).ready(function(){
    
});