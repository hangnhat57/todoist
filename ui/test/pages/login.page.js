import BasePage from "./basePage";
import {element} from "protractor/built/index";
import {click, sendKeys, waitForUrlMatch} from "../../helpers/browser_utilities";

export class LoginPage extends BasePage {
    constructor() {
        super();
        this.inputEmail = element(by.xpath(`//input[@name="email"]`));
        this.inputPassword = element(by.xpath(`//input[@name="password"]`));
        this.btnLogin = element(by.xpath(`//button[contains(.,'Log in')]`));
    }

    async login(email, password) {
        await sendKeys(this.inputEmail, email)
        await sendKeys(this.inputPassword, password)
        await click(this.btnLogin)
    }

    async shouldLoginSuccess() {
        await waitForUrlMatch("app/#/today")
    }
}