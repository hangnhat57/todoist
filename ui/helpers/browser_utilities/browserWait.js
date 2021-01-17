import {browser} from "protractor/built/index";
import {getElementArrayFinder, getElementFinder} from "./browserUtils";
import {DEFAULT_TIMEOUT} from "./defaultValues";

export function waitToBeNotPresent(target, timeout = DEFAULT_TIMEOUT) {
  const e = getElementFinder(target);
  // Don't use EC.not(EC.presenceOf(e)) because it doesn't return a promise which we can catch
  return browser.wait(
    () => {
      return getElementFinder(target)
        .isPresent()
        .then(value => !value, () => false);
    },
    timeout,
    `Element ${e.locator()} is still present`
  );
}

export function waitToBeNotDisplayed(target, timeout = DEFAULT_TIMEOUT) {
  const e = getElementFinder(target);
  return browser.wait(
    () => {
      return getElementFinder(target)
        .isPresent()
        .then(result => {
          if (!result) {
            return false;
          }

          return e.isDisplayed();
        })
        .then(value => !value, () => false);
    },
    timeout,
    `Element ${e.locator()} is still displayed`
  );
}

export function waitToBePresent(target, timeout = DEFAULT_TIMEOUT) {
  let e = getElementFinder(target);
  return browser.wait(
    () => {
      e = getElementFinder(target);
      //log(`Element ${e.locator()} waitToBePresent`);
      return e.isPresent().then(value => value, () => false);
    },
    timeout,
    `Element ${e.locator()} is not present`
  );
}

export function waitToBeDisplayed(target, timeout = DEFAULT_TIMEOUT) {
  let e = getElementFinder(target);
  return browser.wait(
    () => {
      e = getElementFinder(target);
      //log(`Element ${e.locator()} waitToBeDisplayed`);
      return e
        .isPresent()
        .then(
          value => {
            if (!value) {
              return false;
            }
            return e.isDisplayed();
          },
          () => false
        )
        .then(value => value, () => false);
    },
    timeout,
    `Element ${e.locator()} is not present nor displayed`
  );
}

export function waitForTextToBe(target, value, timeout = DEFAULT_TIMEOUT) {
  const e = getElementFinder(target);

  // Don't use EC.textToBePresentInElement because it doesn't return a promise which we can catch
  return browser.wait(
    () => {
      return waitToBeDisplayed(e, timeout)
        .then(() => {
          return getElementFinder(target).getText();
        })
        .then(text => text === value, () => false);
    },
    timeout,
    `Error waiting for text in ${e.locator()} to be ${value}`
  );
}

export function waitForTextMatch(target, value, timeout = DEFAULT_TIMEOUT) {
  return browser.wait(
    () => {
      return waitToBeDisplayed(target, timeout)
        .then(() => getElementFinder(target).getText())
        .then(text => !!text.match(value), () => false);
    },
    timeout,
    `Error waiting for text to match ${value}`
  );
}

export function waitForAttributeToBe(
  target,
  attr,
  value,
  timeout = DEFAULT_TIMEOUT
) {
  return browser.wait(
    () => {
      return waitToBeDisplayed(target, timeout)
        .then(() => getElementFinder(target).getAttribute(attr))
        .then(text => text === value, () => false);
    },
    timeout,
    `Error waiting for attribute ${attr} value to be ${value}`
  );
}

export function waitForAttributeMatch(
  target,
  attr,
  value,
  timeout = DEFAULT_TIMEOUT
) {
  return browser.wait(
    () => {
      return waitToBeDisplayed(target, timeout)
        .then(() => getElementFinder(target).getAttribute(attr))
        .then(text => !!text.match(value), () => false);
    },
    timeout,
    `Error waiting for attribute ${attr} value to match ${value}`
  );
}

export function waitForUrlMatch(value, timeout = DEFAULT_TIMEOUT) {
  return browser.wait(
    () => {
      return browser
        .getCurrentUrl()
        .then(url => !!url.match(value), () => false);
    },
    timeout,
    `URL has not changed to match ${value}`
  );
}

export function waitForElementCountToBe(
  target,
  expected,
  timeout = DEFAULT_TIMEOUT
) {
  const es = getElementArrayFinder(target);
  return browser.wait(
    () => {
      return es.count().then(count => count === expected, () => false);
    },
    timeout,
    `Count of element list ${es.locator()} does not equal expected value ${expected}.`
  );
}

export function waitForElementCountToBeGreaterThan(
  target,
  expected,
  timeout = DEFAULT_TIMEOUT
) {
  const es = getElementArrayFinder(target);
  return browser.wait(
    () => {
      return es.count().then(count => count > expected, () => false);
    },
    timeout,
    `Count of element list ${es.locator()} is not greather than expected value ${expected}.`
  );
}

export function waitForElementCountToBeLessThan(
  target,
  expected,
  timeout = DEFAULT_TIMEOUT
) {
  const es = getElementArrayFinder(target);
  return browser.wait(
    () => {
      return es.count().then(count => count < expected, () => false);
    },
    timeout,
    `Count of element list ${es.locator()} is not less than expected value ${expected}.`
  );
}

export function waitForWindowCount(count, timeout = DEFAULT_TIMEOUT) {
  return browser.wait(() => {
    return browser
      .getAllWindowHandles()
      .then(handels => {
        return handels.length;
      })
      .then(windows => windows === count, () => false);
  }, timeout);
}
