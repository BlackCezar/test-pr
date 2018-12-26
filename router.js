const mongodb = require('mongodb'),
      ObjectId = require('mongodb').ObjectID,
      Datastore = require('nedb-promises')

  userdb = Datastore.create({filename: './db/users.json', inMemoryOnly : false, autoload: true})
  testdb = Datastore.create({filename: './db/tests.json', inMemoryOnly: false, autoload: true})
  groupdb = Datastore.create({filename: './db/groups.json', inMemoryOnly: false, autoload: true})
  vuzdb = Datastore.create({filename: './db/vuzs.json', inMemoryOnly: false, autoload: true})
  teacherdb = Datastore.create({filename: './db/teachers.json', inMemoryOnly: false, autoload: true})
  formdb = Datastore.create({filename: './db/forms.json', autoload: true})

// let mongoUrl = process.env.MONGOURL || "mongodb://doctor-maxin:Hollywood75@ds261078.mlab.com:61078/test-pr"

function router(app) {
    let views = __dirname + '/public/views/';

    app.get('/', (req, res) => {
        res.sendFile(views + 'index.html')
    })

    app.get('/form.html', (req,res) => {
      res.sendFile(views + 'form.html');
    })

    app.get('/logout', (req, res) => {
        req.session.auth = false
        req.session.clientId = null
        req.session.destroy()
        res.redirect('/')
    })

    app.get('/reg', (req, res) => {
        groupdb.find()
              .then(grps => {
                console.log(grps)
                res.render('reg.ejs', {error: null, groups: grps})
              })
    })

    app.get('/reg_teach', (req, res) => {
      vuzdb.find()
        .then(vuzs => {
          res.render('reg_teach.ejs', {error: null, vuzs: vuzs})
        })
    })

    app.get('/users/me', (req, res) => {
      if (req.session.auth) {
          if (req.session.admin) {
            teacherdb.find({_id: req.session.clientId})
              .then(teacher => { if (teacher.length) {res.send(teacher)} else throw err })
              .catch(err => res.send({status: 404}))
          } else {
            userdb.find({_id: req.session.clientId})
              .then(user => res.send(user))
              .catch(err => res.send({status: 404}))
          }
      } else res.send({status: 401})
    })

    app.get('/cabinet', (req, res) => {
      if (req.session.auth) {
        res.sendFile(views + 'user.html');
      } else {
        res.redirect('/')
      }
    })

    app.post('/createGroup', (req, res) => {
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
        groupdb.insert(obj)
          .then(result => {
            res.send(result)
          })
      }
    })

    app.post('/createVuz', (req, res) => {
      if (!req.body.name) {
        res.sendStatus(500)
      } else {
        vuzdb.insert({'name': req.body.name})
        .then(result => {
          res.send(result)
        })
      }
    })

    app.get('/vuzs', (req, res) => {
      vuzdb.find().then(vuzs => res.send(vuzs))
    })

    app.get('/delayGroup:id', (req, res) => {
      groupdb.remove({_id: req.params.id.slice(1)}).then(re => res.send({status: 200}))
    })

    app.get('/delayVuz:id', (req, res) => {
      vuzdb.remove({_id: req.params.id.slice(1)}).then(result => res.send({status: 200})).catch(result => res.send({status: 404}))
    })

    app.get('/vuz:id', (req, res) => {
      vuzdb.findOne({_id: req.params.id.slice(1)}).then(vuz => {
        groupdb.find({vuz: vuz.name}).then(groups => {
          vuz.midbal = 0, vuz.midbal2 = 0, vuz.grps = 0, vuz.students = 0, vuz.per1 = 0, vuz.per2 = 0
          for (gr of groups) {
            vuz.midbal += getMiddler('balls', gr, 'balls')
            vuz.midbal2 += getMiddler('balls2', gr, 'balls')
            vuz.per1 += getMiddler('percents', gr, 'procents') 
            vuz.per2 += getMiddler('percents2', gr, 'procents') 
            vuz.students += Number(gr.students.length || 0)
            vuz.grps++
          }
          
          let len = groups.length
          vuz.midbal /= len || 0
          vuz.midbal2 /= len || 0
          vuz.per1 /= len || 0
          vuz.per2 /= len || 0
          res.send(vuz)

          function getMiddler(prop, gr, data) {
            let mdlbal = 0
            for (pr of gr[prop]) {
              mdlbal += Number(pr[data])
            }
            if (mdlbal > 0) {
              mdlbal /= gr[prop].length
            } 
            return mdlbal
          }
        })
      }).catch(err => {
        res.send({status: 404})
      })

    })

    app.get('/groups', (req, res) => {
     groupdb.find().then(grs => res.send(grs)).catch(err => res.send(err))
    })

    app.get('/groups/my', (req, res) => {
      if (req.session.auth) {
        groupdb.findOne({name: req.session.group})
          .then(gr => res.send(gr))
          .catch(err => res.send({status: 404}))
      } else res.redirect('/')
    })

    app.get('/group:id', (req, res) => {
      if (req.session.auth) {
        if (req.query.onlygr) {
          groupdb.findOne({_id: req.params.id.slice(1)})
            .then(async gr => {
              let students = []
              if (gr.students.length > 0) {
                for (student of gr.students) {
                  let st = await userdb.findOne({_id: student.id})
                  students.push(st)
                }
              }
              res.send({group: gr, students: students})
            }).catch(err => res.send({err: err}))
        } else res.sendFile(views + 'about_group.html')
      } else res.redirect('/auth_teach')
    })

    app.get('/admin', (req, res) => {
      console.log(req.session.admin)
      if (req.session.admin) {
        res.sendFile(views + 'admin.html');
      } else {
        res.redirect('/auth_teach')
      }
    })

    app.get('/auth_teach', (req, res) => {
      res.sendFile(views + 'admin_auth.html')
    })

    app.get('/test/:id', (req, res) => {
      if (req.session.auth) {
        groupdb.findOne({name: req.session.group}).then(group => {
          testdb.find({userId: req.session.clientId}).then(tests => {
            let acc = true;
            for (test of tests) {
              if (req.url.slice(6) == test.test) {
                if (!group.acc2 && test.try == 1) acc = false;
                if (test.try == 2) acc = false;   
              }
              if (!group.acc1) acc = false;
            }
            acc ? res.sendFile(views + 'tests.html') : res.redirect('/cabinet')
          })
        })
      } else {
        res.redirect('/')
      }
    })

    app.post('/changeAccess:id', (req, res) => {
      if (req.session.admin) {
        groupdb.findOne({_id: req.params.id.slice(1)}).then(gr => {
          if (req.body.access == 'one') {
            if (gr.acc1) {
              gr.acc1 = false
            } else gr.acc1 = true
          } else {
            if (gr.acc2) {
              gr.acc2 = false
            } else gr.acc2 = true
          }
          groupdb.update({_id: req.params.id.slice(1)}, {$set: {'acc1': gr.acc1, 'acc2': gr.acc2}})
            .then(() => res.send({status: 200}))
            .catch(() => res.send({status: 401}))
        })
      } else res.redirect('/auth_teach')
    })

    app.get('/tests/me', (req, res) => {
      if (req.session.auth) {
        testdb.find({userId: req.session.clientId})
          .then(tests => res.send(tests))
      } else res.send({status: 401})
    })
    
    app.get('/tests', (req, res) => {
      if (req.session.auth) {
        testdb.find().then(tests => res.send(tests))
      }
    })

    app.get('/student:id', (req, res) => {
      if (req.session.auth) {
        testdb.find({userId: req.params.id.slice(1)})
          .then(tests => {
            userdb.findOne({_id: req.params.id.slice(1)})
              .then(student => {
                teacherdb.findOne({_id: req.session.clientId})
                  .then(user => res.render('about_user.ejs', {student: student, tests: tests, user: user}))
              })
          })
      } else res.redirect('/teach')
    })

    app.post('/', (req, res) => {
      let result = {
        login: false,
        password: false
      }
        userdb.find().then(users => {
          if (users) {
            for (user of users) {
              if (user.login == req.body.login) {
                result.login = true
                if (user.password == req.body.password) {
                  result.password = true
                  req.session.auth = true
                  req.session.clientId = user._id
                  req.session.group = user.group
                }
              }
            }
          }
            res.send(result)
        }).catch(err => res.send(result))
    })
    
    app.post('/auth_teach', (req, res) => {
      teacherdb.find(req.body).then(result => {
        if (result[0]) {
            req.session.auth = true
            req.session.clientId = result._id
            req.session.group = result.group
            req.session.admin = true
            res.redirect('/admin')
        } else throw 'Not fined'
      }).catch(err => res.sendFile(views + 'admin_auth.html'))
    })

    app.post('/reg', (req, res) => {
      userdb.insert(req.body).then(result => {
        groupdb.update({name: req.body.group}, { $push: {students: {name: req.body.fio, id: result._id}}})
        req.session.auth = true
        req.session.clientId = result._id
        req.session.group = req.body.group
        res.redirect('/cabinet')
      })
    })

    app.post('/reg_teach', (req, res) => {
          teacherdb.insert(req.body).then(result => {
              req.session.auth = true
              req.session.clientId = result.insertedId
              req.session.admin = true
              res.redirect('/admin')
          }).catch(err => res.sendStatus(500))
    })

    app.post('/forms/:id', (req, res) => {
      if (req.session.auth) {
        req.body.userId = req.session.clientId
        req.body.group = req.session.group
        testdb.find({userId: req.session.clientId, test: req.body.test, group: req.body.group}).then(tests => {
          if (tests.length == 1) req.body.try = 2;
          if (tests.length == 0) req.body.try = 1;
          testdb.insert(req.body).then(isr => res.send({status: 200}))
        })
      } else res.send({status: 401})
    })
    app.post('/remove/form', (req, res) => {
      console.log('id', req.body)
      if (req.session.admin) {
        formdb.remove(req.body).then(test => res.send({status: test})).catch(err => res.send({status: 500,err: err}));
      } else res.send({status: 401})
    })
    app.get('/forms', (req, res) => {
      formdb.find().then(forms => res.send(forms)).catch(err => res.send({status: 404}))
    })
    app.post('/forms', (req, res) => {
      if (req.session.admin) {      
        formdb.insert(req.body).then(form => {res.send(form); console.log(form)}).catch(err => res.send({status: 500, err: err}))
      } else res.send({status: 401})
    })
    app.get('/forms/:id', (req, res) => {
      formdb.findOne({_id: req.params.id}).then(test => res.send(test)).catch(err => res.send({status: 404}))
    })



}


module.exports.router = router
