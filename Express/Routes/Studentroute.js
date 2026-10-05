const express=require ('express')
const checkRoles = require ('../Middleware/roleMiddleware.js')
const router = express.Router()
const Student = require('../models/StudentModel.js')

//For students data
let students = [
    {
        id: 1,
        name: "Ram",
        age: 21,
        course: "BCA"
    },
    {
        id: 2,
        name: "Shyam",
        age: 21,
        course: "B.Tech"
    }
]

// Requesting all resources from server
router.get('/', checkRoles('teacher', 'student', 'admin'), 
async(req, res) => {
    const students = await Student.find();
    res.json(students);
})

// Raeding data on the basis of filter
router.get('/search', checkRoles('teacher', 'student', 'admin'), (req, res) => {
    const {course, age} = req.query;
    const stud = students.filter(s => s.course.toLowerCase() === course.toLowerCase() && s.age === parseInt(age));
    if (!stud) {
        return res.status(404).json({
            message: "Student not found!!"
        });
    }
    res.json(stud)
});

router.get('/:id', checkRoles('teacher', 'student', 'admin'), (req, res) => {
    //console.log(req.params.id) //params means parameters
    const id = parseInt(req.params.id)
    const student = students.find(s => s.id === id)
    if(!student) {
        return res.status(404).json({
            message: "Student not found!!"
        })
    }
    res.json(student)
})

router.post('/', checkRoles('teacher', 'admin'), (req, res) => {
    const newStudent = {
        id: students.length + 1,
        name: req.body.name,
        age: req.body.age,
        course: req.body.course
    }
    students.push(newStudent)
    res.status(201).json({
        message: "Student created",
        student: newStudent
    })
})

router.put('/:id', checkRoles('teacher', 'admin'), (req, res) => {
    const id = parseInt(req.params.id)
    const stud = students.find(s => s.id === id)
    if(!stud) {
        return res.status(404).json({
            message: "Student not found!!"
        })
    }
    const {name, age, course} = req.body
    stud.name = name
    stud.age = age
    stud.course = course
    res.json(stud)
})

router.patch('/:id', checkRoles('teacher', 'admin'), (req, res) => {
    const id = parseInt(req.params.id)
    const stud = students.find(s => s.id === id)
    if(!stud) {
        return res.status(404).json({
            message: "Student not found!!"
        })
    }
    const {name, age, course} = req.body
    if(name !== undefined) stud.name = name
    if(age !== undefined) stud.age = age
    if(course !== undefined) stud.course = course
    res.json(stud)
})

router.delete('/:id', checkRoles('admin'), (req, res) => {
    const id = parseInt(req.params.id);
    const index = students.findIndex(student => student.id === id)
    if(index == -1 ) {
        res.status(404).json({
            message: "No record found"
        })
    }
    students.splice(index, 1)
    res.status(202).json({
        message: "Deleted successfuly.",
        student: students
    })
})

module.exports = router