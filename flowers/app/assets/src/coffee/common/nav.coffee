changeCurrency = (id, currency) ->

    changePrices = (func) ->
        for card in cards
            $(card + ".price").text(func($(card + '.price').attr('value')))


    sel = '#' + id + ' .icon-checked'
    devision = $(currency).attr('value')

    $(".currencies-item .icon-checked").css('opacity', '0')
    $(sel).css('opacity', '1')

    switch currency
        when '.RUB'
            $(".currency").text('₽')
            $(".currency-note").text('Руб')
            changePrices((val) -> val)
        when '.USD'
            $(".currency").text('$')
            $(".currency-note").text('USD')
            changePrices((val) -> (val / devision).toFixed(2))
        when '.EUR'
            $(".currency").text('€')
            $(".currency-note").text('EUR')
            changePrices((val) -> (val / devision).toFixed(2))

bcolorChecked  = (name) ->

    sel = '[name="' + name + '"] .icon-checked'

    unless $(sel).attr('style')
        $(sel).attr({'style':'opacity: 1;',
        'value':'true'})
    else
        $(sel).attr({'style':'',
        'value':'false'})
