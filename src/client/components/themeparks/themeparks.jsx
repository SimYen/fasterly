import React from 'react';

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
          <p key={index}><a onClick={() => { this.props.setPark(park) }}>{park.name}</a></p>
        )
    }) : "";

    return (
      <div>
        {/* <button className="btn btn-primary" onClick={() => { this.getParks() }}>
          View All Themeparks
        </button> */}
        <h5>Select Themepark&nbsp;&nbsp;
        <input placeholder="Search by park name" onChange = {(event) => { this.getTerm(event) }}/>
        &nbsp;<label>
          <select value={this.state.area} onChange={this.getLocation}>
            <option value=""> Filter by timezone</option>
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
        </label></h5>
        <div className="container themeparks-group">
          <div className="row">
            {parkNames}
          </div>
        </div>
      </div>
    );
  }
}

export default Themeparks;