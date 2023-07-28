const {Sequelize, DataTypes}= require('sequelize')
const userModel = require('../models/user')


const sequelize = new Sequelize('pokedex', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT-2',
    },
    logging: false
  })

const User = userModel(sequelize, DataTypes)

const initDb = ()=>{
    return sequelize.sync({force: true}).then(_ =>{
        console.log('Database tables have been synchronized successfully.')
    })
}

module.exports = {
    initDb, User
}

