"use strict";
// strict typing

// Function that gets the main tag if there is one on the page
// otherwise it returns null.
function getMainTag() {
    let mainTags = document.getElementsByTagName("main");
    let hasMain = mainTags.length > 0;

    return hasMain ? mainTags[0] : null
}

// function that gets the element with the content id.
// It is to keep calls consistent. 
function getContentTag() {
    return document.getElementById("content")
}

/* 
    Function that will get the three main colors in the web page. 
    This is the color of the body tag. The color of the main tag (if present).
    And the color of the tag with id "content" (if present).
    It will return an object with the three colors saved.
    It one of the above tags are missing then that respective color will be
    set to null. 
    It will also save the body font color.
*/
function readInitial() {
    let bodyColor = window.getComputedStyle(document.body).backgroundColor;
    let mainColor = null;
    let contentColor = null;
    let fontColor = window.getComputedStyle(document.body).color;

    let mainTag = getMainTag();
    if (mainTag != null) {
        mainColor = window.getComputedStyle(mainTag).backgroundColor;
    }

    let content = getContentTag();
    if (content != null) {
        contentColor = window.getComputedStyle(content).backgroundColor;
    }


    return {b: bodyColor, m: mainColor, c: contentColor, f: fontColor}
}

/* 
    Changing the background color of the three important tags. 
    The body tag. The main tag and the tag with an id of "content".
    The latter two may not be present so it is handled with if statments. 
*/
function nightMode() {
    console.log("turning to night");
    let mainTag = getMainTag();
    let contentTag = getContentTag();

    document.body.style.backgroundColor = 'black';
    document.body.style.color = "rgb(255,77,255)"; // very pink

    if (mainTag != null) {
        mainTag.style.backgroundColor = 'black';
        console.log("changing color of mainTag");
    }

    if (contentTag != null) {
        contentTag.style.backgroundColor = 'black';
        console.log("changing color of contentTag");
    }
}

/* 
    Function that will reset the background color of the three 
    important tags.
*/
function resetColors(colors) {
    console.log("resetting");
    document.body.style.backgroundColor = colors.b;
    document.body.style.color = colors.f;

    if (colors.m != null) {
        let mainTag = getMainTag();
        mainTag.style.backgroundColor = colors.m;
    }

    if (colors.c != null) {
        let contentTag = getContentTag();
        contentTag.style.backgroundColor = colors.c;
    }
    /* can also reload the page with the following but it's slow */
    // window.location.reload();
}

function main() {
    // intial console output
    console.log("initial content");

    // variable to tell if the content should be dark mode or not
    let active = false;

    // getting the original colors
    let originalColors = readInitial();
    console.log("colors: ", originalColors);

    /* 
        This function wil enforce the dark mode on the webpage. 
        Probably through editing the page.

        It will toggle the active state. It is called every time
        the background script sends a message (this happens when the
        tooltip button is pressed)
        
        If active then it will turn the page to dark mode. Else reset it.
    */
    function night() {
        active = !active;
        if (active) {
            nightMode();
        } else {
            resetColors(originalColors);
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
        // console.log("Message from the background script:");
        // console.log(request.greeting);
        let is_active = night();

        return Promise.resolve({response: is_active});
    });

}

main();