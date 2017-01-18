/* global browser */
'use strict';

var _ = require('underscore');

module.exports = function () {
    this.World = function World() {

        this.clearLocalStorage = function () {
            browser.executeScript('localStorage.clear();');

        };

        this.flattenTable = function (table) {
            // Array of arrays e.g.
            // [ [ 'First todo' ], [ 'Second todo' ] ]
            table = table.raw();

            // Flatten array
            // [ 'First todo', 'Second todo' ]
            return _.flatten(table);
        };

        //done(); // tell Cucumber we're finished and to use 'this' as the world instance

        
    };


};
