import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import { Redirect } from "react-router-dom";
class Driver extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      password: "",
      address: "",
      city: "",
      state: "",
      zip: "",

      redirect: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderRedirect = this.renderRedirect.bind(this);
  }
  render() {
    return (
      <div>
        <h1 className="text-center">Welcome!</h1>
        <h2 className="text-center">
          Please fill out the form below to offer a ride!
        </h2>
        <Card style={{ width: "80rem", margin: "0 auto", float: "none" }}>
          <Card.Body>
            <Form onSubmit={this.handleSubmit}>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={this.state.name}
                    onChange={e => this.setState({ name: e.target.value })}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={this.state.password}
                    onChange={e => this.setState({ password: e.target.value })}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Group controlId="formGridAddress2">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  placeholder="Apartment, studio, or floor"
                  value={this.state.address}
                  onChange={e => this.setState({ address: e.target.value })}
                />
              </Form.Group>

              <Form.Row>
                <Form.Group as={Col} controlId="formGridCity">
                  <Form.Label>City</Form.Label>
                  <Form.Control
                    value={this.state.city}
                    onChange={e => this.setState({ city: e.target.value })}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    as="select"
                    value={this.state.state}
                    onChange={e => this.setState({ state: e.target.value })}
                  >
                    <option>Choose...</option>
                    <option>North Carolina</option>
                    <option>South Carolina</option>
                    <option>Virginia</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridZip">
                  <Form.Label>Zip</Form.Label>
                  <Form.Control
                    value={this.state.zip}
                    onChange={e => this.setState({ zip: e.target.value })}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Group id="formGridCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    );
  }
  setRedirect = () => {
    this.setState({
      redirect: true
    });
  };
  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to="/signin" />;
    }
  };
  handleSubmit(event) {
    event.preventDefault();
    const data = {
      username: this.state.name,
      password: this.state.password,
      address: this.state.address,
      city: this.state.zip,
      state: this.state.state,
      zip: this.state.zip
    };
    console.log(data);
    fetch("/api/drive", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    })
      .then(res => console.log(res))
      .then(this.setRedirect);
  }
}
export default Driver;
