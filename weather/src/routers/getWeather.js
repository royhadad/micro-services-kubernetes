const express = require('express')
const fetch = require('node-fetch');
const { lowerCase } = require('lower-case');
const Search = require('../models/search')
const Weather = require('../models/weather');
const router = new express.Router()
const OPEN_WEATHER_MAP_API_KEY = process.env.OPEN_WEATHER_MAP_API_KEY;

//query params:
//search: string
router.get('/', async (req, res) => {
    try {
        //check request validity
        if (!req.query.search || typeof req.query.search !== 'string') {
            return res.status(400).send();
        }
        const search = lowerCase(req.query.search).trim();
        if (!search) {
            return res.status(400).send();
        }

        //save search to DB
        const searchEntry = new Search({
            text: search
        });
        await searchEntry.save();

        //check if weather exists in local DB, if exists - return it instead
        const localWeather = await Weather.findOne({ place: search });
        if (localWeather) {
            return res.status(200).send(localWeather);
        }

        //if local weather not found
        //fetch the weather
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${OPEN_WEATHER_MAP_API_KEY}`);

        //handle errors
        if (response.status !== 200) {
            throw new Error('not found');
        }

        //format result
        let data = await response.json()
        data = {
            place: `${data.name}, ${data.sys.country}`,
            description: data.weather[0].description,
            createdAt: new Date()
        };

        //return a response
        res.status(200).send(data);
    } catch (e) {
        res.status(404).send();
    }
})

module.exports = router;