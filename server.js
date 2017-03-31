const express = require('express')
const bodyParser= require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')
const MongoClient = require('mongodb').MongoClient

var db

MongoClient.connect('mongodb://axi9547:imsirevic@ds143900.mlab.com:43900/pokemon', (err, database) => {
	
	if (err) return console.log(err)
	db = database
	app.listen(3001, function() {
	  console.log('listening on 3001')
	})

	app.get('/', (req, res) => {
	  db.collection('pokemons').find().toArray((err, result) => {
		if (err) return console.log(err)
		// renders index.ejs
		res.render('index.ejs', {pokemons: result})
	  })
	})
	
	app.get('/search', (req, res) => {
	  var query = req.query.query;
	  console.log(query);
	  if(req.query.by == "id")
	  db.collection('pokemons').find({ id : parseInt(query)}).toArray((err, result) => {
		if (err) return console.log(err)
		// renders index.ejs
		res.render('index.ejs', {pokemons: result})
	  });
	  if(req.query.by == "name")
	  db.collection('pokemons').find({ name : new RegExp("^"+query, "i")}).toArray((err, result) => {
		if (err) return console.log(err)
		// renders index.ejs
		res.render('index.ejs', {pokemons: result, query: query})
	  });
	})
})