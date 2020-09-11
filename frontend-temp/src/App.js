import React, {useState, useEffect} from 'react';
import fire from "./fire";

import Login from "./components/Login/Login"
import Chat from "./components/Socket/Socket";


import './App.css';

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {

  const [user, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [hasAccount, setHasAccount] = useState(false);

  const clearInputs = () => {
    setEmail('');
    setPassword('');
  }
  const clearErrors = () => {
    setEmailError('');
    setPasswordError('');
  }

  const handleLogin = () =>{
    clearErrors();
    fire
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(err => {
      //IF ERROR CHECK/REMOVE LINE BELOW
      // eslint-disable-next-line default-case
      switch (err.code) {
        case "auth/invalid-email":
        case "auth/user-disable":
        case "auth/user-not-found":
          setEmailError("Invalid mail");
          break;
        case "auth/wrong-password":
          setPasswordError("Invalid password");
          break;      
      }
    });
  }
const handleSignUp = () => {
  console.log("handleSignup clicked");
  clearErrors();
  fire
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch(err => {
    //IF ERROR CHECK/REMOVE LINE BELOW
    // eslint-disable-next-line default-case
      switch (err.code) {
        case "auth/email-alreay-in-use":
        case "auth/invalid-email":
          setEmailError("Invalid mail");
          break;
        case "auth/weak-password":
          setPasswordError("Invalid password");
          break;      
    }
  });
}

const handleLogout = () => {
  fire.auth().signOut();
}

const authListener = () => {
  fire.auth().onAuthStateChanged((user) => {
    if(user){
      clearInputs();
      setUser(user);
    }
    else{
      setUser('');
    }
  })
} 
// const redirectToChat = () => {
//   console.log("In redirect");
//   <Redirect to="/chat"/>}
const redirectToChat = () => {
  console.log("Trying to redirect");
  window.location = "/chat";
}
useEffect(() => {
  authListener();
}, []);

  return (
    <Router>

    <div className="App">
      <Switch>
        <Route path="/">
        {user ? (
        <Chat handleLogout={handleLogout} user={user}/>
      ) : (
        <Login 
          email={email} 
          setEmail={setEmail} 
          password={password} 
          setPassword={setPassword} 
          handleLogin={handleLogin}
          handleSignUp={handleSignUp} 
          hasAccount={hasAccount} 
          setHasAccount={setHasAccount} 
          emailError={emailError} 
          passwordError={passwordError} />
      )}
        </Route>
      </Switch>
    </div>

    </Router>
  );
}

export default App;
