import {browser, by, element} from "protractor/built/index";
import {DEBUG} from "./defaultValues";

export function getElementFinder(target) {
  if (typeof target === "string") {
    //noinspection NestedFunctionCallJS
    return element(by.xpath(target));
  } else {
    return target;
  }
}

export function getElementArrayFinder(target) {
  if (typeof target === "string") {
    //noinspection NestedFunctionCallJS
    return element.all(by.xpath(target));
  } else {
    return target;
  }
}

export function log(message, ignoreDebug = false) {
  if (DEBUG || ignoreDebug) {
    console.log(message);
  }
}

export function flowLog(message) {
  const flow = browser.controlFlow();

  return flow.execute(() => {
    console.log(message);
  });
}

export function refresh(reason) {
  flowLog(`Page reload because of: ${reason}`);
  return browser.refresh();
}

export async function  sleep(time, message = "") {
  if (!message) {
    message = "Sleeping";
  }
  //noinspection MagicNumberJS
  if (message !== "None") {
    message += `: ${(time / 1000).toFixed(2)}s`;
    if (time > 5000) {
      flowLog(message);
    }
  }
  return await browser.sleep(time);
}
