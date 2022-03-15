import Modal from "./Modal"
import {useState} from 'react'
import './editContact.css'
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import {db} from './Firebase'
import { FaWhatsapp } from 'react-icons/fa'


function EditContact({open, onClose, toEditName, toEditContactNumber, id, operation}) {

  const [name, setName] = useState(toEditName)
  const [contactNumber, setContactNumber] = useState(toEditContactNumber)
  const [whatsApp, setWhatsApp] = useState(false)
  const [userType, setUserType] = useState('')

  const contactType = ['select contact type', 'personal', 'office']
  const type = contactType.map(type => type)
  const handleContactTypeChange = (e) => setUserType((contactType[e.target.value]))

  /* function to update document in firestore */
  const handleUpdate = async (e) => {
    e.preventDefault()
    const contactDocRef = doc(db, 'contacts', id)
    try{
      await updateDoc(contactDocRef, {
        name: name,
        contactNumber: contactNumber,
        whatsApp: whatsApp,
        contactType:userType

      })
      onClose()
    } catch (err) {
      alert(err)
    }    
  }

  const handleDelete = async (e) => {
    e.preventDefault()
    const contactDocRef = doc(db, 'contacts', id)
    try{
      await deleteDoc(contactDocRef)
      onClose()
    } catch (err) {
      alert(err)
    }
  }

  return (
    <Modal modalLable='Saved Contact' onClose={onClose} open={open}>
      { operation==='edit'?
        (<form className='editContact' name='updateContact' onSubmit={handleUpdate}>
        <input 
          type='text' 
          name='name' 
          onChange={(e) => setName(e.target.value.toUpperCase())} 
          value={name}/>
        <input 
          type='number' 
          onChange={(e) => setContactNumber(e.target.value)} 
          value={contactNumber}>
         </input>
         < select
            onChange={e => handleContactTypeChange(e)}
            className="browser-default custom-select" >
            {
              type.map((address, key) => <option value={key}>{address}</option>)
            }
          </select >
          <label >
            <input type="checkbox" onChange={(e) => setWhatsApp(!whatsApp)}/>
            <FaWhatsapp style={{color:'green'}} size="40px" />
          </label>
        <button type='submit'>Edit</button>
      </form> 
      ) : (
        <form className='deleteContact' onSubmit={handleDelete}>
           <div>
             <button type='submit'>Are you sure about to delete this contact</button>
           </div>
        </form>
      )
      }
    </Modal>
  )
}

export default EditContact
