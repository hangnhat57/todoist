import {browser} from "protractor/built/index";
import {getElementFinder} from "./browserUtils";
import {waitToBeDisplayed} from "./browserWait";
import {DEFAULT_RETRIES, DEFAULT_TIMEOUT} from "./defaultValues";

export function getText(
  target,
  timeout = DEFAULT_TIMEOUT,
  tryCount = DEFAULT_RETRIES
) {
  const e = getElementFinder(target);

  return waitToBeDisplayed(target, timeout)
    .then(() => {
      return e.getText();
    })
    .then(
      value => value,
      error => {
        if (tryCount > 0) {
          console.error(`Error while getting text on ${e.locator()}`);
          throw error;
        }
        console.log(`getText retry ${tryCount}`);
        tryCount -= 1;
        return getText(target, timeout, tryCount);
      }
    );
}

export function getElementAttributeValue(
  target,
  attr,
  timeout = DEFAULT_TIMEOUT
) {
  return waitToBeDisplayed(target, timeout).then(() => {
    const e = getElementFinder(target);
    return e.getAttribute(attr);
  });
}

export function getWindowHandlesCount() {
  return browser.getAllWindowHandles().then(handles => {
    return handles.length;
  });
}
