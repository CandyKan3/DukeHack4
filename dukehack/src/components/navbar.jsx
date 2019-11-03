import React from "react";
import { Route, BrowserRouter as Router } from 'react-router-dom'
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Main from './main.jsx';
import Rider from './rider.jsx';
import Driver from './driver.jsx';
import 'bootswatch/dist/flatly/bootstrap.min.css';
import SignIn from './signIn';
import Loggedin from './loggedin.jsx';
import Middle from './middle.jsx';
import Loggedinrider from './loggedinrider.jsx';


export default class TopNavBar extends React.Component {
  constructor (props){
  super(props);

  this.state = {
      loggedin: false
    };

    }

render(){
    return (
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
    );
}

  componentDidMount(){

}


}
