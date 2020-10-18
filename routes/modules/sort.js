const express = require('express')
const { get } = require('mongoose')
const router = express.Router()
const restaurantList = require('../../models/restaurant')

router.get('/AtoZ', (req, res) => {
    restaurantList.find()
        .lean()
        .sort({ name: 'asc' })
        .then( restaurants => {
            res.render('index', {restaurants})
        } )
        .catch(error => console.error(error))
})

router.get('/ZtoA', (req, res) => {
    restaurantList.find()
        .lean()
        .sort({ name: 'desc' })
        .then( restaurants => {
            res.render('index', {restaurants})
        } )
        .catch(error => console.error(error))
})

router.get('/area', (req, res) => {
    restaurantList.find()
        .lean()
        .sort({ location: 'asc' })
        .then(restaurants => {
            res.render('index', {restaurants})
        })
        .catch(error => console.log(error))
})

router.get('/category', (req, res) => {
    restaurantList.find()
        .lean()
        .sort({ category: 'asc' })
        .then(restaurants => {
            res.render('index', {restaurants})
        })
        .catch(error => console.log(error))
})
module.exports = router