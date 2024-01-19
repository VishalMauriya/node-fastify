const items = require('../controllers/items')

const item = {
    type: 'object',
    properties: {
        id: { type: 'integer' },
        name: { type:'string' }
    },
}

const itemsSchema = {
    schema: {
        response: {
          200: {
            type: 'array',
            items: item
          }
        }
      },
      handler: items.getItems
}

const postItemSchema = {
  schema: {
    body: {
      type: 'object',
      properties: {
        name: { type:'string' }
      },
      required: ['name']
    },
    response: {
      200: item
    }
  },
  handler: items.postItem
}

const getItemSchema = {
    schema: {
        response: {
          200: item
        }
      },
      handler: items.getItem
}

const deleteItemSchema = {
  schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            message: { type:'string' }
          }
        }
      }
    },
    handler: items.deleteItem
}

const updateItemSchema = {
  schema: {
      response: {
        200: item
      }
    },
    handler: items.updateItem
}

module.exports = {
    itemsSchema,
    getItemSchema,
    postItemSchema,
    deleteItemSchema,
    updateItemSchema
}