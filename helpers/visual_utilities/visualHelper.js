import { log, waitToBeDisplayed } from "../browser_utilities";
import * as blueharvest from "blue-harvest/dist/index";
import Globals from "../../framework_config/cucumber_support/globals";
const shell = require("shelljs");
const globals = new Globals();
const expect = globals.expect;

/**
 * Path for visual test folders
 * */
let baseLinePath;
let visualReport;

async function createPath() {
  let browserdata = await browser.params.metadata;
  baseLinePath = `${process.cwd()}/visual-baseline/${await browserdata.browser
    .name}-${await browserdata.platform.name}/`;
  visualReport = `${process.cwd()}/reports/visual-report/${await browserdata
    .browser.name}-${await browserdata.platform.name}/`;
  shell.mkdir("-p", baseLinePath);
  shell.mkdir("-p", visualReport);
}

/**
 * Mask web elements then/
 * Return List of masking elements
 * */
export async function masking(elements) {
  let mask = [];
  if (Array.isArray(elements)) {
    for (let i = 0; i < elements.length; i++) {
      let el = elements[i];
      await waitToBeDisplayed(el);
      mask.push(
        await blueharvest.addMask(el, "gray").catch(err => {
          log(`error: ${err}`);
        })
      );
    }
  } else {
    mask.push(
      await blueharvest.addMask(elements, "gray").catch(err => {
        log(`error: ${err}`);
      })
    );
  }
  return mask;
}

export async function compareVisual(page, maskedArray = null) {
  await createPath();
  let result;
  let data;
  let path;
  path = `${baseLinePath}${page}.png`;
  data = await browser.takeScreenshot();
  result = await blueharvest.compareScreenshot(data, path, visualReport);
  if (maskedArray) {
    for (let i = 0; i < maskedArray.length; i++) {
      let masked = maskedArray[i];
      await blueharvest.removeMask(masked);
    }
  }
  await expect(result).to.be.include(
    "passed",
    `Page does not lookalike expected, please see diff in ${visualReport}`
  );
}
