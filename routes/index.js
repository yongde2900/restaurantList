const express = require('express')
const router = express.Router()
const restaurantList = require('../models/restaurant')
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const search = require('./modules/search')
const sort = require('./modules/sort')
const users = require('./modules/users')
const auth = require('./modules/auth')
const methodOverride = require('method-override')
const { authenticator } = require('../middle-ware/auth')

router.use(methodOverride('_method'))
router.use('/restaurants',authenticator, restaurants)
router.use('/search',authenticator, search)
router.use('/sort',authenticator, sort)
router.use('/users', users)
router.use('/auth', auth)
router.use('/',authenticator, home)
module.exports = router