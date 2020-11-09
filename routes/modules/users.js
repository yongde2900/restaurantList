const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const passport = require('passport')
const User = require('../../models/user')
const saltRounds = 10

router.get('/login', (req, res) => {
    res.render('login')
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true
}))

router.get('/logout', (req, res) => {
    req.logout()
    req.flash('success_msg', '你已經成功登出。')
    res.redirect('/users/login')
})

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', (req, res) => {
    const { name, email, password, confirmpassword } = req.body
    const errors = []
    if (!email || !password || !confirmpassword) {
        errors.push({ message: '所有欄位皆為必填' })
    }
    if (password !== confirmpassword) {
        errors.push({ message: '密碼與確認密碼不相符' })
    }
    if (errors.length) {
        return res.render('register', {
            errors,
            name,
            email,
            password,
            confirmpassword
        })
    }
    User.findOne({ email })
        .then(user => {
            if (user) {
                errors.push({ message: '這個 Email 已經註冊過了。' })
                return res.render('register', {
                    errors,
                    name,
                    email,
                    password,
                    confirmpassword
                })
            }
            return bcrypt.genSalt(saltRounds)
                .then(salt => bcrypt.hash(password, salt))
                .then(hash => User.create({ name, email, password: hash }))
                .then(() => res.redirect('/users/login'))
                .catch(err => console.log(err))
        })
})
module.exports = router