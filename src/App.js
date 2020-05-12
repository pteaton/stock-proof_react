// Stock Intraday API Key = EIRKD54AJXO1NRSD
import React, { Component } from 'react';
import LoginRegisterForm from './LoginRegisterForm'
import 'semantic-ui-react';
import './App.css';


export default class App extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      message: '',
      mode: 'Log In / Register',
      currentUser: '',
      adding: false
    }
  }

  register = async (registerInfo) => {
    try {
      const url = process.env.REACT_APP_API_URL + '/users/register'

        const registerResponse = await fetch(url, {
          credentials: 'include',
          method: 'POST',
          body: JSON.stringify(registerInfo),
          headers: {
            'Content-Type': 'application/json'
          } 
        })

     

      const registerJson = await registerResponse.json()

      

      if(registerJson.status === 401) {

        this.setState({
          message: registerJson.message
        })

      } else {

        this.setState({
          loggedIn: true,
          mode: 'Home',
          currentUser: registerJson.data
        })

      }

    } catch (error) {
      console.error(error)
    }
  }

  login = async (loginInfo) => {
    try {
      const url = process.env.REACT_APP_API_URL + '/users/login'

      const loginResponse = await fetch(url, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(loginInfo),
        headers: {
          'Content-Type': 'application/json'
        } 
      })

      const loginJson = await loginResponse.json()

      if(loginJson.status === 201) {

        this.setState({
          loggedIn: true,
          mode: 'Home',
          currentUser: loginJson.data
        })

      } else {
        
        this.setState({
          message: loginJson.message
        })
      }
      
    } catch (error) {
      console.error(error)
    }
  }

  logout = async () => {
    
    try {
      
      const url = process.env.REACT_APP_API_URL + '/users/logout'

      const logoutResponse = await fetch(url, {
        include: 'credentials'
      })

      const logoutJson = await logoutResponse.json()
      
      if(logoutJson.status === 200) {
        this.setState({
          loggedIn: false,
          currentUser: ''
        })
      }

    } catch (error) {

      console.error(error)

    }
  }


  render() {
    return (
      <div className="App">
            <LoginRegisterForm 
              message={this.state.message} 
              login={this.login} 
              register={this.register}
            />
      </div>
    );
  }
}

