
/*********************************************************************************
*  WEB700 – Assignment 1
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  
*  No part of this assignment has been copied manually or electronically from any other source
*  (including web sites) or distributed to other students.
* 
*  Name: HIMANSHI ARORA Student ID: 153974233 Date: 13 MAY 2024
*
********************************************************************************/ 


// Defining  arrays for server verbs, paths, and responses.
const serverVerbs = ["GET", "GET", "GET", "POST", "GET", "POST"]; // This is an array of HTTP verbs for server requests
const serverPaths = ["/", "/about", "/contact", "/login", "/panel", "/logout"]; // This is an array of paths for server requests
const serverResponses = [ // This is an array of server responses corresponding to each path
    "Welcome to WEB700 Assignment 1", // This is the response for "/"
    "This assignment was prepared by Himanshi Arora", // This is the response for "/about"
    "Himanshi Arora : harora33@myseneca.ca", // This is the response for "/contact"
    "User Logged In", // This is the response for "/login"
    "Main Panel", // This is the response for "/panel"
    "Logout Complete" // This is the response for "/logout"
];

// Defining  the httpRequest function
function httpRequest(httpVerb, path) {
    // Here a loop is  used through serverPaths to find a matching index
    for (let i = 0; i < serverPaths.length; i++) {
        if (serverVerbs[i] === httpVerb && serverPaths[i] === path)  // If match will be found then return the response with status code 200
        {
            return `200: ${serverResponses[i]}`;
        }
    }
    
    return `404: Unable to process ${httpVerb} request for ${path}`;//If no match will be is found, return a 404 error message
}

// Manually testing the httpRequest function
console.log(httpRequest("GET", "/"));        //  output "200: Welcome to WEB700 Assignment 1"
console.log(httpRequest("GET", "/about"));   //  output "200: This assignment was prepared by <Student Name>"
console.log(httpRequest("POST", "/login"));  //  output "200: User Logged In"
console.log(httpRequest("PUT", "/"));        //  output "404: Unable to process PUT request for /"


const testVerbs = ["GET", "POST"];// Defining the  array of test verbs 
const testPaths = ["/", "/about", "/contact", "/login", "/panel", "/logout", "/randomPath1", "/randomPath2"];// Defining the  array of test paths


function getRandomInt(max)// Function to generate random integer between 0 and max 
{
    return Math.floor(Math.random() * (max));
}

function automateTests()// Defining the automateTests function
{
    
    function randomRequest()// Defining randomRequest function so that it can be  executed repeatedly 
    {
        const randVerb = testVerbs[getRandomInt(testVerbs.length)]; // Getting random HTTP verb
        const randPath = testPaths[getRandomInt(testPaths.length)]; // Getting random path
        console.log(httpRequest(randVerb, randPath)); // Calling httpRequest with random verb and path
    }

  
    setInterval(randomRequest, 1000);  // Executing randomRequest every 1 second using setInterval
}


automateTests(); //Invoking the automateTests function to start automated testing
