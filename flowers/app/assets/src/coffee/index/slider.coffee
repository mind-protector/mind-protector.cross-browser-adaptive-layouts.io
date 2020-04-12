# source: https://itchief.ru/examples/lab.php?topic=javascript&file=chiefslider-with-looping

sliderServices = ->
    multiItemSlider = do ->
        do ->
            _mainElement = document.querySelector('.slider')
            _sliderWrapper = _mainElement.querySelector('.slider-wrapper')
            _sliderItems = _mainElement.querySelectorAll('.slider-item')
            _sliderControls = _mainElement.querySelectorAll('.slider-control')
            _sliderControlLeft = _mainElement.querySelector('.slider-control-left')
            _sliderControlRight = _mainElement.querySelector('.slider-control-right')
            _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width)
            _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width)
            _positionLeftItem = 0
            _transform = 0
            _step = _itemWidth / _wrapperWidth * 100
            _items = []
            _startX = 0

            for item, index in _sliderItems
                _items.push({ item: item, position: index, transform: 0 })

            position =
                getItemMin: ->
                    indexItem = 0
                    for item, index in _items
                        if item.position < _items[indexItem].position
                            indexItem = index
                    indexItem
                getItemMax: ->
                    indexItem = 0
                    for item, index in _items
                        if item.position > _items[indexItem].position
                            indexItem = index
                    indexItem

                getMin: ->
                    _items[position.getItemMin()].position

                getMax: ->
                    _items[position.getItemMax()].position

            _transformItem = (direction) ->

                if direction == 'right'
                    _positionLeftItem++
                    if (_positionLeftItem + _wrapperWidth / _itemWidth - 1) > position.getMax()
                        nextItem = position.getItemMin()
                        _items[nextItem].position = position.getMax() + 1
                        _items[nextItem].transform += _items.length * 100
                        _items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)'
                    _transform -= _step

                  if direction == 'left'
                        _positionLeftItem--
                        if _positionLeftItem < position.getMin()
                            nextItem = position.getItemMax()
                            _items[nextItem].position = position.getMin() - 1
                            _items[nextItem].transform -= _items.length * 100
                            _items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)'
                        _transform += _step;

                  _sliderWrapper.style.transform = 'translateX(' + _transform + '%)'

            _controlClick = (e) ->
                if (e.target.classList.contains('slider-control'))
                    e.preventDefault()
                    direction = if e.target.classList.contains('slider-control-right') then 'right' else 'left'
                    _transformItem(direction)

            _setUpListeners = do ->
                for item in _sliderControls
                    item.addEventListener('click', _controlClick)

                _mainElement.addEventListener('touchstart', (e) ->
                    _startX = e.changedTouches[0].clientX)

                _mainElement.addEventListener('touchend', (e) ->
                    _endX = e.changedTouches[0].clientX
                    _deltaX = _endX - _startX
                    if _deltaX > 50
                        _transformItem('left')
                    else if _deltaX < -50
                        _transformItem('right'))

            result =
                right: ->
                    _transformItem('right')
                left: ->
                    _transformItem('left')

$(sliderServices)
