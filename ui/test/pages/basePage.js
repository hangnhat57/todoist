import Globals from "../../framework_config/cucumber_support/globals";

const globals = new Globals();
const expect = globals.expect;
import chai from "chai";
import chaiAsPromised from "chai-as-promised";
import { browser } from "protractor/built/index";

class BasePage {
  constructor() {
    this.browser = browser;
    this.expect = chai.expect;
    chai.use(chaiAsPromised);
  }
}

export default BasePage;
