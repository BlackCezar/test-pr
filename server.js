const express = require('express'),
  mongodb = require('mongodb'),
  http = require('http'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  ejs = require('ejs'),
  ObjectId = require('mongodb').ObjectID

// let mongoUrl = 'mongodb://127.0.0.1:27017'
let mongoUrl = process.env.MONGOURL || "mongodb://doctor-maxin:Hollywood75@ds261078.mlab.com:61078/test-pr"

const app = express()
var port = process.env.PORT || 5000

mongodb.connect(mongoUrl, {
  useNewUrlParser: true
}, function (err, db) {
  if (!err) {
    http.createServer(app).listen(port, () => console.log('Express server listening on ' + port))
  } else console.log('Sorry but Mongodb is not connected ', err)
})

app.set('views', 'public/views')
app.use(session({
  secret: 'sec',
  saveUninitialized: true,
  resave: true
}))

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

app.use(express.static('public'))

require('./router').router(app)
