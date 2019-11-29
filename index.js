const {resolve} = require('path');
const express = require('express');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

process.env.PORT = process.env.PORT || 3000;

const app = express();

const ThemeParks = require('themeparks');
// access a specific park
//  Create this *ONCE* and re-use this object for the lifetime of your application
//  re-creating this every time you require access is very slow, and will fetch data repeatedly for no purpose
const UniversalStudiosSingapore = new ThemeParks.Parks.UniversalStudiosSingapore();
const ShanghaiDisneyResortMagicKingdom = new ThemeParks.Parks.ShanghaiDisneyResortMagicKingdom();
/*
 * =======================================================================
 * =======================================================================
 * =======================================================================
 * =======================================================================
 * =======================================================================
 * =======================================================================
 * =======================================================================
 */

var clientBuildPath;

if( process.env.NODE_ENV === 'development' ){

  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('./config/webpack.config.dev');

  const compiler = webpack(webpackConfig);

  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: webpackConfig.output.publicPath,
      stats: {
        colors: true
      }
    })
  );

  app.use(webpackHotMiddleware(compiler));
  clientBuildPath = resolve(__dirname, 'build-dev', 'client')

  // all other requests be handled by UI itself
}else{

  app.use('/', express.static(clientBuildPath));

  clientBuildPath = resolve(__dirname, 'src', 'client');
}

/*
 * =======================================================================
 * =======================================================================
 * =======================================================================
 * =======================================================================
 * =======================================================================
 * =======================================================================
 * =======================================================================
 */

app.get('/themeparks', (request, response)=>{

  // construct our park objects and keep them in memory for fast access later
  const Parks = {};
  for (const park in ThemeParks.Parks) {
    Parks[park] = new ThemeParks.Parks[park]();
  }

  // print each park's name, current location, and timezone
  for (const park in Parks) {
    console.log(`* ${Parks[park].Name} [${Parks[park].LocationString}]: (${Parks[park].Timezone})`);
  }
  // console.log( Parks );
  response.send( Parks );
});


app.get('/UniversalStudiosSingapore', (request, response)=>{

  console.log(UniversalStudiosSingapore);

  // Access wait times by Promise
  const CheckWaitTimes = () => {
      UniversalStudiosSingapore.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
        rideTimes.forEach((ride) => {
            console.log(`${ride.name}: ${ride.waitTime} minutes wait (${ride.status})`);
        });
      }).catch((error) => {
          console.error(error);
      }).then(() => {
          setTimeout(CheckWaitTimes, 1000 * 60 * 5); // refresh every 5 minutes
      });
  };
  CheckWaitTimes();
});


app.get('/ShanghaiDisneyResortMagicKingdom', (request, response)=>{

  console.log(ShanghaiDisneyResortMagicKingdom);

  // Access wait times by Promise
  const CheckWaitTimes = () => {
      ShanghaiDisneyResortMagicKingdom.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
        rideTimes.forEach((ride) => {
            console.log(`${ride.name}: ${ride.waitTime} minutes wait (${ride.status})`);
        });
      }).catch((error) => {
          console.error(error);
      }).then(() => {
          setTimeout(CheckWaitTimes, 1000 * 60 * 5); // refresh every 5 minutes
      });
  };
  CheckWaitTimes();
});

app.get('/', (req, res) => {
  res.sendFile(resolve(clientBuildPath, 'index.html'))
});

/*
 * =======================================================================
 * =======================================================================
 * =======================================================================
 * =======================================================================
 * =======================================================================
 * =======================================================================
 * =======================================================================
 */


app.listen(process.env.PORT, () => {
  console.log(`HTTP server is now running on http://localhost:${process.env.PORT}`);
});