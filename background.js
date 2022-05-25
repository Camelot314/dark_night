"use strict";
// strict typing

// function that handles errors (just prints)
function onError(error) {
    console.error(`Error: ${error}`);
}


/* 
    onClick function that is run every time that the
    toolbar button is run. It will check all the tabs
    that are active and in the window. It will then 
    call the send Messge function 
*/
function onClick() {
    console.log("button was clicked");
    browser.tabs.query({
        currentWindow: true,
        active: true
    }).then(sendMessageToTabs).catch(onError);
}
  
/* 
    This will send a message to the content script (night.js)
    so that it can edit the content of the of the individual page
    This background script does not have access to that content. 
    the purpose of sending a message is to inform the individual page
    that the button has been pressed and to update the page to dark mode
    variant. 
*/
function sendMessageToTabs(tabs) {
    // sending a message to each tab
    for (let tab of tabs) {
        // the message greeting will be 'true'
        browser.tabs.sendMessage(
            tab.id,
            {greeting: true}
        ).then(response => {
            // expecting a response that from the active tab
            // prints response
            console.log("Message from the content script:");
            console.log(response.response);
        }).catch(onError);
        /*         
        errors are thrown if 
        1) content script does not send a response back
        2) button pressed on a page where the content script (night.js)
             is not allowed to run on (priveledged page) 
        */
    }
}

// main function.
function main() {
    // adding a listener that will run the main function every time the button toolbar
    // button is pressed. 
    browser.browserAction.onClicked.addListener(onClick);
}


main()


  
  