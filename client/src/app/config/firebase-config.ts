// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCn-xMwpFwrTPxei6ogcMybsCkMIgUxx7E",
  authDomain: "nft-uploader-43773.firebaseapp.com",
  projectId: "nft-uploader-43773",
  storageBucket: "nft-uploader-43773.appspot.com",
  messagingSenderId: "257462825284",
  appId: "1:257462825284:web:8a5268298b8bed686e2711",
  measurementId: "G-97Q2DC56FS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export {
app,
auth
}