import React from 'react';

const axios = require('axios');

class Themeparks extends React.Component {

  constructor(){
    super();

    this.state = {
      parks:null,
      term:""
    };
  }

  getParks() {
    const url = '/themeparks';
    // get list of themeparks
    axios.get(url)
      .then((response) => {
        const data = response.data
        console.log( data )
        this.setState({ parks: data })
      }).catch((error)=>{
        console.log(error);
      })
  }

  getTerm(event) {
    console.log(event.target.value);
    let term = event.target.value;
    // set search term to filter parks
    this.setState({term});
  }

  render() {

    const parkNames = this.state.parks ? this.state.parks.filter((park) => park.name.toLowerCase().includes(this.state.term.toLowerCase())).map((park, index) => {
      return(
        <p key={index}>{park.name} ({park.area}) <button className="btn btn-info" onClick={() => { this.props.setPark(park) }}>View</button></p>
      )
    }) : "";

    return (
      <div className="col">
        <button className="btn btn-primary" onClick={() => { this.getParks() }}>
          View All Themeparks
        </button>
        <p>Search by Park Name  <input onChange = {(event) => { this.getTerm(event) }}/><br/><i>*to hide until all parks are loaded<br/>*to add filter by area option</i></p>
        <h3>Select Theme Park</h3>
        {parkNames}
      </div>
    );
  }
}

export default Themeparks;