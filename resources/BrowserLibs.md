[Back to Readme](../README.md)

## Browser Helper Library
### Actions 

<a id="click"></a>

####  click

▸ **click**(target: * `Element` &#124; `Locator` &#124; `Xpath`*, timeout?: *`number`*, tryCount?: *`number`*)

Waits for an element to be displayed and clickable, and click on it. If the click fails, `tryCount` retries are performed.

___
<a id="hover"></a>

####  hover

▸ **hover**(target: * `Element` &#124; `Locator` &#124; `Xpath`*, timeout?: *`number`*)

Waits for an element to be displayed and positions the pointer inside that element.


___
<a id="selectoption"></a>

####  selectOption

▸ **selectOption**(option: * `Element` &#124; `Locator` &#124; `Xpath`*, timeout?: *`number`*)

Select an `<option>`. If the selection fails, 3 retries are performed.


___
<a id="selectoptionbyindex"></a>

####  selectOptionByIndex

▸ **selectOptionByIndex**(select: * `Element` &#124; `Locator` &#124; `Xpath`*, index: *`number`*, timeout?: *`number`*)

Select an `<option>` ancestor of a particular `<select>` element by its index. All options are collected by `tagName === 'option'`, skipping `<optgroup>` or similar elements. After that the index is selected. If the selection fails, 3 retries are performed.



___
<a id="selectoptionbytext"></a>

####  selectOptionByText

▸ **selectOptionByText**(select: * `Element` &#124; `Locator` &#124; `Xpath`*, text: *`string`*, timeout?: *`number`*)

Select an `<option>` ancestor of a particular `<select>` element by its content. The option is identified by Protractor's `cssContainingText` (partial match: `selectOptionByText('bar')` matches `<option>foobar</option>` too). If the selection fails, 3 retries are performed.


___
<a id="sendkeys"></a>

####  sendKeys

▸ **sendKeys**(target: * `Element` &#124; `Locator` &#124; `Xpath`*, value: *`string`*, timeout?: *`number`*, tryCount?: *`number`*)

Wait for an `<input>` element to be displayed, then clear its content, and perform key strokes for the passed value. If sendKeys fails, `tryCount` retries are performed.



___

### Waits 

<a id="waitforattributematch"></a>

####  waitForAttributeMatch

▸ **waitForAttributeMatch**(target: * `Element` &#124; `Locator` &#124; `Xpath`*, attr: *`string`*, value: *`RegExp`*, timeout?: *`number`*): `Promise`<`boolean`>

Wait for an element's attribute value to match a regular expression.

**Returns:** `Promise`<`boolean`>

___
<a id="waitforattributetobe"></a>

####  waitForAttributeToBe

▸ **waitForAttributeToBe**(target: * `Element` &#124; `Locator` &#124; `Xpath`*, attr: *`string`*, value: *`string`*, timeout?: *`number`*): `Promise`<`boolean`>

Wait for an element's attribute to have the given value.


___
<a id="waitforelementcounttobe"></a>

####  waitForElementCountToBe

▸ **waitForElementCountToBe**(target: * `ElementArrayFinder` &#124; `Locator` &#124; `string`*, expected: *`number`*, timeout?: *`number`*): `Promise`<`boolean`>

Waits that a selector resolves to the expected number of elements. Useful e.g. to verify that the expected number of items have been added to a list.

___
<a id="waitforelementcounttobegreaterthan"></a>

####  waitForElementCountToBeGreaterThan

▸ **waitForElementCountToBeGreaterThan**(target: * `ElementArrayFinder` &#124; `Locator` &#124; `string`*, expected: *`number`*, timeout?: *`number`*): `Promise`<`boolean`>

Waits that a selector resolves to more than the expected count of elements. Useful e.g. to verify that at least some number of items have been added to a list.

___
<a id="waitforelementcounttobelessthan"></a>

####  waitForElementCountToBeLessThan

▸ **waitForElementCountToBeLessThan**(target: * `ElementArrayFinder` &#124; `Locator` &#124; `string`*, expected: *`number`*, timeout?: *`number`*): `Promise`<`boolean`>

Waits that a selector resolves to less than the expected count of elements. Useful e.g. to verify that at least some elements have been removed from a list.

___
<a id="waitfortextmatch"></a>

####  waitForTextMatch

▸ **waitForTextMatch**(target: * `Element` &#124; `Locator` &#124; `Xpath`*, value: *`RegExp`*, timeout?: *`number`*): `Promise`<`boolean`>

Wait for an element's text content to match a regular expression.

___
<a id="waitfortexttobe"></a>

####  waitForTextToBe

▸ **waitForTextToBe**(target: * `Element` &#124; `Locator` &#124; `Xpath`*, value: *`string`*, timeout?: *`number`*): `Promise`<`boolean`>

Wait for an element's text content to equal the given value.

___
<a id="waitforurlmatch"></a>

####  waitForUrlMatch

▸ **waitForUrlMatch**(value: *`RegExp`*, timeout?: *`number`*): `Promise`<`boolean`>

Wait for the browser's URL to match a regular expression.

___
<a id="waitforwindowcount"></a>

####  waitForWindowCount

▸ **waitForWindowCount**(count: *`number`*, timeout?: *`number`*): `Promise`<`boolean`>

Waits for a window count. Useful e.g. for confirming that a popup window was opened.

___
<a id="waittobedisplayed"></a>

####  waitToBeDisplayed

▸ **waitToBeDisplayed**(target: * `Element` &#124; `Locator` &#124; `Xpath`*, timeout?: *`number`*): `Promise`<`boolean`>

Wait for an element to be displayed. Displayed means that it is part of the DOM **and** visible.

___
<a id="waittobenotdisplayed"></a>

####  waitToBeNotDisplayed

▸ **waitToBeNotDisplayed**(target: * `Element` &#124; `Locator` &#124; `Xpath`*, timeout?: *`number`*): `Promise`<`boolean`>

Wait for an element to be not displayed. An element which is not displayed could still be part of the DOM, but is hidden by a css rule.

___
<a id="waittobenotpresent"></a>

####  waitToBeNotPresent

▸ **waitToBeNotPresent**(target: * `Element` &#124; `Locator` &#124; `Xpath`*, timeout?: *`number`*): `Promise`<`boolean`>

Wait for an element not to be present. Not present means that this element does not exist in the DOM.

___
<a id="waittobepresent"></a>

####  waitToBePresent

▸ **waitToBePresent**(target: * `Element` &#124; `Locator` &#124; `Xpath`*, timeout?: *`number`*): `Promise`<`boolean`>

Wait for an element to be present. Present means the element is part of the DOM, but still might be hidden by CSS rules.

___

### Values 

<a id="getelementattributevalue"></a>

####  getElementAttributeValue

▸ **getElementAttributeValue**(target: * `Element` &#124; `Locator` &#124; `Xpath`*, attr: *`string`*, timeout?: *`number`*): `Promise`<`string`>

Waits for the element to be present, and resolves to the attribute's value.



___
<a id="gettext"></a>

####  getText

▸ **getText**(target: * `Element` &#124; `Locator` &#124; `Xpath`*, timeout?: *`number`*, tryCount?: *`number`*): `Promise`<`string`>

Wait for an element to be displayed, and resolves to the text in that element. If `getText` fails, `tryCount` retries are performed.



___
<a id="getwindowhandlescount"></a>

####  getWindowHandlesCount

▸ **getWindowHandlesCount**(): `Promise`<`number`>

Resolves to the current window count. Windows includes windows, tabs, etc.



___

### Window 

<a id="closewindow"></a>

####  closeWindow

▸ **closeWindow**(index?: *`number`*)

Closes a browser window, popup, or tab identified by its zero-based index. If two windows are open and the second window is to be closed, the index should be 1.



___
<a id="openurlinnewtab"></a>

####  openUrlInNewTab

▸ **openUrlInNewTab**(url: *`string`*): `Promise`<`boolean`>

Opens the passed URL in a new tab.



___
<a id="scrollbottom"></a>

####  scrollBottom

▸ **scrollBottom**()

Scrolls to the bottom of the window.



___
<a id="scrolltop"></a>

####  scrollTop

▸ **scrollTop**()

Scrolls to the top of the window.



___

### Utils 

<a id="flowlog"></a>

####  flowLog

▸ **flowLog**(message: *`string`*)

Logs a message in the flow of protractor. This means that the log message appears in the correct order as the actions and tests are performed, and not like regular log output at the test initialization.



___
<a id="getelementarrayfinder"></a>

####  getElementArrayFinder

▸ **getElementArrayFinder**(target: * `ElementArrayFinder` &#124; `Locator` &#124; `string`*): `ElementArrayFinder`

Constructs an ElementArrayFinder from various target types.



___
<a id="getElement"></a>

####  getElement

▸ **getElement**(target: * `Element` &#124; `Locator` &#124; `string`*): `Element`

Constructs an Element from various target types.



___
<a id="log"></a>

####  log

▸ **log**(message: *`string`*, ignoreDebug?: *`boolean`*): `void`

Logs a message to the console if debugging is enabled.



___
<a id="refresh"></a>

####  refresh

▸ **refresh**(reason: *`string`*)

Performs a page reload and displays a message in the flow log why the reload was necessary.
*__see__*: flowLog



___
<a id="sleep"></a>

####  sleep

▸ **sleep**(time: *`number`*, message?: *`string`*)

Performs a browser sleep. Normally it should be avoided because of its performance impact, and replaced by one of the `waitTo…` functions wherever possible. If `sleep` is still necessary, a reason can be displayed in the flow log.
