const Sequelize = require('sequelize');

// Initialize Sequelize
const sequelize = new Sequelize('SenecaDB', 'SenecaDB_owner', 'e2I6hRTCxXHJ', {     
    host: 'ep-yellow-resonance-a53k0pyj.us-east-2.aws.neon.tech',     
    dialect: 'postgres',     
    port: 5432,     
    dialectOptions: { 
        ssl: { 
            rejectUnauthorized: false 
        } 
    }, 
    query: { raw: true } 
});

// Define the Course model
const Course = sequelize.define('Course', {
    courseId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    courseCode: Sequelize.STRING,
    courseDescription: Sequelize.STRING
}, {
    tableName: 'courses',
    timestamps: false
});

// Define the Student model
const Student = sequelize.define('Student', {
    studentNum: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: Sequelize.STRING,
    addressStreet: Sequelize.STRING,
    addressCity: Sequelize.STRING,
    addressProvince: Sequelize.STRING,
    TA: Sequelize.BOOLEAN,
    status: Sequelize.STRING,
    course: {
        type: Sequelize.INTEGER,
        references: {
            model: Course,
            key: 'courseId'
        }
    }
}, {
    tableName: 'students',
    timestamps: false
});

// Define the relationship between Student and Course
Course.hasMany(Student, { foreignKey: 'course' });
Student.belongsTo(Course, { foreignKey: 'course' });

// Function to initialize the database
function initialize() {
    return sequelize.sync()
        .then(() => console.log("Database synchronized"))
        .catch(err => { throw new Error("Unable to sync the database: " + err.message); });
}

// Function to get all students
function getAllStudents() {
    return Student.findAll()
        .then(data => data)
        .catch(err => { throw new Error("Error fetching students: " + err.message); });
}

// Function to get students by course
function getStudentsByCourse(course) {
    return Student.findAll({ where: { course } })
        .then(data => {
            if (data.length > 0) return data;
            throw new Error("No results returned");
        })
        .catch(err => { throw new Error("Error fetching students by course: " + err.message); });
}

// Function to get a student by student number
function getStudentByNum(num) {
    return Student.findOne({ where: { studentNum: num } })
        .then(data => {
            if (data) return data;
            throw new Error("No student found with the specified number");
        })
        .catch(err => { throw new Error("Error fetching student by number: " + err.message); });
}

// Function to get all courses
function getCourses() {
    return Course.findAll()
        .then(data => data)
        .catch(err => { throw new Error("Error fetching courses: " + err.message); });
}

// Function to get a course by ID
function getCourseById(id) {
    return Course.findOne({ where: { courseId: id } })
        .then(data => {
            if (data) return data;
            throw new Error("No course found with the specified id");
        })
        .catch(err => { throw new Error("Error fetching course by ID: " + err.message); });
}

// Function to add a student
function addStudent(studentData) {
    studentData.TA = Boolean(studentData.TA);

    for (let key in studentData) {
        if (studentData[key] === "") {
            studentData[key] = null;
        }
    }

    return Student.create(studentData)
        .then(() => "Student created successfully")
        .catch(err => { throw new Error("Unable to create student: " + err.message); });
}

// Function to update a student
function updateStudent(studentData) {
    studentData.TA = Boolean(studentData.TA);

    for (let key in studentData) {
        if (studentData[key] === "") {
            studentData[key] = null;
        }
    }

    return Student.update(studentData, {
        where: { studentNum: studentData.studentNum }
    })
        .then(([affectedRows]) => {
            if (affectedRows > 0) return "Student updated successfully";
            throw new Error("No student found with the specified number");
        })
        .catch(err => { throw new Error("Unable to update student: " + err.message); });
}

// Function to add a course
function addCourse(courseData) {
    for (let key in courseData) {
        if (courseData[key] === "") {
            courseData[key] = null;
        }
    }

    return Course.create(courseData)
        .then(() => "Course created successfully")
        .catch(err => { throw new Error("Unable to create course: " + err.message); });
}

// Function to update a course
function updateCourse(courseData) {
    for (let key in courseData) {
        if (courseData[key] === "") {
            courseData[key] = null;
        }
    }

    return Course.update(courseData, {
        where: { courseId: courseData.courseId }
    })
        .then(([affectedRows]) => {
            if (affectedRows > 0) return "Course updated successfully";
            throw new Error("No course found with the specified ID");
        })
        .catch(err => { throw new Error("Unable to update course: " + err.message); });
}

// Function to delete a course by ID
function deleteCourseById(id) {
    return Course.destroy({
        where: { courseId: id }
    })
        .then(rowsDeleted => {
            if (rowsDeleted > 0) return "Course deleted successfully";
            throw new Error("No course found with the specified ID");
        })
        .catch(err => { throw new Error("Unable to delete course: " + err.message); });
}

// Function to delete a student by number
function deleteStudentByNum(studentNum) {
    return Student.destroy({
        where: { studentNum: studentNum }
    })
        .then(rowsDeleted => {
            if (rowsDeleted > 0) return "Student deleted successfully";
            throw new Error("No student found with the specified number");
        })
        .catch(err => { throw new Error("Unable to delete student: " + err.message); });
}

module.exports = {
    initialize,
    getAllStudents,
    getStudentsByCourse,
    getStudentByNum,
    getCourses,
    getCourseById,
    addStudent,
    updateStudent,
    addCourse,
    updateCourse,
    deleteCourseById,
    deleteStudentByNum
};
