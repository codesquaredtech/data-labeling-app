import React, { Fragment, useState } from 'react';
import logo from './logo.svg.jpg';
import './App.css';
import {BrowserRouter as Router, Route, Routes, useNavigate, useNavigationType} from "react-router-dom";
import { NavBar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { AdminPage } from './pages/AdminPage';
import { ProjectDetail } from './pages/ProjectDetail';
import { AddProject } from './pages/AddProject';
import { AddMetadata } from './pages/AddMetadata';
import LabelingData from './pages/LabelingData';
import UserHome from './pages/UserHome';
import { AddResourcePage } from './pages/AddResourcePage';

import {getApps, initializeApp} from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, initializeAuth, signOut, signInWithEmailAndPassword } from "firebase/auth";
import { Button, Container, Form } from 'react-bootstrap';

export function initializeFirebase(){
  const firebaseConfig = {
    apiKey: "AIzaSyC7zup9va49-8T0Ly1Cx8JQ5Qp-HJTGrU0",
    authDomain: "data-labeling-app.firebaseapp.com",
    projectId: "data-labeling-app",
    storageBucket: "data-labeling-app.appspot.com",
    messagingSenderId: "1017290257089",
    appId: "1:1017290257089:web:0e23325d8cd36ac6ea5a40",
    measurementId: "G-NB7KF0S95B"
  };
  
  // Initialize Firebase
  if (!getApps().length) {
    initializeApp(firebaseConfig);
  }
}
initializeFirebase();

let auth = getAuth();

let provider = new GoogleAuthProvider();

function App() {

  const [token, setToken] = useState(localStorage.getItem("jwt-token"));

  const logInWithEmailAndPassword = async (email:string, password:string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
    }
  };

  const signIn = async () => {
    signInWithPopup(auth, provider)
      .then( async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);

        //Oauth token, koristi se za Google API i pozive ka njemu
        const token = credential == null? null : credential.accessToken;
        
        // The signed-in user info.
        const user = result.user;

        if(user){
          //ID token (vreme od 1h, posle toga se sam refreshuje)
          let tokenJWT = await user.getIdToken()
          localStorage.setItem("jwt-token", tokenJWT);
          setToken(tokenJWT);
        }

        
        // ...
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
      });

  }

  const signInEmailPassword = async() => {

  }

  const signOutClearLocalStorage = () => {
    
    const auth = getAuth();
    signOut(auth).then(() => {
      localStorage.removeItem("jwt-token");
      setToken(null);
    }).catch((error) => {
      // An error happened.
    });
  }


  let jwtToken = localStorage.getItem("jwt-token");

  if(jwtToken){
    return (
      <Router>
        <Fragment>
          <NavBar signOut={signOutClearLocalStorage}/>

          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/project/metadata/:id' element={<AddMetadata/>}></Route>
            <Route path='/admin' element={<AdminPage/>}></Route>
            <Route path='/user' element={<UserHome/>}></Route>
            <Route path='/add-project' element={<AddProject/>}></Route>
            <Route path='/project/:id' element={<ProjectDetail/>}></Route>
            <Route path=':id/labeling-data' element={<LabelingData/>}></Route>
            <Route path='/project/resource/:id' element={<AddResourcePage/>}></Route>
  
          </Routes>
        </Fragment>
      </Router>
  
    );
  }
  else{
    return (
      <div>
        <Container  style={{textAlign:"center", backgroundColor:"white", marginTop:"150px"}}>
          <h1>Добро дошли на Лабелографа!</h1>
          <h5>Лабелирајте податке</h5>
          <hr/>
          <Form>
          <Button onClick={signIn}>Google Sign-in</Button>

        </Form>

        </Container>


      </div>

    );
  }
  
}

export default App;
