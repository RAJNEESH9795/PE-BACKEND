const express = require("express");
const checkRoles = require ('../Middleware/roleMiddleware.js')
const router = express.Router();

let teachers = [
    {
        id: 1,
        name: "Amit Sharma",
        age: 35,
        subject: "Computer Science",
        experience: 10
    },
    {
        id: 2,
        name: "Neha Verma",
        age: 32,
        subject: "Mathematics",
        experience: 8
    }
];

// GET - Get all teachers
router.get("/", (req, res) => {
    res.json(teachers);
});

// GET - Get teacher by ID
router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const teacher = teachers.find(teacher => teacher.id === id);

    if (!teacher) {
        return res.status(404).json({
            message: "Teacher not found"
        });
    }

    res.json(teacher);
});

// POST - Create a new teacher
router.post("/", (req, res) => {
    const newTeacher = {
        id: teachers.length + 1,
        name: req.body.name,
        age: req.body.age,
        subject: req.body.subject,
        experience: req.body.experience
    };

    teachers.push(newTeacher);

    res.status(201).json({
        message: "Teacher created successfully",
        teacher: newTeacher
    });
});

// DELETE - Delete teacher by ID
router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = teachers.findIndex(teacher => teacher.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "No teacher record found"
        });
    }

    const deletedTeacher = teachers.splice(index, 1);

    res.status(200).json({
        message: "Teacher deleted successfully",
        teacher: deletedTeacher[0]
    });
});

// PUT - Update complete teacher record
router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = teachers.findIndex(teacher => teacher.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Teacher not found"
        });
    }

    const { name, age, subject, experience } = req.body;

    teachers[index] = {
        id: id,
        name: name,
        age: age,
        subject: subject,
        experience: experience
    };

    res.json({
        message: "Teacher updated successfully",
        teacher: teachers[index]
    });
});

// PATCH - Update partially
router.patch("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = teachers.findIndex(teacher => teacher.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Teacher not found"
        });
    }

    teachers[index] = {
        ...teachers[index],
        ...req.body
    };

    res.json({
        message: "Teacher updated successfully",
        teacher: teachers[index]
    });
});

// SEARCH - Search teacher by subject and age
router.get("/search", (req, res) => {
    const subject = req.query.subject;
    const age = req.query.age;

    const result = teachers.filter(teacher =>
        teacher.subject.toLowerCase() === subject.toLowerCase() &&
        teacher.age == age
    );

    if (result.length === 0) {
        return res.status(404).json({
            message: "No teacher found"
        });
    }

    res.json(result);
});

module.exports = router;