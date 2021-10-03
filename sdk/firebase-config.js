import { initializeApp,getApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// Set the configuration for your app
// TODO: Replace with your app's config object
let fireapp

try{
  fireapp = getApp()
}
catch(error){
  const firebaseConfig = {
    apiKey: 'AIzaSyDcb3mc4y-nu5eBB96_lt5s-z7iQxlODgs',
    authDomain: 'todo-a1752.firebaseapp.com',
  //   databaseURL: '<your-database-url>',
    storageBucket: 'todo-a1752.appspot.com'
  };
  fireapp = initializeApp(firebaseConfig); 
}


// Get a reference to the storage service, which is used to create references in your storage bucket
export const storage = getStorage(fireapp);

