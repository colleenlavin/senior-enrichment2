const campusRouter = require('express').Router()
const Campus = require('../db/models').Campus;


//Get all the campuses
campusRouter.get('/', function (req, res, next) {
    Campus.findAll()
        .then((allCampuses) => {
            res.status(200).json(allCampuses)
        })
        .catch(next);
})

//Get one campus
campusRouter.get('/:id', (req, res, next) => {
      Campus.findById(req.params.id)
        .then(function (campus) {
            if (!campus) {
                res.sendStatus(404);
            }
            res.status(201).send(campus)
        })
        .catch(next)
})

//Add a campus
campusRouter.post('/newcampus', function (req, res, next) {
    Campus.create(req.body)
        .then(newCampus => {
            res.status(200).send(newCampus)
        })
        .catch(next)
});

//Update campus info for one campus
campusRouter.put('/:id', function (req, res, next) {
    Campus.findById(req.params.id)
        .then(function (campus) {
            return campus.update(req.body)
        })
        .then(function(newCampus){
            res.status(201).send(newCampus)
        })
        .catch(next)
});

//Delete one campus
campusRouter.delete('/:id', function (req, res, next) {
    Campus.findById(req.params.id)
        .then(function (campus) {
            return campus.destroy()
        })
        .then(function(){
            res.send('This Campus has exploded!')
        })
        .catch(next)
});





module.exports = campusRouter;