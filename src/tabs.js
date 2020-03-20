$(document).ready(function(){

    var $statsItem = $('.stats-item');
    var $coinsItem = $('.coins-item');
    var $marketsItem = $('.markets-item');
    var $exchangesItem = $('.exchanges-item');
    var $getCoinItem = $('.get-coin-item');
    var $getCoinHistoryItem = $('.get-coin-history-item');

    var $statsArea = $('.stats-area');
    var $coinsArea = $('.coins-area');
    var $marketsArea = $('.markets-area');
    var $exchangesArea = $('.exchanges-area');
    var $getCoinArea = $('.get-coin-area');
    var $getCoinHistoryArea = $('.get-coin-history-area');

    $statsItem.addClass('active-tab');

    $statsItem.click(function(){
        $statsItem.addClass('active-tab');
        $statsArea.addClass('active');
        $coinsItem.removeClass('active-tab');
        $coinsArea.removeClass('active');
        $marketsItem.removeClass('active-tab');
        $marketsArea.removeClass('active');
        $exchangesItem.removeClass('active-tab');
        $exchangesArea.removeClass('active');
        $getCoinItem.removeClass('active-tab');
        $getCoinArea.removeClass('active');
        $getCoinHistoryItem.removeClass('active-tab');
        $getCoinHistoryArea.removeClass('active');
    });

    $coinsItem.click(function(){
        $statsItem.removeClass('active-tab');
        $statsArea.removeClass('active');
        $coinsItem.addClass('active-tab');
        $coinsArea.addClass('active');
        $marketsItem.removeClass('active-tab');
        $marketsArea.removeClass('active');
        $exchangesItem.removeClass('active-tab');
        $exchangesArea.removeClass('active');
        $getCoinItem.removeClass('active-tab');
        $getCoinArea.removeClass('active');
        $getCoinHistoryItem.removeClass('active-tab');
        $getCoinHistoryArea.removeClass('active');
    });

    $marketsItem.click(function(){
        $statsItem.removeClass('active-tab');
        $statsArea.removeClass('active');
        $coinsItem.removeClass('active-tab');
        $coinsArea.removeClass('active');
        $marketsItem.addClass('active-tab');
        $marketsArea.addClass('active');
        $exchangesItem.removeClass('active-tab');
        $exchangesArea.removeClass('active');
        $getCoinItem.removeClass('active-tab');
        $getCoinArea.removeClass('active');
        $getCoinHistoryItem.removeClass('active-tab');
        $getCoinHistoryArea.removeClass('active');
    });

    $exchangesItem.click(function(){
        $statsItem.removeClass('active-tab');
        $statsArea.removeClass('active');
        $coinsItem.removeClass('active-tab');
        $coinsArea.removeClass('active');
        $marketsItem.removeClass('active-tab');
        $marketsArea.removeClass('active');
        $exchangesItem.addClass('active-tab');
        $exchangesArea.addClass('active');
        $getCoinItem.removeClass('active-tab');
        $getCoinArea.removeClass('active');
        $getCoinHistoryItem.removeClass('active-tab');
        $getCoinHistoryArea.removeClass('active');
    });

    $getCoinItem.click(function(){
        $statsItem.removeClass('active-tab');
        $statsArea.removeClass('active');
        $coinsItem.removeClass('active-tab');
        $coinsArea.removeClass('active');
        $marketsItem.removeClass('active-tab');
        $marketsArea.removeClass('active');
        $exchangesItem.removeClass('active-tab');
        $exchangesArea.removeClass('active');
        $getCoinItem.addClass('active-tab');
        $getCoinArea.addClass('active');
        $getCoinHistoryItem.removeClass('active-tab');
        $getCoinHistoryArea.removeClass('active');
    });

    $getCoinHistoryItem.click(function(){
        $statsItem.removeClass('active-tab');
        $statsArea.removeClass('active');
        $coinsItem.removeClass('active-tab');
        $coinsArea.removeClass('active');
        $marketsItem.removeClass('active-tab');
        $marketsArea.removeClass('active');
        $exchangesItem.removeClass('active-tab');
        $exchangesArea.removeClass('active');
        $getCoinItem.removeClass('active-tab');
        $getCoinArea.removeClass('active');
        $getCoinHistoryItem.addClass('active-tab');
        $getCoinHistoryArea.addClass('active');
    });
});