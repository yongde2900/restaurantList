const db = require('../../config/mongoose')
const User =require('../user')
const Restaurant =require('../restaurant')
const bcrypt = require('bcryptjs')
const restaurants = require('../restaurant.json').results
const user = require('../user.json').result
const saltRounds = 10

db.once('open', () => {
    bcrypt.genSalt(saltRounds)
        .then(salt => bcrypt.hash(user[0].password, salt))
        .then(hash => {
            user.forEach(user => {
                user.password = hash
            })
            return User.insertMany(user)
        })
        .then( user => {
            restaurants.forEach(restaurants => {
                if (restaurants.id < 4 ){
                    restaurants.userId = user[0]._id
                }
                else{
                    restaurants.userId = user[1]._id
                }
            })
            return Restaurant.insertMany(restaurants)
        })
        .then(() => {
            console.log('Done')
            process.exit()
        })
})