const mongodb = require('mongodb'),
      ObjectId = require('mongodb').ObjectID

let mongoUrl = 'mongodb://localhost:27017'

function router(app) {

    app.get('/', (req, res) => {
        res.render('index.ejs', {title: 'asdasd'})
    })

    app.get('/logout', (req, res) => {
        req.session.auth = false
        req.session.clientId = null
        req.session.destroy()
        res.redirect('/')
    })

    app.get('/reg', (req, res) => {
        mongodb.connect(mongoUrl, { useNewUrlParser: true }, { useNewUrlParser: true }, (err, client) => {
          if (err) {
            res.sendStatus(500)
          } else {
            client.db('test-pr').collection('groups').find().toArray()
              .then(grps => {

                res.render('reg.ejs', {error: null, groups: grps})
              })
          }

        })
    })

    app.get('/reg_teach', (req, res) => {
        mongodb.connect(mongoUrl, { useNewUrlParser: true }, (err, client) => {
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

    app.get('/cabinet', (req, res) => {
      if (req.session.auth) {
        mongodb.connect(mongoUrl, { useNewUrlParser: true }, (err, client) => {
          client.db('test-pr').collection('users').findOne({_id: ObjectId(req.session.clientId)}).then((result) => {
            client.db('test-pr').collection('tests').find({'userId': req.session.clientId}).toArray().then(tests => {
              if (!tests[0]) {
                tests = []
              }
              res.render('user.ejs', {'user': result, 'tests': tests});
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

    app.post('/createGroup', (req, res) => {
      mongodb.connect(mongoUrl, { useNewUrlParser: true }, (err, client) => {
        if (!req.body.name) {
          res.sendStatus(500)
        } else {
          client.db('test-pr').collection('groups').insertOne({'name': req.body.name}).then(doc => {
            console.log(doc.ops[0])
            res.send(doc.ops[0])
        })
      }
      })
    })
    app.get('/delayGroup:id', (req, res) => {
      mongodb.connect(mongoUrl, { useNewUrlParser: true }, (err, client) => {
        let id = String(req.params.id)
        let obj = new ObjectId(id.slice(1))
        client.db('test-pr').collection('groups').deleteOne({_id: obj}, (err, ress) => {
          if (!err) {
            res.sendStatus(200)
          } else res.send(err)
        })
      })
    })

    app.get('/getGroup:id', (req, res) => {
      // if (req.session.auth) {
      mongodb.connect(mongoUrl, { useNewUrlParser: true }, (err, client) => {
        client.db('test-pr').collection('teachers').findOne({_id: ObjectId(req.session.clientId)})
          .then((result) => {
            client.db('test-pr').collection('groups').findOne({_id: ObjectId(req.params.id.slice(1))})
              .then(grr => {
                async function pushSt () {
                  let students = []
                  for (let student of grr.students) {
                    await client.db('test-pr').collection('users').findOne({fio: student})
                      .then(st => {
                        let i = grr.students.indexOf(student)
                        console.log(grr)
                        st.percent = grr.midBalls[i]
                        st.ball = Math.round(st.percent / 100 * 18)
                        students.push(st)
                      })
                  }
                  return students
                }

                pushSt().then(students => {
                  console.log('students, ', students)
                  res.render('about_group.ejs', {group: grr, user: result, students: students})
                });
              })
          })
          .catch(err => {
            console.log('er ', err)
            res.sendStatus(500)
          })
      })
    })

    app.get('/cabinet_tch', (req, res) => {
      if (req.session.auth) {
        mongodb.connect(mongoUrl, { useNewUrlParser: true }, { useNewUrlParser: true }, (err, client) => {
          client.db('test-pr').collection('teachers').findOne({_id: ObjectId(req.session.clientId)}).then((result) => {
            client.db('test-pr').collection('tests').find({}).toArray().then(tests => {
              client.db('test-pr').collection('groups').find({}).toArray().then(groups => {
                groups.forEach(group => {
                  group.middleBall = 0
                  for (let i = 0; i < group.midBalls.length; i++) {
                    group.middleBall += group.midBalls[i]
                  }
                  let len
                  if (group.hasOwnProperty('students')) {
                    len = group.students.length
                  } else {len = 0}
                  console.log(len)
                  group.middleBall = group.middleBall / len

                })
                console.dir(result);
                res.render('cabinet.ejs', {'user': result, 'tests': tests, 'groups': groups } )
              })
            })
          })
        })
      } else {
        res.redirect('/')
      }
      function getErrr(err) {
        console.log(err)
        res.send(err)
      }
    })


    app.get('/test', (req, res) => {
      if (req.session.auth) {
        mongodb.connect(mongoUrl, { useNewUrlParser: true }, { useNewUrlParser: true }, (err, client) => {
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

    app.post('/', (req, res) => {
        mongodb.connect(mongoUrl, { useNewUrlParser: true }, { useNewUrlParser: true }, (err, client) => {
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
        mongodb.connect(mongoUrl, { useNewUrlParser: true }, { useNewUrlParser: true }, (err, client) => {
            client.db('test-pr').collection('teachers').findOne(req.body).then(result => {
              if (result) {
                console.log(result)
                  req.session.auth = true
                  req.session.clientId = result._id
                  req.session.group = result.group
                  res.redirect('/cabinet_tch')
              } else throw 'Not fined'
            }).catch(err => {
                console.log(err)
                res.render('index.ejs', {title: 'asdasd'})
            })
        })
    })

    app.post('/reg', (req, res) => {
        mongodb.connect(mongoUrl, { useNewUrlParser: true }, { useNewUrlParser: true }, (err, client) => {
            if (!err) {
                client.db('test-pr').collection('users').insertOne(req.body, (err, result) => {
                    if (err) {
                        console.log(err)
                        res.render('reg.ejs', {'error': err})
                    } else {
                        client.db('test-pr').collection('groups').updateOne({name: req.body.group}, { $set: {students: req.body.fio}})
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
        mongodb.connect(mongoUrl, { useNewUrlParser: true }, { useNewUrlParser: true }, (err, client) => {
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
        })
    })

    app.post('/save_test', (req, res) => {
        obj = {}
        obj.userId = req.session.clientId
        obj.group = req.session.group
        obj.answers = req.body.answers
        obj.ball = req.body.ball
        obj.trueAnswers = req.body.goodAnswers

        let procents = Math.round(req.body.goodAnswers / 18 * 100)

        mongodb.connect(mongoUrl, { useNewUrlParser: true }, { useNewUrlParser: true }, (err, client) => {
            client.db('test-pr').collection('tests').insertOne(obj)
            client.db('test-pr').collection('tests').find({userId: req.session.clientId}).toArray().then(tests => {
              if (tests.length == 1) {
                client.db('test-pr').collection('groups').updateOne({name: req.session.group}, { $push: {midBalls: procents, balls: obj.ball}})
              } else {
                client.db('test-pr').collection('groups').updateOne({name: req.session.group}, { $push: {midBalls2: procents, balls2: obj.ball}})
              }
              res.sendStatus(200)
            })
        })
    })
}

module.exports.router = router
