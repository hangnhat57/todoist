require("dotenv").config();
const { multiCapabilities } = require("./multiBrowsers.conf");
const { plugins } = require("./plugins.conf");
const { browsers } = require("./browsers.conf");
const { baseUrls } = require("./baseUrls.conf");
const { cucumberOpts } = require("./cucumberOpts.conf");
const TEST_ENVIRONMENT = process.env.TEST_ENVIRONMENT || "staging";
const SELENIUM_HUB = process.env.SELENIUM_HUB || "http://hub:4444/wd/hub";
const TEST_PARALLEL = process.env.TEST_PARALLEL || "";
const DIRECTCONNECT = process.env.DIRECT_CONNECT || false;

let mainConfig = {
  allScriptsTimeout: 10 * 60 * 1000,
  getPageTimeout: 60 * 1000,
  seleniumAddress: SELENIUM_HUB,
  baseUrl: baseUrls[TEST_ENVIRONMENT].uiUrl,
  chromeOnly: false,
  framework: "custom",
  frameworkPath: require.resolve("protractor-cucumber-framework"),
  specs: ["../test/features/*.feature"],
  exclude: "../test/features/ignore.feature",
  ignoreUncaughtExceptions: true,
  directConnect: DIRECTCONNECT,
  SELENIUM_PROMISE_MANAGER: true,
  onComplete: async function(){
    console.log(`Finish test`);
  },
  onPrepare: async function() {
    browser.ignoreSynchronization = true;
    await browser.getProcessedConfig().then(config => {
      browser.params.metadata = config.capabilities.metadata;
      switch (config.capabilities.metadata.platform.type) {
        case "mobile":
          config.cucumberOpts.tags = "@mobile and not @ignore";
          break;
        case "desktop": {
          switch (process.env.RUNMODE) {
            case "manual":
              config.cucumberOpts.tags = "@manual";
              break;
            case "experiment":
              config.cucumberOpts.tags = "@run and not @ignore";
              break;
            case "smoke":
              config.cucumberOpts.tags = "@smoke and not @ignore";
              break;
            case "api":
              config.cucumberOpts.tags = "@api and not @ignore";
              break;
            case "ui":
              config.cucumberOpts.tags = "@ui and not @ignore";
              break;
            case "regression":
              config.cucumberOpts.tags = "not @ignore and not @manual";
              break;
            default:
              config.cucumberOpts.tags = "not @ignore";
              break;
          }
          break;
        }
        default:
          console.log(
            "No platform specific in metadata, the test might be break"
          );
          break;
      }
    });
    require("babel-register");
  }
  

};
if (TEST_PARALLEL.toUpperCase() === "ON") {
  mainConfig.multiCapabilities = multiCapabilities;
} else {
  mainConfig.capabilities = browsers[process.env.BROWSER_NAME || "chrome"];
}
mainConfig.plugins = plugins;
mainConfig.cucumberOpts = cucumberOpts;

process.env["UPDATE_GOLDENS"] = "";
module.exports.config = mainConfig;
