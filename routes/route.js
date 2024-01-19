const { v4: uuid } = require('uuid');
const schema = require('../models/items')

async function routes (fastify, options) {
  fastify.addHook('onRequest', async (req, reply) => {
    fastify.log.info('new request is coming')
    fastify.log.info(req.method, req.url)
  })

  fastify.addHook('onResponse', async (req, reply) => {
      fastify.log.info(`Response in time ${reply.getResponseTime()}`)
  })

  // fastify.decorateRequest('user', '')

  fastify.addHook('preHandler', async (req, reply) => {
      req.user = 'Dave Costa'
      fastify.log.info(`preHandler, user name is ${req.user}`)
      // fastify.mysql.query(
      //   `CREATE TABLE IF NOT EXISTS users(
      //     id VARCHAR(255) PRIMARY KEY,
      //     email VARCHAR(255),
      //     password VARCHAR(255),
      //     imagepath VARCHAR(255)
      //   )`,
      //   function onResult (err, result) {
      //     reply.send(err || result)
      //   }
      // )
  })


fastify.get('/user/:id', {
  preValidation: [fastify.authenticate]
},
async function (req, reply) {
  // Or this.mongo.client.db('mydb').collection('users')
  const users = this.mongo.db.collection('users')

  // if the id is an ObjectId format, you need to create a new ObjectId
  const id = new this.mongo.ObjectId(req.params.id)
  try {
    const user = await users.findOne({ _id: id })
    return user
  } catch (err) {
    return err
  }
})

fastify.post('/user', async function (req, reply) {
  const user = { email: req.body.email, password: req.body.pwd };
  const token = fastify.jwt.sign({email: user.email}, { expiresIn: 86400 })
  req.token = token

  try {
    const res = await this.mongo.db.collection('users').insertOne({user : user, token})
    return reply.send({ token, user })
  } catch (err) {
    return reply.send(err)
  }
})
  // mysql
  // fastify.get('/user/:id', function(req, reply) {
  //   fastify.mysql.query(
  //     'SELECT id, email, password, imagepath FROM users WHERE id=?', [req.params.id],
  //     function onResult (err, result) {
  //       reply.send(err || result)
  //     }
  //   )
  // })

  // fastify.post('/user', function(req, reply) {
  //   const id = uuid()
  //   fastify.mysql.query(
  //     'INSERT INTO users(id, email, password, imagepath) VALUES(?, ?, ?, ?)', [id, req.body.email, req.body.pwd, req.body.imagepath],
  //     function onResult (err, result) {
  //       reply.send(err || result)
  //     }
  //   )
  // })



    // GET all items
    fastify.get('/items', schema.itemsSchema)

    // GET single item
    fastify.get('/items/:id', schema.getItemSchema)

    // POST item
    fastify.post('/items', schema.postItemSchema)

    // PUT item
    fastify.put('/items/:id', schema.updateItemSchema)

    // DELETE item
    fastify.delete('/items/:id', schema.deleteItemSchema)

    fastify.route({
        method: 'GET',
        url: '/test',
        schema: {
          response: {
            200: {
              type: 'object',
              properties: {
                hello: { type: 'string' }
              }
            }
          }
        },
        handler: function (request, reply) {
          reply.send({ hello: request.user })
        }
      })
  }
  
  module.exports = routes