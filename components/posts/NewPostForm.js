import { useRef, useState } from 'react';
import Card from '../ui/Card';
import classes from './NewPostForm.module.css';
import {getDownloadURL,ref,uploadBytes} from 'firebase/storage'
import { storage } from '../../sdk/firebase-config';
// import { storage } from '../../sdk/firebase-config';
import useValidation from '../../hooks/form-validation';
function NewPostForm(props) {
  
  const imageInputRef = useRef();
  
  const {input:inputTitleValue,inputIsValid:titleIsValid,inputIsInValid:titleIsInvalid,callbackHandler:setTitle,toggleActiveHandler:toggleTitleActiveHandler} = useValidation((arg)=>arg.trim().length>1)
  const {input:inputCaptionValue,inputIsValid:captionIsValid,inputIsInValid:captionIsInvalid,callbackHandler:setCaption,toggleActiveHandler:toggleCaptionActiveHandler} = useValidation((arg)=>arg.trim().length>15)
  
  
  let formIsValid = false
  const imgIsValid = false

  if(titleIsValid&&captionIsValid){
    formIsValid=true
  }
  function submitHandler(event) {
    event.preventDefault();

    if(!formIsValid){
      return;
    }
    const storageRef = ref(storage,'fotofactory/'+image.files[0].name)
    uploadBytes(storageRef,image.files[0]).then((snapshot)=>{
      // console.log(snapshot)
      
      getDownloadURL(ref(storageRef)).then(url=>{
        // console.log("WTFFF")
        const meetupData = {
          title: inputTitleValue,
          image: url,
          description: inputCaptionValue,
          comments:[]
        };
        props.onAddPost(meetupData);
      })
    }).catch(err=>{
      console.log(err)
    })
    
    
  }

  let fieldClassName = classes.control
  if(titleIsInvalid){
    fieldClassName = `${classes.control} ${classes.error}`
  }

  let captionFieldClassName = classes.control
  if(captionIsInvalid){
    captionFieldClassName = `${classes.control} ${classes.error}`
  }

  return (
    <Card>
      <form className={classes.form} onSubmit={submitHandler}>
        <div className={fieldClassName}>
          <label htmlFor='title'>Foto Title*</label>
          <input type='text' required id='title' 
          onBlur={toggleTitleActiveHandler} 
          onChange={(e)=>{setTitle(e.target.value)}} 
          value={inputTitleValue}/>
          {titleIsInvalid&&<p className={classes.errorMessage}>Invalid title.</p>}
        </div>
        <div className={classes.control}>
          <label htmlFor='image'>Image*</label>
          <input type='file' accept="image/*" required id='image' ref={imageInputRef} />
        </div>
        
        <div className={captionFieldClassName}>
          <label htmlFor='caption'>Caption*</label>
          <textarea
            id='description'
            value={inputCaptionValue}
            onChange={(e)=>{setCaption(e.target.value)}}
            onBlur={toggleCaptionActiveHandler}
            required
            rows='5'
          ></textarea>
          {captionIsInvalid&&<p className={classes.errorMessage}>Caption should have a minimum length of 15 characters.</p>}
        </div>
        <div className={classes.actions}>
          <button disabled={!formIsValid}>Add Post</button>
        </div>
      </form>

      
    </Card>
  );
}

export default NewPostForm;
