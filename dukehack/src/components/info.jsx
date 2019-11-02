import React from 'react'
import logo from './banner.jpg';

class Main extends React.Component {
  render() {
    return (
      <div>
      <img className="img-responsive" src={logo} alt="logo"/>
      </div>
    )
  }
}
export default Main
