'use strict';

var _marked = [demo].map(regeneratorRuntime.mark);

/**
 * Created by lzc on 2017/6/12.
 */
var s = new Set();
[2, 3, 4, 5].forEach(function (x) {
    return s.add(x);
});

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
    for (var _iterator = s[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _i = _step.value;

        console.info(_i);
    }
} catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
} finally {
    try {
        if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
        }
    } finally {
        if (_didIteratorError) {
            throw _iteratorError;
        }
    }
}

function demo() {
    var a;
    return regeneratorRuntime.wrap(function demo$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    a = 1;
                    _context.next = 3;
                    return a;

                case 3:
                    _context.next = 5;
                    return a++;

                case 5:
                    return _context.abrupt('return', a++);

                case 8:
                case 'end':
                    return _context.stop();
            }
        }
    }, _marked[0], this);
}

for (var i = 0; i < 10; i++) {
    var i = 'abc';
    console.info(i);
}

var temp = '123';
{
    temp = 'abc';
}
console.info(temp);