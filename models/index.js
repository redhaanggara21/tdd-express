'use strict';

const Sequelize = require('sequelize');
const TodoModel = require('./TodoModel');
const dotenv = require('dotenv');
require('dotenv').config();

console.log('The value of PORT is:', process.env.PORT);

const Op = Sequelize.Op;
const host = process.env.DB_HOST;
const username = process.env.DB_USER;
const password = process.env.DB_PASS;
const database = process.env.DB_NAME;
const port = process.env.DB_PORT;

console.log("connect database");
console.log(host);

// --- connect ---
const sequelize = new Sequelize({
    host: host,
    dialect: 'postgres',
    port: port,
    username: username,
    password: password,
    database: database,
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    operatorsAliases: {
        $and: Op.and,
        $or: Op.or,
        $eq: Op.eq,
        $gt: Op.gt,
        $lt: Op.lt,
        $lte: Op.lte,
        $like: Op.like
    }
});

// --- models ---
const todo = TodoModel(sequelize, Sequelize);

// sync models with database
sequelize.sync({ force: false })
    .then(() => {
        console.log(`Database & Tables created!`);
    })
    .catch(err => {
        console.log(err.stack);
    });

module.exports = {
    TodoModel: todo
}