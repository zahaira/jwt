const auth = require('../auth/auth')
const express = require('express')
const router = express.Router()

router.get('/page',auth, (req,res)=>{
    res.json({message:'ok auth good'})
})

module.exports = router
