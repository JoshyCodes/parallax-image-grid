const imageGrid = document.querySelector('.js-dynamic-image-grid');
const mediumBreak = 601; //breakpoint as min-width for Medium screens
const largeBreak = 1000; //breakpoint as min-width for Large screens
var state = ""; //global variable to record screen state
var rellax = new Rellax('.rellax', {speed: 0}); //activate rellax.js for parallax


function isState(){
        let screenX = window.innerWidth; //get current screen width
        if (screenX < mediumBreak){ //test for screen size then send to comparison function
            checkState("small");
        } else if (screenX < largeBreak){
            checkState("medium");
        } else {
            checkState("large");
        }
    }

function checkState(newState){
    if (newState !== state){ //compare current screen state to previous
        state = newState;   //set gloabal state variable to current state
        restartRellax();    //restart the rellax.js system
    }
}

function restartRellax() {
    stopRellax();   //stop current rellax settings and return to normal positions
    if ( state == "medium"){   //retreive screen state
        let rightColumnImages = document.querySelectorAll(".a-img:nth-child(2n+2)");    //get element array
        rightColumnImages.forEach( el =>    //set speed attribute for appropriate images
            el.setAttribute('data-rellax-speed', '-0.5')
        )
    } else if ( state == "large"){  //retreive screen state
        let leftColumnImages = document.querySelectorAll(".a-img:nth-child(3n+1)"); //get element arrays
        let rightColumnImages = document.querySelectorAll(".a-img:nth-child(3n+3)");// for the two outside columns
        leftColumnImages.forEach( el => //set speed attribute for appropriate images
            el.setAttribute('data-rellax-speed', '-0.5')
        )
        rightColumnImages.forEach( el =>    //set speed attribute for appropriate images
            el.setAttribute('data-rellax-speed', '-0.3')
        )
    }
    rellax.refresh();   //refresh rellax.js for new variables
}

function stopRellax(){
    let images = document.querySelectorAll(".a-img"); //get all image elements
    images.forEach( el =>   //set attributes to stop parallx
        el.setAttribute('data-rellax-speed', '0')
    )
    rellax.refresh();    //refresh rellax.js for new variables
}


//Throttle function pulled from
//https://remysharp.com/2010/07/21/throttling-function-calls
//throttle used instead of debounce as debounce would wait till scroll end to refire,
//throttle fires along the way after x interval.
function throttle(fn, threshhold, scope) {
    threshhold || (threshhold = 250);
    var last,
        deferTimer;
    return function () {
        var context = scope || this;
        var now = +new Date,
            args = arguments;
        if (last && now < last + threshhold) {
            // hold on to it
            clearTimeout(deferTimer);
            deferTimer = setTimeout(function () {
                last = now;
                fn.apply(context, args);
            }, threshhold);
        } else {
            last = now;
            fn.apply(context, args);
        }
    };
}

//event listener for scrolling events
//throttle usage... throttle(function, interval)
window.addEventListener("resize", throttle(isState, 200));
window.addEventListener("load", isState);


