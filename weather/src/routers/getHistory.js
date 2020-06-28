const express = require('express')
const Search = require('../models/search')
const router = new express.Router()

//query params:
//limit=10
//skip=0
router.get('/history', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 10;
        const skip = parseInt(req.query.skip) || 0;
        const sortObject = { createdAt: -1 };
        const history = await Search
            .find()
            .sort(sortObject)
            .limit(limit)
            .skip(skip)
            .exec();
        res.status(200).send(history);
    } catch (e) {
        res.status(500).send();
    }
})

module.exports = router;