// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyClo2IG4joOJ1wqQRYS88cxTbQbELVlSCc",
  authDomain: "courses-9b65a.firebaseapp.com",
  projectId: "courses-9b65a",
  storageBucket: "courses-9b65a.appspot.com",
  messagingSenderId: "904472063876",
  appId: "1:904472063876:web:c6146a4603dab9313237d1"
};

// Initialize Firebase
const appFire = initializeApp(firebaseConfig);
export default appFire;