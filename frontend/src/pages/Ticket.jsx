import { useEffect } from 'react'
import {ToastContainer,toast} from 'react-toastify'
import {useSelector,useDispatch} from 'react-redux'
import { getTicket ,closeTicket} from '../features/tickets/ticketSlice'
import { useParams,useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'

function Ticket() {

  // eslint-disable-next-line
  const {isLoading,isSuccess,isError,ticket,message}= useSelector((state)=> state.ticket) 

  const dispatch = useDispatch()
  const {ticketId} = useParams()
  const navigate = useNavigate()

  useEffect(()=>{
    if(isError){
     toast.error(message)
    }

    dispatch(getTicket(ticketId))
    // eslint-disable-next-line
  },[isError,message,ticketId])

  if(isLoading){
    return <Spinner/>
  }
  if(isError){
    return <h3>something is wrong</h3>
  }

  const OnTicketClose = ()=>{
    dispatch(closeTicket(ticketId))
    toast.success('Ticket closed')
    navigate('/tickets')
  }


  return (
    <div className='ticket-page'>
      <header className='ticket-header'>
      <BackButton url='/tickets'/>
      <h2>
        Ticket ID: {ticket._id}
        <span className={`status status-${ticket.status}`}>
          {ticket.status}
        </span>
      </h2>
      <h3>
        Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-US')}
      </h3>
      <h3>Product: {ticket.product}</h3>
      <hr />
      <div className="ticket-desc">
        <h3>Description of the issue</h3>
        <p>{ticket.description}</p>
      </div>
      </header>
      {ticket.status !== 'closed' && (
        <button onClick={OnTicketClose} className='btn btn-block btn-danger'>Close Ticket</button>
      ) }
      <ToastContainer/>
    </div>
  )
}

export default Ticket
