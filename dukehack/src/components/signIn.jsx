import React from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import { Redirect } from 'react-router-dom';

class SignIn extends React.Component {
  constructor (props){
  super(props);

  this.state = {
      name: "",
      password: "",
      redirect: false,
      type: ""

    };


  this.handleSubmit = this.handleSubmit.bind(this);
  this.renderRedirect = this.renderRedirect.bind(this);


}
  render() {
    const redirectToReferrer = this.state.redirect;
    const type = this.state.type;
         if (redirectToReferrer === true) {
            return <Redirect to="/middle"/>
         }
         else if(redirectToReferrer === true){
           return <Redirect to="/middle"/>
         }
    return (
      <div>
      <Card style = {{ width: '80%', margin: '0 auto', marginTop: '.8rem', float: 'none', }}>
      <Card.Header><h1>Sign In</h1></Card.Header>
      <Card.Body>
      <Form onSubmit={this.handleSubmit}>
        <Form.Group as={Row} controlId="formHorizontalEmail">
          <Form.Label column sm={2}>

          </Form.Label>
          <Col sm={8}>
          <Form.Label>Your email</Form.Label>
            <Form.Control required type="email" placeholder="Email"  value={this.state.name} onChange={ e => this.setState({ name : e.target.value }) } />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalPassword">
          <Form.Label column sm={2}>

          </Form.Label>

          <Col sm={8}>
          <Form.Label>Your password</Form.Label>
            <Form.Control required type="password" placeholder="Password"  value={this.state.password} onChange={ e => this.setState({ password : e.target.value }) }/>
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formHorizontal">
        <Col sm={{ span: 10, offset: 2 }}>            
          <Button size = "md" type="submit">Log in</Button>
        </Col>
        </Form.Group>
      </Form>
      </Card.Body>
      </Card>
      </div>
    )
  }
  setRedirect = () => {
    console.log(this.state.type);
  this.setState({
    redirect: true
  })
}

  renderRedirect = () => {
  if (this.state.redirect) {
   return <Redirect to='/middle' />
  }
  }
  handleSubmit(event) {
      event.preventDefault();


      const data ={"email": this.state.name, "password": this.state.password}
      fetch('/api/login', {
        method: 'POST',
        headers: {
     'Content-Type':'application/json'
   },
        body: JSON.stringify(data)}
      ).then(res => console.log(res)
      ).then(this.setRedirect);

    }
}
export default SignIn
