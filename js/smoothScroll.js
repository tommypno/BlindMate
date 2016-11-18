// Javascript from: http://web.archive.org/web/20140213105950/http://itnewb.com/tutorial/Creating-the-Smooth-Scroll-Effect-with-JavaScript

// Determining the point on the Y Axis at which the scrolling has to start (starting coordinate) is the first thing we need to do. The point we want is the visible top of page coordinate, which takes into account any scrolling the user has done. We can then use this number, accompanied with the destination coordinate covered below to determine the distance between the starting and stopping points. This difference is then used to determine the scroll speed and perform the actual scrolling, whether scrolling up or down.

function currentYPosition() {
    // Firefox, Chrome, Opera, Safari
    if (self.pageYOffset) return self.pageYOffset;
    // Internet Explorer 6 - standards mode
    if (document.documentElement && document.documentElement.scrollTop)
        return document.documentElement.scrollTop;
    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) return document.body.scrollTop;
    return 0;
}

// Once we have the starting coordinate, we need to determine the destination coordinate. We can do this by assigning an ID to the destination element, whether it be a <div> tag, <span>, <img> or whatever. The following function expects the destination elements ID as its only parameter.

function elmYPosition(eID) {
    var elm = document.getElementById(eID);
    var y = elm.offsetTop;
    var node = elm;
    while (node.offsetParent && node.offsetParent != document.body) {
        node = node.offsetParent;
        y += node.offsetTop;
    } return y;
}

// So how does this function work, exactly? Well, say the destination element is half way down the page. What this function does is loop through the offsetParents, adding the offsetTop values to the y variable until it arrives at the top of the page. This will compute the elements true Y position.

//smoothScroll( string elementID )

// Now that we're able to obtain the start and stop Y coordinates, we're ready to perform the actual scroll operation. Here's the function, I'll explain it below:

function smoothScroll(eID) {
    var startY = currentYPosition();
    var stopY = elmYPosition(eID);
    var distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
        scrollTo(0, stopY); return;
    }
    var speed = Math.round(distance / 100);
    if (speed >= 20) speed = 20;
    var step = Math.round(distance / 25);
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;
    if (stopY > startY) {
        for (var i = startY; i < stopY; i += step) {
            setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
            leapY += step; if (leapY > stopY) leapY = stopY; timer++;
        } return;
    }
    for (var i = startY; i > stopY; i -= step) {
        setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
        leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
    }
}