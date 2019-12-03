import React from 'react';
// import classnames from 'classnames';
import style from './style.scss';

// const cx = classnames.bind(styles)
const axios = require('axios');
var moment = require('moment');
moment().format();

class Rides extends React.Component {

  constructor(){
    super();

    this.state = {
      key:null,
      hours:null,
      rides:null,
      term:"",
      operating: true,
      alphabetical: false,
      fastPassStatus: false
    };

    this.getTerm = this.getTerm.bind(this);
    this.getOperating = this.getOperating.bind(this);
  }

  // to check if prop is received
  static getDerivedStateFromProps(props, state) {
    if (props.park) {
      if (props.park.key !== state.key) {
      return {
        key: props.park.key
      };
    }
  }
    // Return null if the state hasn't changed
    return null;
  }

  // to get park hours and rides when park received
  componentDidUpdate(prevProps, prevState) {
    if (this.props.park !== prevProps.park) {
      console.log(this.props.park.name);
      this.getTimes(this.props.park.key);
      this.getRides(this.props.park.key);
    }
  }

  getTimes(park) {
    // get url of selected park
    const url = '/' + park + 'OpeningTimes';

    const CheckOpeningTimes = () => {
      axios.get(url)
        .then((response) => {
          const data = response.data
          console.log( "hours:", data);
          this.setState({ hours: data })
        }).catch((error)=>{
          console.log(error);
        })
    }
    CheckOpeningTimes();
  }

  getRides(park) {
    // get url of selected park
    const url = '/' + park;

    const CheckWaitTimes = () => {
      axios.get(url)
        .then((response) => {
          const data = response.data
          console.log( "rides:", data);
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

  getAlphabetical(event) {
    // toggle display status to sort rides
    this.setState({alphabetical: !this.state.alphabetical});
  }

  getFastPass(event) {
    // toggle display to sort fast pass
    this.setState({fastPassStatus: !this.state.fastPassStatus});
  }

  render() {
    // receive park selected from App
    const park = this.props.park
    // display name of selected park
    const parkName = park ? park.name : "";
    // set key of selected park
    const parkKey = park ? park.key : "";

    const hours = this.state.hours ? <p>Today's Hours: {moment.parseZone(this.state.hours.openingTime, [moment.ISO_8601, 'HH:mm']).format("HH:mm")} to {moment.parseZone(this.state.hours.closingTime, [moment.ISO_8601, 'HH:mm']).format("HH:mm")}</p> : "";

    let list = this.state.park ? this.state.park
        .filter((ride) => ride.name.toLowerCase().includes(this.state.term.toLowerCase())
            && ride.status.toLowerCase().includes(this.state.operating ? "Operating".toLowerCase() : ""))
        .sort((a, b) => (a.name < b.name) ? 1 : -1)
        .sort((a, b) => (a.waitTime > b.waitTime) ? 1 : -1) : "";

    if(list !== "" && this.state.alphabetical){
      list = list.sort((a, b) => (a.name > b.name) ? 1 : -1)
    }

    if(list !== "" && this.state.fastPassStatus){
      list = list.filter((ride) => ride.fastPass ? true : "" )
    }

    const rides = list ? list.map((ride, index) => {
          return(
            <div key={index} className="list-group-item list-group-item-secondary">
              <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{ride.name}</h5>
                <h5>{ride.waitTime} minutes</h5>
              </div>
              <div className="d-flex w-100 justify-content-between">
                <p className="mb-1">Status: {ride.status}</p>
                <p>{ ride.fastPass ? ( ride.meta.fastPassStartTime ? <span>Fastpass: {moment.parseZone(ride.meta.fastPassStartTime, [moment.ISO_8601, 'HH:mm']).format("HH:mm")} to {moment.parseZone(ride.meta.fastPassEndTime, [moment.ISO_8601, 'HH:mm']).format("HH:mm")}</span> : "Fastpass: Fully redeemed" ) : "" }</p>
              </div>
            </div>
          )}) : "";

    return (
      <div>
        <h3>{parkName}</h3>
        {hours}
        <div className={`row justify-content-between ${style.selectRide}`}>
          <div className="col-md-6 text-left">
            <button className="btn btn-light" onClick={()=>{this.getRides(parkKey)}}>Update Wait Times</button>&nbsp;
            <span>Rides</span>
          </div>
          <div className="col-md-4">
            <div className="input-group">
              <input type="text" className="form-control" placeholder="Ride Name" onChange = {(event) => { this.getTerm(event) }}/>
              <div className="input-group-append">
                <span className="input-group-text" id="basic-addon2">@</span>
              </div>
            </div>
          </div>
        </div>
        <i className={`${style.rideOrder}`}>*Displaying rides in operation, by alphabetical order, in order of waiting time.</i>
        <div className="row text-left mt-2">
          <div className="col-md-2">
            <div className="form-check">
              <input className="form-check-input" type="checkbox" onChange = {(event) => { this.getOperating(event) }}/>
              <label className="form-check-label">
                All Rides
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" onChange = {(event) => { this.getAlphabetical(event) }}/>
              <label className="form-check-label">
                Alphabetical
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" onChange = {(event) => { this.getFastPass(event) }}/>
              <label className="form-check-label">
                Fastpass
              </label>
            </div>
          </div>
          <div className="col-md-10">
            <div class={`list-group ${style.listScroll}`}>
              {rides}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Rides;