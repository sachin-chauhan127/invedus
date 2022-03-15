import Modal from "./Modal"
import './contactItem.css'
import Avatar from 'react-avatar';
import { FaWhatsapp } from 'react-icons/fa'


function ContactItem({onClose, open, name, contactNumber, whatsapp, contactType, image}) {

  return (
    <Modal modalLable='Contact details' onClose={onClose} open={open}>
      <div className='contactItem'>
        <img src={image} />
        {/* <Avatar name={name} /> */}
        <h2>{name}</h2>
        <p>{contactNumber}</p>
        <span>{contactType}</span>
        <span>{whatsapp ? <FaWhatsapp style={{color:'green'}} size="20px" /> : null}</span>
      </div>
    </Modal>
  )
}

export default ContactItem
