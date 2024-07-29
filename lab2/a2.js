/*********************************************************************************
*  WEB700 – Assignment 2
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Himanshi Arora Student ID: 153974233 Date: 28th may 2024
*
********************************************************************************/ 


const collegeData = quire('./modules/collegeData');//Importing the collegeData module

collegeData.initialize()//Initializing the data by reading from the JSON files
    .then(() => {
        console.log("Successfully initialized");//Logging a success message once initialization is complete
        return collegeData.getAllStudents();//Retrieving  all students from the initialized data
    })
    .then((students) => {
        console.log(`Successfully retrieved ${students.length} students`); //Logging the number of students retrieved
        return collegeData.getCourses();//Retrieving all courses from the initialized data
    })
    .then((courses) => {
        console.log(`Successfully retrieved ${courses.length} courses`); //Logging the number of courses retrieved
        return collegeData.getTAs(); //Retrieving all TAs from the initialized data
    })
    .then((TAs) => {
        console.log(`Successfully retrieved ${TAs.length} TAs`); //Logging the number of TAs retrieved
    })
    .catch((err) => {
        console.log(err);// Logging any errors that occurred during the process
    });
