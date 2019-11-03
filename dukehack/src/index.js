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
const routing = (
  <Router>
    <div>
    <Navbar bg="primary" variant="dark" id="navbarColor01" expand="lg">
  <Navbar.Brand href="/">Reality Ministries Ride Share</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="/rider">Request a Pickup</Nav.Link>
      <Nav.Link href="/driver">Register as Driver</Nav.Link>
      <Nav.Link href="/signin">View Scheduled Pickups</Nav.Link>
    </Nav>
    <Nav>
        <Nav.Link href="/signin">Sign In</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
      <Route exact path="/" component={Main} />
      <Route path="/rider" component={Rider} />
        <Route path="/loggedin" component={Loggedin} />
      <Route path="/driver" component={Driver} />
      <Route path="/signin" component={SignIn} />
          <Route path="/middle" component={Middle} />
              <Route path="/loggedinrider" component={Loggedinrider} />
    </div>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'));
