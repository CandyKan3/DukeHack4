import React from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
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
      redirect: false
    };


  this.handleSubmit = this.handleSubmit.bind(this);
  this.renderRedirect = this.renderRedirect.bind(this);

}
  render() {
    const redirectToReferrer = this.state.redirect;
         if (redirectToReferrer === true) {
             return <Redirect to="/" />
         }
    return (
      <div>
      <Card style = {{ width: '80rem', margin: '0 auto',marginTop: '.8rem', float: 'none', }}>
  
      <Card.Body>
      <Form onSubmit={this.handleSubmit}>
        <h1>Sign in</h1>
        <Form.Group as={Row} controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            Email
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="email" placeholder="Email"  value={this.state.name} onChange={ e => this.setState({ name : e.target.value }) } />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalPassword">
          <Form.Label column sm={2}>
            Password
          </Form.Label>
          <Col sm={10}>
            <Form.Control type="password" placeholder="Password" minLength="6" value={this.state.password} onChange={ e => this.setState({ password : e.target.value }) }/>
          </Col>
              </Form.Group>
        <Form.Group as={Row}>
          <Col sm={{ span: 10, offset: 2 }}>
            <Button type="submit">Sign in</Button>
          </Col>
        </Form.Group>
      </Form>
      </Card.Body>
      </Card>
      </div>
    )
  }
  setRedirect = () => {
  this.setState({
    redirect: true
  })
  }
  renderRedirect = () => {
  if (this.state.redirect) {
   return <Redirect to='/' />
  }
  }
  handleSubmit(event) {
      event.preventDefault();
      

      const data ={"email": this.state.name, "password": this.state.password}
      fetch('/api/signin', {
        method: 'POST',
        headers: {
     'Content-Type':'application/json'
   },
        body: JSON.stringify(data)}
      ).then(res => console.log(res)).then(this.setRedirect);

    }
}
export default SignIn
