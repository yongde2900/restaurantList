const express = require('express')
const router = express.Router()
const restaurantList = require('../../models/restaurant')


router.get('/restaurants/new', (req, res) => {
    res.render('new')
})

router.post('/restaurants', (req, res) => {
    return restaurantList.create(req.body)
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})
router.get('/restaurants/:_id', (req,res) => {
    const _id = req.params._id
    restaurantList.findById(_id)
        .lean()
        .then( restaurants => {
            // console.log(restaurants)
            res.render('show', {restaurants})})
        .catch( error => console.log(error))
})

router.get('/restaurants/:_id/edit', (req, res) => {
    const _id = req.params._id
    restaurantList.findById(_id)
        .lean()
        .then( restaurants => {
            console.log(restaurants)
            res.render('edit', {restaurants})
        })
        .catch( error => console.log(error))
})

router.post('/restaurants/:_id/edit', (req, res) =>{
    const _id = req.params._id
    const edit_restaurant = req.body
     restaurantList.findById(_id)
        .then(restaurants => {
            restaurants = Object.assign(restaurants, req.body)
            return restaurants.save()
        })
        .then(() => res.redirect(`restaurants/${_id}`))
        .catch( error => console.log(error))
})

router.post('/restaurants/:_id/delete', (req, res) => {
    const _id = req.params._id
    const delete_restaurant = req.body
    return restaurantList.findById(_id)
        .then(restaurants => restaurants.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

module.exports = router