import React from "react";
import logo from "./banner.jpg";
import talent from "./talentshow.jpg";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Maps from "./maps";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MapComponent from "./route";
import RoutComponent from "./route";

class Main extends React.Component {
  render() {
    return (
      <div>
        <Container>
          <Row>
            <Col>Info here</Col>
            <Col>
              <RoutComponent lat="0" lng="0" zoom={8} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
export default Main;
