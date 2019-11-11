import React, { useEffect, useState } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';


// import logo from './logo.svg';
import './App.css';

import Album from './Intro/Album.js';
import SignInSide from './SignInSide/SignInSide.js';
import SignUp from './SignUp/SignUp.js'
import Dashboard from './Dashboard/Dashboard.js';
import Pricing from './Pricing/Pricing.js'
import Checkout from './Checkout/Checkout.js'
// import StickyFooter from './sticky-footer/StickyFooter';

function App() {
  let history = useHistory();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [token, setToken] = useState('');
  const [isAuthed, setIsAuthed] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  
  // useEffect(() => {
  //   setIsFirstVisit(true);
  // }, []);
  
  const handleGettingStarted = () => {
    history.push('/signin');
  }

  const handleClickLogin = (userInfo) => {
    var bearerToken = 'Bearer ' + userInfo.token;
    console.log(bearerToken);
    
		fetch('/.netlify/functions/signin?', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': bearerToken,
      },
    })		
    .then((res)=> res.json())
    .then((res)=> {
      console.log(JSON.parse(res).isFirstVisit);
      if (JSON.parse(res).isFirstVisit === true) {
        setIsFirstVisit(JSON.parse(res).isFirstVisit);
        history.push('/profile-setting');
      } else {
        history.push('/dashboard');
      }
    })
    .catch((err)=> console.log(err)) ;
    
    setEmail(userInfo.email);
    setName(userInfo.name);
    setToken(userInfo.token);
    setIsAuthed(true); // NOTE: Is it a wise idea to do so?
  }

  const handleSignUp = () => {
    console.log(token);
    var bearerToken = 'Bearer ' + token;
    
		fetch('/.netlify/functions/signup?', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': bearerToken,
      },
    })		
    .then((res)=> res.json())
                      
      .then((res)=> {
				console.log(res);
			})
      .catch((err)=> console.log(err)) ;

    history.push('/pricing');
  }

  const handlePlanSelection = (plan) => {
    if (plan === 'premium' || plan === 'standard') {
      history.push('/checkout');
    } else {
      history.push('/dashboard');
    }
  }

  const handleCheckout = () => {
    console.log(token);
    var bearerToken = 'Bearer ' + token;
    
    // TODO: This is the place to add payment method
    fetch('/.netlify/functions/checkout?', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': bearerToken,
      },
    })		
      .then((res)=> res.json())
      .then((res)=> {
        console.log(res);
      })
      .catch((err)=> console.log(err)) ;

    
    history.push('/dashboard');
  }

  const handleChangePlan =() => {
    history.push('/pricing');
  }

  const handleSignout = () => {
    setEmail('');
    setName('');
    setIsAuthed(false); // NOTE: Is it a wise idea to do so?
    history.push('/');
  }

  const handleClickMyProblemSets = () => {
    history.push('/dashboard/my-problem-sets')
  }

  return(
    <Switch>
      <Route 
        exact path='/'
        render={(routeprops) => (
          <Album
            handleGettingStarted={handleGettingStarted}
            isAuthed={true} 
          />
        )}
      />

      <Route
        path='/profile-setting'
        render={routeProps => (
          <SignUp
            email={email}
            name={name}
            handleSignUp={handleSignUp}
          />
        )} 
      />

      <Route 
        exact path='/signin'
        render={routeProps => (
          <SignInSide
            history={history}
            handleClickLogin={handleClickLogin}
          />)
        }
      />

      <Route
        path='/dashboard'
        render={routeProps => (
          <Dashboard
            history={history}
            email={email}
            name={name}
            handleSignout={handleSignout}
            handleClickMyProblemSets={handleClickMyProblemSets}
            handleChangePlan={handleChangePlan}
          />
        )} 
      />

      

      <Route
        path='/pricing'
        render={routeProps => (
          <Pricing
            handlePlanSelection={handlePlanSelection}
          />
        )}/>
      <Route
        path='/checkout'
        render={routeProps => (
          <Checkout
            handleCheckout={handleCheckout}
          />
        )}/>
    </Switch>
  );
    
}


export default App;
