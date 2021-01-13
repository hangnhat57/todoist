import BasePage from "./basePage";
import { browser, element, protractor ,ExpectedConditions as EC} from "protractor/built/index";
import {
    sendKeys,
    click,
    waitToBeDisplayed,
    waitToBeNotDisplayed,
    clickEvenNotClickable,
    waitForElementCountToBeGreaterThan,
    waitForAttributeMatch,
    waitToBeNotPresent,
    waitForTextMatch,
    waitForUrlMatch
} from "../../helpers/browser_utilities";
export class TravelResultPage extends BasePage{

    constructor(){
        super();
        this.items_allCards = element.all(by.xpath(`//div[@class="col-sm-4 card-full"]`));
        this.btn_SeeMore = element(by.xpath(`//*[@class='btn-ripple more']`));
        this.resultCount = element(by.xpath(`//div[@class="results-text pull-left"]/h5`))
        this.loadingState = element(by.xpath(`//div[@class="row grid-row"]`))
        this.resultNav = element(by.xpath(`//div[@class="results-text pull-left"]/p`))
        this.resultNavTitle = element(by.xpath(`//div[@class="results-text pull-left"]/h5`))
        this.btn_openSelectDestination = element(by.xpath(`//div[@class="select-component"]`))
        this.btn_openStartDate = element(by.xpath(`//div[@class="date-from"]`))
        this.btn_openEndDate = element(by.xpath(`//input[@name="dates-enddate"]`))
        this.btn_openSelectDate = element(by.xpath("//*[@class='datepicker-days']/descendant::*[@class='datepicker-switch']"));
        this.btn_openSelectMonth = element(by.xpath("//*[@class='datepicker-months']/descendant::*[@class='datepicker-switch']"));
        this.filter_Insurer = `//div[@class="checkbox checkbox-primary" and @data-gb-name="filter-option"]`
        this.filter_InsurerInput  = `//div[@class="checkbox checkbox-primary" and @data-gb-name="filter-option"]/input`
    }

    async numberOfCardsShouldBeAtLeast(minimum){
        await waitForElementCountToBeGreaterThan(this.items_allCards,minimum);
        console.log("Number of cards",(await this.items_allCards).length)
    }

