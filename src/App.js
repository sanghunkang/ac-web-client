import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import './App.css';

import Album from './Intro/Album.js';
import SignInSide from './SignInSide/SignInSide.js';
import SignUp from './SignUp/SignUp.js'
import Pricing from './Pricing/Pricing.js'
import Checkout from './Checkout/Checkout.js'
import Dashboard from './Dashboard/Dashboard.js';

function App() {
  let history = useHistory();

  const [email, setEmail] = useState();
  const [username, setUsername] = useState('');
  
  // useEffect(() => {
  //   setIsFirstVisit(true);
  // }, []);
  
  // Handlers for root-level routes, localStorages and global states
  const handleGettingStarted = () => {
    console.log('GettingStarted');
    history.push('/signin');
  }

  const handleClickSignIn = (userInfo) => {
    var bearerToken = localStorage.getItem('authToken');
    if (bearerToken === null) {
      bearerToken = 'Bearer ' + userInfo.token;
      localStorage.setItem('authToken', bearerToken);
    }
    console.log(bearerToken);
    
    let options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': bearerToken,
      },
    }

		fetch('/.netlify/functions/signin?', options)		
    .then(res => res.json())
    .then(res => {
      let responseBody = JSON.parse(res);
      if (responseBody.user === null) {
        history.push('/profile-setting');
      } else {
        history.push('/dashboard');
      }
    })
    .catch(err => console.log(err)) ;
    
    setEmail(userInfo.email);
  }

  const handleChangeUsername = (username) => {
    setUsername(username);
    console.log(username);
  }

  const handleSignUp = () => {
    var bearerToken = localStorage.getItem('authToken');
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

  const handlePlanSelection = (plan) => {
    if (plan === 'premium' || plan === 'standard') {
      history.push('/checkout');
    } else {
      history.push('/dashboard');
    }
  }

  const handleCheckout = () => {
    var bearerToken = localStorage.getItem('authToken');
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
    localStorage.removeItem('authToken');
    history.push('/');
  }

  const handleClickMyProblemSets = () => {
    history.push('/dashboard/my-problem-sets')
  }

  // Props for each (root level) routes
  let commonProps = {
    email: email,
    history: history
  }

  let indexProps = {
    handleGettingStarted: handleGettingStarted,
    ...commonProps
  }

  let signinProps = {
    handleClickSignIn: handleClickSignIn,
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
    handlePlanSelection: handlePlanSelection,
    ...commonProps
  }

  let checkoutProps = {
    handleCheckout: handleCheckout,
    ...commonProps
  }

  return(
    <Switch>
      <Route exact path='/' render={ ()=> <Album {...indexProps}/> }/>
      <Route path='/signin' render={ ()=> <SignInSide {...signinProps}/> }/>
      <Route path='/profile-setting' render={ ()=> <SignUp {...signupProps}/> }/>
      <Route path='/pricing' render={ ()=> <Pricing {...pricingProps}/> }/>
      <Route path='/checkout' render={ ()=> <Checkout {...checkoutProps} /> }/>
      <Route path='/dashboard' render={ ()=> <Dashboard {...dashboardProps}/> }/>
    </Switch>
  );
}

export default App;
