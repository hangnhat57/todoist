Feature: Travel Insurance Result Page


  Scenario: Default Result Page should have at least 3 cards
    Given I am at login page
    When I login to application with correct credential
      | email                   | password      |
      | sunatester123@gmail.com | nathantest123 |
    Then I should login successfully
    When I click on Test Project
    And I create a new task



