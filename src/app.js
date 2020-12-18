const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

// console.log(__dirname);
// console.log(__filename);
// console.log(path.join(__dirname, '../public'));

const app = express();
const port = process.env.PORT || 3000;

// Define paths for express config
const publicDirectory = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../src/templates/views');
const partialPath = path.join(__dirname, '../src/templates/partials');

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);

// Setup static directory to serve
app.use(express.static(publicDirectory));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'DSK Rana'
    });
});
/*
app.get('', (req, res) => {
    // res.send('Hello Express !!!');

    // Serving HTML and JSON
    res.send('Hello Express !!!<br><h1>Oranges</h1>');
});
*/
// app.use(express.static(path.join(__dirname, '../public/help.html')));
// /*
app.get('/help', (req, res) => {
    res.render('help', {
        please: 'Help me',
        never: 'fuck off'
    });
    // res.send('Wow !!! I missed it');
    // console.log('Hey. I am here to help !!!');
});
// */
// app.use(express.static(path.join(__dirname, '../public/about.html')));
// /*
app.get('/about', (req, res) => {
    // res.send('Nothing to know about !!!');
    res.render('about', {
        everything: 'About',
        nothing: 'What about'
    });
    // res.send([{nsa: 20, nhgfd: 'jhgfd'},{nsa: 20, nhgfd: 'jhgfd'}]);
});
// */

app.get('/help/*', (req, res) => {
    res.render('404NotFound', {
        abc: 'def',
        errorMessage: 'Page Not Found.'
    });
});

app.get('/weather', (req, res) => {
    // res.send('For Current weather - checkout the weather-app !!!');
    if (!req.query.address) {
        return res.send({
            error: 'Please provide the address.'
        });
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error });
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error });
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            });
        });
    });

    // console.log(req.query.address);
    // res.send({
    //     forecast: 'clear sky',
    //     location: 'Surat',
    //     address: req.query.address
    // });
});

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        });
    }
    console.log(req.query.search);
    res.send({
        product: []
    });
});

app.get('*', (req, res) => {
    res.render('404NotFound', {
        abc: 'def',
        errorMessage: 'Page Not Found.'
    });
});

app.listen(port, () => {
    console.log('Listening on port 3000');
});