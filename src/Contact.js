import './contact.css'
import {useState} from 'react'
import ContactItem from './ContactItem'
import EditContact from './EditContact'


function Contact({id, name, contactNumber, whatsApp, contactType, image}) {

  // const [checked, setChecked] = useState(completed)
  const [open, setOpen] = useState({edit:false, view:false, operation:''})

  const handleClose = () => {
    setOpen({edit:false, view:false})
  }

  return (
    <div className={`contact contact--borderColor`}>
      
      <div className='contact__body'>
        <h2>{name}</h2>
        <p>{contactNumber}</p>
        <div className='contact__buttons'>
          <div className='contact__deleteNedit'>
            <button 
              className='contact__editButton' 
              onClick={() => setOpen({...open, edit: true, operation:'edit'})}>
              Edit
            </button>
            <button className='contact__deleteButton'  onClick={() => setOpen({...open, edit: true, operation:'delete'})}>Delete</button>
          </div>
          <button 
            onClick={() => setOpen({...open, view: true})}>
            View
          </button>
        </div>
      </div>

      {open.view &&
        <ContactItem 
          onClose={handleClose} 
          image={image}
          name={name} 
          contactNumber={contactNumber} 
          whatsapp={whatsApp}
          contactType = {contactType}
          open={open.view} />
      }

      {open.edit &&
        <EditContact 
          operation={open.operation}
          onClose={handleClose} 
          toEditName={name} 
          toEditContactNumber={contactNumber} 
          open={open.edit}
          id={id} />
      }

    </div>
  )
}

export default Contact