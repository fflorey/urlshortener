
var express = require('express');
var router = express.Router();
const { Client } = require('pg')


const client = new Client( {
user: 'postgres',
  host: 'localhost',
  password: 'geheim',
  port: 5432} )
  client.connect();

var simpleID = -1

function getCurrentID (res) {
  client.query( {text: "SELECT last_value from shorties_id_seq", rowMode: 'array' }, (err, r) => {
    console.log('res: ' + r.rows[0]);
    if  ( err == null ) {
      res.render('showshort', { title: 'Copy shorturl', url: `http://localhost:3000/geturl?id=${r.rows[0]}` });
    } else {
      // something went wrong, aber so richtig
      console.log(err.stack);
    }
  });
}

function addURI ( uri, res ) {
  console.log('ok, uri: ' + uri);
  client.query( {text: `INSERT INTO shorties(uri) VALUES ('${uri}')` }, (err, r) => {
    console.log('res: ' + r);
    if  ( err == null ) {
      // go on and never return - function name is bullshit, should be something
      // like display current id to user
      getCurrentID(res);
    } else {
      console.log(err.stack);
    }
  });
}

function getURI ( id, res ) {
  client.query( {text: `SELECT uri FROM shorties WHERE id=${id}`, rowMode: 'array' }, (err, r) => {
    console.log('res: ' + r.rows[0]);
    if  ( err == null ) {
      var uri = decodeURIComponent(r.rows[0]);
      res.render('redirect', { title: 'Copy shorturl', url: `${uri}` });
    } else {
      console.log(err.stack);
      return 0;
    }
  });
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


/* geturl */
router.get('/geturl', (req, res) => {  
  console.log('request: ' + req.query.id )  
  if ( req.query.id != null ) {
    getURI(req.query.id, res);
  }  
})

/* getshort */
router.get('/getshort', (req, res) => {
    console.log('request: ' + req.query.url )  
    if ( req.query.url != null ) {
      addURI( encodeURIComponent(req.query.url), res);
    }
  }  
)

module.exports = router;
