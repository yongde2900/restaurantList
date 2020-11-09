const passport = require('passport')
const LocalStartegy = require('passport-local').Strategy
const FacebookStartegy = require('passport-facebook').Strategy
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const saltRounds = 10
module.exports = app => {
    //初始化passport模組
    app.use(passport.initialize())
    app.use(passport.session())
    //設定臉書登入策略
    passport.use(new FacebookStartegy({
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK,
        profileFields: ['email', 'displayName']
    }, (accessToken, refreshToken, profile, done) => {
        const {name, email} = profile._json
        User.findOne({email})
            .then(user => {
                if (user) return done(null, user)
                const randomPassword = Math.random().toString(36).slice(-8)
                bcrypt.genSalt(saltRounds)
                    .then(salt => bcrypt.hash(randomPassword, salt))
                    .then(hash => User.create({name, email, password: hash}))
                    .then(user => done(null, user))
                    .catch(err => done(err, false))
            })  
    }))
    //設定本地登入策略
    passport.use(new LocalStartegy({usernameField: 'email'}, (email, password, done) => {
        User.findOne({email}) 
            .then(user => {
                if (!user){
                    return done(null, false, {message: 'That email is not registered.'})
                }
                return bcrypt.compare(password, user.password)
                    .then(isMatch => {
                        if( !isMatch){
                            return done(null, false, {message: 'Email or password incorrect.'})
                        }
                        return done(null, user)
                    })
                    .catch(err => done(err, false))
            })
            .catch(err => done(err, false))
    }))
    //設定序列化與反序列化
    passport.serializeUser((user, done) => {
        done(null,user.id)
    })
    passport.deserializeUser((id, done) => {
        User.findById(id)
            .lean()
            .then(user => done(null, user))
            .catch(err => done(err, false))
    })

}
