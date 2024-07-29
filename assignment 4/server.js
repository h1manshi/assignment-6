/*********************************************************************************
*  WEB700 – Assignment 04
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part 
*  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Himanshi Arora Student ID: 153974233 Date: 7 July 2024
*
*  Online (vercel) Link: https://vercel.com/himanshi-aroras-projects/assignment4/59ayrd5XXRfDEPYpyBhgjH7rUWzS

*
********************************************************************************/ 


// Declaration of HTTP_PORT
const HTTP_PORT = process.env.PORT || 8080;
const express = require("express");
const path = require("path");
const collegeData = require("./modules/collegeData");
const app = express();

// Middleware to parse URL-encoded bodies (from form submissions)
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory (for CSS, JS, images, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// GET route to return the home.html file
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/home.html"));
});

// GET route to return the about.html file
app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/about.html"));
});

// GET route to return the htmlDemo.html file
app.get("/htmlDemo", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/htmlDemo.html"));
});

// GET route to return the addStudent.html file
app.get("/students/add", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/addstudent.html"));
});

// POST route to handle form submission and add a student
app.post("/students/add", (req, res) => {
    collegeData.addStudent(req.body).then(() => {
        res.redirect("/students");
    }).catch((err) => {
        console.error("Error adding student:", err);
        res.status(500).send("Unable to add student");
    });
});

// GET route to return all students or students by course
app.get("/students", (req, res) => {
    if (req.query.course) {
        collegeData.getStudentsByCourse(req.query.course).then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json({ message: "no results" });
        });
    } else {
        collegeData.getAllStudents().then((data) => {
            res.json(data);
        }).catch((err) => {
            res.json({ message: "no results" });
        });
    }
});

// GET route to return all TAs
app.get("/tas", (req, res) => {
    collegeData.getTAs().then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json({ message: "no results" });
    });
});

// GET route to return all courses
app.get("/courses", (req, res) => {
    collegeData.getCourses().then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json({ message: "no results" });
    });
});

// GET route to return a student by student number
app.get("/student/:num", (req, res) => {
    collegeData.getStudentByNum(req.params.num).then((data) => {
        res.json(data);
    }).catch((err) => {
        res.json({ message: "no results" });
    });
});

// Handle 404 errors
app.use((req, res) => {
    res.status(404).send("Page Not THERE, Are you sure of the path?");
});

// Initialize the data and start the server
collegeData.initialize().then(() => {
    app.listen(HTTP_PORT, () => {
        console.log("Server is running at http://localhost:" + HTTP_PORT);
    });
}).catch((err) => {
    console.error("Unable to start server:", err);
});
