import { useRef, useState } from 'react';
import Card from '../ui/Card';
import classes from './NewPostForm.module.css';
import {getDownloadURL,ref,uploadBytes} from 'firebase/storage'
import { storage } from '../../sdk/firebase-config';
// import { storage } from '../../sdk/firebase-config';

function NewPostForm(props) {
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const descriptionInputRef = useRef();
  
  // const [currImg,setCurrImg] = useState('https://unctad.org/sites/default/files/2021-08/2021-08-03_commentary_tourism_1200x675.jpg')
  function submitHandler(event) {
    event.preventDefault();

    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    
    const enteredDescription = descriptionInputRef.current.value;
    const storageRef = ref(storage,'fotofactory/'+image.files[0].name)
    uploadBytes(storageRef,image.files[0]).then((snapshot)=>{
      // console.log(snapshot)
      
      getDownloadURL(ref(storageRef)).then(url=>{
        // console.log("WTFFF")
        const meetupData = {
          title: enteredTitle,
          image: url,
          description: enteredDescription,
          comments:[]
        };
        props.onAddPost(meetupData);
      })
    }).catch(err=>{
      console.log(err)
    })
    
    
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='title'>Foto Title*</label>
          <input type='text' required id='title' ref={titleInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='image'>Image*</label>
          <input type='file' accept="image/*" required id='image' ref={imageInputRef} />
        </div>
        
        <div className={classes.control}>
          <label htmlFor='caption'>Caption*</label>
          <textarea
            id='description'
            required
            rows='5'
            ref={descriptionInputRef}
          ></textarea>
        </div>
        <div className={classes.actions}>
          <button>Add Post</button>
        </div>
      </form>

      
    </Card>
  );
}

export default NewPostForm;
