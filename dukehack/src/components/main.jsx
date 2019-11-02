import React from 'react'
import logo from './banner.jpg';
import real from './real.jpg';
import Jumbotron from 'react-bootstrap/jumbotron';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Image from 'react-bootstrap/Image';
class Main extends React.Component {
  render() {
    return (
      <div>
      <img className="img-responsive" src={logo} alt="logo"/>
      <Jumbotron>
        <h1>Welcome to Reality Ministries RideShare</h1>
        <p>
         This webage was created to allow volunteers the ability to rideshare! For more information on what we do, click below
        </p>
        <p>
          <Button variant="primary">Learn more</Button>
        </p>
      </Jumbotron>
  <Card style={{ width: '18rem' }}>
  <Card.Img variant="top" src={real} />
  <Card.Body>
    <Card.Title>Upcoming Events</Card.Title>
    <Card.Text>
      Some quick example text to build on the card title and make up the bulk of
      the card's content.
    </Card.Text>
    <Button variant="primary">Go somewhere</Button>
  </Card.Body>
</Card>
      </div>
    )
  }
}
export default Main
