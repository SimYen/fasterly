const {resolve} = require('path');
const express = require('express');

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

process.env.PORT = process.env.PORT || 3000;

const app = express();

const ThemeParks = require('themeparks');
// construct our park objects and keep them in memory for fast access later
const Parks = {};
for (const park in ThemeParks.Parks) {
  Parks[park] = new ThemeParks.Parks[park]();
}
// access a specific park
//  Create this *ONCE* and re-use this object for the lifetime of your application
//  re-creating this every time you require access is very slow, and will fetch data repeatedly for no purpose
  // Walt Disney World Resort
const WaltDisneyWorldMagicKingdom = Parks.WaltDisneyWorldMagicKingdom;
const WaltDisneyWorldEpcot = Parks.WaltDisneyWorldEpcot;
const WaltDisneyWorldHollywoodStudios = Parks.WaltDisneyWorldHollywoodStudios;
const WaltDisneyWorldAnimalKingdom = Parks.WaltDisneyWorldAnimalKingdom;
  // Disneyland Resort
const DisneylandResortMagicKingdom = Parks.DisneylandResortMagicKingdom;
const DisneylandResortCaliforniaAdventure = Parks.DisneylandResortCaliforniaAdventure;
  // Disneyland Paris
const DisneylandParisMagicKingdom = Parks.DisneylandParisMagicKingdom;
const DisneylandParisWaltDisneyStudios = Parks.DisneylandParisWaltDisneyStudios;
  // Hong Kong Disneyland
const HongKongDisneyland = Parks.HongKongDisneyland;
  // Shanghai Disneyland
const ShanghaiDisneyResortMagicKingdom = Parks.ShanghaiDisneyResortMagicKingdom;
  // Tokyo Disney Resort
const TokyoDisneyResortMagicKingdom = Parks.TokyoDisneyResortMagicKingdom;
const TokyoDisneyResortDisneySea = Parks.TokyoDisneyResortDisneySea;
  // Europa
const EuropaPark = Parks.EuropaPark;
  // Asterix Park
const AsterixPark = Parks.AsterixPark;
  // Cedar Fair Parks
const CaliforniasGreatAmerica = Parks.CaliforniasGreatAmerica;
const CanadasWonderland = Parks.CanadasWonderland;
const Carowinds = Parks.Carowinds;
const CedarPoint = Parks.CedarPoint;
const KingsIsland = Parks.KingsIsland;
const KnottsBerryFarm = Parks.KnottsBerryFarm;
  // Herschend Parks,
const Dollywood = Parks.Dollywood;
const SilverDollarCity = Parks.SilverDollarCity;
  // Seaworld
const SeaworldOrlando = Parks.SeaworldOrlando;
  // Efteling
const Efteling = Parks.Efteling;
  // Herysheypark
const HersheyPark = Parks.HersheyPark;
  // Universal Florida
const UniversalStudiosFlorida = Parks.UniversalStudiosFlorida;
const UniversalIslandsOfAdventure = Parks.UniversalIslandsOfAdventure;
const UniversalVolcanoBay = Parks.UniversalVolcanoBay;
  // Universal Hollywood
const UniversalStudiosHollywood = Parks.UniversalStudiosHollywood;
  // Universal Studios Singapore
const UniversalStudiosSingapore = Parks.UniversalStudiosSingapore;
  // Universal Studios Japan
const UniversalStudiosJapan = Parks.UniversalStudiosJapan;
  // Six Flags Parks
