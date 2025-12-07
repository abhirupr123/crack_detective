import { createContext, useContext, useState } from "react";
import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, 
  getAuth, signOut, signInWithEmailAndPassword, onAuthStateChanged} from 'firebase/auth'
const firebaseConfig = {
  apiKey: "MY API KEY",
  authDomain: "crack-detection-c6bae.firebaseapp.com",
  projectId: "MY PROJECT ID",
  storageBucket: "crack-detection-c6bae.appspot.com",
  messagingSenderId: "SENDER ID",
  appId: "MY APP ID"
};
const FirebaseContext=createContext(null);
const app = initializeApp(firebaseConfig);
export const useFirebase =()=> useContext(FirebaseContext);
const auth=getAuth(app);
export const FirebaseProvider=(props)=>{
  const signup=(email,password)=>createUserWithEmailAndPassword(auth,email,password);
  const signin=(email, password)=> signInWithEmailAndPassword(auth, email, password);
  const signout=()=>signOut(auth);
  const[user,setUser]=useState(null);
  onAuthStateChanged(auth,(user)=>{
    if(user) setUser(user);
    else setUser(null);
  });
  const logged=user?true:false;
  return(
    <FirebaseContext.Provider value={{signup,signin,signout,user,logged}}>
        {props.children}
    </FirebaseContext.Provider>
  )     
}
