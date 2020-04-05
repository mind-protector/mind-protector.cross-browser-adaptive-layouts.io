var timeouts = [];

function clearTimeouts(timeouts) {
    for (var i = 0; i <= timeouts.length; i++)
    clearTimeout(timeouts[i]);

    return timeouts = [];
}

function favoriteAdd(id) {
    var sel = '#' + id;
    var alert = '.alert';
    var size = 29 + 'px';

    function alertActions(k, text) {

        goods += k;
        $(alert + ' .alert-title').text(text);
        regularShape(goods, goodsRegularShapes, 'goods-value');

        timeouts = clearTimeouts(timeouts);

        timeouts.push(setTimeout(function(){ $(alert).css('opacity', '1')}, 200));
        timeouts.push(setTimeout(function(){ $(alert).css('display', 'block')}, 200));

        timeouts.push(setTimeout(function(){ $(alert).css('opacity', '0')}, 4000));
        timeouts.push(setTimeout(function(){ $(alert).css('display', 'none')}, 4151));

        return timeouts;
    }

    if (!$(sel).attr('style')) {
        $(sel).attr('style', 'color:#f02626;');
        timeouts = alertActions(1, 'Сохранено в избранное');
    } else {
        $(sel).attr('style', '');
        timeouts = alertActions(-1, 'Удалено из избранного');
    }
}

function alertClose() {
    var alert = '.alert';

    $(alert).css('opacity', '0');
    timeouts = clearTimeouts(timeouts);
    timeouts.push(setTimeout(function(){ $(alert).css('display', 'none')}, 151));
}

function infoInit(score, allReviews, id, date, hit) {
    var sel = '#' + id + ' ';
    var rating = (allReviews < 4) ? ['Новинка!', 'text-info'] :
        (score < 3.6) ? ['Хорошо', 'text-warning'] :
        (score < 4.6) ? ['Превосходно', 'text-success'] :
        ['Восхитительно', 'text-success'];
    score = (allReviews < 4) ? 'NEW' : score;

    var defClasses = 'card-text d-block ';
    switch (date) {
        case true:
            $(sel + '.card-text').text('Уже собран');
            $(sel + '.card-text').attr('class', defClasses + 'text-success');
            break;
        case false:
            $(sel + '.card-text').text('Еще не собран');
            $(sel + '.card-text').attr('class', defClasses + 'main-color');
            break;
        default:
            $(sel + '.card-text').text('Будет готов в ' + date);
            $(sel + '.card-text').attr('class', defClasses + 'text-info');
            break;
    }

    $(sel + '.score-block').text(score);
    $(sel + '.review-block b').text(rating[0]);
    $(sel + '.review-block b').attr('class', rating[1]);

    if (!hit) {
        $(sel + '.hit-mark').attr('style', 'display:none;');
    }
}
