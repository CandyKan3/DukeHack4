import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import Main from './components/main.jsx';
import Rider from './components/rider.jsx';
import Driver from './components/driver.jsx';
import Info from './components/info.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import SignUp from './components/signUp.jsx'
import Nav from 'react-bootstrap/Nav';
import SignIn from './components/signIn';

const routing = (
  <Router>
    <div>
    <Navbar bg="light" expand="lg">
  <Navbar.Brand href="/">Reality Ministries Ride Share</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="/info">Information</Nav.Link>
      <Nav.Link href="/rider">Request a Pickup</Nav.Link>
      <Nav.Link href="/driver">Register as Driver</Nav.Link>
      <Nav.Link href="/">View Scheduled Pickups</Nav.Link>
    </Nav>
    <Nav>
        <Nav.Link href="/signup">Sign Up</Nav.Link>
        <Nav.Link href="/signin">Sign In</Nav.Link>
    </Nav>
  </Navbar.Collapse>
</Navbar>
      <Route exact path="/" component={Main} />
        <Route path="/info" component={Info} />
      <Route path="/rider" component={Rider} />
      <Route path="/driver" component={Driver} />
      <Route path="/signup" component={SignUp} />
      <Route path="/signin" component={SignIn} />
    </div>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'));
