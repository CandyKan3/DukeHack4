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

export default class Loggedin extends React.Component {
  constructor (props){
  super(props);

  this.state = {
      data: [],
      dates: "",
      notes: "",
    };
  this.getData = this.getData.bind(this);
}

render(){
 const {data} = this.state;
  return(
      <div>
        <Container>
          <Row>
            <Col>{data}</Col>
            <Col>
              <RoutComponent lat="0" lng="0" zoom={8} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
  getData(){
  fetch('/api/getuser')
  .then(res => res.json())
  }
  componentDidMount(){
    var that = this;
    var url = 'http://localhost:3000/api/data'

    fetch('/api/getuser')
    .then(function(response) {
      if (response.status >= 400) {
        throw new Error("Bad response from server");
      }
      return response.json();
    })
    .then(function(data) {
      that.setState({data: data.test[0].address});
    });
  }


}
