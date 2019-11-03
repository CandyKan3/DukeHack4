import React from "react";
import talent from "./talentshow.jpg";
import Jumbotron from "react-bootstrap/Jumbotron";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table"
import Card from "react-bootstrap/Card";
import CardDeck from "react-bootstrap/CardDeck";
import Maps from "./maps";

class Main extends React.Component {
  render() {
    return (
      <div>
        <Jumbotron>
          <h1>Welcome to Reality Ministries Ride Share</h1>
          <p>
            This site allows volunteers to find members who need rides! Click below to view our website and learn about our mission.
          </p>
          <p>
            <Button
              variant="primary"
              href="http://www.realityministriesinc.org"
              size = "lg"
            >
              Learn more about Reality Ministries
            </Button>
          </p>
        </Jumbotron>

        <div style={{ padding: " 0 32px" }}>
          <h2>Upcoming Events</h2>
          <Table responsive>
            <thead>
              <tr>
                <th>Date</th>
                <th>Name</th>
                <th>Time</th>
                <th>Location</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Every M through F</td>
                <td>Daytime Gatherings</td>
                <td>10:00 am - 3:00 pm</td>
                <td>Reality</td>
                <td><a href="http://www.realityministriesinc.org/programs/daytime">link</a></td>
              </tr>
              <tr>
                <td>Every M or T</td>
                <td>Evening Gatherings</td>
                <td>6:30 pm - 8:00 pm</td>
                <td>Varies</td>
                <td><a href="http://www.realityministriesinc.org/programs/programs">link</a></td>
              </tr>
              <tr>
                <td>11/25/2019</td>
                <td>Community Worship</td>
                <td>7:00 pm - 8:15 pm</td>
                <td>Reality</td>
                <td><a href="http://www.realityministriesinc.org/programs/specialevents">link</a></td>
              </tr>
              <tr>
                <td>11/23/2019</td>
                <td>Farm Community Workday</td>
                <td>9:00 am - 1:00 pm</td>
                <td>Reality</td>
                <td><a href="http://www.realityministriesinc.org/programs/specialevents">link</a></td>
              </tr>
            </tbody>
          </Table>
          <p>View more <a href="http://www.realityministriesinc.org/programs/">here</a></p>
          <h2>Why We Need Drivers</h2>
          <p>We have over 250 participants, and less than 5% of them drive themselves. We need volunteers to help transport people to events. You truly make a difference and we can't get everyone here without you! <a href="/driver">Volunteer to drive today.</a></p>
          <h2>Need a Ride?</h2>
          <p>There are many ways you can get to our events. Be sure to check out the other ways of transporation before requesting a ride. Many of our participants take group home vans, public buses, and special ADA buses.
            If none of those options work for you, <a href="/rider">request a ride</a>.
          </p>
        </div>
      </div>
    );
  }
}
export default Main;
