'use strict';
/* global browser */
var $q = require('q');

module.exports = {
    url: '',
    get: get,
    getPageTitle: getPageTitle,
    maximizeBrowser: maximizeBrowser,
    navigateToPage: navigateToPage,
    getExpectedPageTitle: getexpectedTitle,
    getCurrentUrl: getCurrentUrl,
    isErrorPage: isErrorPage
};

/**
 * Navigate to the home page.
 * @return {undefined}
 */
function get() {
    /*jshint validthis:true */
    var url = this.url;
    if (!url) {
        throw new TypeError('The page object URL is undefined to call \'get\'');
    }
    browser.get(url);
}

function click() {
    //browser.click(this.)
}

/**
 * Get the page title.
 * @return {string} page title.
 */
function getPageTitle() {
    return browser.getTitle();
}

function getexpectedTitle() {
    return this.title;
}

function maximizeBrowser() {
    browser.driver.manage().window().maximize();
}

function getCurrentUrl() {
    return browser.getLocationAbsUrl();
}

function navigateToPage() {
    browser.navigate.to(this.url);
}
function isErrorPage() {

    var deferred = $q.defer();
    var routeError = /route-error/gi;
    var error404 = /404/gi;

    return browser.getCurrentUrl().then(function (url) {
        var strUrl = url;
        //deferred.resolve(true);
        //console.log("The page is loaded: "+ browser.getCurrentUrl());
        if ((strUrl.search(routeError) == -1) || (strUrl.search(error404) == -1))
            deferred.resolve(false);
        else {
            deferred.reject('The Error Page is Displayed : ' + strUrl);
        }
        return deferred.promise;

    })
}

