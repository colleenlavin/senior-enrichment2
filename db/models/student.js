'use strict';
var Sequelize = require('sequelize')
var db = require('../index.js')


module.exports = db.define('student', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    image: {
        type: Sequelize.JSON,
        allowNull: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false
    }
})