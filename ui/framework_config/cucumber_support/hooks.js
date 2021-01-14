"use strict";
import {browser} from "protractor";
import {setDefaultTimeout} from "cucumber";
import {baseUrls} from "../baseUrls.conf";
import {log} from "../../helpers/browser_utilities";

const TEST_ENVIRONMENT = process.env.TEST_ENVIRONMENT || "staging";
const apiProtocol = baseUrls[TEST_ENVIRONMENT].apiProtocol;
const apiEndpoint = baseUrls[TEST_ENVIRONMENT].apiEndpoint;
let metadata;
var colors = require("colors/safe");
require("dotenv").config();
const util = require("../../helpers/browser_utilities/browserUtils");
const sec = 1000;
const {BeforeAll, Before, After, Status} = require("cucumber");
const conf = require("../main.config").config;
var counter = 1;


Before({tags: "@manual"}, function () {
    return "pending";
});
Before({timeout: 600 * sec}, async function (scenario) {
    let scenarioName = scenario.pickle.name;
    log(colors.yellow(`
        (${counter})>> `) + colors.yellow(colors.inverse(`Start executing scenario: ${scenarioName}`)));
    await browser.getProcessedConfig().then(config => {
        metadata = config.capabilities.metadata;
    });
    counter++;
    await browser.driver.manage().window().maximize();
    await setDefaultTimeout(600 * sec);
    await browser.waitForAngularEnabled(false);
    return await browser.get(conf.baseUrl);
});


After(async function (scenario) {
    let scenaroName = scenario.pickle.name;
    let scenarostatus = scenario.result.status.toString().toUpperCase();

    let attach;
    if (scenario.result.status === Status.FAILED) {
        log(
            colors.bold.red(`
${scenarostatus}`)
        );
        attach = await this.attach;
        return await browser.takeScreenshot().then(function (png) {
            const decodedImage = new Buffer(png, "base64");
            return attach(decodedImage, "image/png");
        });
    } else {
        log(
            colors.bold.green(`
      ${scenarostatus}`)
        );
    }

});
