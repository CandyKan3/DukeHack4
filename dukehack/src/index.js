import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import Main from './components/main.jsx';
import Rider from './components/rider.jsx';
import Driver from './components/driver.jsx';
import Info from './components/info.jsx';
import 'bootswatch/dist/flatly/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import SignIn from './components/signIn';
import Loggedin from './components/loggedin.jsx';
import Middle from './components/middle.jsx';
import Loggedinrider from './components/loggedinrider.jsx';
import TopNavBar from './components/navbar.jsx'

const routing = (
  <Router>
    <TopNavBar></TopNavBar>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'));
