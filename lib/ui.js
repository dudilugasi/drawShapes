
jQuery(document).ready(function ($) {

    var c = document.getElementById("myCanvas");

    drawer = new Drawer(c.getContext("2d"));
    drawer.grid(c.width, c.height);
    drawer.ctx.fillStyle = "#000";

    var points = [];

    function resetPoints() {
        points = [];
    }

    function handle(event) {
        var shape = getShapeVal();
        var p = c.relMouseCoords(event);
        points.push(p);

        switch (shape) {
            case "line":
                if (points.length == 2) {
                    drawer.line(points[0], points[1]);
                    resetPoints();
                }
                break;
            case "circle":
                if (points.length == 2) {
                    drawer.circle(points[0], points[0].distance(points[1]));
                    resetPoints();
                }
                break;

            case "curve":
                if (points.length == 4) {
                    var accuracy = $("#accuracy").val();
                    drawer.brezierCurve(points[0], points[1], points[2], points[3], accuracy);
                    resetPoints();
                }
                drawer.circle(p, 2);
                break;

            case "polygon":
                if (points.length == 2) {
                    var lines = $("#lines").val();
                    drawer.polygon(points[0], points[1], lines);
                    resetPoints();
                }
                break;
        }
    }

    function clearCanvas() {
        drawer.ctx.clearRect(0, 0, c.width, c.height);
        drawer.grid(c.width, c.height);
        drawer.ctx.fillStyle = "#000";
    }

    $("#clear").click(clearCanvas);

    $("#user-interface input[name='shape']").click(resetPoints);

    $("#myCanvas").click(handle);
    
    $(".ui-item-label-radio").click(function(){
        var selected = $(this).attr("for");
        $(".ui-item-text-container").addClass("hidden");
        switch (selected) {
            case "ui-polygon":
                $("#lines").closest(".ui-item-text-container").removeClass("hidden");
                break;
            case "ui-curve":
                $("#accuracy").closest(".ui-item-text-container").removeClass("hidden");
                break;
                
        }
    });
    
    xAxis();

});

function xAxis() {
    var counter = 50;
    $(".xAxis-container .xAxis").each(function () {
        $(this).css("left", counter + "px");
        counter += 50;
    });
}

function getShapeVal() {
    var selectedVal = "";
    var selected = $("#user-interface input[name='shape']:checked");
    if (selected.length > 0) {
        selectedVal = selected.val();
    }
    return selectedVal;
}


function relMouseCoords(event) {
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = this;

    do {
        totalOffsetX += currentElement.offsetLeft - currentElement.scrollLeft;
        totalOffsetY += currentElement.offsetTop - currentElement.scrollTop;
    }
    while (currentElement = currentElement.offsetParent)

    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;

    return new Point(canvasX, canvasY);
}
HTMLCanvasElement.prototype.relMouseCoords = relMouseCoords;