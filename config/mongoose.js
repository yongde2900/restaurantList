const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/restaurant-list' || process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error',() => console.log('mongodb error'))
db.once('open', () => console.log('mongodb connected',))

module.exports = db