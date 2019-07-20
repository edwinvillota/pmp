import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import jwt_decode from 'jwt-decode'
import setAuthToken from './setAuthToken'
import { setCurrentUser, logoutUser } from './actions/authentication'

import Navbar from './components/navbar'
import Register from './components/register'
import Login from './components/login'
import Home from './components/home'
import BoxState from './components/boxstate'
import UpdateCSV from './components/updateCSVDB'
import Projects from './components/projectsPage'
import NewProject from './components/newProject'
import TestPage from './components/testPage'

if ( localStorage.jwtToken ) {
  setAuthToken(localStorage.jwtToken)
  const decoded = jwt_decode(localStorage.jwtToken)
  store.dispatch(setCurrentUser(decoded))

  const currentTime = Date.now() / 1000
  if(decoded.exp < currentTime) {
    store.dispatch(logoutUser())
    window.location.href = '/login'
  }
}

class App extends Component {
  render() {
    return (
      <Provider store = { store }>
        <Router>
          <div>
            <Navbar>
              <Route exact path='/' component={ Home } />
              <div>
                <Route exact path='/register' component={ Register } />
                <Route exact path='/login' component={ Login } />
                <Route exact path='/tools/boxState' component={ BoxState } />
                <Route exact path='/tools/updateCSV' component={ UpdateCSV } />
                <Route exact path='/projects' component={ Projects } />
                <Route exact path='/projects/new' component={ NewProject } />
                <Route exact path='/tools/testPage' component={ TestPage } />
              </div>
            </Navbar>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
