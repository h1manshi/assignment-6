/*********************************************************************************
*  WEB700 – Assignment 04
*  I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part 
*  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Himanshi Arora Student ID: 153974233 Date: 21 June 2024
*  Online (vercel) Link: ________________________________________________________
********************************************************************************/ 

// Declaration of HTTP_PORT
var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var path = require("path");
var collegeData = require("./modules/collegeData");
var app = express();

// Middleware to serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to parse URL-encoded bodies (form data)
app.use(express.urlencoded({ extended: true }));

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
    res.sendFile(path.join(__dirname, "/views/addStudent.html"));
});

// POST route to handle form submission for adding a new student
app.post("/students/add", (req, res) => {
    const { firstName, lastName, email, course } = req.body;

    // Example validation (check for required fields)
    if (!firstName || !lastName || !email || !course) {
        return res.status(400).send("All fields are required");
    }

    collegeData.addStudent(req.body)
        .then(() => {
            res.redirect("/students");
        })
        .catch(err => {
            console.error("Error adding student:", err);
            res.status(500).send("Unable to add student");
        });
});

// GET route to return all students or students by course
app.get("/students", (req, res) => {
    if (req.query.course) {
        collegeData.getStudentsByCourse(req.query.course)
            .then(data => {
                if (data.length === 0) {
                    res.status(404).json({ message: "No students found for this course" });
                } else {
                    res.json(data);
                }
            })
            .catch(err => {
                console.error("Error fetching students by course:", err);
                res.status(500).json({ message: "Internal server error" });
            });
    } else {
        collegeData.getAllStudents()
            .then(data => {
                if (data.length === 0) {
                    res.status(404).json({ message: "No students found" });
                } else {
                    res.json(data);
                }
            })
            .catch(err => {
                console.error("Error fetching all students:", err);
                res.status(500).json({ message: "Internal server error" });
            });
    }
});

// GET route to return all TAs
app.get("/tas", (req, res) => {
    collegeData.getTAs()
        .then(data => {
            if (data.length === 0) {
                res.status(404).json({ message: "No TAs found" });
            } else {
                res.json(data);
            }
        })
        .catch(err => {
            console.error("Error fetching TAs:", err);
            res.status(500).json({ message: "Internal server error" });
        });
});

// GET route to return all courses
app.get("/courses", (req, res) => {
    collegeData.getCourses()
        .then(data => {
            if (data.length === 0) {
                res.status(404).json({ message: "No courses found" });
            } else {
                res.json(data);
            }
        })
        .catch(err => {
            console.error("Error fetching courses:", err);
            res.status(500).json({ message: "Internal server error" });
        });
});

// GET route to return a student by student number
app.get("/student/:num", (req, res) => {
    collegeData.getStudentByNum(req.params.num)
        .then(data => {
            if (!data) {
                res.status(404).json({ message: "Student not found" });
            } else {
                res.json(data);
            }
        })
        .catch(err => {
            console.error("Error fetching student by number:", err);
            res.status(500).json({ message: "Internal server error" });
        });
});

// Handle 404 errors
app.use((req, res) => {
    res.status(404).send("Page Not THERE, Are you sure of the path?");
});

// Initialize the data and start the server
collegeData.initialize()
    .then(() => {
        app.listen(HTTP_PORT, () => {
            console.log(`Server is running on http://localhost:${HTTP_PORT}`);
        });
    })
    .catch(err => {
        console.error("Unable to start server:", err);
    });
