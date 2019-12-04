import React from 'react';
import { hot } from 'react-hot-loader';
import Themeparks from './components/themeparks/themeparks'
import Rides from './components/rides/rides';
import style from './app.scss';

class App extends React.Component {

  constructor(){
    super();

    this.state = {
      park:null
    };
  }

  // set selected park
  getPark(park) {
    this.setState({ park });
    var hide = document.getElementById('themeparks');
    hide.classList.add('d-none');
    console.log( "Park selected", park);
  }

  render() {
    return (
      <div className={`${style["cover-container"]} d-flex w-100 h-100 p-3 mx-auto flex-column`}>
        <header className={`${style.masthead} mb-auto`}>
          <div className="inner">
            <h1 className={`${style["masthead-brand"]}`}>Faster.ly</h1>
            <nav className={`nav ${style["nav-masthead"]} justify-content-center`}>
              <a className={`${style["nav-link"]} ${style.active}`} href="/">Select Park</a>
            </nav>
          </div>
        </header>
        <main role="main" className={`inner ${style.cover}`}>
          <div id="themeparks" className="container">
            <h4 className="cover-heading">Queue Less, Play More</h4>
            <p className="lead">Select the themepark you are at, and see the wait times for the rides.<br/>
            Check the current fastpass time slots too!</p>
            <h3 className="cover-heading">Where Are You Today?</h3>

            <Themeparks setPark={(park)=>this.getPark(park)}/>
          </div>
          <div id="rides" className="container">
            <Rides park={this.state.park}/>
          </div>
        </main>
        <footer className={`${style.mastfoot} mt-auto`}>
          <div className="inner">
            <p>Faster.ly &copy; 2019, SimYen</p>
          </div>
        </footer>
      </div>
    );
  }
}

export default hot(module)(App);