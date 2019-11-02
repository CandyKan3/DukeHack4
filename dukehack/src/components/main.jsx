import React from "react";
import logo from "./banner.jpg";
import real from "./real.jpg";
import talent from "./talentshow.jpg";
import Jumbotron from "react-bootstrap/jumbotron";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Image from "react-bootstrap/Image";
import CardDeck from "react-bootstrap/CardDeck";
import Maps from "./maps";

class Main extends React.Component {
  render() {
    return (
      <div>
        <img className="img-responsive" src={logo} alt="logo" />
        <Jumbotron>
          <h1>Welcome to Reality Ministries RideShare</h1>
          <p>
            This webage was created to allow volunteers the ability to
            rideshare! For more information on what we do, click below
          </p>
          <p>
            <Button
              variant="primary"
              href="http://www.realityministriesinc.org"
            >
              Learn more
            </Button>
          </p>
        </Jumbotron>
        <CardDeck>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" />
            <Card.Body>
              <Card.Title>Event Map</Card.Title>
              <Card.Text>
                <Maps />
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={talent} />
            <Card.Body>
              <Card.Title>Talent Show</Card.Title>
              <Card.Text>
                SPECIAL EVENTS happen throughout the year at Reality Ministries.
                Highlights include the Talent Show and the Kings & Queens Winter
                Ball. See our current calendar for specific events, dates, and
                times.
              </Card.Text>
              <Button variant="primary">Learn More</Button>
            </Card.Body>
          </Card>
        </CardDeck>
      </div>
    );
  }
}
export default Main;
