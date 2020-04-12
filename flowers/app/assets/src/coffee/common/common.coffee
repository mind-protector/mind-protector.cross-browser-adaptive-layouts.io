regularShape = (number, titles, id, sel) ->
    unless sel? then sel = '#' + id
    cases = [2, 0, 1, 1, 1, 2]
    shape = titles[if (number % 100 > 4 and number % 100 < 20) then 2 else cases[if (number % 10 < 5) then number % 10 else 5]]
    $(sel).text(number + ' ' + shape)
