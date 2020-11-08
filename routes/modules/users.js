const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')
const User = require('../../models/user')

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
}))

router.get('/logout', (req, res) => {
    req.logout()
    req.flash('success_msg', '你已成功登出。')
    res.redirect('/users/login')
})

router.get('/register', (req, res) => {
    res.render('register')
})

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
module.exports = router