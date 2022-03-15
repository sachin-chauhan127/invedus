import Modal from "./Modal"
import {useState} from 'react'
import './addContact.css'
import {db,db2} from './Firebase'
import {collection, addDoc, Timestamp} from 'firebase/firestore'
import { FaWhatsapp } from 'react-icons/fa'
// import Avatar from 'react-avatar';
// import firebase from "firebase";
import 'firebase/storage'; 
import FileUploader from "react-firebase-file-uploader";


function AddContact({onClose, open}) {

  const [name, setName] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [whatsApp, setWhatsApp] = useState(false)
  const [userType, setUserType] = useState('')
  const [avtarImage, setAvtarImage] = useState('')
  const [avatar, setAvatar] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const contactType = ['select contact type', 'personal', 'office']
  const type = contactType.map(type => type)
  const handleContactTypeChange = (e) => setUserType((contactType[e.target.value]))

  const handleUploadStart = () => {
    setIsUploading(true);
    setProgress(0);
  }
  const handleProgress = progress => setProgress(progress);
  const handleUploadError = error => {
    setIsUploading(false);
    console.error(error);
  };

  const handleUploadSuccess = async(filename) => {
    // this.setState({ avatar: filename, progress: 100, isUploading: false });
    setIsUploading(false);
    setAvatar(filename);
    setProgress(100);

    await db2
      .child(filename)
      .getDownloadURL()
      .then(url => setAvtarImage(url))
  };
  /* function to add new task to firestore */
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addDoc(collection(db, 'contacts'), {
        image: avtarImage,
        name: name,
        contactNumber: contactNumber,
        whatsApp: whatsApp,
        contactType:userType,
        created: Timestamp.now()
      })
      onClose()
    } catch (err) {
      alert(err)
    }
  }

  return (
    <Modal modalLable='Add Contact' onClose={onClose} open={open}>
      <form className='addContact' name='addContact' onSubmit={handleSubmit}>
        {isUploading && <p>progress: {progress}</p>}
        <FileUploader
            accept="image/*"
            name="avatar"
            randomizeFilename
            storageRef={db2}
            onUploadStart={handleUploadStart}
            onUploadError={handleUploadError}
            onUploadSuccess={handleUploadSuccess}
            onProgress={handleProgress}
          />
          {avtarImage && <img src={avtarImage} />}
          <input 
            type='text' 
            name='name' 
            onChange={(e) => setName(e.target.value.toUpperCase())} 
            value={name}
            placeholder='Enter name'/>
          <input 
            type='number'
            onChange={(e) => setContactNumber(e.target.value)}
            placeholder='Enter Contact Number'
            value={contactNumber}></input>
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
        <button type='submit'>Done</button>
      </form> 
    </Modal>
  )
}

export default AddContact
