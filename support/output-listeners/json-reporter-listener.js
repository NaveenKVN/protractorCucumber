'use strict';

// This json output may allow Jenkins HTML reports to be generated with the Jenkins Cucumber Test Result plugin.
// https://wiki.jenkins-ci.org/display/JENKINS/Cucumber+Test+Result+Plugin
module.exports = function JsonOutputHook() {
    var Cucumber = require('cucumber');
    var JsonFormatter = Cucumber.Listener.JsonFormatter();
    var fs = require('fs');

    // If this was being run in Jenkins this filepath could be injected as an environment variable in the Jenkins job.
    var filepath = 'cukes-pro/reports/cucumber-report.json';

    JsonFormatter.log = function (json) {
        fs.writeFile(filepath, json, function (err) {
            if (err) {
                throw err;
            }
            console.log('json report: ' + filepath);
        });
    };

    this.registerListener(JsonFormatter);
};
