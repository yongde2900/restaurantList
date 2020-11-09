const express = require('express')
const router = express.Router()
const restaurantList = require('../../models/restaurant')


router.get('/new', (req, res) => {
    res.render('new')
})

router.post('/', (req, res) => {
    req.body.userId = req.user._id
        return restaurantList.create(req.body)
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})
router.get('/:_id', (req, res) => {
    const userId = req.user._id
    const _id = req.params._id
    restaurantList.findOne({_id, userId})
        .lean()
        .then(restaurants => {
            // console.log(restaurants)
            res.render('show', { restaurants })
        })
        .catch(error => console.log(error))
})

router.get('/:_id/edit', (req, res) => {
    const userId = req.user._id
    const _id = req.params._id
    restaurantList.findOne({_id, userId})
        .lean()
        .then(restaurants => {
            console.log(restaurants)
            res.render('edit', { restaurants })
        })
        .catch(error => console.log(error))
})

router.put('/:_id', (req, res) => {
    const userId = req.user._id
    const _id = req.params._id
    return restaurantList.findOne({_id, userId})
        .then(restaurant => {
            restaurant = Object.assign(restaurant, req.body)
            return restaurant.save()
        })
        .then(() => res.redirect(`/restaurants/${_id}`))
        .catch(err => console.log(err))
})

router.delete('/:_id', (req, res) => {
    const _id = req.params._id
    const userId = req.user._id
    return restaurantList.findOne({_id, userId})
        .then(restaurants => restaurants.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

module.exports = router