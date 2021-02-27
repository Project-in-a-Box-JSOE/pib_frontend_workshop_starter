import {Component} from 'react';
import logo from './logo.svg';
import './Home.css';

class Home extends Component {

  buttonClick = (loginPress) => {
    if (loginPress){
      // navigate to Login
       window.location = "/login";
    } else{
      // navigate to SignUp
      window.location = "/signup";

    }
  }

  render(){
    return (
      <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>PiB Front End Workshop</h1>
        <button onClick={() => this.buttonClick(true)} >Login</button>
        <button onClick={() => this.buttonClick(false)}>Sign Up</button> 
      </div>
    );
  }
}

export {Home};