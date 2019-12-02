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
app.get('/WaltDisneyWorldMagicKingdom', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      WaltDisneyWorldMagicKingdom.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
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

app.get('/WaltDisneyWorldHollywoodStudios', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      WaltDisneyWorldHollywoodStudios.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
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
app.get('/DisneylandResortMagicKingdom', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      DisneylandResortMagicKingdom.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
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
app.get('/DisneylandParisMagicKingdom', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      DisneylandParisMagicKingdom.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
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
app.get('/ShanghaiDisneyResortMagicKingdom', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      ShanghaiDisneyResortMagicKingdom.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
});

app.get('/OpeningTimes', (request, response)=>{
  // you can also call GetOpeningTimes on themeparks objects to get park opening hours
  const CheckOpeningTimes = () => {
    ShanghaiDisneyResortMagicKingdom.GetOpeningTimes().then((openingTimes) => {
      response.json( openingTimes[0] )
    });
  };
  CheckOpeningTimes();
});

// Tokyo Disney Resort
app.get('/TokyoDisneyResortMagicKingdom', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      TokyoDisneyResortMagicKingdom.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
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
app.get('/CaliforniasGreatAmerica', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      CaliforniasGreatAmerica.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
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

app.get('/Carowinds', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      Carowinds.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
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

app.get('/KingsIsland', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      KingsIsland.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
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
app.get('/Dollywood', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      Dollywood.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
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
app.get('/BuschGardensTampa', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      BuschGardensTampa.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
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
app.get('/UniversalStudiosFlorida', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      UniversalStudiosFlorida.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
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
app.get('/SixFlagsOverTexas', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      SixFlagsOverTexas.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
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

app.get('/SixFlagsStLouis', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      SixFlagsStLouis.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
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

app.get('/SixFlagsMagicMountain', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      SixFlagsMagicMountain.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
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

app.get('/SixFlagsFiestaTexas', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      SixFlagsFiestaTexas.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
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

app.get('/SixFlagsHurricaneHarborLosAngeles', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      SixFlagsHurricaneHarborLosAngeles.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
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

app.get('/SixFlagsDiscoveryKingdom', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      SixFlagsDiscoveryKingdom.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
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

app.get('/SixFlagsHurricaneHarborJackson', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      SixFlagsHurricaneHarborJackson.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
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

app.get('/SixFlagsWhiteWaterAtlanta', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      SixFlagsWhiteWaterAtlanta.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
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

app.get('/LaRondeMontreal', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      LaRondeMontreal.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
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
app.get('/PortAventura', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      PortAventura.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
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
app.get('/AltonTowers', (request, response)=>{
  // Access wait times by Promise
  const CheckWaitTimes = () => {
      AltonTowers.GetWaitTimes().then((rideTimes) => {
        response.json( rideTimes );
      });
  };
  CheckWaitTimes();
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