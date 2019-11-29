import React from 'react';

const axios = require('axios');

class Themeparks extends React.Component {

  constructor(){
    super();

    this.state = {
      parks:null
    };
  }

  getParks() {
    const url = '/themeparks';

    axios.get(url)
      .then((response) => {
        const data = response.data
        // console.log( Object.values(data) );
        this.setState({ parks: data })
      }).catch((error)=>{
        console.log(error);
      })
  }

  render() {

    console.log(this.state.parks);

    const parkNames = this.state.parks ? Object.values(this.state.parks).map((park) => {
      return(
        <p>{park}</p>
      )
    }) : "";

    return (
      <div className="col">
        <button className="btn btn-primary" onClick={() => { this.getParks() }}>
          View All Themeparks
        </button>
        <h3>Select Theme Park</h3>
        {parkNames}
      </div>
    );
  }
}

export default Themeparks;