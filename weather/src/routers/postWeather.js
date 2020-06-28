const express = require('express')
const { lowerCase } = require('lower-case');
const Weather = require('../models/weather')
const router = new express.Router()

//body:
//place: string
//description: string
router.post('/', async (req, res) => {
    try {
        //check request validity
        if (!req.body.place ||
            typeof req.body.place !== 'string' ||
            !req.body.description ||
            typeof req.body.description !== 'string') {
            return res.status(400).send();
        }
        const place = lowerCase(req.body.place).trim();
        const description = lowerCase(req.body.description).trim();
        if (!place || !description) {
            return res.status(400).send();
        }

        //check if weather entry already exists
        const currentItem = await Weather.findOne({
            place
        });
        if (currentItem) {
            //update entry for place
            currentItem.description = description;
            await currentItem.save();
            res.status(200).send();
        } else {
            //create new entry for place
            const weather = new Weather({
                place,
                description
            })
            await weather.save();
            res.status(201).send();
        }
    } catch (e) {
        res.status(500).send();
    }
})

module.exports = router;