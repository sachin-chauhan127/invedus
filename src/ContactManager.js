import './contactManager.css'
import Contact from './Contact'
import AddContact from './AddContact'
import {useState, useEffect} from 'react'
import {collection, query, orderBy, onSnapshot} from "firebase/firestore"
import {db} from './Firebase'

function ContactManager() {

  const [openAddModal, setOpenAddModal] = useState(false)
  const [contacts, setContacts] = useState([])

  /* function to get all contacts from firestore in realtime */ 
  useEffect(() => {
    const q = query(collection(db, 'contacts'), orderBy('created', 'desc'))
    onSnapshot(q, (querySnapshot) => {
      setContacts(querySnapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })))
    })
  },[])
  
  return (
    <div className='contactManager'>
      <header>Contact List 💖people you know</header>
      <div className='contactManager__container'>
        <button 
          onClick={() => setOpenAddModal(true)}>
          Add Contact+
        </button>
        <div className='contactManager__contacts'>
         {contacts.map((contact) => (
            <Contact
              id={contact.id}
              key={contact.id}
              image ={contact.data.image}
              name ={contact.data.name} 
              contactNumber={contact.data.contactNumber}
              contactType = {contact.data.contactType}
              whatsApp = {contact.data.whatsApp}
            />
          ))}
        </div>
      </div>

      {openAddModal &&
        <AddContact onClose={() => setOpenAddModal(false)} open={openAddModal}/>
      }

    </div>
  )
}

export default ContactManager
