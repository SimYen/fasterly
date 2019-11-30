import React from 'react';
import { hot } from 'react-hot-loader';
import Themeparks from './components/themeparks/themeparks'
import Rides from './components/rides/rides';

class App extends React.Component {

  constructor(){
    super();

    this.state = {
      park:null
    };
  }

  getPark(park) {
    this.setState({park});
    console.log( "Park selected", park);
  }

  render() {
    return (
      <div>
        <h3>Queue Less, Play More</h3>
        <div className="row">
          <Themeparks setPark={(park)=>this.getPark(park)}/>
          <Rides park={this.state.park}/>
        </div>
      </div>
    );
  }
}

export default hot(module)(App);