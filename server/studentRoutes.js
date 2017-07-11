var studentRouter = require('express').Router();
// var Student = require('./models').Student
var db = require("../db")
var Student = db.model('student')


//Get all the students
studentRouter.get('/', function (req, res, next) {
    Student.findAll()
        .then((allStudents) => {
            res.status(200).json(allStudents)
        })
        .catch(next);
})

//Get one student
studentRouter.get('/:id', (req, res, next) => {
      Student.findById(req.params.id)
        .then(function (student) {
            if (!student) {
                res.sendStatus(404);
            }
            res.status(201).send(student)
        })
        .catch(next)
})

//Add a student
studentRouter.post('/newstudent', (req, res, next) => {
    Student.create(req.body)
        .then(newStudent => {
           // console.log('New Student', newStudent)
            res.status(200).send(newStudent)
        })
        .catch(next)
})

//Update student info
studentRouter.put('/:id/editstudent', (req, res, next) => {
    Student.findById(req.params.id)
        .then(student => {
            console.log('req.params.id', req.params.id)
            return student.update(req.body);
        })
        .then(student => {
            res.json(student)
            next()
        })
        .catch(next)
})

//Delete one student
studentRouter.delete('/:id',(req, res, next) => {
     Student.findById(req.params.id)
        .then(function (student) {
            return student.destroy()
        })
        .then(function(){
            res.send('This student no longer exists')
        })
        .catch(next)
})

module.exports = studentRouter;