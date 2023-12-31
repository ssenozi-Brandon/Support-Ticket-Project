const path = require('path')
const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleWare')
const connectDB  = require('./config/db')
const PORT = process.env.PORT || 8000

// connection to database
connectDB()

const app = express()

app.use(express.json())
app.use(errorHandler)
app.use('/api/users', require('./routes/UserRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

// serve frontend
if(process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname,"../frontend/build/")))

  app.get('*',(req,res)=> res.sendFile(__dirname,'../', 'frontend','build','index.html'))

}else{
  app.get('/',(req,res)=>{
    res.status(200).json({message: 'Welcome to the support desk'})
  })
}

app.use(express.urlencoded({extended: false}))

app.listen(PORT,()=>console.log(`server started on port ${PORT}`))