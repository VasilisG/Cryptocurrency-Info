const pageExchangeSize = 100;
var currentExchangePage = 0;

function getQuantityElement(elem){
    return elem === null ? '-' :  elem.toLocaleString();
}