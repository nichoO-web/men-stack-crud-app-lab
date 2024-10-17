const dotenv = require('dotenv');
const req = require('express/lib/request');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');

const app = express();

mongoose.connect(process.env.MONGODB_URI);

const Car = require('./models/car');

app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(methodOverride('_method'));

//routes
app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/cars', async (req, res) => {
    const allCars = await Car.find();
    console.log(allCars);
    res.render('cars/index.ejs', { cars: allCars });
});

app.get('/cars/new', (req, res) => {
    res.render('cars/new.ejs');
});

app.get('/cars/:carID', async (req, res) => {
    const foundCar = await Car.findById(req.params.carID);
    res.render('cars/show.ejs', { car: foundCar });
});

app.get('/cars/:carID/edit', async (req, res) => {
    const foundCar = await Car.findById(req.params.carID);
    res.render('cars/edit.ejs', { car: foundCar });
});

app.post('/cars', async (req, res) => {
    await Car.create(req.body);
    res.redirect('/cars');
});

app.put('/cars/:carID', async (req, res) => {
    await Car.findByIdAndUpdate(req.params.carID, req.body);
    res.redirect(`/cars/${req.params.carID}`);
});

app.delete('/cars/:carID', async (req, res) => {
    await Car.findByIdAndDelete(req.params.carID);
    res.redirect('/cars');
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});