    async getMinSliderOfCriteria(name){
       var  minSliderSelector = `//label[contains(.,'${name}')]/parent::div//div[contains(@class,'min-slider-handle')]`;
        return await element(by.xpath(minSliderSelector))
    }
    async getMinValueOfCriteria(name){
        var minValueSelector = `//label[contains(.,'${name}')]/parent::div//b[@class='value']`;
        var minValueEle = await element(by.xpath(minValueSelector));
        return parseInt(await minValueEle.getAttribute("data-min-value"));
    }
    async getMaxSliderOfCriteria(name){
        var selector = `//label[contains(.,'${name}')]/parent::div//div[contains(@class,'tooltip-max')]`;
        return await element(by.xpath(selector))
    }
    async clickOnSeeMore(){
        await click(this.btn_SeeMore);
    }
    async moveMinCard(name,number){
        let  minSlider = await this.getMinSliderOfCriteria(name);
        await waitToBeDisplayed(minSlider);
        await browser.actions().mouseDown(minSlider).mouseMove({x:100,y:0}).mouseUp().perform();
        let ele = await element(by.xpath(`//div[@data-type="Number" and contains(.,'${name}')]`));
        let url = await ele.getAttribute("data-filter-by");
        await waitForUrlMatch(url.replace("filter-coverage-",''));
        return await this.getMinValueOfCriteria(name);
    }
    async allCardsShouldBeGreaterThan(name,minValue){
        await waitToBeNotDisplayed(this.loadingState);
        var eles = await element.all(by.xpath(`//p[contains(.,'${name}') ]/following-sibling::p`));
        let flag = true
        for(let idx = 0;idx < eles.length;idx++) {
            let e = eles[idx]
            await waitToBeDisplayed(e)
            let s = await e.getText();
            let value = parseInt(s.replace(/[^0-9]/g, ''))
            if (value<minValue){
                flag = false
            }
        }
        await this.expect(flag).to.be.true
    }
    async selectDestination(destination){
        await click(this.btn_openSelectDestination);
        let selector  = `//li/a[contains(.,'${destination}')]/link`;
        await click(selector)
    }
    async resultNavShouldShowCorrectDesitnation(destination){
        await waitForTextMatch(this.resultNav,`travel to ${destination}`)
    }
    async selectStartDate(date,month,year){
        await waitToBeNotDisplayed(this.loadingState);
        await this.waitForPageLoad()
        await waitToBeDisplayed(this.btn_openStartDate);
        await click(this.btn_openStartDate)
        await this.selectDate(date,month,year)
    }
    async selectEndDate(date,month,year){
        await waitToBeNotDisplayed(this.loadingState);
        await this.waitForPageLoad()
        await waitToBeDisplayed(this.btn_openEndDate);
        await click(this.btn_openEndDate)
        await this.selectDate(date,month,year)
    }
    async selectDate(date,month,year){
        let btn_date = `//*[@class="datepicker-days"]//td[text()='${date}']`;
        let btn_month = `//*[@class="datepicker-months"]//span[text()='${month}']`;
        let btn_year = `//*[@class="datepicker-years"]//span[text()='${year}']`;
        await click(this.btn_openSelectDate);
        await click(this.btn_openSelectMonth);
        await waitToBeDisplayed(btn_year);
        await clickEvenNotClickable(btn_year);
        await waitToBeDisplayed(btn_month);
        await clickEvenNotClickable(btn_month);
        await waitToBeDisplayed(btn_date);
        await clickEvenNotClickable(btn_date);
    }
    async startDateShouldCorrect(startDate){
        await waitForTextMatch(this.resultNav,`from ${startDate}`)
    }
    async endDateShouldCorrect(endDate){
        await waitForTextMatch(this.resultNav,`to ${endDate}`);
    }
    async waitForReload(){
        await waitToBeDisplayed(this.loadingState);
        await waitToBeNotDisplayed(this.loadingState);
    }

    async selectPolicyType(policy){
        await click(`//div[@class="radio radio-primary" and @data-gb-trip-types="${policy}"]`)
    }
    async policyTypeShouldShowCorrect(policy){
        await waitForTextMatch(this.resultNav,`${policy} trip`)
    }
    async checkOnAnInsurer(){
        await this.waitForPageLoad();
        await waitToBeDisplayed(this.filter_Insurer);
        let ele = await element(by.xpath(this.filter_Insurer));
        let isurerName = await ele.getAttribute("data-filter-name");
        await click(this.filter_Insurer);
        let input = await element(by.xpath(this.filter_InsurerInput));
        let dataLink = await input.getAttribute("value");
        await waitForUrlMatch(dataLink);
        return isurerName
    }
    async allCardsShouldFromIsurer(isurerName){
        let cards = await element.all(by.xpath(`//*[@class="card-brand"]`));
        let flag = true;
        for(let idx = 0 ; idx < cards.length;idx++){
            let s = await cards[idx].getText();
            if (s !== isurerName){
                flag = false
            }
        }
        await this.expect(flag).to.be.true
    }
    async clickOnSort(sortType){
        let ele = await element(by.xpath(`//div[@class="radio radio-primary" and contains(.,'${sortType}')]`))
        await click(ele);
        let sortValue = await ele.getAttribute("data-sort-by")
        await waitForUrlMatch(sortValue)
    }
    async allCardsShouldSortedFromLowToHigh(){
        let cards = await element.all(by.xpath(`//div[@class="policy-price"]`));
        let flag = true;
        for (let idx = 0;idx<cards.length-1;idx++){
            let current = await cards[idx].getAttribute("premium");
            let next = await cards[idx+1].getAttribute("premium");
            if (parseInt(current) > parseInt(next)){
                console.log(`Current: ${current} vs Next: ${next}`)
                flag = false;
            }
        }
        this.expect(flag).to.be.true
    }
    async waitForPageLoad(){
        await waitForTextMatch(this.resultNavTitle,`found`)
    }


}


