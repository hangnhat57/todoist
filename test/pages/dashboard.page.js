import BasePage from "./basePage";
import { browser, element, protractor } from "protractor/built/index";
import {
    sendKeys,
    click,
    waitToBeDisplayed,
    waitForTextMatch,
    waitForElementCountToBeLessThan,
    waitForElementCountToBe,
    hover,
    sleep, waitForUrlMatch
} from "../../helpers/browser_utilities";
import dateformat from "dateformat";
export class DashboardPage extends BasePage{
    constructor() {
        super();
        this.itemTestProject  = element(by.xpath(`//li[contains(.,'TestProject')]`));
        this.btnSubmitAddTask = element(by.xpath(`//button[contains(.,'Add task')]`));
        this.btnAddTask = element(by.xpath(`//button[@class='plus_add_button']`));
        this.inputTaskName = element(by.xpath(`//div[@class="DraftEditor-editorContainer"]/div`));
        this.btnSchedule = element(by.xpath(`//button[contains(.,'Schedule')]`));
        this.inputSchedule = element(by.xpath(`//div[@class="scheduler-input"]/input`))
    }

    async selectTestProject(){
        await click(this.itemTestProject)
    }
    async createNewTask(){
        await click(this.btnAddTask)
        await waitToBeDisplayed(this.inputTaskName)
        await sendKeys(this.inputTaskName,"Hello testing")
        await click(this.btnSchedule)
        await waitToBeDisplayed(`//div[@class="popper__overlay"]`)
        await sendKeys(this.inputSchedule,this.getRandomDate())
        await this.hitEnterKey()
        await click(this.btnSubmitAddTask)
    }


    async hitEnterKey(){
       await browser.actions().sendKeys(protractor.Key.ENTER).perform();
    }

    getRandomDate(){
        let  today = new Date(Date.now() + 1000  * 60  * 60  * 24  *10)
        let date = new Date(today +  this.getRandomInt(1,1000))
        return dateformat(today,"dd mmm yyyy")


    }
     getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }



}