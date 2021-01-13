require("dotenv").config();

const jsonReports = process.cwd() + "/reports/json";
const cssPath = process.cwd() + "/framework_config/customreport.css";
const TEST_ENVIRONMENT = process.env.TEST_ENVIRONMENT || "staging";
const RUNMODE = process.env.RUNMODE || "smoke";
let date = require("date-and-time");
let now = new Date();
const htmlReports = process.cwd() + "/reports/html";
exports.plugins = [
  {
    package: "protractor-multiple-cucumber-html-reporter-plugin",
    options: {
      automaticallyGenerateReport: true,
      removeExistingJsonReportFile: true,
      removeOriginalJsonReportFile: true,
      openReportInBrowser: true,
      displayDuration: true,
      disableLog: true,
      durationInMS: true,
      pageTitle: "Automation Test Report",
      reportName: "Automation Test Report",
      pageFooter:
        '<div align="center"><h4 style ="color:#1ABB9C !important;">Automation Test Report</h4></div>',
      reportPath: htmlReports,
      jsonDir: jsonReports,
      customStyle: cssPath,
      customData: {
        title: "Run info",
        data: [
          { label: "Project", value: "Travel Insurance" },
          { label: "Environment", value: TEST_ENVIRONMENT.toUpperCase() },
          { label: "Run mode", value: RUNMODE.toUpperCase() },
          {
            label: "Execution Start Time (HCMC Time)",
            value: date.format(
              date.addHours(now, 7),
              " hh:mm A ddd MMM DD YYYY",
              false
            )
          },
          {
            label: "Execution Start Time (Seattle Time)",
            value: date.format(
              date.addHours(now, -7),
              " hh:mm A ddd MMM DD YYYY",
              false
            )
          }
        ]
      }
    }
  },
  {
    package: "protractor-testability-plugin"
  }
];
