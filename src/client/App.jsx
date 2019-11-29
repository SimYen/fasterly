import React from 'react';
import { hot } from 'react-hot-loader';

import Form from './components/form/form';

class App extends React.Component {
  render() {
    return (
      <div>
        <h3>Queue Less, Play More</h3>
        <Form />
      </div>
    );
  }
}

export default hot(module)(App);