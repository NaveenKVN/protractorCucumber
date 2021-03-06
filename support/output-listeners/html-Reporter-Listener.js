var Cucumber = require('cucumber'),
    fs = require('fs');
    path = require('path'),
    JsonFormatter = Cucumber.Listener.JsonFormatter(),
    reportDirectory = '../../cukes-pro/reports/',
    reportFileName = 'cucumber-test-results.json',
    reportDirectoryPath = path.join(__dirname, '../../' + reportDirectory),
    reportFilePath = path.join(reportDirectoryPath + reportFileName);

function mkdirp(path, root) {
    var dirs = path.split('/'),
        dir = dirs.shift(),
        root = (root || '') + dir + '/';

    try {
        fs.mkdirSync(root);
    } catch (e) {
        if (!fs.statSync(root).isDirectory()){
            throw new Error(e);
        }
    }

    return !dirs.length || mkdirp(dirs.join('/'), root);
}

module.exports = function JsonOutputHook() {
    JsonFormatter.log = function (json) {
        fs.open(reportFilePath, 'w+', function (err, fd) {
            if (err) {
                mkdirp(reportDirectoryPath);
                fd = fs.openSync(reportFilePath, 'w+');
            }

            fs.writeSync(fd, json);

            console.log('json file location: ' + reportFilePath);
        });
    };

    this.registerListener(JsonFormatter);
};
