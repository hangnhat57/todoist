import {Given, Then, When} from "cucumber"
import {browser} from "protractor/built/index";
import {LoginPage} from "../pages/login.page";
import {DashboardPage} from "../pages/dashboard.page";




When(/^I click on Test Project$/, async function () {
    await new DashboardPage().selectTestProject()
});

When(/^I create a new task$/, async function () {
    await new DashboardPage().createNewTask()
});