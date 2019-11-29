import React from 'react';
import classnames from 'classnames';
import styles from './style.scss';

const cx = classnames.bind(styles)
const axios = require('axios');

class Rides extends React.Component {

  constructor(){
    super();

    this.state = {
      park:null
    };
  }

  getUSS(){

    const url = '/UniversalStudiosSingapore';

    axios.get(url)
      .then((response) => {
        const data = response.data
        console.log( "data:", data);
        this.setState({ park: data })
      }).catch((error)=>{
        console.log(error);
      })
  }

  getSDP(){

    const url = '/ShanghaiDisneyResortMagicKingdom';

    axios.get(url)
      .then((response) => {
        const data = response.data
        console.log( "data:", data);
        this.setState({ park: data })
      }).catch((error)=>{
        console.log(error);
      })
  }

  render() {

    const rides = this.state.park ? this.state.park.map((ride) => {
      return(
        <ul>
          <li>{ride.name}: {ride.waitTime} minutes wait ({ride.status})</li>
        </ul>
      )
    }) :"";

    return (
      <div>
        <button onClick={()=>{this.getUSS()}}>USS Rides</button>
        <button onClick={()=>{this.getSDP()}}>SDP Rides</button>
        {rides}
      </div>
    );
  }
}

export default Rides;