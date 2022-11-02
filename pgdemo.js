const { Client } = require('pg')
const client = new Client( {
user: 'postgres',
  host: 'localhost',
  password: 'geheim',
  port: 5432} )
client.connect()
client.query( {text: `SELECT uri FROM shorties WHERE id=5` , rowMode: 'array' }, (err, res) => {
  console.log(err ? err.stack : 'hallo... ' + res.rows[0]) // Hello World!
  res.rows.forEach(element => {
      console.log('element: ' + element );
  });
	console.log('res: ' + res.rows[0].toString());
})


client.query( {text: `SELECT last_value from shorties_id_seq` , rowMode: 'array' }, (err, res) => {
	console.log('err:' + err);
	console.log("current id: " + res.rows[0]);
});


