(function () {
    'use strict';

    // Require page objects.
    var LoginPage = require('../../../page-objects/module1/PageOne.js');

    module.exports = function beforeHooks() {

        // Tagged hook.
        // Load the page and clear localStorage.
        // Can't do this in an after hook in-case
        // a scenario fails part way through.
        this.Before({tags: ['@now']}, function () {
            var world = this;
            LoginPage.get();
            LoginPage.maximizeBrowser();

            // Clear localStorage.
            world.clearLocalStorage();

            // Reload the page with empty localStorage.
            LoginPage.get();
        });
    };

})();
