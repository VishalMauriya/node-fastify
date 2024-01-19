const fastify = require('fastify')({logger: {
    transport: {
        target: "pino-pretty"
    }
}})

fastify.register(require('@fastify/jwt'), {
    secret: 'supersecret'
  })    

const route = require('./routes/route')

fastify.register(require('@fastify/swagger'))

fastify.register(require('@fastify/swagger-ui'), {
  routePrefix: '/docs',
  swagger: {
    info: {
        title: 'API Documentation',
    },
},

})



// fastify.register(require('@fastify/mysql'), {
//     connectionString: 'mysql://root:vishal1234@localhost/testing'
//   })


fastify.register(require('@fastify/mongodb'), {
    forceClose: true,
    url: 'mongodb+srv://vishal:vishal1234@cluster0.xtolxfn.mongodb.net/testing'
  })
  
fastify.register(route)

fastify.decorate("authenticate", async function(request, reply) {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.send(err)
    }
  })

// fastify.decorate('jwt', () => {
//     fastify.log.info("fastify.jwt")
// })

// fastify.jwt()

fastify.listen({port:3000}, (err, address) => {
    if(err) {
        fastify.log.error(err);
        process.exit(1);
    }   
})