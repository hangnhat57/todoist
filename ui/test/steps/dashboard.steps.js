import {Then, When} from "cucumber"
import {DashboardPage} from "../pages/dashboard.page";
import faker from "faker";



var dueDate = new DashboardPage().getRandomDate();
var taskName = faker.name.firstName();
var newTaskName = faker.name.lastName();

When(/^I click on Test Project$/, async function () {
    await new DashboardPage().selectTestProject()
});


//refactor
When(/^I create a new task with random task name and due date$/,async function () {
    await new DashboardPage().createNewTask(taskName, dueDate)
});
Then(/^I should see that task on the list with correct task name and due date$/,async function () {
    await new DashboardPage().shouldSeeTaskWith(taskName, dueDate)
});
When(/^I edit the task which Ive just created$/, async function () {
    await new DashboardPage().editTask(taskName,dueDate,newTaskName)

});
Then(/^I should see task with correct edited task name$/, async function () {
    await new DashboardPage().shouldSeeTaskWith(newTaskName,dueDate)

});
When(/^I mark a task as Done$/, async function () {
    await new DashboardPage().markTaskAsDone(newTaskName,dueDate)

});
Then(/^I should see notify Done and not see that task anymore$/, async  function () {
    await new DashboardPage().shouldSeeNotifyTaskDone()
    await new DashboardPage().shouldNotSeeTaskWith(newTaskName,dueDate)
});