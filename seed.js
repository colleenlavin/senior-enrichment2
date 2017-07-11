// Load with the node seed.js

var Promise = require('bluebird');
var db = require('./db');
var Student = require('./db/models/student');
var Campus = require('./db/models/campus');


var data = {
    campus: [
        {
            name: "Ariel",
            image: "http://vignette3.wikia.nocookie.net/firefly/images/2/2d/Ariel-AotV.jpg/revision/latest?cb=20100607093928",
            location: "Space.",
            description:"Ariel is a central planet of the Union of Allied Planets. It is the eleventh planet orbiting White Sun."
        },
        {
            name: "Beaumonde",
            image: "http://vignette3.wikia.nocookie.net/firefly/images/2/2d/Ariel-AotV.jpg/revision/latest?cb=20100607093928",
            description: "Beaumonde, the fifteenth planet orbiting the star Kalidasa,is a fairly wealthy planet. The planet is known to have factories and ranches."
        },
     
    ],
    student: [
        {
            name: "Mal Reynolds",
            image:"https://s-media-cache-ak0.pinimg.com/originals/2c/06/31/2c0631039ad76c67230c3cd3f8bde00a.jpg",
            email: "nathanfillion@gmail.com",
        },
         {
            name: "Kaylee Frye",
            image:"https://vignette1.wikia.nocookie.net/firefly/images/8/8d/Kaylee_sit.jpg/revision/latest/scale-to-width-down/200?cb=20100426173313",
            email: "fixeseverything@gmail.com",
        },
         {
            name: "Wash",
            image:"https://s-media-cache-ak0.pinimg.com/736x/e1/4b/1a/e14b1ac735e018661b6b0860488ac310.jpg",
            email: "notdead@gmail.com",
        },
         {
            name: "Jayne Cobb",
            image:"https://vignette2.wikia.nocookie.net/firefly/images/7/74/180px-Jaynes_hat.jpg/revision/latest?cb=20130706015121",
            email: "aherocalledjayne@jaynestown.com",
        },
        {
            name: "Inara",
            image:"http://i1053.photobucket.com/albums/s462/femalefortitude/Firefly-Serenity/tumblr_m13sc5IsZX1rqdy21o1_1280_zps1f30f6a1.jpg",
            email: "companion@serenity.com",
        },
        {
            name: "River Tam",
            image:"https://s-media-cache-ak0.pinimg.com/736x/cd/49/8a/cd498a39447db58da71b63a242707724.jpg",
            email: "icankillyouwithmybrain@firefly.com",
        },
         {
            name: "Zoe Washburne",
            image:"https://vignette1.wikia.nocookie.net/firefly/images/1/10/Zoe.jpg/revision/latest/scale-to-width-down/250?cb=20080301064448",
            email: "firstmate@browncoat.com",
        },
         {
            name: "Shepard Brook",
            image:"http://www.fireflywiki.net/img/Book23.jpg",
            email: "shep@gmail.com",
        },
         {
            name: "Simon Tam",
            image:"https://friday87central.files.wordpress.com/2011/03/simon.jpg",
            email: "thedoctor@firefly.com",
        },

    ]
};

db.sync({ force: true })
    .then(function () {
        console.log("Dropped old data, now inserting data");
        return Promise.map(Object.keys(data), function (name) {
            return Promise.map(data[name], function (item) {
                return db.model(name)
                    .create(item)
                    });
            });
    })
    .then(function () {
        console.log("Data is inserted!");
    })
    .catch(function (err) {
        console.error('Danger Will Robinsom', err, err.stack);
    })
    .finally(function () {
        db.close() 
        console.log('connection closed'); 
        return null; 
    });
