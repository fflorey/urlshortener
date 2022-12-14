const { RedisFunctionFlags } = require('@redis/client/dist/lib/commands/generic-transformers');
var express = require('express');
var router = express.Router();
var redis = require('redis');

var simpleID = 1

client = null


function initRedis() {
  client = redis.createClient({
    url: 'redis://redis:6379'
});
  client.connect();
  client.on('error', (err) => { console.log('Redis Client Error', err); } );
}

async function getShortForm ( url ) {
  if ( client == null ) {
    initRedis()
    simpleID = await client.get('ID'); 
    console.log("simpoleID: " + simpleID)
    if ( simpleID == null )  {
      console.log("simpleID not known");
      simpleID = 1;      
      await client.set('ID', simpleID);
    } 
  }
  await client.set((simpleID++).toString(), encodeURIComponent(url));
  await client.set('ID', simpleID);
  return simpleID-1;
}

async function getUrlFromShortForm ( short ) {
  if ( client == null ) {
    initRedis()
  }
  const value = await client.get(short);
  console.log("value:"+value)
  return decodeURIComponent(value);
}


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* geturl */
router.get('/geturl', (req, res) => {  
  console.log('request: ' + req.query.id )  
  if ( req.query.id != null ) {
    getUrlFromShortForm(req.query.id).then( (result) => {
      console.log("result!" + result);
      res.render('redirect', { title: 'Copy shorturl', url: `${result}` });
    })
  }  
})

/* getshort */
router.get('/getshort', (req, res) => {
  console.log('request: ' + req.query.url )  
  if ( req.query.url != null ) {
    getShortForm(req.query.url).then( (result) => {
      console.log("result!" + result);
      var url = 
      res.render('showshort', { title: 'Copy shorturl', url: `http://localhost:3000/geturl?id=${result}` });
    })
  }  
})

module.exports = router;
