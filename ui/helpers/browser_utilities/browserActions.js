import {browser, by, protractor} from "protractor/built/index";
import {getElementFinder, log, sleep} from "./browserUtils";
import {waitToBeDisplayed, waitToBePresent} from "./browserWait";
import {DEFAULT_RETRIES, DEFAULT_TIMEOUT} from "./defaultValues";

export function click(
  target,
  timeout = DEFAULT_TIMEOUT,
  tryCount = DEFAULT_RETRIES
) {
  const e = getElementFinder(target);
  return waitToBePresent(target, timeout)
    .then(() => {
      return browser.wait(
        protractor.ExpectedConditions.elementToBeClickable(e),
        timeout,
        `Element ${e.locator()} not clickable`
      );
    })
    .then(() => e.click())
    .then(
      () => {},
      error => {
        if (tryCount > 0) {
          // log(`Click error: ${error}`);
          log(`Click retry ${4 - tryCount} time(s) on target ${e.locator()}`);
          tryCount -= 1;
          click(target, timeout, tryCount);
        } else {
          log(`Error while clicking on ${e.locator()}, reason: ${error}`);
          throw error;
        }
      }
    );
}
export function clickEvenNotClickable(
    target,
    timeout = DEFAULT_TIMEOUT,
    tryCount = DEFAULT_RETRIES
) {
  const e = getElementFinder(target);
  return waitToBePresent(target, timeout)
      .then(() => e.click())
      .then(
          () => {},
          error => {
            if (tryCount > 0) {
              // log(`Click error: ${error}`);
              log(`Click retry ${4 - tryCount} time(s) on target ${e.locator()}`);
              tryCount -= 1;
              click(target, timeout, tryCount);
            } else {
              log(`Error while clicking on ${e.locator()}, reason: ${error}`);
              throw error;
            }
          }
      );
}
export function doubleClick(target, timeout = DEFAULT_TIMEOUT) {
  const e = getElementFinder(target);
  return waitToBeDisplayed(target, timeout)
      .then(() => {
        return browser
            .actions().mouseMove(e)
            .doubleClick()
            .perform();
      })
      .catch((e) => {
        log(e);
      })
      .then(() => {
        return sleep(500);
      });
}

export function hover(target, timeout = DEFAULT_TIMEOUT) {
  const e = getElementFinder(target);
  return waitToBeDisplayed(target, timeout)
    .then(() => {
      return browser
        .actions()
        .mouseMove(e)
        .perform();
    })
    .catch((error) => {
      console.log(`Fallback for hover element,${error}`);
      return browser.executeScript(element => {
        const event = new MouseEvent("mouseenter", {
          view: window,
          bubbles: true,
          cancelable: true
        });
        element.dispatchEvent(event);
      }, e);
    })
    .then(() => {
      return sleep(500);
    });
}

export function sendKeys(
  target,
  value,
  timeout = DEFAULT_TIMEOUT,
  tryCount = DEFAULT_RETRIES
) {
  const e = getElementFinder(target);
  return waitToBeDisplayed(target, timeout)
    .then(() => {
      return e.clear();
    })
    .then(
      () => {
        e.sendKeys(value);
      },
      error => {
        if (tryCount > 0) {
          
          log(`Send keys retry ${tryCount} on target ${e.locator()}`);
          tryCount = tryCount - 1;
          sendKeys(target, value, timeout, tryCount);
        } else {
          console.error(`Error while sending keys on ${e.locator()}, reason: ${error}`);
          throw error;
        }
      }
    );
}

export function sendKeysThenPressEnter(
  target,
  value,
  timeout = DEFAULT_TIMEOUT,
  tryCount = DEFAULT_RETRIES
) {
  const e = getElementFinder(target);
  value = value + protractor.Key.ENTER
  return waitToBeDisplayed(target, timeout)
    .then(() => {
      return e.clear();
    })
    .then(
      () => {
        e.sendKeys(value);
      },
      error => {
        if (tryCount > 0) {
          log(`Send keys retry ${tryCount} on target ${e.locator()}`);
          tryCount = tryCount - 1;
          sendKeys(target, value, timeout, tryCount);
        } else {
          console.error(`Error while sending keys on ${e.locator()}, reason: ${error}`);
          throw error;
        }
      }
    );
}

export function clearThenSendKeys(
  target,
  value,
  timeout = DEFAULT_TIMEOUT,
  tryCount = DEFAULT_RETRIES
) {
  const e = getElementFinder(target);
  return waitToBeDisplayed(target, timeout)
    .then(() => {
      return e.clear();
    })
    .then(
      () => {
        e.sendKeys(Key.chord(Key.CONTROL, 'a'));
        e.sendKeys(value);
      },
      error => {
        if (tryCount > 0) {
          
          log(`Send keys retry ${tryCount} on target ${e.locator()}`);
          tryCount = tryCount - 1;
          sendKeys(target, value, timeout, tryCount);
        } else {
          console.error(`Error while sending keys on ${e.locator()},reason: ${error}`);
          throw error;
        }
      }
    );
}

export function selectOption(option, timeout = DEFAULT_TIMEOUT) {
  return click(option, timeout);
}

export function selectOptionByText(select, text, timeout = DEFAULT_TIMEOUT) {
  const e = getElementFinder(select);
  const option = e.element(by.cssContainingText("option", text));
  return selectOption(option, timeout);
}

export function selectOptionByIndex(select, index, timeout = DEFAULT_TIMEOUT) {
  const e = getElementFinder(select)
    .all(by.tagName("option"))
    .get(index);
  return selectOption(e, timeout);
}
