function openPage(tab) {
    // browser.tabs.create({
    //   url: "https://developer.mozilla.org"
    // });
    console.log("background");
    console.log(tab);
  }
  
browser.browserAction.onClicked.addListener(openPage);


  
  