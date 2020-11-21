import React, { useState, useEffect } from "react";
import fire from "./fire";
import firebase from "firebase";
import Login from "./components/Login/Login"
import Home from "./components/Home/Home";

import "./App.css";

const App = () => {
  //Data
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");

  //Errors
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [roomError, setRoomError] = useState("");

  //State
  const [hasAccount, setHasAccount] = useState(false);

  //To clear form data
  const clearFormData = () => {
    setEmail("");
    setPassword("");
    setName("");
    setRoom("");
  };

  //To clear all errors
  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
    setRoomError("");
  };

  //To handle login
  const handleLogin = () => {
    clearErrors();

    // fire
    //   .auth()
    //   .signInWithEmailAndPassword(email, password)
    //   .catch((err) => {
    //     switch (err.code) {
    //       case "auth/invalid-email":
    //       case "auth/user-disabled":
    //       case "auth/user-not-found":
    //         setEmailError(err.message);
    //         break;
    //       case "auth/wrong-password":
    //         setPasswordError(err.message);
    //         break;
    //       default:
    //         break;
    //     }
    //   });

    fire.auth().setPersistence(firebase.auth.Auth.Persistence.NONE)
  .then(() => {
    return fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError(err.message);
            break;
          case "auth/wrong-password":
            setPasswordError(err.message);
            break;
          default:
            break;
        }
      });
  }).catch((err) => {
    setPasswordError(err.message);
  })
  


  };

  //To handle sign ups / registrations
  const handleSignup = () => {
    clearErrors();

    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((user)=>{
        fire.database().ref(`users/` + user.user.uid + `/`).set({
          name: {name},
          room: {room}
        });
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/email-already-in-use":
            setEmailError(err.message);
            break;
          case "auth/weak-password":
            setPasswordError(err.message);
            break;
          default:
            break;
        }
      });
  };

  //To handle log outs
  const handleLogout = () => {
    fire.auth().signOut();
   // window.location.replace(window.location.hostname);
  };

  //To listen to User/Auth change
  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        clearFormData();
        setUser(user);
      } else {
        setUser("");
      }
    });
  };

  useEffect(() => {
    authListener();
  },);
  useEffect(() => {
    const ENDPOINT = "http://localhost:3000/";
    if(window.location.href !== ENDPOINT){
      window.location.replace(ENDPOINT);
    }
  },);

  return (
    <React.Fragment>
      <div className="App">
        {user ? (<Home handleLogout={handleLogout} user={user} />) : (<Login
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          name={name}
          setName={setName}
          room={room}
          setRoom={setRoom}
          handleLogin={handleLogin}
          handleSignup={handleSignup}
          hasAccount={hasAccount}
          setHasAccount={setHasAccount}
          emailError={emailError}
          passwordError={passwordError}
          roomError={roomError}
        />)}
      </div>
    </React.Fragment>
  );
};
export default App;
