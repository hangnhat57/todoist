Feature: Item Management
#For Verifying adding, updating, and completing a todo item
  Background:
    Given I am at login page
    When I login to application with correct credential
      | email                   | password      |
      | sunatester123@gmail.com | nathantest123 |
    Then I should login successfully
    And I click on Test Project

  Scenario: User is able to create a new task with task name and due date
    When I create a new task with random task name and due date
    Then I should see that task on the list with correct task name and due date

  Scenario: User is able to edit task name
    When I edit the task which Ive just created
    Then I should see task with correct edited task name

  Scenario: User is able to mark task as Done
    When I mark a task as Done
    Then I should see notify Done and not see that task anymore




