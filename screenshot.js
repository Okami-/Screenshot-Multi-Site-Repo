// Run with phantomjs screenshot.js
var fs 				= require('fs');

//some reason this doesn't work with phantomjs
//var readline 	= require('linebyline');

var domainfile 				= 'drupal7.sites.txt';
var SCREENSHOT_WIDTH 	= 1280;
var SCREENSHOT_HEIGHT = 900;
var LOAD_WAIT_TIME 		= 1000;
//raw links for filenames
var domains 				= [];	//fs.read().split(/\r?\n/);
var imageFolder 			= "/public/images";
var index 						= 0;
//formatted http links
var URLS 							= [];
var page = require("webpage").create();

var filedata = fs.read(domainfile); // read the file into a single string
domains = filedata.split(/[\r\n]/); // split the string on newline and sto

for (var i=0;i<domains.length;i++) {
		 URLS[i]="http://"+domains[i];
		 console.log(domains[i]);
}


var encodeURL = function(page) {
  var encodedURL =  encodeURIComponent(url);
}

var getPageHeight = function(page){
    var documentHeight = page.evaluate(function() {
        return document.body.offsetHeight;
    })
    //console.log("getting height:", documentHeight)
    return documentHeight;
}


var exitIfLast = function(index,array){
    console.log(array.length - index-1, "more screenshots to go!");

    if (index == array.length-1){
        console.log("Process finished, exiting PhantomJS");
        phantom.exit();
    }
}

var takeScreenshot = function(element){

    console.log("Opening URL:", element);

    page.viewportSize = {width:SCREENSHOT_WIDTH, height:SCREENSHOT_HEIGHT};
		page.clipRect = {
				top:0,
				left:0,
				width:SCREENSHOT_WIDTH,
				height: SCREENSHOT_HEIGHT
		};

		page.open(element, function(status) {
				console.log("Status: " + status);

				if(status === "success") {
 					page.render("public/images/" + domains[index] +".png");
					console.log("Rendered:", domains[index]+".png");
				}


			}
		);

    console.log("Waiting for page to load...");

    page.onLoadFinished = function() {
			exitIfLast(index,URLS);
			index++;
			takeScreenshot(URLS[index]);
    }


		page.onError = function (msg, trace) {
    	console.log(msg);
	    trace.forEach(function(item) {
	        console.log('ERROR:  ', item.file, ':', item.line);
	    }
		);
	};
}

//run the primary function
takeScreenshot(URLS[index]);
