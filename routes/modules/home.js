const express = require('express')
const router = express.Router()
const restaurantList = require('../../models/restaurant')

router.get('/', (req, res) => {
    restaurantList.find()
        .lean()
        .sort({ _id: 'asc' })
        .then( restaurants => {
            res.render('index', {restaurants})
        } )
        .catch(error => console.error(error))
})

module.exports = router