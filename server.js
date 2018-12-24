const express = require('express'),
  http = require('http'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  ejs = require('ejs')

let mongoUrl = 'mongodb://127.0.0.1:27017'
// let mongoUrl = process.env.MONGOURL || "mongodb://doctor-maxin:Hollywood75@ds261078.mlab.com:61078/test-pr"

const app = express()
var port = process.env.PORT || 5001

http.createServer(app).listen(port, () => console.log('Express server listening on ' + port))

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