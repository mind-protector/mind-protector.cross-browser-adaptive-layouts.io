var goods = 0,
    articles = 0,
    cards = [],

reviewsRegularShapes = ['Положительная оценка',
                        'Положительные оценки',
                        'Положительных оценок'],

goodsRegularShapes = ['товар', 'товара', 'товаров'];

function CBR_XML_Daily_Ru(rates) {
    var USD = rates.Valute.USD.Value;
    var EUR = rates.Valute.EUR.Value;

    $('.USD').attr('value', USD);
    $('.EUR').attr('value', EUR);
}
