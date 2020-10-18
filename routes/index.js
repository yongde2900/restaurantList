const express = require('express')
const router = express.Router()
const restaurantList = require('../models/restaurant')
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const search = require('./modules/search')
const methodOverride = require('method-override')

router.use(methodOverride('_method'))
router.use('/', home)
router.use('/restaurants', restaurants)
router.use('/search', search)
module.exports = router