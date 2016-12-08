var Arrange = (function () {
    function Arrange() {
        this._desending = true;
        this.init();
    }
    var d = __define,c=Arrange,p=c.prototype;
    p.init = function () {
        this._arr = [];
        this._compareFun = this.compares;
    };
    d(p, "desending",undefined
        ,function (d) {
            this._desending = d;
        }
    );
    p.put = function (obj) {
        var len = this._arr.length;
        if (len < 1) {
            this._arr.push(obj);
            return;
        }
        var s = 0;
        var e = len - 1;
        while (len > 1) {
            var mid = Math.floor(s + len / 2);
            var result = this._compareFun(obj, this._arr[mid]);
            switch (result) {
                case -1:
                    s = mid;
                    break;
                case 0:
                    this._arr.splice(mid, 0, obj);
                    return;
                case 1:
                    e = mid;
                    break;
            }
            len = e - s;
        }
        result = this._compareFun(obj, this._arr[s]);
        if (result == 1 || result == 0) {
            this._arr.splice(s, 0, obj);
            return;
        }
        result = this._compareFun(obj, this._arr[e]);
        if (result == 1 || result == 0) {
            this._arr.splice(e, 0, obj);
            return;
        }
        else {
            this._arr.splice(e + 1, 0, obj);
        }
    };
    d(p, "key",undefined
        ,function (k) {
            if (k != null && k != "")
                this._key = k;
        }
    );
    d(p, "compareWitchNum",undefined
        ,function (b) {
            if (b) {
                this._compareFun = this.cwitchNum;
            }
        }
    );
    p.cwitchNum = function (n, m) {
        var result = n - m;
        if (!this._desending)
            result *= -1;
        if (result < 0)
            return -1;
        if (result > 0)
            return 1;
        return 0;
    };
    p.compares = function (obja, objB) {
        var result = obja[this._key] - objB[this._key];
        if (!this._desending)
            result *= -1;
        if (result < 0)
            return -1;
        if (result > 0)
            return 1;
        return 0;
    };
    p.pop = function () {
        return this._arr.pop();
    };
    p.shift = function () {
        return this._arr.shift();
    };
    d(p, "array"
        ,function () {
            return this._arr;
        }
    );
    p.clear = function () {
        this._arr = [];
    };
    p.rePlaceArr = function (arr, des, key) {
        if (des === void 0) { des = true; }
        if (key === void 0) { key = ""; }
        if (arr == null || arr.length < 2)
            return arr;
        if (key == null || key == "")
            this._compareFun = this.cwitchNum;
        this.desending = des;
        this.clear();
        for (var i in arr) {
            this.put(arr[i]);
        }
        arr = this.array;
        return arr;
    };
    return Arrange;
}());
egret.registerClass(Arrange,'Arrange');
//# sourceMappingURL=Arrange.js.map