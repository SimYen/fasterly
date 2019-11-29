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

    axios.get(url)
      .then((response) => {
        const data = response.data

        this.setState({ parks: data })
      }).catch((error)=>{
        console.log(error);
      })
  }

  getTerm(event) {
    console.log(event.target.value);
    let term = event.target.value;

    this.setState({term});
  }

  render() {

    console.log(this.state.parks);

    const parkNames = this.state.parks ? Object.values(this.state.parks).filter((park) => park.toLowerCase().includes(this.state.term.toLowerCase())).map((park) => {
      return(
        <p>{park}</p>
      )
    }) : "";

    return (
      <div className="col">
        <button className="btn btn-primary" onClick={() => { this.getParks() }}>
          View All Themeparks
        </button>
        <p>Search
          <input onChange = {(event) => { this.getTerm(event) }}/>
        </p>
        <h3>Select Theme Park</h3>
        {parkNames}
      </div>
    );
  }
}

export default Themeparks;