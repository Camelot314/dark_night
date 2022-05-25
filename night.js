"use strict";
// strict typing

// intial console output
console.log("initial content");

// global variable to tell if the content should be dark mode or not
let active = false;


/* 
    This function wil enforce the dark mode on the webpage. 
    Probably through editing the page.

    It will toggle the active state. It is called every time
    the background script sends a message (this happens when the
        tooltip button is pressed)
    
    If active then it will turn the page to dark mode. Else reset it.
    Done imperitively.
*/
function night() {
    active = !active;
    if (active) {
        console.log("turning to night");
        
    } else {
        console.log("resetting");
    }

    return active;
}




/* 
    Adding a listener to check for a message from the background script.
    The only message that the background script should be sending is 
    an indication of `true` if the button has been pressed.

    When the script is then notified it will complete the code in the brackets.
    This code will log the message from the background scipt.
    It will then call the night function to process everything.

    NOTE: It does not check to see what the request greeing is because
    I am assuming there is only one request that will be sent from the 
    background script. 

    Finally it will resolve and return the promive with the output of night.
    The output of night will be an indication of if the forced dark mode is 
    enabled on the current page. 
*/
browser.runtime.onMessage.addListener(request => {
    console.log("Message from the background script:");
    console.log(request.greeting);

    let is_active = night();


    return Promise.resolve({response: is_active});
});

