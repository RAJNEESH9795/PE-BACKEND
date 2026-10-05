const express = require("express");
const router = express.Router();

let students = [];

// CREATE - Add student
router.post("/students", (req, res) => {
    const { name, address, age, course } = req.body;

    const student = {
        id: students.length + 1,
        name,
        address,
        age,
        course
    };

    students.push(student);

    res.status(201).json({
        message: "Student added successfully",
        student
    });
});

// READ - Get all students
router.get("/students", (req, res) => {
    res.json(students);
});

// READ - Get student by ID
router.get("/students/:id", (req, res) => {
    const student = students.find(s => s.id == req.params.id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    res.json(student);
});

// UPDATE - Update student
router.put("/students/:id", (req, res) => {
    const student = students.find(s => s.id == req.params.id);

    if (!student) {
        return res.status(404).json({ message: "Student not found" });
    }

    const { name, address, age, course } = req.body;

    student.name = name;
    student.address = address;
    student.age = age;
    student.course = course;

    res.json({
        message: "Student updated successfully",
        student
    });
});

// DELETE - Delete student
router.delete("/students/:id", (req, res) => {
    const index = students.findIndex(s => s.id == req.params.id);

    if (index === -1) {
        return res.status(404).json({ message: "Student not found" });
    }

    students.splice(index, 1);

    res.json({
        message: "Student deleted successfully"
    });
});

module.exports = router;