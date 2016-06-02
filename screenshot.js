// Run with phantomjs screenshot.js

var fs = require('fs');
var PAGE_WIDTH = 960;
var PAGE_HEIGHT = 640;
var listDrupalPages = fs.read('drupal7.sites.txt').split(/\r?\n/);
var imageFolder = "/public/images"

for (var i=0;i<listDrupalPages.length;i++) {
  listDrupalPages[i]="http://"+listDrupalPages[i];
}

var URLS = listDrupalPages;
console.log(URLS);
// phantomjs page object and helper flag
var page = require('webpage').create(),
  loadInProgress = false,
  pageIndex = 0;

// set clip and viewport based on PAGE_WIDTH and PAGE_HEIGHT constants
if (PAGE_WIDTH > 0 && PAGE_HEIGHT > 0) {
  page.viewportSize = {
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT
  };

  page.clipRect = {
    top: 0,
    left: 0,
    width: PAGE_WIDTH,
    height: PAGE_HEIGHT
  };
}

// page handlers
page.onLoadStarted = function() {
  loadInProgress = true;
  console.log('page ' + (pageIndex + 1) + ' load started');
};

page.onLoadFinished = function() {
  loadInProgress = false;
  page.render("public/images/" + (pageIndex + 1) + "_" + PAGE_WIDTH + "x" + PAGE_HEIGHT + ".png");
  console.log('page ' + (pageIndex + 1) + ' load finished');
  pageIndex++;
};

// try to load or process a new page every 250ms
setInterval(function() {
  if (!loadInProgress && pageIndex < URLS.length) {
    console.log("image " + (pageIndex + 1));
    page.open(URLS[pageIndex]);
  }
  if (pageIndex == URLS.length) {
    console.log("image render complete!");
    phantom.exit();
  }
}, 250);

console.log('Number of URLS: ' + URLS.length);
