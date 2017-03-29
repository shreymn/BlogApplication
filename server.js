const path = require('path');
// Using Express server for rendering static and dynamic content
const express = require('express');
// body-parser reads data from <form> element
const bodyParser= require('body-parser')
const app = express();
const MongoClient = require('mongodb').MongoClient
// urlencoded extracts data from the <form> element and adds to the body property of response object (res)
app.use(bodyParser.urlencoded({extended: true}))
// Set the template engine to ejs for rendering
app.set('view engine', 'ejs')
var dir = path.join('C:/Users/Shrey/Downloads/Node', '/public')
app.use(express.static(dir))
// Connect to the MongoDB and then create server
MongoClient.connect('mongodb://shrey:test@ds129010.mlab.com:29010/blog-db', (err, database) => {
	if(err) return console.log(err)
	db = database
	// Browser listens to port 8082
	app.listen(8083, () => {	// replacing function() with the ES6 arrow function
		// Console will print the message
		console.log('Server running at http://127.0.0.1:8083/')
	})
	// GET request sent by browser to perform a READ Operation
	// Get the results from the quotes collection for the form element
	app.get('*', (req, res) => {
		var cursor = db.collection('quotes').find().toArray((err, results) => {
			if (err) return console.log(err)
			console.log(results)
			res.render('index.ejs', {quotes: results})
			//res.sendFile('C:/Users/Shrey/Downloads/Mongo Crud' + '/index.html');
		})
	});
	// data from the <form> element is sent to the server
	app.post('/quotes', (req, res) => {
		db.collection('quotes').save(req.body, (err, result) => {
			if (err) return console.log(err)
			console.log('saved to database')
			res.redirect('/index.ejs')
		})
	})
})