const SixFlagsOverTexas = Parks.SixFlagsOverTexas;
const SixFlagsOverGeorgia = Parks.SixFlagsOverGeorgia;
const SixFlagsStLouis = Parks.SixFlagsStLouis;
const SixFlagsGreatAdventure = Parks.SixFlagsGreatAdventure;
const SixFlagsMagicMountain = Parks.SixFlagsMagicMountain;
const SixFlagsGreatAmerica = Parks.SixFlagsGreatAmerica;
const SixFlagsFiestaTexas = Parks.SixFlagsFiestaTexas;
const SixFlagsHurricaneHarborArlington = Parks.SixFlagsHurricaneHarborArlington;
const SixFlagsHurricaneHarborLosAngeles = Parks.SixFlagsHurricaneHarborLosAngeles;
const SixFlagsAmerica = Parks.SixFlagsAmerica;
const SixFlagsDiscoveryKingdom = Parks.SixFlagsDiscoveryKingdom;
const SixFlagsNewEngland = Parks.SixFlagsNewEngland;
const SixFlagsHurricaneHarborJackson = Parks.SixFlagsHurricaneHarborJackson;
const TheGreatEscape = Parks.TheGreatEscape;
const SixFlagsWhiteWaterAtlanta = Parks.SixFlagsWhiteWaterAtlanta;
const SixFlagsMexico = Parks.SixFlagsMexico;
const LaRondeMontreal = Parks.LaRondeMontreal;
const SixFlagsHurricaneHarborOaxtepec = Parks.SixFlagsHurricaneHarborOaxtepec;
const SixFlagsHurricaneHarborConcord = Parks.SixFlagsHurricaneHarborConcord;
  // PortAventura
const PortAventura = Parks.PortAventura;
const FerrariLand = Parks.FerrariLand;
  // Merlin Parks
const AltonTowers = Parks.AltonTowers;
const ThorpePark = Parks.ThorpePark;
const ChessingtonWorldOfAdventures = Parks.ChessingtonWorldOfAdventures;
  // Bellewaerde
const Bellewaerde = Parks.Bellewaerde;
  // Phantasialand
const Phantasialand = Parks.Phantasialand;
  // Heidepark
const HeidePark = Parks.HeidePark;
  // Busch Gardens Parks
const BuschGardensTampa = Parks.BuschGardensTampa;
const BuschGardensWilliamsburg = Parks.BuschGardensWilliamsburg;

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


app.get('/', (req, res) => {
  res.sendFile(resolve(clientBuildPath, 'index.html'))
});

// provide list of parks
app.get('/themeparks', (request, response)=>{
  const data = []

  let parkArr = Object.keys(Parks)
  let index = 0
  // get each park's key, name, and timezone
  for (const park in Parks) {
    let parkObj = {}
    parkObj.key = parkArr[index]
    parkObj.name = Parks[park].Name
    parkObj.area = Parks[park].Timezone
    data.push(parkObj)
    index++
  }

  response.send( data );
});

// Walt Disney World Resort

