/*********************************************************************************
*  WEB700 – Assignment 2
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: Himanshi Arora Student ID: 153974233 Date: 28th may 2024
*
********************************************************************************/ 
const fs = require('fs');//Importing the fs module to handle file system operations

class Data {//Defining the data class to hold students and courses data
    constructor(students, courses) {
        this.students = students;//Assigning the students data to the students property
        this.courses = courses;// Assigning the courses data to the courses property
    }
}
let dataCollection = null; // Declaring a variable to hold an instance of the data class

//Function to initialize the data by reading from JSON files
function initialize() {
    return new Promise((resolve, reject) => {
        fs.readFile('./data/students.json', 'utf8', (err, studentData) => { //Reading the students.json file
            if (err) {// If an error occurs then reject the promise with an error message
                reject("unable to read students.json");
                return;
            }
            fs.readFile('./data/courses.json', 'utf8', (err, courseData) => { //Reading the courses.json file
                if (err) {
                    reject("unable to read courses.json");//If an error occurs then reject the promise with an error message
                    return;
                }
                dataCollection = new Data(JSON.parse(studentData), JSON.parse(courseData));// Parsing the JSON data and create a new Data instance
                resolve();//Resolving the promise indicating successful initialization
            });
        });
    });
}

// Function to get all students
function getAllStudents() {
    return new Promise((resolve, reject) => {
        if (dataCollection.students.length > 0) { //Checking if there are students in the data collection
            resolve(dataCollection.students); //If students exists then resolve the promise with the students data
        } else {
            reject("no results returned");//If no students then reject the promise with an error message
        }
    });
}

// Function to get all TAs 
function getTAs() {
    return new Promise((resolve, reject) => {
        const TAs = dataCollection.students.filter(student => student.TA);//Filtering the students to find TAs
        if (TAs.length > 0) { //Check if any TAs are found
            resolve(TAs); //If TAs exist then resolve the promise with the TAs data
        } else {
            reject("no results returned");// If no TAs then reject the promise with an error message
        }
    });
}

// Function to get all courses
function getCourses() {
    return new Promise((resolve, reject) => {
        if (dataCollection.courses.length > 0) { //Checking if there are courses in the data collection
            resolve(dataCollection.courses); //If courses exist then resolve the promise with the courses data
        } else {
            reject("no results returned"); // If no courses then reject the promise with an error message
        }
    });
}
module.exports = { initialize, getAllStudents, getTAs, getCourses };// Exporting the functions to be used in other modules
