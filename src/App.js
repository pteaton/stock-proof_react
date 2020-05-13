// Stock Intraday API Key = EIRKD54AJXO1NRSD
import React, { Component } from 'react';
import LoginRegisterForm from './LoginRegisterForm'
import StockContainer from './StockContainer'
import UserContainer from './UserContainer'
import Header from './Header'
import Footer from './Footer'
import Home from './Home'
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

    switchMode = (event) => {
    this.setState({
      mode: event.target.innerText
    })
  }

  goHome = () => {
    this.setState({
      mode: "Home"
    })
  }

  addStock = async (stockToAdd) => {
    
    try {
      const url = process.env.REACT_APP_API_URL + '/stocks/add'
      const addStockResponse = await fetch(url, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(stockToAdd),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const addStockJson = await addStockResponse.json()
      console.log(addStockJson)
    
    } catch (error) {
      console.error(error)
    }
  }

  addScreen = async (screenToAdd) => {

    try {
      const url = process.env.REACT_APP_API_URL + '/screens/add'
      const addScreenResponse = await fetch(url, {
        credentials: 'include',
        method: 'POST',
        body: JSON.stringify(screenToAdd),
        headers: {
          'Content-Type': 'application/json'
        }
      })

      const addScreenJson = await addScreenResponse.json()
      console.log(addScreenJson)

    } catch(error) {
      console.error(error)
    }
  }

  render() {
    
    return (
      <div className="App">
        <Header 
          logout={this.logout} 
          loggedIn={this.state.loggedIn}
          switchMode={this.switchMode}
          toggleAdd={this.toggleAdd}
          addStock={this.addStock}
          addScreen={this.addScreen}
          mode={this.state.mode}
          goHome={this.goHome}
          currentUser={this.state.currentUser}
        />
        
        <div className='main'>
          {
            this.state.mode === "Home"
            &&
            <Home />
          }
          {
            this.state.mode === "User"
            &&
            <UserContainer 
              currentUser={this.state.currentUser}
              logout={this.logout}
            />
          }
          {
            this.state.mode === "Stocks"
            &&
            <StockContainer 
              currentUser={this.state.currentUser}
            />
          }
          {
            this.state.mode === "Log In / Register"
            &&
            <LoginRegisterForm 
              message={this.state.message} 
              login={this.login} 
              register={this.register}
            />
          }
        </div>
        <Footer />
      </div>
    );
  }
}

