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
      term:""
    };
  }

  getRides(park){
    console.log(park);
    // get url of selected park
    const url = '/' + park;

    axios.get(url)
      .then((response) => {
        const data = response.data
        console.log( "data:", data);
        this.setState({ park: data })
      }).catch((error)=>{
        console.log(error);
      })
  }

  getTerm(event) {
    console.log(event.target.value);
    let term = event.target.value;
    // set search term to filter rides
    this.setState({term});
  }

  render() {
    // receive park selected from App
    const park = this.props.park
    // display name of selected park
    const parkName = park ? park.name : "";
    // set key of selected park
    const parkKey = park ? park.key : "";

    const rides = this.state.park ? this.state.park.filter((ride) => ride.name.toLowerCase().includes(this.state.term.toLowerCase())).map((ride, index) => {
      return(
        <li key={index}>{ride.name}: {ride.waitTime} minutes wait ({ride.status}, Fastpass: { ride.fastPass ? "Available" : "Not Available" })</li>
      )
    }) :"";

    return (
      <div>
        <h3>{parkName}</h3>
        <button onClick={()=>{this.getRides(parkKey)}}>Load Rides</button>
        <p>Search by Park Name  <input onChange = {(event) => { this.getTerm(event) }}/><br/>
        <i>*to hide until all rides are loaded<br/>
        *to add filter by status, fastPass</i></p>
        <h4>Rides</h4>
        <ul>
          {rides}
        </ul>
      </div>
    );
  }
}

export default Rides;