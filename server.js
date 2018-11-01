const express = require('express'),
      mongodb = require('mongodb'),
      http = require('http'),

      bodyParser = require('body-parser'),
      session = require('express-session'),
      ejs = require('ejs'),
      ObjectId = require('mongodb').ObjectID

let mongoUrl = 'mongodb://localhost:27017';

const app = express()
mongodb.connect(mongoUrl, function (err, db) {
    http.createServer(app).listen(5000, () => console.log('Express server listening on ' + 5000))
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

app.get('/', (req, res) => {
    res.render('index.ejs', {title: 'asdasd'})
})

app.post('/', (req, res) => {
    mongodb.connect(mongoUrl, (err, client) => {
        client.db('test-pr').collection('users').findOne(req.body).then(result => {
            req.session.auth = true
            req.session.clientId = result._id
            console.log(result);
            req.session.group = result.group
            res.redirect('/cabinet')
        }).catch(err => {
            console.log(err)
            res.render('index.ejs', {title: 'asdasd'})
        })
    })
})
app.post('/auth_teach', (req, res) => {
    mongodb.connect(mongoUrl, (err, client) => {
        client.db('test-pr').collection('teachers').findOne(req.body).then(result => {
            req.session.auth = true
            req.session.clientId = result._id
            req.session.group = result.group
            res.redirect('/cabinet_tch')
        }).catch(err => {
            console.log(err)
            res.render('index.ejs', {title: 'asdasd'})
        })
    })
})

app.get('/logout', (req, res) => {
    req.session.auth = false
    req.session.clientId = null
    req.session.destroy()
    res.redirect('/')
})

app.get('/reg', (req, res) => {
    res.render('reg.ejs', {error: null})
})
app.get('/reg_teach', (req, res) => {
    mongodb.connect(mongoUrl, (err, client) => {
        if (!err) {
            client.db('test-pr').collection('users').find({}, {"group": 1}).toArray().then(docs => {
                let groups = []
                for (gr of docs) {
                    if (gr.group) {
                        if (groups.indexOf(gr.group) === -1) {
                            groups.push(gr.group)
                        }
                    }
                }
                res.render('reg_teach.ejs', {error: null, 'users': groups})
            }).catch(err => {
                console.log(err)
            });
        }
    })
})

app.post('/reg', (req, res) => {
    mongodb.connect(mongoUrl, (err, client) => {
        if (!err) {
            client.db('test-pr').collection('users').insertOne(req.body, (err, result) => {
                if (err) {
                    console.log(err)
                    res.render('reg.ejs', {'error': err})
                } else {
                    req.session.auth = true
                    req.session.clientId = result.insertedId
                    req.session.group = req.body.group
                    res.redirect('/cabinet')
                }
            })
        }
    })
})

app.post('/reg_teach', (req, res) => {
    mongodb.connect(mongoUrl, (err, client) => {
        if (!err) {
            client.db('test-pr').collection('teachers').insertOne(req.body, (err, result) => {
                if (err) {
                    console.log(err)
                    res.render('reg_teach.ejs', {'error': err})
                } else {
                    req.session.auth = true
                    req.session.clientId = result.insertedId
                    req.session.group = result.group
                    res.redirect('/cabinet_tch')
                }
            })
        }
    client.close()
    })
})

app.get('/cabinet', (req, res) => {
    if (req.session.auth) {
        mongodb.connect(mongoUrl, (err, client) => {
            client.db('test-pr').collection('users').findOne({_id: ObjectId(req.session.clientId)}).then((result) => {
                client.db('test-pr').collection('tests').find({'userId': req.session.clientId}).toArray().then(tests => {
                    if (!tests[0]) {
                        tests = []
                    }
                    res.render('user.ejs', {'user': result, 'tests': tests})
                    console.log(tests)
                }).catch(err => {
                    console.log(err)
                    res.sendStatus(500)
                })
            })
        }) 
    } else {
        res.redirect('/')
    }
})
app.get('/cabinet_tch', (req, res) => {
    if (req.session.auth) {
        mongodb.connect(mongoUrl, (err, client) => {
            client.db('test-pr').collection('teachers').findOne({_id: ObjectId(req.session.clientId)}).then((result) => {
                client.db('test-pr').collection('tests').find({group: req.session.group}).toArray().then(tests => {
                    res.render('cabinet.ejs', {user: result, 'tests': tests})
                })   
            })
        }) 
    } else {
        res.redirect('/')
    }
})
app.get('/test', (req, res) => {
    if (req.session.auth) {
        mongodb.connect(mongoUrl, (err, client) => {
            client.db('test-pr').collection('tests').find({userId: req.session.clientId}).toArray().then(tests => {
                if (tests.length < 2) {
                    res.render('test.ejs')
                } else {
                    redirect('/')
                }
            })
        })
    } else {
        res.redirect('/')
    }
})

app.post('/save_test', (req, res) => {
    obj = {}
    obj.userId = req.session.clientId
    obj.group = req.session.group
    obj.answers = req.body.answers
    obj.ball = req.body.ball
    obj.trueAnswers = req.body.goodAnswers

    console.log(req.body)

    mongodb.connect(mongoUrl, (err, client) => {
        client.db('test-pr').collection('tests').insertOne(obj)
        res.sendStatus(200)
    }) 
})