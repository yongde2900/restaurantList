const express =require('express')
const router = express.Router()
const restaurantList = require('../../models/restaurant')

router.get('/', (req, res) => {
    const { keyword } = req.query
    return restaurantList.find({ $or: [{ name: new RegExp(keyword, 'i') }, { category: new RegExp(keyword, 'i') }] })
      .lean()
      .then(restaurants => {
          res.render('index', { restaurants, keyword: req.query.keyword })
      })
  })

module.exports = router