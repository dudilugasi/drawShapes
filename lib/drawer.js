function Point(x, y) {

    this.x = x;
    this.y = y;

}

Point.prototype.minus = function () {

    return new Point(-this.x, -this.y);

};

Point.prototype.round = function () {

    return new Point(Math.round(this.x), Math.round(this.y));

};

Point.prototype.distance = function(p2) {
    
    return Math.sqrt( Math.pow(this.x - p2.x, 2) + Math.pow(this.y - p2.y, 2));
    
}

function Drawer(ctx) {

    this.ctx = ctx;

}

Drawer.prototype.putPixel = function (p) {

    this.ctx.fillRect(p.x, p.y, 1, 1);

};

Drawer.prototype.line = function (p1, p2) {

    var dx = Math.abs(p2.x - p1.x);
    var dy = Math.abs(p2.y - p1.y);
    var sx = ((p2.x - p1.x) > 0) ? 1 : -1;
    var sy = ((p2.y - p1.y) > 0) ? 1 : -1;


    if (dx >= dy) {
        var p = 2 * dy - dx;
        while (p1.x !== p2.x) {
            this.putPixel(p1);
            if (p > 0) {
                p1.y += sy;
                p -= 2 * dx;
            }

            p1.x += sx;
            p += 2 * dy;
        }
    }
    else if (dy > dx) {
        var p = 2 * dx - dy;
        while (p1.y !== p2.y) {
            this.putPixel(p1);
            if (p > 0) {
                p1.x += sx;
                p -= 2 * dy;
            }
            p1.y += sy;
            p += 2 * dx;
        }
    }
};

Drawer.prototype.circle = function (pc, r) {

    var newPoint = new Point(0, r);
    var p = 1 - r;
    this.plotCirclePoints(pc, newPoint);

    while (newPoint.x < newPoint.y) {
        newPoint.x++;
        if (p < 0) {
            p += 2 * newPoint.x + 1;
        }
        else {
            newPoint.y--;
            p += 2 * (newPoint.x - newPoint.y) + 1;
        }
        this.plotCirclePoints(pc, newPoint);
    }

};

Drawer.prototype.plotCirclePoints = function (pc, pp) {

    this.putPixel(new Point(pc.x + pp.x, pc.y + pp.y));
    this.putPixel(new Point(pc.x - pp.x, pc.y + pp.y));
    this.putPixel(new Point(pc.x + pp.x, pc.y - pp.y));
    this.putPixel(new Point(pc.x - pp.x, pc.y - pp.y));
    this.putPixel(new Point(pc.x + pp.y, pc.y + pp.x));
    this.putPixel(new Point(pc.x - pp.y, pc.y + pp.x));
    this.putPixel(new Point(pc.x + pp.y, pc.y - pp.x));
    this.putPixel(new Point(pc.x - pp.y, pc.y - pp.x));

};

Drawer.prototype.brezierCurve = function (p1, p2, p3, p4, lines) {

    //from 0 to 1 in lines steps
    var step = 1 / lines;
    var brezMatrix = [[-1, 3, -3, 1], [3, -6, 3, 0], [-3, 3, 0, 0],
        [1, 0, 0, 0]] ;
    var xVec = [p1.x, p2.x, p3.x, p4.x];
    var yVec = [p1.y, p2.y, p3.y, p4.y];
    var points = [];
    var tempx, tempy;

    for (var t = 0; t < 1; t += step) {
        tempx = numeric.dot(numeric.dot([Math.pow(t, 3), Math.pow(t, 2), t, 1], brezMatrix), xVec);
        tempy = numeric.dot(numeric.dot([Math.pow(t, 3), Math.pow(t, 2), t, 1], brezMatrix), yVec);
        points.push(new Point(tempx, tempy).round());
    }
    points.push(p4);

    for (var i = 0, l = points.length - 1; i < l; i++) {
        this.line(points[i], points[i + 1]);
    }

};


Drawer.prototype.polygon = function (pc, pr, lines) {

    var transform = new Transform();
    var teta = 2 * Math.PI / lines;
    var points = [];

    for (var i = 0, tempTeta = teta; i < lines; i++, tempTeta += teta) {
        var point = transform.rotateOnCenter(pc, pr, tempTeta);
        points.push(point);
    }

    for (var i = 0, l = points.length - 1; i < l; i++) {
        this.line(points[i].round(), points[i + 1].round());
    }

    this.line(points[i].round(), points[0].round());

};

Drawer.prototype.grid = function (w, h) {
    this.ctx.fillStyle = "#E8E8E8";
    for (var i = 50; i < w; i = i + 50) {
        this.line(new Point(i,0),new Point(i,w));
    }
    for (var i = 50; i < h; i = i + 50) {
        this.line(new Point(0,i),new Point(h,i));
    }
}

function Transform() {}

Transform.prototype.translate = function (p, pt) {

    var T = [[1, 0, 0], [0, 1, 0], [pt.x, pt.y, 1]];
    var result = numeric.dot([p.x, p.y, 1], T);

    return new Point(result[0], result[1]);

};

Transform.prototype.rotateOnCenter = function (pc, pr, t) {

    var R = [[Math.cos(t), Math.sin(t), 0], [-Math.sin(t), Math.cos(t), 0], [0, 0, 1]];

    var p = this.translate(pr, pc.minus());

    var result = numeric.dot([p.x, p.y, 1], R);

    p = this.translate(new Point(result[0], result[1]), pc);

    return p;
};


//function flowerOfLife(w, h, r) {
//    var counter = 0;
//    var xs = r * 88 / 100;
//    var ys = r * 50 / 100;
//    for (var i = 0; i < w; i += xs) {
//        for (var j = 0; j < h; j += ys * 2) {
//            drawCircle(i, (counter % 2 === 0) ? j + ys : j, r);
//        }
//        counter++;
//    }
//}