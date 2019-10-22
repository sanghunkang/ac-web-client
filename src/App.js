import React, { useState } from 'react';

// import logo from './logo.svg';
import './App.css';


// import SignIn from './SignIn/SignIn.js';
import SignInSide from './SignInSide/SignInSide.js';
import SignUp from './SignUp/SignUp.js'
import Dashboard from './Dashboard/Dashboard.js';
import Pricing from './Pricing/Pricing.js'
// import Checkout from './Checkout/Checkout.js'

function App() {
  const [view, setView] = useState(
    'signin'
  );



  const handleClickSignIn = () => {
    console.log("will change the view")
    setView('dashboard')
  };//event => setGreeting(event.target.value);

  const handleClickSignUp = () => {
    setView('pricing')
  }

  const handleClickUpgradePlan =() => {
    setView('pricing')
  }

  if (view === 'signin') {
    return (
      <SignInSide
        handleClickSignIn={handleClickSignIn}
        handleClickSignUp={handleClickSignUp}
      >

      </SignInSide>
    )
  } else if (view === 'signup') {
    return (
      <SignUp>
      </SignUp>
    )
  } else if (view === 'pricing') {
    return (
      <Pricing>
      </Pricing>
    )
  }else if (view === 'dashboard') {
    return (
      <Dashboard
        handleClickUpgradePlan={handleClickUpgradePlan}>
      </Dashboard>
    )
  }    
    
}

// ReactDOM.render(<App />, document.querySelector('#app'));


export default App;
