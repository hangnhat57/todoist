import BasePage from "./basePage";
import {browser, element, protractor} from "protractor/built/index";
import {
    sendKeys,
    click,
    waitToBeDisplayed,
    waitForTextMatch,
    waitForElementCountToBeLessThan,
    waitForElementCountToBe,
    hover,
    sleep, waitForUrlMatch, waitToBeNotDisplayed
} from "../../helpers/browser_utilities";
import dateformat from "dateformat";
import Intercept from 'protractor-intercept';


export class DashboardPage extends BasePage {
    constructor() {
        super();
        this.itemTestProject = element(by.xpath(`//li[contains(.,'TestProject')]`));
        this.btnSubmitAddTask = element(by.xpath(`//button[contains(.,'Add task')]`));
        this.btnSave = element(by.xpath(`//button[contains(.,'Save')]`));
        this.btnAddTask = element(by.xpath(`//button[@class='plus_add_button']`));
        this.inputTaskName = element(by.xpath(`//div[@class="DraftEditor-editorContainer"]/div`));
        this.txtInputTaskName = element(by.xpath(`//div[@class="DraftEditor-editorContainer"]/div//span`));
        this.btnSchedule = element(by.xpath(`//button[contains(.,'Schedule')]`));
        this.inputSchedule = element(by.xpath(`//div[@class="scheduler-input"]/input`))
        this.btnEditTask = element(by.xpath(`//li//div[contains(.,'Edit task')]`));
        this.toastMarkDone = element(by.xpath(`//div[@class="notifier_content" and contains(.,'1 task completed')]`))

        this.itemTask = (taskName, dueDate) => {
            const currentYear = new Date().getFullYear();
            dueDate = dueDate.replace(` ${currentYear}`, "");
            return `//div[@class="task_list_item__content" and contains(.,'${taskName}') and contains(.,'${dueDate}')]`
        }
        this.btnMarkDoneTask = (taskName, dueDate) => {
            const currentYear = new Date().getFullYear();
            dueDate = dueDate.replace(` ${currentYear}`, "");
            return `//ul[@class="items"]//li[contains(.,'${taskName}') and contains(.,'${dueDate}')]//button[@data-action-hint="task-complete"]`
        }
    }

    async selectTestProject() {
        await click(this.itemTestProject)
    }

    async createNewTask(taskName, dueDate) {
        await click(this.btnAddTask)
        await waitToBeDisplayed(this.inputTaskName)
        await sendKeys(this.inputTaskName, taskName)
        if (dueDate) {
            await click(this.btnSchedule)
            await waitToBeDisplayed(`//div[@class="popper__overlay"]`)
            await sendKeys(this.inputSchedule, dueDate)
        }
        await this.hitEnterKey()
        let intercept = new Intercept(this.browser);
        await intercept.addListener();
        await click(this.btnSubmitAddTask)
        await this.waitForXHR(intercept)
        await intercept.removeListener()
    }

    async shouldSeeTaskWith(taskName, dueDate) {
        await waitToBeDisplayed(this.itemTask(taskName, dueDate))
    }

    async shouldSeeNotifyTaskDone() {
        await waitToBeDisplayed(this.toastMarkDone);
    }

    async shouldNotSeeTaskWith(taskName, dueDate) {
        await waitToBeNotDisplayed(this.itemTask(taskName, dueDate))
    }

    async markTaskAsDone(taskName, dueDate) {
        await waitToBeDisplayed(this.btnMarkDoneTask(taskName, dueDate));
        let intercept = new Intercept(this.browser);
        await intercept.addListener();
        await click(this.btnMarkDoneTask(taskName, dueDate));
        await this.waitForXHR(intercept)
        await intercept.removeListener()
    }

    async editTask(taskName, dueDate, newTaskName) {
        console.log(taskName)
        console.log(newTaskName)
        let task = await element(by.xpath(this.itemTask(taskName, dueDate)))
        await browser.actions().click(task, protractor.Button.RIGHT).perform();
        await waitToBeDisplayed(this.btnEditTask)
        await click(this.btnEditTask);
        await waitToBeDisplayed(this.inputTaskName)
        await browser.actions().doubleClick(this.txtInputTaskName).perform();
        await browser.actions().sendKeys(protractor.Key.DELETE).perform();

        await sendKeys(this.inputTaskName, newTaskName)
        await sleep(1000)
        await this.hitEnterKey()
        let intercept = new Intercept(this.browser);
        await intercept.addListener();
        await this.waitForXHR(intercept)
        await intercept.removeListener()

    }

    async waitForXHR(intercept) {
        let flag = true
        while (flag) {
            await intercept.getRequests().then(function (reqs) {
                reqs.forEach(element => {
                    if (element.responseURL === "https://todoist.com/API/v8.7/sync") {
                        flag = false
                    }
                })
                sleep(200)
            });
        }
    }


    //Utilities for functions

    async hitEnterKey() {
        await browser.actions().sendKeys(protractor.Key.ENTER).perform();
    }

    getRandomDate() {
        let today = new Date(Date.now() + 1000 * 60 * 60 * 24 * 10)
        return dateformat(today, "dd mmm yyyy")
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }
}


