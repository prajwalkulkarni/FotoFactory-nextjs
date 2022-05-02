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
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  //   databaseURL: '<your-database-url>',
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
  };
  fireapp = initializeApp(firebaseConfig); 
}


// Get a reference to the storage service, which is used to create references in your storage bucket
export const storage = getStorage(fireapp);

