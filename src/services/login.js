const {User} = require('../db/sequelize')
const bcrypt = require('bcrypt')
const express = require('express')
const router = express.Router()

const jwt = require('jsonwebtoken')



router.post('/login',(req,res)=>{
    User.findOne({where:{
        email : req.body.email
    }}).then(user=>{
        if(!user){
            const message = 'user n exist pas'
            return res.status(404).json({message})
        }
        bcrypt.compare(req.body.password, user.password).then((isPasswordValid =>{
            if(!isPasswordValid) {
                const message = `mot incorrect`;
                return res.status(401).json({ message})
            }
            
            //jwt
            let jwtSecretKey = process.env.JWT_SECRET_KEY;
            let data = {
                time: Date(),
                userId: 12,
            }
            const token = jwt.sign(data, jwtSecretKey)


            const message = `L'utilisateur a été connecté avec succès`;
            return res.json({ message, data: user, token})
        }))
        .catch(error=>{
            const message = `L'utilisateur  pas pu connecte`;
            return res.json({ message, data: error })
        })
    })
})



module.exports = router

