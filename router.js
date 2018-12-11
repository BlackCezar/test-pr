const mongodb = require('mongodb'),
      ObjectId = require('mongodb').ObjectID

// let mongoUrl = 'mongodb://localhost:27017'
let mongoUrl = process.env.MONGOURL || "mongodb://doctor-maxin:Hollywood75@ds261078.mlab.com:61078/test-pr"

function router(app) {
    let views = __dirname + '/public/views/';
    app.get('/', (req, res) => {
        res.sendFile(views + 'index.html')
    })

    app.get('/logout', (req, res) => {
        req.session.auth = false
        req.session.clientId = null
        req.session.destroy()
        res.redirect('/')
    })

    app.get('/reg', (req, res) => {
        mongodb.connect(mongoUrl, { useNewUrlParser: true }, (err, client) => {
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
    app.get('/users/me', (req, res) => {
      if (req.session.auth) {
        mongodb.connect(mongoUrl, { useNewUrlParser: true }, (err, client) => {
          if (req.session.admin) {
            client.db('test-pr').collection('teachers').findOne({_id: ObjectId(req.session.clientId)}).then((result) => {
              console.log(result)
              res.send(result)
            })
          } else {
            client.db('test-pr').collection('users').findOne({_id: ObjectId(req.session.clientId)}).then((result) => {
            
              res.send(result)
            })
          }
          
        })
      } else res.sendStatus(401)
    })
    app.get('/cabinet', (req, res) => {
      if (req.session.auth) {
        res.sendFile(views + 'user.html');
      } else {
        res.redirect('/')
      }
    })

    app.post('/createGroup', (req, res) => {
      mongodb.connect(mongoUrl, { useNewUrlParser: true }, (err, client) => {
        if (!req.body.name) {
          res.sendStatus(500)
        } else {
          let obj = {
            name: req.body.name,
            percents: [],
            percents2: [],
            students: [],
            balls: [],
            balls2: [],
            vuz: req.body.vuz,
            acc1: true,
            acc2: false
          }
          client.db('test-pr').collection('groups').insertOne(obj).then(doc => {
            res.send(doc.ops[0])
        })
      }
      })
    })
    app.post('/createVuz', (req, res) => {
      mongodb.connect(mongoUrl, { useNewUrlParser: true }, (err, client) => {
        if (!req.body.name) {
          res.sendStatus(500)
        } else {
          client.db('test-pr').collection('vuzs').insertOne({'name': req.body.name}).then(doc => {
            console.log(doc.ops[0])
            res.send(doc.ops[0])
        })
      }
      })
    })
    app.get('/vuzs', (req, res) => {
      mongodb.connect(mongoUrl, { useNewUrlParser: true }, (err, client) => {
        mongodb.connect(mongoUrl, { useNewUrlParser: true }, (err, client) => {
            client.db('test-pr').collection('vuzs').find().toArray().then(vuzs => res.send(vuzs))
          client.close();
        })
      })
    })
    app.get('/delayGroup:id', (req, res) => {
      mongodb.connect(mongoUrl, { useNewUrlParser: true }, (err, client) => {
        let id = String(req.params.id)
        let obj = new ObjectId(id.slice(1))
        client.db('test-pr').collection('groups').deleteOne({_id: obj}, (err, ress) => {
          if (!err) {
            res.send(JSON.stringify({status: 200}))
          } else res.send(err)
        })
      })
    })
    app.get('/delayVuz:id', (req, res) => {
      mongodb.connect(mongoUrl, { useNewUrlParser: true }, (err, client) => {
        let id = String(req.params.id)
        let obj = new ObjectId(id.slice(1))
        client.db('test-pr').collection('vuzs').deleteOne({_id: obj}, (err, ress) => {
          if (!err) {
            res.send(JSON.stringify({status: 200}))
          } else res.send(err)
        })
      })
    })
    app.get('/vuz:id', (req, res) => {
      let id = String(req.params.id)
      let obj = new ObjectId(id.slice(1))
      mongodb.connect(mongoUrl, { useNewUrlParser: true}, (err, client) => {
        client.db('test-pr').collection('vuzs').findOne({_id: obj}).then(vuz => {
          client.db('test-pr').collection('groups').find({vuz: vuz.name}).toArray().then(groups => {
            vuz.midbal = 0, vuz.midbal2 = 0, vuz.grps = 0, vuz.students = 0, vuz.per1 = 0, vuz.per2 = 0
            for (gr of groups) {
              vuz.midbal += Number(gr.balls || 0)
              vuz.midbal2 += Number(gr.balls2 || 0)
              vuz.per1 += Number(gr.midBalls || 0)
              vuz.per2 += Number(gr.midBalls2 || 0)
              vuz.students += Number(gr.students.length || 0)
              vuz.grps++
              vuz.midbal /= gr.balls.length 
              vuz.midbal2 /= gr.balls2.length
              vuz.per1 /= gr.midBalls.length
              vuz.per2 /= gr.midBalls2.length
              console.log('vuzs ', vuz.per1, vuz.per2)
            }
            console.log(groups)
            let len = groups.length
            vuz.midbal /= len || 0
            vuz.midbal2 /= len || 0
            vuz.per1 /= len || 0
            vuz.per2 /= len || 0
            res.send(vuz)
          })
        }).catch(err => {
          res.sendStatus(404)
        })
      })
    })
    app.get('/groups', (req, res) => {
      mongodb.connect(mongoUrl, { useNewUrlParser: true }, (err, client) => {
        client.db('test-pr').collection('groups').find().toArray().then(grs => res.send(grs)).catch(err => res.send(err))
        client.close();
      })
    })
    app.get('/groups/my', (req, res) => {
      if (req.session.auth) {
        mongodb.connect(mongoUrl, { useNewUrlParser: true }, (err, client) => {
          client.db('test-pr').collection('groups').findOne({name: req.session.group})
            .then(gr => res.send(gr))
            .catch(err => res.send({status: 404}))
        })
      } else res.redirect('/')
    })
    app.get('/group:id', (req, res) => {
      if (req.session.auth) {
        mongodb.connect(mongoUrl, { useNewUrlParser: true }, (err, client) => {
          if (req.query.onlygr) {
            client.db('test-pr').collection('groups').findOne({_id: ObjectId(req.params.id.slice(1))}).then(async gr => {
              let students = []
              console.log(gr.students)
              if (gr.students.length > 0) {
                for (student of gr.students) {
                  let st = await client.db('test-pr').collection('users').findOne({_id: ObjectId(student.id)})
                  students.push(st)
                }
              }
              res.send({group: gr, students: students})
            }).catch(err => res.send({err: err}))
            
          } else {
            res.sendFile(views + 'about_group.html')
          }
        })
    } else res.redirect('/auth_teach')
    })

    app.get('/admin', (req, res) => {
      if (req.session.auth) {
        res.sendFile(views + 'admin.html');
      } else {
        res.redirect('/auth_teach')
      }
    })

    app.get('/auth_teach', (req, res) => {
      res.render('admin_auth.ejs')
    })
    app.get('/t', (req, res) => {
      res.sendFile(views + 'tests.html')
    })
    app.get('/test', (req, res) => {
      if (req.session.auth) {
        mongodb.connect(mongoUrl, { useNewUrlParser: true }, { useNewUrlParser: true }, (err, client) => {
          client.db('test-pr').collection('tests').find({userId: req.session.clientId}).toArray().then(tests => {
            if (tests.length < 2) {
              res.render('test.ejs')
            } else {
              res.redirect('/')
            }
          })
        })
      } else {
        res.redirect('/')
      }
    })
    app.post('/changeAccess:id', (req, res) => {
      if (req.session.auth) {
        mongodb.connect(mongoUrl, { useNewUrlParser: true }, (err, client) => {
          client.db('test-pr').collection('groups').findOne({_id: ObjectId(req.params.id.slice(1))}).then(gr => {
            if (req.body.access == 'one') {
              if (gr.acc1) {
                gr.acc1 = false
              } else gr.acc1 = true
            } else {
              if (gr.acc2) {
                gr.acc2 = false
              } else gr.acc2 = true
            }
            console.log(req.body.access)
            client.db('test-pr').collection('groups').updateOne({_id: ObjectId(req.params.id.slice(1))}, {$set: {'acc1': gr.acc1, 'acc2': gr.acc2}}).then(function() {
              res.sendStatus(200)
            }).catch(reason => {
              res.sendStatus(400)
            })
          })
        })
      } else res.redirect('/auth_teach')
    })
    app.get('/tests/me', (req, res) => {
      if (req.session.auth) {
        mongodb.connect(mongoUrl, { useNewUrlParser: true }, (err, client) => {
          client.db('test-pr').collection('tests').find({userId: req.session.clientId}).toArray()
              .then(tests => res.send(tests))
        })
      } else res.send({status: 401})
    })
    app.get('/student:id', (req, res) => {
      if (req.session.auth) {
        mongodb.connect(mongoUrl, { useNewUrlParser: true }, (err, client) => {
          client.db('test-pr').collection('tests').find({userId: req.params.id.slice(1)}).toArray()
          .then(tests => {
            client.db('test-pr').collection('users').findOne({_id: ObjectId(req.params.id.slice(1))}).then(student => {
              client.db('test-pr').collection('teachers').findOne({_id: ObjectId(req.session.clientId)}).then((user) => {
                res.render('about_user.ejs', {student: student, tests: tests, user: user})
              })
            })
          })
        })
      } else res.redirect('/auth_teach')
    })

    app.post('/', (req, res) => {
        mongodb.connect(mongoUrl, { useNewUrlParser: true }, { useNewUrlParser: true }, (err, client) => {
            client.db('test-pr').collection('users').findOne(req.body).then(result => {
              if (result) {
                req.session.auth = true
                req.session.clientId = result._id
                console.log('id is ' + req.session.clientId);
                req.session.group = result.group
                res.redirect('/cabinet')
              } else throw err
            }).catch(err => {
                console.log(err)
                res.sendFile(views + 'index.html');
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
                  req.session.admin = true
                  res.redirect('/admin')
              } else throw 'Not fined'
            }).catch(err => {
                console.log(err)
                res.render('admin_auth.ejs')
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
                        client.db('test-pr').collection('groups').updateOne({name: req.body.group}, { $push: {students: {name: req.body.fio, id: result.insertedId}}})
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
                        req.session.admin = true
                        res.redirect('/admin')
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
      console.log('Obj id ' + obj.clientId)
        mongodb.connect(mongoUrl, { useNewUrlParser: true }, { useNewUrlParser: true }, (err, client) => {
            client.db('test-pr').collection('tests').insertOne(obj)
            client.db('test-pr').collection('tests').find({userId: req.session.clientId}).toArray().then(tests => {
              if (tests.length == 1) {
                client.db('test-pr').collection('groups').updateOne({name: req.session.group}, { $push: {percents: {procents: procents, id: obj.userId}, balls: {balls: obj.ball, id: obj.userId}, trueAnsw: {trueAnsw: obj.trueAnswers, id: obj.userId}}})
              } else {
                client.db('test-pr').collection('groups').updateOne({name: req.session.group}, { $push: {percents2: {procents: procents, id: obj.userId}, balls2: {balls: obj.ball, id: obj.userId}, trueAnsw2: {trueAnsw: obj.trueAnswers, id: obj.userId}}})
              }
              res.sendStatus(200)
            })
        })
    })

}

function sortGroups(groups) {
  groups.forEach(group => {
    group.middlePerCent = 0
    group.middlePerCent2 = 0
    group.middleBall = 0
    group.middleBall2 = 0
    let len = 0
    if (group.hasOwnProperty('students')) {
      len = group.students.length
    } 
    if (group.hasOwnProperty('balls')) {
      for (let i = 0; i < group.balls.length; i++) {
        group.middleBall += group.balls[i]
      }
      if (group.middleBall != 0) {
        group.middleBall = group.middleBall / len 
      }
    }
    if (group.hasOwnProperty('balls2')) {
      for (let i = 0; i < group.balls2.length; i++) {
        group.middleBall2 += group.balls2[i]
      }
      if (group.middleBall2 != 0) {
        group.middleBall2 = group.middleBall2 / len 
      }
    }
    if (group.hasOwnProperty('middlePerCent')) {
      for (let i = 0; i < group.midBalls.length; i++) {
        group.middlePerCent += group.midBalls[i]
      }
      if (group.middlePerCent != 0) {
        group.middlePerCent = group.middlePerCent / len 
      }
    }
    if (group.hasOwnProperty('middlePerCent2')) {
      for (let i = 0; i < group.midBalls.length; i++) {
        group.middlePerCent2 += group.midBalls[i]
      }
      if (group.middlePerCent2 != 0) {
        group.middlePerCent2 = group.middlePerCent2 / len 
      }
    }
  })
  return groups
}

module.exports.router = router
