// Run with phantomjs screenshot.js

var fs = require('fs');
var SCREENSHOT_WIDTH = 1280;
var SCREENSHOT_HEIGHT = 500;
var LOAD_WAIT_TIME = 5000;
var listDrupalPages = fs.read('drupal7.sites.txt').split(/\r?\n/);
var imageFolder = "/public/images"
for (var i=0;i<listDrupalPages.length;i++) {
  listDrupalPages[i]="http://"+listDrupalPages[i];
}
var URLS = listDrupalPages;


var getPageURL = function(page){
    var getPageURL = page.url;
    console.log("getting url:", getPageURL)
    return getPageURL;
}

var encodeURL = function(page) {
  var encodedURL =  encodeURIComponent(url);
}

var getPageHeight = function(page){
    var documentHeight = page.evaluate(function() {
        return document.body.offsetHeight;
    })
    console.log("getting height:", documentHeight)
    return documentHeight;
}

var renderPage = function(page){

    var url =  getPageURL(page);
    var pageHeight = getPageHeight(page);

    page.clipRect = {
        top:0,left:0,width: SCREENSHOT_WIDTH,
        height: pageHeight
    };
    page.render("public/images/" + page.title +".png");
    console.log("rendered:", url+".png")
}

var exitIfLast = function(index,array){
    console.log(array.length - index-1, "more screenshots to go!")
    console.log("~~~~~~~~~~~~~~")
    if (index == array.length-1){
        console.log("exiting phantomjs")
        phantom.exit();
    }
}

var takeScreenshot = function(element){

    console.log("opening URL:", element)

    var page = require("webpage").create();

    page.viewportSize = {width:SCREENSHOT_WIDTH, height:SCREENSHOT_HEIGHT};

    page.open(element);

    console.log("waiting for page to load...")

    page.onLoadFinished = function() {
        setTimeout(function(){
            console.log("that's long enough")
            renderPage(page)
            exitIfLast(index,URLS)
            index++;
            takeScreenshot(URLS[index]);
        },LOAD_WAIT_TIME)
    }
}

var index = 0;

takeScreenshot(URLS[index]);
