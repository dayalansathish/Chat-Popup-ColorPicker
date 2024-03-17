const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fitaRoute = require('./Routes/fita.route')
const userRoute = require('./Routes/user.route')
const toastRoute = require('./Routes/Toast.route')
const colorRoute = require('./Routes/color.route')

const PORT = 5000  // 3000-8999

const app = express()

app.use(express.json())  // Language communication

app.use(cors())  // cross orgin --connect one port to another port

app.use('/',fitaRoute)  

app.use('/',userRoute)

app.use('/',toastRoute)

app.use('/',colorRoute)

const URL = "mongodb+srv://sathishkumarcse25:sathishkumar@cluster0.ytuuv5j.mongodb.net/"

mongoose.connect(URL).then(()=>{
    app.listen(PORT,()=>{
        console.log(`server running in ${PORT}`)
        console.log("MongoDb connected")
    })
}).catch((err)=>{
    console.log(err)
})