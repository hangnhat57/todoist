import {Given, Then, When} from "cucumber"
import {browser} from "protractor";
import {LoginPage} from "../pages/login.page";



Given(/^I am at login page$/, async function () {
    await browser.get("https://todoist.com/users/showlogin")
});
Then(/^I should login successfully$/, async function () {
    await new LoginPage().shouldLoginSuccess()
});
When(/^I login to application with correct credential$/, async function (data) {
    let credential = data.hashes()[0];
    await new LoginPage().login(credential.email,credential.password)
});