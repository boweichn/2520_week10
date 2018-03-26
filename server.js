const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 8080;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear();
});

hbs.registerHelper('message', (text) => {
	return text.toUpperCase()
})

/*app.use((request, response, next) => {
	// response.render('maint.hbs', {});
	var time = new Date().toString();
	var log = `${time}: ${request.method} ${request.url}`;
	fs.appendFile('server.log', log + '\n', (error) => {
		if (error) {
			console.log('Unable to log message');
		}
	});

});*/

app.get('/', (request, response) => {
	response.send({
		name: 'Your name',
		school: [
			'BCIT',
			'SFU',
			'UBC'
		]
	});
});

app.get('/info', (request, response) => {
	response.render('about.hbs', {
		title: 'About page',
		year: new Date().getFullYear(),
		welcome: 'Hello'
	});
});

app.get('/404', (request, response) => {
	response.send({
		error: 'Page not found'
	})
})


app.listen(port, () => {`
	console.log(`Server is up on the port ${port}`);
});