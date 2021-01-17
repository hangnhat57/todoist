import {browser} from "protractor/built/index";
import {waitForUrlMatch, waitForWindowCount} from "./browserWait";
import {click} from "./browserActions";

export function scrollToTop() {
  return browser.executeScript("window.scrollTo(0,0);");
}

export function scrollToBottom() {
  return browser.executeScript(
    "window.scrollTo(0, document.body.scrollHeight);"
  );
}

export function closeWindow(index = 0) {
  return browser
    .getAllWindowHandles()
    .then(handles => {
      if (!handles[index]) {
        throw new Error("Can not close window. Index not found");
      }
      browser.switchTo().window(handles[index]);
      browser.close();
      return browser.switchTo().window(handles[index - 1]);
    })
    .catch(e => {
      console.error(`Error while closing window with index ${index}`);
      throw e;
    });
}

export function openUrlInNewTab(url) {
  const tempId = "pth-openwindowlink";
  let windowLength;
  return browser
    .getAllWindowHandles()
    .then(handles => {
      windowLength = handles.length;
      return browser.driver.executeScript(
        (url, tempId) => {
          var a = document.getElementById(tempId);
          if (!a) {
            a = document.createElement("a");
            a.target = "_blank";
            a.innerHTML = ".";
            a.id = tempId;
          }
          a.href = url;
          document.body.appendChild(a);
          return a;
        },
        url,
        tempId
      );
    })
    .then(() => {
      return click(`#${tempId}`);
    })
    .then(() => {
      return waitForWindowCount(windowLength + 1);
    })
    .then(() => {
      return browser.getAllWindowHandles();
    })
    .then(handles => {
      return browser.switchTo().window(handles[handles.length - 1]);
    })
    .then(() =>
      waitForUrlMatch(
        new RegExp(url.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"))
      )
    );
}
