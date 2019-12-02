import React from 'react';
import classnames from 'classnames';
import styles from './style.scss';

const cx = classnames.bind(styles)
const axios = require('axios');

class Rides extends React.Component {

  constructor(){
    super();

    this.state = {
      rides:null,
      term:"",
      operating: false,
      fastPassStatus: false
    };

    this.getTerm = this.getTerm.bind(this);
    this.getOperating = this.getOperating.bind(this);
  }

  getRides(park) {
    console.log(park);
    // get url of selected park
    const url = '/' + park;

    const CheckWaitTimes = () => {
      axios.get(url)
        .then((response) => {
          const data = response.data
          console.log( "data:", data);
          this.setState({ park: data })
        }).catch((error)=>{
          console.log(error);
        })
        // .then(() => {
        //     setTimeout(CheckWaitTimes, 1000 * 60 ); // refresh every 1 minute
        // });
    }
    CheckWaitTimes();
  }

  getTerm(event) {
    // set search term to filter rides
    this.setState({term: event.target.value});
  }

  getOperating(event) {
    // toggle operating status to filter rides
    this.setState({operating: !this.state.operating});
  }

  render() {
    // receive park selected from App
    const park = this.props.park
    // display name of selected park
    const parkName = park ? park.name : "";
    // set key of selected park
    const parkKey = park ? park.key : "";

    const rides = this.state.park ? this.state.park
        .filter((ride) => ride.name.toLowerCase().includes(this.state.term.toLowerCase())
            && ride.status.toLowerCase().includes(this.state.operating ? "Operating".toLowerCase() : ""))
        .sort((a, b) => (a.waitTime > b.waitTime) ? 1 : -1)
        .map((ride, index) => {
          return(
            <li key={index}>{ride.name}: {ride.waitTime} minutes wait
            ({ride.status}, Fastpass: { ride.fastPass ? ( ride.meta.fastPassStartTime ? <span>{ride.meta.fastPassStartTime} to {ride.meta.fastPassEndTime}</span> : "Fully redeemed" ) : "Not Available" })</li>
          )
    }) :"";

    return (
      <div>
        <h3>{parkName}</h3>
        <i>*to get park opening & closing time</i><br/>
        <button onClick={()=>{this.getRides(parkKey)}}>Load Rides</button>
        <p>Search by Ride Name  <input onChange = {(event) => { this.getTerm(event) }}/><br/>
        <i>*to hide until all rides are loaded<br/>
        *to add filter by fastPass but display all rides if unchecked</i></p>
        <h4>Rides (by order of waiting time)</h4>
        <p>
          <input type="checkbox" onChange = {(event) => { this.getOperating(event) }}/>
          {' '} In Operation
        </p>
        <ul>
          {rides}
        </ul>
      </div>
    );
  }
}

export default Rides;