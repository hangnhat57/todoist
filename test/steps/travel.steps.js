import {Given, Then, When} from "cucumber"
import {browser} from "protractor/built/index";
import {LoginPage} from "../pages/login.page";
import {TravelResultPage} from "../pages/travelResult.page";
import {sleep} from "../../helpers/browser_utilities";
var minvalue;
var isurer;
// Given(/^I am at homepage$/, async function () {
//     console.log("Hello")
// });
//
// When(/^I go to travel section$/, async function () {
//     await new LoginPage().goToTravelSection()
// });
//
// Then(/^At least (\d+) cards are being displayed in Result Page$/, async function (minimum) {
//     await new TravelResultPage().numberOfCardsShouldBeAtLeast(minimum)
// });
// When(/^I click on Show My Result$/, async function () {
//     await new LoginPage().goToResultPage()
// });
//
// When(/^I move MIN slider of "([^"]*)" to more than (\d+) percent$/, async function (name,number) {
//     minvalue = await new TravelResultPage().moveMinCard(name,number);
// });
//
// When(/^I Open all categories for filter$/, async function () {
//     await  new TravelResultPage().clickOnSeeMore();
// });
//
// Then(/^"([^"]*)" in all cards should be more than min value of slider$/,async  function (name) {
//     await new TravelResultPage().allCardsShouldBeGreaterThan(name,minvalue)
// });
// When(/^I change destination into "([^"]*)"$/, async function (destination) {
//         await new TravelResultPage().selectDestination(destination)
//     });
// Then(/^Then result in nav should show correct that I travel to "([^"]*)"$/, async function (destination) {
//         await new TravelResultPage().resultNavShouldShowCorrectDesitnation(destination)
//     });
// When(/^I select start date is "([^"]*)"$/, async function (date) {
//         let arr = date.split(" ");
//         await new TravelResultPage().selectStartDate(arr[0],arr[1],arr[2])
//     });
// Then(/^result in nav should show correct that start date from "([^"]*)"$/, async function (startDate) {
//         await new TravelResultPage().startDateShouldCorrect(startDate)
//     });
// Then(/^I select end date is "([^"]*)"$/, async function (date) {
//     let arr = date.split(" ");
//     await new TravelResultPage().selectEndDate(arr[0],arr[1],arr[2])
//     });
// Then(/^result in nav should show correct that end date from "([^"]*)"$/, async function (endDate) {
//     await new TravelResultPage().endDateShouldCorrect(endDate)
//     });
// When(/^I change select policy type as "([^"]*)"$/, async function (policy) {
//     await new TravelResultPage().selectPolicyType(policy)
//     });
// Then(/^result in nav should show correct that policy type is "([^"]*)"$/, async  function (policy) {
//     await new TravelResultPage().policyTypeShouldShowCorrect(policy)
// });
// When(/^I select a random Insurer Filter$/, async function () {
//         isurer = await new TravelResultPage().checkOnAnInsurer()
// });
// Then(/^I would see all cards should from that insurer$/, async function () {
//         await new TravelResultPage().allCardsShouldFromIsurer(isurer)
// });
// Then(/^I would see all cards should be sorted with price from Low to High$/,async function () {
//     await new TravelResultPage().allCardsShouldSortedFromLowToHigh()
// });
// When(/^I select a sort "([^"]*)"$/, async function (sortType) {
//     await new TravelResultPage().allCardsShouldSortedFromLowToHigh(sortType)
//     });
// Given(/^I am at login page$/, function () {
//
// });
// When(/^I login to application with correct credential (.*) and (.*)$/, function () {
//
// });
// Then(/^I should login successfully$/, function () {
//
// });