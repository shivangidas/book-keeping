const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config/config')
const db = {}
const Op = Sequelize.Op; //remove the warning message
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true
});

// Database
const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
    host: config.db.host,
    dialect: 'postgres',
    logging: false, //the query that is logged in console. remove when debugging
    operatorsAliases: Op
});

fs.readdirSync(__dirname)
    .filter((file) =>
        //file !== 'index.js'
        (file.indexOf(".") !== 0) && (file !== "index.js" /*&& file !== "relations.js" */)
    )
    .forEach((file) => {
        const model = sequelize.import(path.join(__dirname, file))
        db[model.name] = model
    });

// relationships/associations described here
//require('./relations')(db)

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db