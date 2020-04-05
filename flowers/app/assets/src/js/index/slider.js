// source: https://itchief.ru/examples/lab.php?topic=javascript&file=chiefslider-with-looping

function sliderServices() {
    var multiItemSlider = (function () {
        return function () {
            var
              _mainElement = document.querySelector('.slider'),
              _sliderWrapper = _mainElement.querySelector('.slider-wrapper'),
              _sliderItems = _mainElement.querySelectorAll('.slider-item'),
              _sliderControls = _mainElement.querySelectorAll('.slider-control'),
              _sliderControlLeft = _mainElement.querySelector('.slider-control-left'),
              _sliderControlRight = _mainElement.querySelector('.slider-control-right'),
              _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width),
              _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width),
              _positionLeftItem = 0,
              _transform = 0,
              _step = _itemWidth / _wrapperWidth * 100,
              _items = [],
              _startX = 0;

            _sliderItems.forEach(function (item, index) {
                _items.push({ item: item, position: index, transform: 0 });
            });

            var position = {
                getItemMin: function () {
                    var indexItem = 0;
                    _items.forEach(function (item, index) {
                        if (item.position < _items[indexItem].position) {
                            indexItem = index;
                        }
                    });
                    return indexItem;
                },
                getItemMax: function () {
                    var indexItem = 0;
                    _items.forEach(function (item, index) {
                        if (item.position > _items[indexItem].position) {
                            indexItem = index;
                        }
                    });
                    return indexItem;
                },
                getMin: function () {
                    return _items[position.getItemMin()].position;
                },
                getMax: function () {
                    return _items[position.getItemMax()].position;
                }
            }

            var _transformItem = function (direction) {
                var nextItem;
                if (direction === 'right') {
                    _positionLeftItem++;
                if ((_positionLeftItem + _wrapperWidth / _itemWidth - 1) > position.getMax()) {
                    nextItem = position.getItemMin();
                    _items[nextItem].position = position.getMax() + 1;
                    _items[nextItem].transform += _items.length * 100;
                    _items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
                }
                    _transform -= _step;
              }
              if (direction === 'left') {
                    _positionLeftItem--;
                if (_positionLeftItem < position.getMin()) {
                    nextItem = position.getItemMax();
                    _items[nextItem].position = position.getMin() - 1;
                    _items[nextItem].transform -= _items.length * 100;
                    _items[nextItem].item.style.transform = 'translateX(' + _items[nextItem].transform + '%)';
                }
                    _transform += _step;
              }
              _sliderWrapper.style.transform = 'translateX(' + _transform + '%)';
            }

            var _controlClick = function (e) {
                if (e.target.classList.contains('slider-control')) {
                    e.preventDefault();
                    var direction = e.target.classList.contains('slider-control-right') ? 'right' : 'left';
                    _transformItem(direction);
                }
            };

            var _setUpListeners = function () {
                _sliderControls.forEach(function (item) {
                    item.addEventListener('click', _controlClick);
                });
                _mainElement.addEventListener('touchstart', function (e) {
                    _startX = e.changedTouches[0].clientX;
                });
                _mainElement.addEventListener('touchend', function (e) {
                    var
                        _endX = e.changedTouches[0].clientX,
                        _deltaX = _endX - _startX;
                    if (_deltaX > 50) {
                        _transformItem('left');
                    } else if (_deltaX < -50) {
                        _transformItem('right');
                    }
                  });
            }

            _setUpListeners();

            return {
              right: function () {
                  _transformItem('right');
              },
              left: function () {
                  _transformItem('left');
              }
            }

          }
    }());

    var slider = multiItemSlider();
};

$(sliderServices);
