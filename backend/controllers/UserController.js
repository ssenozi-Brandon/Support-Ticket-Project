const expressAsyncHandler = require("express-async-handler")
const bcrypt = require('bcryptjs')


const User = require('../models/userModel')
// register a new user
// router /api/users
// access public
const registerUser = expressAsyncHandler(async (req,res)=>{
   const {name,email,password} = req.body

  //  Validation
  if(!name || !email || !password){
    res.status(400)
    throw new Error ('Please include all fields')
  }

  // find if user already exists
  const userExists = await User.findOne({email})
  if(userExists){
    res.status(400)
    throw new Error('User already exists')
  }

  // hash the password
  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password,salt)

  // create user
  const user = User.create({
    name,
    email,
    password: hashedPassword
  })
  if(user){
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email
    })
  }else{
    res.status(400)
    throw new Error('Invalid User data')
  } 
})

// login a new user
// router /api/users/login

const loginUser = expressAsyncHandler(async (req,res)=>{
  res.send('login Route')
})

module.exports = {
  registerUser,
  loginUser
}