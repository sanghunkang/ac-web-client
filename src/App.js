import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import './App.css';

import Index from './Index/Index.js';
import SignInSide from './SignInSide/SignInSide.js';
import SignUp from './SignUp/SignUp.js'
import Pricing from './Pricing/Pricing.js'
import Checkout from './Checkout/Checkout.js'
import Dashboard from './Dashboard/Dashboard.js';

function App() {
  let history = useHistory();

  const [accessToken, setAccessToken] = useState(localStorage.getItem('accessToken'));
  const [email, setEmail] = useState(null);
  const [username, setUsername] = useState(null);
  const [isAuthed, setIsAuthed] = useState(false);

  useEffect(() => {
    console.log(commonProps);
  }, []);
  
  // Handlers for localStorages and global states
  const handleIssueToken = (token) => {
    localStorage.setItem('accessToken', 'Bearer ' + token);
    console.log('Bearer ' + token);
  }

  const handleCheckIsAuthed = () => {
    console.log(accessToken)
    let options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': accessToken,
      },
    }

		fetch('/.netlify/functions/signin?', options)		
    .then(res => res.json())
    .then(res => {
      let responseBody = JSON.parse(res);
      if (responseBody.user === null) {
        setEmail(null)
        setUsername(null);
        setIsAuthed(false);
      } else {
        setEmail(responseBody.user.email)
        setUsername(responseBody.username);
        setIsAuthed(true);
      }
    })
    .catch(err => console.log(err)) ;
  }


  const handleChangeUsername = (username) => {
    setUsername(username);
    console.log(username);
  }

  const handleSignUp = () => {
    var bearerToken = localStorage.getItem('accessToken');
    console.log(bearerToken);
    
    let bodyData = { username: username }

    let options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': bearerToken,
      },
      // redirect: 'follow', // manual, *follow, error
      // referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(bodyData), // body data type must match "Content-Type" header
    }

		fetch('/.netlify/functions/signup?', options)		
    .then(res => res.json())                  
    .then(res => history.push('/pricing'))
    .catch(err => console.log(err));
  }

  const handleCheckout = () => {
    var bearerToken = localStorage.getItem('accessToken');
    console.log(bearerToken);
    
    let options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': bearerToken,
      },
    }

    // TODO: This is the place to add payment method
    fetch('/.netlify/functions/checkout?', options)		
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log(err)) ;

    
    history.push('/dashboard');
  }

  const handleChangePlan =() => {
    history.push('/pricing');
  }

  const handleSignout = () => {
    setUsername('');
    setEmail('');
    localStorage.removeItem('accessToken');
    history.push('/');
  }

  const handleClickMyProblemSets = () => {
    history.push('/dashboard/my-problem-sets')
  }

  // Props for each (root level) routes
  let commonProps = {
    email: email,
    history: history,
    accessToken: accessToken,
  }

  let indexProps = {
    // handleGettingStarted: handleGettingStarted,
    ...commonProps
  }

  let signinProps = {
    handleIssueToken: handleIssueToken,
    // handleClickSignIn: handleClickSignIn,
    ...commonProps
  }

  let signupProps = {
    handleChangeUsername: handleChangeUsername,
    handleSignUp: handleSignUp,
    ...commonProps
  }

  let dashboardProps = {
    handleSignout: handleSignout,
    handleClickMyProblemSets: handleClickMyProblemSets,
    handleChangePlan: handleChangePlan,
    ...commonProps
  }

  let pricingProps = {
    ...commonProps
  }

  let checkoutProps = {
    handleCheckout: handleCheckout,
    ...commonProps
  }

  return(
    <Switch>
      <Route exact path='/' render={ ()=> <Index {...indexProps}/> }/>
      <Route path='/signin' render={ ()=> <SignInSide {...signinProps}/> }/>
      <Route path='/profile-setting' render={ ()=> <SignUp {...signupProps}/> }/>
      <Route path='/pricing' render={ ()=> <Pricing {...pricingProps}/> }/>
      <Route path='/checkout' render={ ()=> <Checkout {...checkoutProps} /> }/>
      <Route path='/dashboard' render={ ()=> <Dashboard {...dashboardProps}/> }/>
    </Switch>
  );
}

export default App;

function checkIsAuthed(accessToken) {
    console.log(accessToken)
  var isAuthed = false;
  let options = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': accessToken,
    },
  }

  fetch('/.netlify/functions/signin?', options)		
  .then(res => res.json())
  .then(res => {
    let responseBody = JSON.parse(res);
    if (responseBody.user === null) {
      isAuthed = true;
    } else {
      isAuthed = false;
    }
  })
  .catch(err => console.log(err)) ;

  return isAuthed;
}