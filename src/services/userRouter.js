const {User}=require('../db/sequelize')
const { ValidationError } = require('sequelize')
const express =require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

//get user by id
router.get('/:id',(req,res)=>{
    User.findByPk(req.params.id)
    .then(user=>{
        if(user === null){
            const message = 'n existe pas'
            return res.status(404).json(message)
        }
        const message = `user ${user.username} a bien ete trouve`
        return res.json({message, data:user})
    })
    .catch((error)=>{
        res.status(500).json(error)
      })
})


//create a new user
router.post('/',(req,res)=>{
    bcrypt.hash(req.body.password, 10)
    .then(hash=>{
        User.create({
            username: req.body.username,
            email: req.body.email,
            password: hash
        })
        .then(user=>{
        const message = `Le user ${req.body.username} a bien été crée.`
        res.json({ message, data: user }) 
        }).catch((error)=>{
        if(error instanceof ValidationError){
          return res.status(400).json({message:error.message, data:error})
        }
        if(error instanceof UniqueConstraintError){
          return res.status(400).json({message:error.message,data:error})
        }
        res.status(500).json(error)
        })
    })

})


//update user
router.put('/:id', (req,res)=>{
    const id = req.params.id
    User.update({
        username: req.body.username,
        email: req.body.email
    },{
        where: {id: id}
    })
    .then(_ => {
        return User.findByPk(id).then(user => {
          if(user === null){
            const message = 'sorry nexist pas'
            return res.status(404).json({message})
          }
          const message = `Le pokémon ${user.username} a bien été modifié.`
          res.json({message, data: user })
        })
      })
      .catch((error)=>{
        if(error instanceof ValidationError){
          return res.status(400).json({message:error.message, data:error})
        }
        if(error instanceof UniqueConstraintError){
          return res.status(400).json({message:error.message,data:error})
        }
        const message = 'something went wrong !'
        res.status(500).json({message,data:error})
      })
})

//delete user
router.delete('/:id', (req,res)=>{
    User.findByPk(req.params.id)
    .then(user=>{
        if(user == null){
            const message = 'sorry n exist pas'
            return res.status(404).json(message)
        }
        const userdeleted = user;
        return User.destroy({
            where: {id: user.id}
        })
        .then(_ => {
            const message = `user avec l'identifiant n°${userdeleted.id} a bien été supprimé.`
            res.json({message, data : userdeleted})
        })
    }).catch((error)=>{
        res.status(500).json(error)
    })
})

module.exports = router;

