# Instructions and Explanations




## 1. Explanations
There are my explanations for both tasks
**Task 1**:
* **Test plan**: Test plan document is in root folder, named : `TestPlan-Task1.md`
* **Investigate application**: 
  * Front app is written with async with backend. This mean after item created and show on FE, it still not created from backend. Only when sync api called and finished success.
    >> Solution: Add interceptor to browser to wait until sync api call and finish with status 200
  * There are some weird behavior which belong to Todoist 
    >> For e.g : 
    User is able to create due date in past / User can't input data then hit save to fast, it will break application.
    
* **Test Framework**: 
  * UI Framework:
    * **Why** : I choose NodeJS with protract as require from programing language ( Javascript ). Also, I already built a framework with protractor and familiar with it. 
    * **How to execute**: 
        * Please go to `ui` folder, then execute `run.sh` file to execute test. ( requires docker and docker compose installed )
  * API : 
    * **Why**: I pick Postman as require from assignment. Personally, I prefer API test inside UI test framework ( Chakram , http , fecth + chai) for verify API. But still understand Postman has more advantage in sharing between SDET/BE/FE
    * **How to execute**: 
      * Please go to `api` folder, then execute `run.sh` file to execute test. ( requires docker and docker compose installed )
  * For CI ready: 
    >> Most of CI/CD system ( TeamCity, Jenkins, GitlabCI ) support docker nicely. Then I already build test inside docker. We can exec them with shell file I made

**Task 2**:
* **Test plan**: Test plan document is in root folder, named : `TestPlan-Task2.md`
* **Investigate application**:
    * This feature requires accessing to 3rd party app. Display / trigger reminder on 3rd party are not the thing we can do. Then we can validate them through GoogleSDK to make sure data store on their system
    * Logging in to Google API required open browser to authorized, this is not a good idea for automation on CI pipeline. To automatically authorized, we need a Google Service Account's token. I can't share my Company Google token here, so I can't write automation test case for this task
    
* **Test cases**:
    * From assignment, story to test is adding an item with due date. So these test cases only for adding and verify, no edit/delete.  Besides, I assume relate-features ( syncing from specific project, item with no due date) are already tested.