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
import Cookies from 'js-cookie';


export default class TopNavBar extends React.Component {
  constructor (props){
  super(props);

  this.state = {
      loggedIn: false
    };

    this.logOut = this.logOut.bind(this);
    this.checkLogIn = this.checkLogIn.bind(this);
    }

render(){

    if (this.state.loggedIn) {
        return (
            <div>
            <Navbar bg="primary" variant="dark" id="navbarColor01" expand="lg">
        <Navbar.Brand href="/">Reality Ministries Ride Share</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link href="/signin">View Scheduled Pickups</Nav.Link>
            </Nav>
            <Nav>
                <Nav.Link href="/" onClick={this.logOut}>Sign Out</Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
            <Route exact path="/" onChange={this.checkLogIn} component={Main} />
            <Route path="/rider" component={Rider} />
                <Route path="/loggedin" component={Loggedin} />
            <Route path="/driver" component={Driver} />
            <Route path="/signin" component={SignIn} />
                <Route path="/middle" component={Middle} />
                    <Route path="/loggedinrider" component={Loggedinrider} />
            </div>    
        );
    } else {
        return (
            <div>
            <Navbar bg="primary" variant="dark" id="navbarColor01" expand="lg">
        <Navbar.Brand href="/">Reality Ministries Ride Share</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
            <Nav.Link href="/rider">Request a Pickup</Nav.Link>
            <Nav.Link href="/driver">Register as Driver</Nav.Link>
            </Nav>
            <Nav>
                <Nav.Link href="/signin">Sign In</Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
            <Route exact path="/" onChange={this.checkLogIn} component={Main} />
            <Route path="/rider" component={Rider} />
            <Route path="/loggedin" onChange={this.checkLogIn} component={Loggedin} />
            <Route path="/driver" component={Driver} />
            <Route path="/signin" onChange={this.checkLogIn} component={SignIn} />
            <Route path="/middle" component={Middle} />
            <Route path="/loggedinrider" component={Loggedinrider} />
            </div>    
        );
    }
}

    logOut() {
        Cookies.remove('Cookie');
    }

    checkLogIn(previousRoute, nextRoute) {
        Cookies.get('Cookie') == null ? this.setState({loggedIn: false}) : this.setState({loggedIn: true});
    }

  componentDidMount(){
    Cookies.get('Cookie') == null ? this.setState({loggedIn: false}) : this.setState({loggedIn: true});
  }


}
