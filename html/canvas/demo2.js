/**
 * Created by lzc on 2017/3/6.
 */
// matrix 2x2
function M22()
{
    this._11 = 2;
    this._12 = 1;
    this._21 = 3;
    this._22 = 2;
}

M22.prototype.getInvert = function() {
    var out = new M22();
    var det = this._11 * this._22 - this._12 * this._21;
    if (det > -0.0001 && det < 0.0001)
        return null;

    out._11 = this._22 / det;
    out._22 = this._11 / det;

    out._12 = -this._12 / det;
    out._21 = -this._21 / det;

    return out;
}

var m22 = new M22();
m22 = m22.getInvert();