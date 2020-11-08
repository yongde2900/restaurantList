const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../../models/user')

router.post('/register', (req, res) => {
    const {name, email, password, confirmpassword} = req.body
    if(!name || !email || !password || !confirmpassword){
        return console.log('皆必填')
    }
    if(password !== confirmpassword){
        return console.log('不相符')
    }
    User.findOne({email})
        .then(user => {
            if (user){
                return console.log('存在')
            }
            return bcrypt.genSalt(10)
            .then(salt => bcrypt.hash(password, salt))
            .then(hash => User.create({name, email, password: hash }))
            .then(() => res.redirect('/users/login'))
            .catch(err => console.log(err))
        })
})
router.get('/login', (req, res) => {
    res.render('login')
})

router.get('/register', (req, res) => {
    res.render('register')
})
module.exports = router