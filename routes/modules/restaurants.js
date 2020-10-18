const express = require('express')
const router = express.Router()
const restaurantList = require('../../models/restaurant')


router.get('/new', (req, res) => {
    res.render('new')
})

router.post('/', (req, res) => {
    return restaurantList.create(req.body)
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})
router.get('/:_id', (req, res) => {
    const _id = req.params._id
    restaurantList.findById(_id)
        .lean()
        .then(restaurants => {
            // console.log(restaurants)
            res.render('show', { restaurants })
        })
        .catch(error => console.log(error))
})

router.get('/:_id/edit', (req, res) => {
    const _id = req.params._id
    restaurantList.findById(_id)
        .lean()
        .then(restaurants => {
            console.log(restaurants)
            res.render('edit', { restaurants })
        })
        .catch(error => console.log(error))
})

router.put('/:_id', (req, res) => {
    const _id = req.params._id
    let { name, name_en, category, phone, image, location, rating, google_map, description } = req.body
    return restaurantList.findById(_id)
        .then(restaurant => {
            restaurant.name = name
            restaurant.name_en = name_en
            restaurant.category = category
            restaurant.phone = phone
            restaurant.image = image
            restaurant.location = location
            restaurant.rating = rating
            restaurant.google_map = google_map
            restaurant.description = description
            return restaurant.save()
        })
        .then(() => res.redirect(`/restaurants/${_id}`))
        .catch(err => console.log(err))
})

router.delete('/:_id', (req, res) => {
    const _id = req.params._id
    return restaurantList.findById(_id)
        .then(restaurants => restaurants.remove())
        .then(() => res.redirect('/'))
        .catch(error => console.log(error))
})

module.exports = router