function changeCurrency(id, currency) {

    function changePrices(func) {
        cards.forEach(function(element) {
            $(element + '.price').text(func($(element + '.price').attr('value')));
        });
    }

    var sel = '#' + id + ' .icon-checked';
    var devision = $(currency).attr('value');

    $(".currencies-item .icon-checked").css('opacity', '0');
    $(sel).css('opacity', '1');

    switch (currency) {
        case '.RUB':
            $(".currency").text('₽');
            $(".currency-note").text('Руб');
            changePrices(function(val){
                return val;
            });
            break;
        case '.USD':
            $(".currency").text('$');
            $(".currency-note").text('USD');
            changePrices(function(val){
                return (val / devision).toFixed(2);
            });
            break;
        case '.EUR':
            $(".currency").text('€');
            $(".currency-note").text('EUR');
            changePrices(function(val){
                return (val / devision).toFixed(2);
            });
            break;
    }
}

function bcolorChecked(name) {

    var sel = '[name="' + name + '"] .icon-checked';

    if (!$(sel).attr('style')) {
        $(sel).attr({'style':'opacity: 1;',
        'value':'true'});
    } else {
        $(sel).attr({'style':'',
        'value':'false'});
    }
}
