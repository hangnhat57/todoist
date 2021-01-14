# Test Plan Document <!-- omit in toc -->


## IDENTIFICATION INFORMATION SECTION

### PRODUCT

- **Product Name:** Todoist

### FEATURE DESCRIPTION

- Google Calendar synchronization - Add a todo item with content and due Date

### Test engineers

- Nathan Nguyen

### Backend engineers:

- N/A

### Frontend engineers:

- N/A

##TEST STRATEGY
- This feature required to test on third party system, then SDETs need a provided Google Service Account to interact with GCalendar SDK `https://developers.google.com/calendar/quickstart/nodejs`
    * Functions to test: 
        1. Default duration for dueDate item
        2. Custom duration for dueDate item
        3. item With dueDate not specific hour
        4. item with dueDate has specific hour
- Approach: 
    1. Got a google service account which already sign up for Todoist, integrated with GCalendar 
    2. Exec UI automation from NodeJS UI Automation Framework
    3. Send http request / call function in GCalendar SDK to validate event created in GCalendar (`https://googleapis.dev/nodejs/googleapis/latest/calendar/classes/Calendar.html`)
  
    

## TEST CASES:
* ###Prerequisite:
    * A google service account which already sign up for Todoist, integrated with GCalendar

###  TEST CASES

| # | Precondition | OBJECTIVE | INPUT | EXPECTED RESULTS |
| --- | --------- | ----- | ---------------- |------|
| 1 | Todoist account already integrated with Google | Validate item with no specific due date hour | itemContent = “any”, itemDueDate = “Tomorrow” | GCalendar has a all day event with correct itemContent, Date |
| 2 | Todoist account already integrated with Google | Validate item with specific due date hour | itemContent = “any”, itemDueDate = “Tomorrow 14:00” | GCalendar has a all day event with correct itemContent, Date, Start hour, duration base on integration setting |
| 3 | Todoist account already integrated with Google | Validate item with no specific due date hour and custom duration | itemContent = “[90m]any”, itemDueDate = “Tomorrow” | "item created as itemContent = “any”, [90m] has been removed , GCalendar has a all day event with correct itemContent, Date" |
| 4 | Todoist account already integrated with Google | Validate item with specific due date hour and custom duration | itemContent = “[90m]any”, itemDueDate = “Tomorrow 14:00” | "item created as itemContent = “any”, [90m] has been removed , GCalendar has a all day event with correct itemContent, Date, Start time . Duration in minute equal to custom duration from itemContent input" |





