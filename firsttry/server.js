const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const collegeData = require('./modules/collegeData'); // Adjust path as necessary

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Initialize database
collegeData.initialize().then(() => {
    console.log("Database initialized");
}).catch((err) => {
    console.error("Error initializing database:", err);
});

// Routes

// Route to display all students
app.get('/students', (req, res) => {
    collegeData.getAllStudents()
        .then((data) => {
            res.render('students', { students: data });
        })
        .catch(() => {
            res.status(500).send("Unable to Retrieve Students");
        });
});

// Route to add a new student (form view)
app.get('/students/add', (req, res) => {
    collegeData.getCourses()
        .then((courses) => {
            res.render('addStudent', { courses: courses });
        })
        .catch(() => {
            res.render('addStudent', { courses: [] });
        });
});

// Route to process adding a new student
app.post('/students/add', (req, res) => {
    collegeData.addStudent(req.body)
        .then(() => {
            res.redirect('/students');
        })
        .catch(() => {
            res.status(500).send("Unable to Create Student");
        });
});

// Route to display a specific student (form view)
app.get('/student/:studentNum', (req, res) => {
    let viewData = {};

    collegeData.getStudentByNum(req.params.studentNum)
        .then((student) => {
            if (student) {
                viewData.student = student;
            } else {
                viewData.student = null;
            }
        })
        .catch(() => {
            viewData.student = null;
        })
        .then(() => collegeData.getCourses())
        .then((courses) => {
            viewData.courses = courses;

            if (viewData.student) {
                for (let i = 0; i < viewData.courses.length; i++) {
                    if (viewData.courses[i].courseId == viewData.student.course) {
                        viewData.courses[i].selected = true;
                    }
                }
            }
        })
        .catch(() => {
            viewData.courses = [];
        })
        .then(() => {
            if (viewData.student === null) {
                res.status(404).send("Student Not Found");
            } else {
                res.render('student', { viewData: viewData });
            }
        });
});

// Route to update a student
app.post('/student/update', (req, res) => {
    collegeData.updateStudent(req.body)
        .then(() => {
            res.redirect('/students');
        })
        .catch(() => {
            res.status(500).send("Unable to Update Student");
        });
});

// Route to delete a student
app.get('/student/delete/:studentNum', (req, res) => {
    collegeData.deleteStudentByNum(req.params.studentNum)
        .then(() => {
            res.redirect('/students');
        })
        .catch(() => {
            res.status(500).send("Unable to Remove Student / Student not found");
        });
});

// Route to display all courses (for testing purposes)
app.get('/courses', (req, res) => {
    collegeData.getCourses()
        .then((data) => {
            res.json(data);
        })
        .catch(() => {
            res.status(500).send("Unable to Retrieve Courses");
        });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
