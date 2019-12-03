import React from 'react';
import style from './style.scss';

const axios = require('axios');

class Themeparks extends React.Component {

  constructor(){
    super();

    this.state = {
      parks:null,
      term:"",
      area:""
    };

    this.getTerm = this.getTerm.bind(this);
    this.getLocation = this.getLocation.bind(this);
  }

  componentDidMount(){
    this.getParks();
  }

  getParks() {
    const url = '/themeparks';
    // get list of themeparks
    axios.get(url)
      .then((response) => {
        const data = response.data
        console.log( data );
        this.setState({ parks: data })
      }).catch((error)=>{
        console.log( error );
      })
  }

  getTerm(event) {
    // set search term to filter parks
    this.setState({term: event.target.value});
  }

  getLocation(event) {
    // set location term to filter parks
    this.setState({area: event.target.value});
  }

  render() {
    // sort themeparks by name
    const parks = this.state.parks ? this.state.parks.sort((a, b) => (a.name > b.name) ? 1 : -1) : "";
    const parkNames = parks ? parks
      .filter((park) => park.name.toLowerCase().includes(this.state.term.toLowerCase())
                      && park.area.toLowerCase().includes(this.state.area.toLowerCase()))
      .map((park, index) => {
        return(
          <div key={index} className="col col-sm-6 col-md-4 col-lg-3 p-1">
          <a onClick={() => { this.props.setPark(park) }}>
          <div className="card text-white bg-danger mb-2">
            <div className={`${style.cardHeight} card-body`}>
              <h5 className="card-title">{park.name}</h5>
              <h6 className="card-subtitle text-muted">{park.area}</h6>
            </div>
          </div>
          </a>
          </div>
        )
    }) : "";

    return (
      <div>
        {/* <button className="btn btn-primary" onClick={() => { this.getParks() }}>
          View All Themeparks
        </button> */}
        <div className={`row ${style.selectPark}`}>
          <div className="col-md-4">
            <h5>Select Themepark</h5>
          </div>
          <div className="col-md-4">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text">@</span>
              </div>
              <input className="form-control" placeholder="Park Name" onChange = {(event) => { this.getTerm(event) }}/>
              </div>
            </div>
          <div className="col-md-4">
            <div className="input-group">
              <select className="custom-select" value={this.state.area} onChange={this.getLocation}>
              <option defaultValue="">All</option>
              <optgroup label="Asia"/>
                <option value="Hong_Kong">Hong Kong</option>
                <option value="Shanghai">Shanghai</option>
                <option value="Singapore">Singapore</option>
                <option value="Tokyo">Tokyo</option>
              <optgroup label="America"/>
                <option value="Chicago">Chicago</option>
                <option value="Los_Angeles">Los Angeles</option>
                <option value="New_York">New York</option>
                <option value="Mexico_City">Mexico City</option>
                <option value="Toronto">Toronto</option>
              <optgroup label="Europe"/>
                <option value="Amsterdam">Amsterdam</option>
                <option value="Berlin">Berlin</option>
                <option value="London">London</option>
                <option value="Madrid">Madrid</option>
                <option value="Paris">Paris</option>
              </select>
              <div className="input-group-append">
                <label className="input-group-text">Timezone</label>
              </div>
            </div>
          </div>
        </div>
        <div className={`row ${style.themeparks}`}>
            {parkNames}
        </div>
      </div>
    );
  }
}

export default Themeparks;