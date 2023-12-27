const express = require('express')
const router = express.Router()
const {getTicket,getUserTicket,deleteTicket,updateTicket,createTicket}= require('../controllers/ticketController')

const {protect} = require('../middleware/authMiddleWare')

router.route('/').get(protect,getTicket).post(protect,createTicket)

router.route('/:id').get(protect,getUserTicket).delete(protect,deleteTicket).put(protect,updateTicket)

module.exports = router