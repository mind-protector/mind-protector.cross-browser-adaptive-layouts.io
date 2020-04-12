timeouts = []

clearTimeouts = ->
    for i in timeouts
        clearTimeout(i)

favoriteAdd = (id) ->
    sel = '#' + id
    alert = '.alert'
    size = 29 + 'px'

    alertActions = (k, text) ->

        goods += k
        $(alert + ' .alert-title').text(text)
        regularShape(goods, goodsRegularShapes, 'goods-value')

        clearTimeouts()

        timeouts.push(setTimeout ->
                                    $(alert).css('opacity', '1')
            , 200)

        timeouts.push(setTimeout ->
                                    $(alert).css('display', 'block')
            , 200)

        timeouts.push(setTimeout ->
                                    $(alert).css('opacity', '0')
            , 4000)

        timeouts.push(setTimeout ->
                                    $(alert).css('display', 'none')
            , 4151)

    unless $(sel).attr('style')
        $(sel).attr('style', 'color:#f02626;')
        alertActions(1, 'Сохранено в избранное')
    else
        $(sel).attr('style', '')
        alertActions(-1, 'Удалено из избранного')

alertClose = ->
    alert = '.alert'

    $(alert).css('opacity', '0')
    clearTimeouts()
    timeouts.push(setTimeout ->
                                $(alert).css('display', 'none')
        , 151)

infoInit = (score, allReviews, id, date, hit) ->
    sel = '#' + id + ' '
    cards.push(sel)

    rating =
        if (allReviews < 4)
            ['Новинка!', 'text-info']
        else if (score < 3.6)
             ['Хорошо', 'text-warning']
        else if (score < 4.6)
            ['Превосходно', 'text-success']
        else
            ['Восхитительно', 'text-success']

    score = if (allReviews < 4) then 'NEW' else score

    defClasses = 'card-text d-block '

    switch (date)
        when true
            $(sel + '.card-text').text('Уже собран')
            $(sel + '.card-text').attr('class', defClasses + 'text-success')
        when false
            $(sel + '.card-text').text('Еще не собран')
            $(sel + '.card-text').attr('class', defClasses + 'main-color')
        else
            $(sel + '.card-text').text('Будет готов в ' + date);
            $(sel + '.card-text').attr('class', defClasses + 'text-info')

    $(sel + '.score-block').text(score)
    $(sel + '.review-block b').text(rating[0])
    $(sel + '.review-block b').attr('class', rating[1])

    unless (hit)
        $(sel + '.hit-mark').attr('style', 'display:none;')
