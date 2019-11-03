import React, { Component } from "react";
import { throwStatement } from "@babel/types";

class RoutComponent extends Component {
  componentDidMount() {
    this.renderMap();
  }

  renderMap = () => {
    window["initMap"] = () => {
      this.loadMap();
    };
    if (!window.document.getElementById("google-map-script")) {
      var s = window.document.createElement("script");
      s.id = "google-map-script";
      s.type = "text/javascript";
      s.src =
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyBCUiun3GfVhDIslkBV4Cf657dkStM-z80&callback=initMap";

      window.document.body.appendChild(s);
    } else {
      this.loadMap();
    }
  };

  loadMap = () => {
    var map = new window["google"].maps.Map(this.refs.map, {
      center: { lat: this.props.lat, lng: this.props.lng },
      zoom: this.props.zoom
    });

    /*var marker = new window["google"].maps.Marker({
      position: { lat: 22.7196, lng: 75.8577 },
      map: map,
      title: "Hello World!",
      draggable: true,
      animation: window["google"].maps.Animation.DROP
    });*/

    var dirService = new window["google"].maps.DirectionsService();
    var originObj = new window["google"].maps.LatLng(
      this.props.origin.lat,
      this.props.origin.lng
    );
    var destinationObj = new window["google"].maps.LatLng(
      this.props.destination.lat,
      this.props.destination.lng
    );
    var dirReq = {
      origin: originObj,
      destination: destinationObj,
      /*waypoints: [
        {
          location: "Joplin, MO",
          stopover: false
        },
        {
          location: "Oklahoma City, OK",
          stopover: true
        }
      ],*/
      provideRouteAlternatives: true,
      travelMode: "DRIVING",
      drivingOptions: {
        departureTime: new Date(/* now, or future date */),
        trafficModel: "pessimistic"
      },
      unitSystem: window["google"].maps.UnitSystem.IMPERIAL
    };

    dirService.route(dirReq, function(response, status) {
      if (status == window["google"].maps.DirectionsStatus.OK) {
        new window["google"].maps.DirectionsRenderer({
          map: map,
          directions: response
        });
        console.log(response);
      }
    });

    var infowindow = new window["google"].maps.InfoWindow({
      content: ""
    });

    /*marker.addListener("click", function() {
      infowindow.open(map, marker);
    });*/
  };
  render() {
    return (
      <div className="row mt-5">
        <div className="col-md-10 mx-auto">
          <div className="card mt-3">
            <div className="card-body">
              <div ref="map" style={{ width: "100%", height: "400px" }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default RoutComponent;
