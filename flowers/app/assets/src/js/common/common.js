function regularShape(number, titles, id, sel) {
    sel = (sel !== undefined) ? sel : '#' + id;

    var cases = [2, 0, 1, 1, 1, 2];
    var regularShape = titles[ (number%100>4 && number%100<20) ? 2 : cases[(number%10<5)?number%10:5] ];
    $(sel).text(number + ' ' + regularShape);
}
