$(document).ready(function(){

    var $statsItem = $('.stats-item');
    var $coinsItem = $('.coins-item');
    var $marketsItem = $('.markets-item');
    var $exchangesItem = $('.exchanges-item');

    var $statsArea = $('.stats-area');
    var $coinsArea = $('.coins-area');
    var $marketsArea = $('.markets-area');
    var $exchangesArea = $('.exchanges-area');

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
    });
});