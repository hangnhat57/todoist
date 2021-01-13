var tmp = require('tmp');
var path = require('path');
let tempFile = tmp.fileSync();
// let reportPortalFormatter = path.resolve(process.cwd(), 'features/step_definitions/support/handlers.js');

exports.cucumberOpts = {
    strict: true,
    format: [
        // "pretty",
        // "./cucumber_support/allure-reporter.js",
        "json:../reports/cucumber/results.json",
        // `${reportPortalFormatter}:${tempFile.name}`
    ],
    require: [
        "../test/steps/**/*.js",
        "./cucumber_support/*.js"
    ],
    tags: "not @ignore"
};
