// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDBmISxT1D-n6iwdtNLXdLULdRm5RnSkMI",
  authDomain: "courses-2eea2.firebaseapp.com",
  projectId: "courses-2eea2",
  storageBucket: "courses-2eea2.appspot.com",
  messagingSenderId: "232586877370",
  appId: "1:232586877370:web:29ee280a15a1462c3c6583"
};

// Initialize Firebase
const appFire = initializeApp(firebaseConfig);
export default appFire;