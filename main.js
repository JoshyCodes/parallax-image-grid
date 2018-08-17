const imageGrid = document.querySelector('.js-dynamic-image-grid');
const animationSpeedSmall = 20; //100 is full speed or 1x for small screen
const animationSpeedMedium = 20; //100 is full speed or 1x for medium screen
const animationSpeedLarge = 20; //100 is full speed or 1x for large screen

//***** find element size + location
function getlLocation(){
    console.log('firing now');
    //get coodinates for parent element
    let rect = imageGrid.getBoundingClientRect();
    //adjust starting point due to viewport
    let start = rect.top - window.innerHeight;
    //adjust end point due to viewport
    let end = rect.bottom - window.innerHeight;
    //finding the multiplier
    let sizeVariant = Math.trunc((end - start) / 100);
    let multiplier = Math.trunc(Math.abs(start) / sizeVariant);
    //break down to decimal for speed control in animation
    multiplier = multiplier / 100;
    //send values to next step, dumping unneeded values
    findDistance(start, end, multiplier);
}

//***** compare current scroll to element location
function findDistance(start, end, multiplier){
    //verify scroll has entered element area
    if(start < 0 && end > 0){
        //get current width of screen viewport
        let windowSize = window.innerWidth;
        //test for screen size
        if (windowSize < 601){
            handleSmallScreen(multiplier);
        } else if (windowSize < 1001) {
            handleMediumScreen(multiplier);
        } else {
            handleLargeScreen(multiplier);
        }
    }
}

//*****Template strings were not working at time of trial,
//*****will revisit soon. Wanted the rest of funtionality first.

function handleSmallScreen(multiplier){
    //set multiplier as per animation speed setting
    multiplier = multiplier * animationSpeedSmall;
    //innerhtml for dev use only - filler for time
    document.getElementById('perc').innerHTML = multiplier;


    //************
    //after css pattern is complete,
    //animate transform +/- 100vw on scroll %
    //************


}

//function for handling medium screen actions
function handleMediumScreen(multiplier){
    //set multiplier as per animation speed setting
    multiplier = multiplier * animationSpeedMedium;

    //create array of images needing animated
    let leftColumnImages = document.querySelectorAll(".a-img:nth-child(2n+1)");
    let rightColumnImages = document.querySelectorAll(".a-img:nth-child(2n+2)");

    // Pass ooff elements to parallax function
    giveParallax( leftColumnImages, multiplier);
    giveParallax( rightColumnImages, (multiplier * -1 ) );
}

//function for handling large screen actions
function handleLargeScreen(multiplier){

    //set multiplier as per animation speed setting
    multiplier = multiplier * animationSpeedLarge;

    //create array of images needing animated for column one
    let leftColumnImages = document.querySelectorAll(".a-img:nth-child(3n+1)");

    //create array of images needing animated for column three
    let rightColumnImages = document.querySelectorAll(".a-img:nth-child(3n+3)");

    // Pass off elements to parallax function
    giveParallax( leftColumnImages, multiplier );
    giveParallax( rightColumnImages, multiplier );

}

function giveParallax( movers, multiplier ){

    //for loop to modify array of images in column three
    movers.forEach( el =>
    el.style.transform = `translateY(${multiplier}%)`
);

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
window.addEventListener("scroll", throttle(getlLocation, 500));