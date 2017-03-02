import React from 'react';
import Paper from 'material-ui/Paper';

export default class UsersPage extends React.Component {
  render() {
    return (
      <section style={{padding: 20}}>
        <h2>Servers</h2>
        <section style={{display: 'flex', flexWrap: 'wrap'}}>
          {new Array(13).fill(true).map((n, i) => (
            <Paper style={{marginRight: 20, marginTop: 20, width: 250, padding: 15, height: 100}}>
              {i}
              <br />
              <br />
            </Paper>
          ))}
        </section>
      </section>
    );
  }
}
