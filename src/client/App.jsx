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

  render() {
    return (
      <div>
        <h3>Queue Less, Play More</h3>
        <div className="row">
          <Themeparks />
          <Rides />
        </div>
      </div>
    );
  }
}

export default hot(module)(App);