app.get('/WaltDisneyWorldMagicKingdomOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    WaltDisneyWorldMagicKingdom.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/WaltDisneyWorldMagicKingdom', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      WaltDisneyWorldMagicKingdom.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

app.get('/WaltDisneyWorldEpcotOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    WaltDisneyWorldEpcot.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/WaltDisneyWorldEpcot', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      WaltDisneyWorldEpcot.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

app.get('/WaltDisneyWorldHollywoodStudiosOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    WaltDisneyWorldHollywoodStudios.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/WaltDisneyWorldHollywoodStudios', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      WaltDisneyWorldHollywoodStudios.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

app.get('/WaltDisneyWorldAnimalKingdomOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    WaltDisneyWorldAnimalKingdom.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/WaltDisneyWorldAnimalKingdom', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      WaltDisneyWorldAnimalKingdom.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

// Disneyland Resort

app.get('/DisneylandResortMagicKingdomOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    DisneylandResortMagicKingdom.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/DisneylandResortMagicKingdom', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      DisneylandResortMagicKingdom.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

app.get('/DisneylandResortCaliforniaAdventureOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    DisneylandResortCaliforniaAdventure.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/DisneylandResortCaliforniaAdventure', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      DisneylandResortCaliforniaAdventure.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

// Disneyland Paris

app.get('/DisneylandParisMagicKingdomOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    DisneylandParisMagicKingdom.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/DisneylandParisMagicKingdom', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      DisneylandParisMagicKingdom.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

app.get('/DisneylandParisWaltDisneyStudiosOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    DisneylandParisWaltDisneyStudios.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/DisneylandParisWaltDisneyStudios', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      DisneylandParisWaltDisneyStudios.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

// Hong Kong Disneyland

app.get('/HongKongDisneylandOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    HongKongDisneyland.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/HongKongDisneyland', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      HongKongDisneyland.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

// Shanghai Disneyland

app.get('/ShanghaiDisneyResortMagicKingdomOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    ShanghaiDisneyResortMagicKingdom.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/ShanghaiDisneyResortMagicKingdom', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      ShanghaiDisneyResortMagicKingdom.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

// Tokyo Disney Resort

app.get('/TokyoDisneyResortMagicKingdomOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    TokyoDisneyResortMagicKingdom.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/TokyoDisneyResortMagicKingdom', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      TokyoDisneyResortMagicKingdom.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

app.get('/TokyoDisneyResortDisneySeaOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    TokyoDisneyResortDisneySea.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/TokyoDisneyResortDisneySea', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      TokyoDisneyResortDisneySea.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

// Europa

app.get('/EuropaParkOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    EuropaPark.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/EuropaPark', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      EuropaPark.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

// Parc Asterix

app.get('/AsterixParkOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    AsterixPark.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/AsterixPark', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      AsterixPark.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

// Cedar Fair Parks

app.get('/CaliforniasGreatAmericaOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    CaliforniasGreatAmerica.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/CaliforniasGreatAmerica', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      CaliforniasGreatAmerica.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

app.get('/CanadasWonderlandOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    CanadasWonderland.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/CanadasWonderland', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      CanadasWonderland.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

app.get('/CarowindsOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    Carowinds.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/Carowinds', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      Carowinds.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

app.get('/CedarPointOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    CedarPoint.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/CedarPoint', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      CedarPoint.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

app.get('/KingsIslandOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    KingsIsland.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/KingsIsland', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      KingsIsland.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

app.get('/KnottsBerryFarmOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    KnottsBerryFarm.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/KnottsBerryFarm', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      KnottsBerryFarm.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

// Herschend Parks

app.get('/DollywoodOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    Dollywood.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/Dollywood', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      Dollywood.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

app.get('/SilverDollarCityOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    SilverDollarCity.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/SilverDollarCity', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      SilverDollarCity.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

// Seaworld

app.get('/SeaworldOrlandoOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    SeaworldOrlando.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/SeaworldOrlando', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      SeaworldOrlando.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

// Busch Gardens Parks

app.get('/BuschGardensTampaOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    BuschGardensTampa.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/BuschGardensTampa', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      BuschGardensTampa.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

app.get('/BuschGardensWilliamsburgOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    BuschGardensWilliamsburg.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/BuschGardensWilliamsburg', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      BuschGardensWilliamsburg.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

// Efteling

app.get('/EftelingOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    Efteling.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/Efteling', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      Efteling.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

// Hersheypark

app.get('/HersheyParkOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    HersheyPark.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/HersheyPark', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      HersheyPark.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

// Universal Florida

app.get('/UniversalStudiosFloridaOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    UniversalStudiosFlorida.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/UniversalStudiosFlorida', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      UniversalStudiosFlorida.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

app.get('/UniversalIslandsOfAdventureOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    UniversalIslandsOfAdventure.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/UniversalIslandsOfAdventure', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      UniversalIslandsOfAdventure.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

app.get('/UniversalVolcanoBayOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    UniversalVolcanoBay.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/UniversalVolcanoBay', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      UniversalVolcanoBay.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

// Universal Hollywood

app.get('/UniversalStudiosHollywoodOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    UniversalStudiosHollywood.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/UniversalStudiosHollywood', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      UniversalStudiosHollywood.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

// Universal Studios Singapore

app.get('/UniversalStudiosSingaporeOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    UniversalStudiosSingapore.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/UniversalStudiosSingapore', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      UniversalStudiosSingapore.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

// Universal Studios Japan

app.get('/UniversalStudiosJapanOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    UniversalStudiosJapan.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/UniversalStudiosJapan', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      UniversalStudiosJapan.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

// Six Flags Parks

app.get('/SixFlagsOverTexasOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    SixFlagsOverTexas.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/SixFlagsOverTexas', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      SixFlagsOverTexas.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

app.get('/SixFlagsOverGeorgiaOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    SixFlagsOverGeorgia.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/SixFlagsOverGeorgia', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      SixFlagsOverGeorgia.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

app.get('/SixFlagsStLouisOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    SixFlagsStLouis.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/SixFlagsStLouis', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      SixFlagsStLouis.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

app.get('/SixFlagsGreatAdventureOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    SixFlagsGreatAdventure.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/SixFlagsGreatAdventure', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      SixFlagsGreatAdventure.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

app.get('/SixFlagsMagicMountainOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    SixFlagsMagicMountain.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/SixFlagsMagicMountain', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      SixFlagsMagicMountain.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

app.get('/SixFlagsGreatAmericaOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    SixFlagsGreatAmerica.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/SixFlagsGreatAmerica', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      SixFlagsGreatAmerica.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

app.get('/SixFlagsFiestaTexasOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    SixFlagsFiestaTexas.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/SixFlagsFiestaTexas', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      SixFlagsFiestaTexas.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

app.get('/SixFlagsHurricaneHarborArlingtonOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    SixFlagsHurricaneHarborArlington.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/SixFlagsHurricaneHarborArlington', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      SixFlagsHurricaneHarborArlington.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

app.get('/SixFlagsHurricaneHarborLosAngelesOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    SixFlagsHurricaneHarborLosAngeles.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/SixFlagsHurricaneHarborLosAngeles', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      SixFlagsHurricaneHarborLosAngeles.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

app.get('/SixFlagsAmericaOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    SixFlagsAmerica.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/SixFlagsAmerica', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      SixFlagsAmerica.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

app.get('/SixFlagsDiscoveryKingdomOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    SixFlagsDiscoveryKingdom.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/SixFlagsDiscoveryKingdom', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      SixFlagsDiscoveryKingdom.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

app.get('/SixFlagsNewEnglandOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    SixFlagsNewEngland.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/SixFlagsNewEngland', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      SixFlagsNewEngland.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

app.get('/SixFlagsHurricaneHarborJacksonOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    SixFlagsHurricaneHarborJackson.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/SixFlagsHurricaneHarborJackson', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      SixFlagsHurricaneHarborJackson.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

app.get('/TheGreatEscapeOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    TheGreatEscape.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/TheGreatEscape', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      TheGreatEscape.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

app.get('/SixFlagsWhiteWaterAtlantaOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    SixFlagsWhiteWaterAtlanta.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/SixFlagsWhiteWaterAtlanta', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      SixFlagsWhiteWaterAtlanta.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

app.get('/SixFlagsMexicoOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    SixFlagsMexico.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/SixFlagsMexico', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      SixFlagsMexico.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

app.get('/LaRondeMontrealOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    LaRondeMontreal.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/LaRondeMontreal', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      LaRondeMontreal.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

app.get('/SixFlagsHurricaneHarborOaxtepecOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    SixFlagsHurricaneHarborOaxtepec.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/SixFlagsHurricaneHarborOaxtepec', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      SixFlagsHurricaneHarborOaxtepec.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

app.get('/SixFlagsHurricaneHarborConcordOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    SixFlagsHurricaneHarborConcord.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/SixFlagsHurricaneHarborConcord', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      SixFlagsHurricaneHarborConcord.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

// PortAventura

app.get('/PortAventuraOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    PortAventura.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/PortAventura', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      PortAventura.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

app.get('/FerrariLandOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    FerrariLand.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/FerrariLand', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      FerrariLand.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

// Merlin Parks

app.get('/AltonTowersOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    AltonTowers.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/AltonTowers', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      AltonTowers.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

app.get('/ThorpeParkOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    ThorpePark.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/ThorpePark', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      ThorpePark.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

app.get('/ChessingtonWorldOfAdventuresOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    ChessingtonWorldOfAdventures.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/ChessingtonWorldOfAdventures', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      ChessingtonWorldOfAdventures.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

// Bellewaerde

app.get('/BellewaerdeOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    Bellewaerde.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/Bellewaerde', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      Bellewaerde.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

// Phantasialand

app.get('/PhantasialandOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    Phantasialand.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/Phantasialand', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      Phantasialand.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

// Heidepark

app.get('/HeideParkOpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    HeidePark.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

app.get('/HeidePark', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      HeidePark.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
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