import React, { Component } from "react";
import { throwStatement } from "@babel/types";

class RoutComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      lat: 0,
      lng: 0,
      dates: "",
      notes: ""
    };
    this.getData = this.getData.bind(this);
  }
  componentDidUpdate() {
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
    var centerObj = new window["google"].maps.LatLng(
      this.state.lat,
      this.state.lng
    );

    var map = new window["google"].maps.Map(this.refs.map, {
      center: centerObj,
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
      this.state.lat,
      this.state.lng
    );
    var destinationObj = new window["google"].maps.LatLng(
      this.state.lat2,
      this.state.lng2
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
      if (status === window["google"].maps.DirectionsStatus.OK) {
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
    var isEmpty = this.props.origin === undefined;
    if (isEmpty) {
      return <p>Loading...</p>; // note you can also return null here to render nothing
    }

    console.log(this.state.data.lat);
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
  getData() {
    fetch("/api/getuser2").then(res => res.json());
  }
  componentWillMount() {
    var that = this;
    var url = "http://localhost:3000/api/data";

    fetch("/api/getuser2")
      .then(function(response) {
        if (response.status >= 400) {
          throw new Error("Bad response from server");
        }
        return response.json();
      })
      .then(function(data) {
        //that.setState({ data: data, lat: data.lat, lng: data.lng });
        that.setState(
          {
            data: data,
            lat: parseFloat(data.result1.lat),
            lng: parseFloat(data.result1.lng),
            lat2: parseFloat(data.result2.lat),
            lng2: parseFloat(data.result2.lng)
          },
          () => {
            console.log(that.state);
          }
        );
      });
  }
}

export default RoutComponent;
