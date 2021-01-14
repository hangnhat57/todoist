# Test Plan Document <!-- omit in toc -->


## IDENTIFICATION INFORMATION SECTION

### PRODUCT

- **Product Name:** Todoist

### FEATURE DESCRIPTION

- Google Calendar synchronization feature

### Test engineers

- Nathan Nguyen

### Backend engineers:

- N/A

### Frontend engineers:

- N/A

##TEST STRATEGY
- This feature needs both automation and manual test involed
- Reason to manual: 
    * This feature require to access to third party sytem ( Google ). Their anti-robot system will deny our automation test which interact with Front end
- Functions to manual: 
    * All function relate to Integration setting ( Add/Remove/Edit ) requires interact with their front end to login 
- Functions to automate:
    * All item management + syncing feature ( `Require a Google Service Account to interact with their SDK / API `)
    
- ### Automation approach:
    - Goal of automation: `Make sure syncing from Todoist to GCalendar work`
    - In this feature,  Because item management already verify on e2e, we can test on API to make sure syncing only
- ### Manual approach: 
    - Goal of manual: `Make sure integration from Todoist to GCalendar work ( Require smoke test one syncing case)`
    
    

## API TEST 
* ###Prerequisite:
    * A google service account which already sign up for Todoist, integrated with GCalendar

###  TEST CASES

| #   | OBJECTIVE | INPUT | EXPECTED RESULTS | 
| --- | --------- | ----- | ---------------- | 
| 1   |    User is able to create a new todo item       | todoItemContent, todoItemDueDate      | SttCode: 200 / item return with input data                  |          
| 2   |    User is not able to create a new todo item with invalid dueDate       | todoItemContent, todoItemDueDate(incorrect format (`hgiyfif`)      | SttCode: 400 / Res body: Date is invalid|          
| 3   |    User is not able to create a new todo item with empty itemContent       | todoItemContent, todoItemContent = `empty`     | SttCode: 400 / Res body: Empty content|          
| 4   |    User is able to edit an existed todo item       | todoItemContent, itemID which exist      | SttCode: 204 / item return with input data through get todoItem                 |          
| 4   |    User is not able to edit an non-existed todo item       | todoItemContent, itemID which not exist     | SttCode: 400 / Res body: Item not found                |          
| 5   |    User is able to close an existed todo item       |  itemID which exist     | SttCode: 204 / item will be not found with input itemID through get todoItem                 |          
| 6   |    `User is able to close an non-existed todo item?`       |  `itemID`      | `? Prod behavior is different than my expect`               |          

## MANUAL TEST 

* ###Prerequisite:
    * Some google account which already signed up on Todoist

###  TEST CASES

| # | OBJECTIVE | INPUT | EXPECTED RESULTS | 
| --- | --------- | ----- | ---------------- | 
| 1 | User is able to connect to google calendar |  | Item display on item list with correct input data|                   
| 2 | User is able to edit an existed todo item | todoItemContent | Item display on item list with correct input data|                   
| 3 | User is able to close an existed todo item | todoItemContent | Item should be disappeared on the list, Task done notifier should show |                   

