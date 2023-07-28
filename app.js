const bodyParser = require('body-parser')
const express = require('express')
const sequelize = require('./src/db/sequelize')
const dotenv = require('dotenv');

const page = require('./src/page')

const app = express()

// Set up Global configuration access
dotenv.config();

app
.use(bodyParser.json())


sequelize.initDb()
//login
const login = require('./src/services/login');
app.use('/api', login); 

// Import the userRouter for user-related routes
const userRouter = require('./src/services/userRouter');
app.use('/api/users', userRouter); // Mount the userRouter at the "/api/users" path

app.use('/api',page)

app.get('/', (req,res)=>{
    res.json({
        message:"hello world"
    })
})



app.listen(process.env.PORT, ()=> console.log('app started at port 5000'))

