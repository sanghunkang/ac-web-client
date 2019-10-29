import React, {  } from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';


// import logo from './logo.svg';
import './App.css';

import Album from './Album/Album.js';
import SignInSide from './SignInSide/SignInSide.js';
import SignUp from './SignUp/SignUp.js'
import Dashboard from './Dashboard/Dashboard.js';
import Pricing from './Pricing/Pricing.js'
import Checkout from './Checkout/Checkout.js'
// import StickyFooter from './sticky-footer/StickyFooter';

function App() {
  let history = useHistory();

  const handleClickSignIn = () => {
    var isAuthed = false;
    if (isAuthed === true) {
      history.push("/dashboard");
    } else {
      console.log("will change the ")
      history.push("/signin");
    }

  };//event => setGreeting(event.target.value);

  const handleClickSignUp = () => {
    
    
    history.push("/signup");
  }

  const handleClickUpgradePlan =() => {
    console.log("will change the aaa")
    history.push("/pricing");
    // setView('pricing')
  }

  const handleClickDownloadApp = () => {
    alert("준비중입니다.")
  }

  const handleClickMyProblemSets = () => {
    history.push('/dashboard/my-problem-sets')
  }

  const handleSubmit = () => {
    history.push("/dashboard");
  }

  return(
    <Switch>
      <Route 
        exact path='/'
        render={(routeprops) => (
          <Album
            handleClickSignUp={handleClickSignUp}
            handleClickDownloadApp={handleClickDownloadApp}
            isAuthed={true} 
          />
        )}
      />

      <Route
        path='/signup'
        render={routeProps => (
          <SignUp
            handleClickSignIn={handleClickSignIn}
            handleSubmit={handleSubmit}
            handleClickUpgradePlan={handleClickUpgradePlan}
          />
        )} 
      />

      <Route 
        exact path='/signin'
        render={routeProps => (
          <SignInSide
            handleClickSignIn={handleClickSignIn}
            handleClickSignUp={handleClickUpgradePlan}
          />)
        }
      />

      <Route
        path='/dashboard'
        render={routeProps => (
          <Dashboard
            handleClickMyProblemSets={handleClickMyProblemSets}
            handleClickUpgradePlan={handleClickUpgradePlan}
          />
        )} 
      />

      
      <Route
        path='/checkout'
        render={routeProps => (
          <Checkout
            handleClickUpgradePlan={handleClickUpgradePlan}
          />
        )} 
      />

      <Route
        path='/pricing'
        render={routeProps => (
          <Pricing
            handleClickSignUp={handleClickSignUp}
            handleClickUpgradePlan={handleClickUpgradePlan}
          />
        )} 
      />
    </Switch>
  );
    
}


export default App;
