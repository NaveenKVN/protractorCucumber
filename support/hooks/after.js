/* globals browser */

(function () {
    'use strict';

    module.exports = function afterHooks() {
        this.After(function (scenario, done) {
            if (scenario.isFailed()) {
                browser.takeScreenshot().then(function (png) {
                    var decodedImage = new Buffer(png.replace(/^data:image\/(png|gif|jpeg);base64,/, ''), 'base64');
                    scenario.attach(decodedImage, 'image/png');
                    done();
                });
            } else {
                done();
            }
        });
    };
})();
