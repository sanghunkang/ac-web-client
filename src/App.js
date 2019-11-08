import React, { useEffect, useState } from 'react';
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
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isAuthed, setIsAuthed] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  
  useEffect(() => {
    setIsFirstVisit(true);
		// let baseRoute = '/getSetNames?'; // TODO: URL will be changed
		// let queryString = '';//`set_name=${encodeURIComponent(collectionName)}&num_problems=${encodeURIComponent(10)}`;
		// let routeQuery = baseRoute + queryString;
		// console.log(routeQuery);
		// // fetch('/getContents?set_name=commercial_law&num_contents=10')
		// fetch(routeQuery)		
    //   .then((res)=> res.json())
    //   .then((res)=> {
		// 		console.log(res);
		// 		setProblemSets(processGetSetNamesResponse(res));
		// 		console.log(problems);
		// 	})
    //   .catch((err)=> console.log(err)) ;
	}, []);

  const handleClickSignIn = () => {
    if (isAuthed === true) {
      history.push('/dashboard');
    } else {
      console.log('will change the ')
      history.push('/signin');
    }
  };//event => setGreeting(event.target.value);

  const handleClickLogin = (userInfo) => {
    setEmail(userInfo.email);
    setName(userInfo.name);
    
    if (isFirstVisit === true) {
      history.push('/profile-setting');
    } else {
      setIsAuthed(true); // NOTE: Is it a wise idea to do so?
      history.push('/dashboard');
    }
  }

  const handleClickSignUp = () => {
    history.push('/signin');
  }

  const handleClickUpgradePlan =() => {
    console.log('will change the aaa')
    history.push('/pricing');
    // setView('pricing')
  }
  
  const handleSignout = () => {
    setEmail('');
    setName('');
    setIsAuthed(false); // NOTE: Is it a wise idea to do so?
    history.push('/');
  }

  const handleClickDownloadApp = () => {
    alert('준비중입니다.')
  }

  const handleClickMyProblemSets = () => {
    history.push('/dashboard/my-problem-sets')
  }

  const handleSignUp = () => {
    if (isFirstVisit === true) {
      history.push('/pricing');
    } else {
      history.push('/dashboard');
    }
  }

  const handlePlanSelection = (plan) => {
    if (plan === 'premium' || plan === 'standard') {
      history.push('/checkout');
    } else {
      history.push('/dashboard');
    }
  }

  const handleStartUsing = () => {
    history.push('/dashboard');
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
        path='/profile-setting'
        render={routeProps => (
          <SignUp
            email={email}
            name={name}
            handleClickSignIn={handleClickSignIn}
            handleSignUp={handleSignUp}
            handleClickUpgradePlan={handleClickUpgradePlan}
          />
        )} 
      />

      <Route 
        exact path='/signin'
        render={routeProps => (
          <SignInSide
            history={history}
            handleClickLogin={handleClickLogin}
            handleClickSignIn={handleClickSignIn}
            handleClickSignUp={handleClickUpgradePlan}
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
            handleClickUpgradePlan={handleClickUpgradePlan}
          />
        )} 
      />

      
      <Route
        path='/checkout'
        render={routeProps => (
          <Checkout
            handleStartUsing={handleStartUsing}
          />
        )} 
      />

      <Route
        path='/pricing'
        render={routeProps => (
          <Pricing
            handlePlanSelection={handlePlanSelection}
          />
        )} 
      />
    </Switch>
  );
    
}


export default App;
