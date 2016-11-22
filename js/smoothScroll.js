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

// smoothScroll( string elementID )

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

// The first thing this function does is fetch the start and stop Y coordinates via the functions covered above. Next, it compares these two values to determine the distance between them. When setting the distance variable, an alternate control structure is used to determine which point should be subtracted from the other (depends on whether it needs to scroll up or down).

// Once the start, stop and distance values are set, a check is done to see whether the destination element is less than 100 pixels away, and if so it simply jumps to it. If the destination point is further away the function continues by dynamically setting the scroll speed (distance divided by 100) without letting it exceed 20, step size (distance to jump each time the visible top of page Y coordinate is changed, thus moving closer to the destination), the leapY (next coordinate to jump to) and the initial timer value of 0.

// At this point, a check is performed to determine whether the destination point is greater than the starting point (scrolling down). If so, the if is entered and the scroll is performed otherwise the for loop at the very bottom is hit, which performs an upward scroll.

// Here is how the first for loop works (scroll up). The loop starts out with i = the start Y coordinate and loops until it hits the stop Y coordinate, incrementing i the step size per iteration. Inside the loop there is a setTimeout which runs window.scrollTo with the next Y coordinate as its value (leapY). The actual timeout value is determined by multiplying the timer value by the speed. So, the timeout value for the first iteration would be 0 * speed, the second iteration would use 1 * speed and so on.

// After the setTimeout, the leapY value is incremented the step size (the next Y coordinate to jump to). A check is also performed to ensure the leapY value doesn't exceed the destination coordinate.

// The scroll up for loop works the exact opposite of the scroll down loop we just covered. Hopefully I've done a decent job of explaining how this function works.