const expressAsyncHandler = require('express-async-handler')

const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')


// get user tickets
// route /api/tickets/me
// access Private
const getTicket = expressAsyncHandler(async (req,res)=>{
  
  const user = await User.findById(req.user.id)
  if(!user){
    res.status(401)
    throw new Error('user not found')
  }

  const tickets = await Ticket.find({user: req.user.id})
  res.status(200).json(tickets)
})

// get user ticket
// route /api/tickets/:id
// access Private
const getUserTicket = expressAsyncHandler(async (req,res)=>{
  
  const user = await User.findById(req.user.id)
  if(!user){
    res.status(401)
    throw new Error('user not found')
  }

  const ticket = await Ticket.findById(req.params.id)

  if(!ticket){
    res.status(404)
    throw new Error('ticket not found')
  }

  if(ticket.user.toString() !== req.user.id){
    res.status(401)
    throw new Error('not authorized')
  }
  res.status(200).json(ticket)
})




// create user tickets
// route /api/tickets/me
// access Private
const createTicket = expressAsyncHandler(async (req,res)=>{
  const {product,description} = req.body
  if(!product || !description){
    res.status(401)
    throw new Error ('Please add a product description')
  }

  const user = await User.findById(req.user.id)
  if(!user){
    res.status(401)
    throw new Error('user not found')
  }
  
  const ticket = await Ticket.create({
    product,
    description,
    user: req.user.id,
    status: 'new'
  })
  res.status(201).json(ticket)
})

// delete user ticket
// route delete/api/tickets/:id
// access Private
const deleteTicket = expressAsyncHandler(async (req,res)=>{
  
  const user = await User.findById(req.user.id)
  if(!user){
    res.status(401)
    throw new Error('user not found')
  }

  const ticket = await Ticket.findById(req.params.id)

  if(!ticket){
    res.status(404)
    throw new Error('ticket not found')
  }

  if(ticket.user.toString() !== req.user.id){
    res.status(401)
    throw new Error('not authorized')
  }

 // Instead of await ticket.remove();
await ticket.deleteOne({ _id: req.params.id });


  res.status(200).json({success: true})
})


// update user ticket
// route update/api/tickets/:id
// access Private
const updateTicket = expressAsyncHandler(async (req,res)=>{
  
  const user = await User.findById(req.user.id)
  if(!user){
    res.status(401)
    throw new Error('user not found')
  }

  const ticket = await Ticket.findById(req.params.id)

  if(!ticket){
    res.status(404)
    throw new Error('ticket not found')
  }

  if(ticket.user.toString() !== req.user.id){
    res.status(401)
    throw new Error('not authorized')
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {new :true})

  res.status(200).json(updatedTicket)
})

module.exports = {
  getTicket,
  getUserTicket,
  updateTicket,
  deleteTicket,
  createTicket
}