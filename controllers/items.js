var items = require('../items')

const getItems =  (request, reply) => {
    reply.send(items)
}

const getItem = (request, reply) => {
    const { id } = request.params;
    
    const item = items.find((i) => i.id == id)
    if(!item) throw new Error('item not found!')
    reply.send(item)
}


  const postItem = (request, reply) => {
    const { name } = request.body;
    const item = {
        id: items.length + 1,
        name: name
    }

    items.push(item)
    reply.code(201).send(item)
  }

  const deleteItem = (request, reply) => {
    const { id } = request.params;

    const item = items.find((i) => i.id == id)
    if(!item) throw new Error('item not found!')

    items = items.filter((i) => i.id != id)
    reply.send({message: `item id: ${id} deleted successfully!`})
  }

  const updateItem = (request, reply) => {
    const { id } = request.params;
    const {name} = request.body;

    items = items.map(item => (item.id == id ? {id, name} : item))
    
    const item = items.find((i) => i.id == id)
    if(!item) throw new Error('item not found!')
    reply.send(item)
  }

module.exports = {
    getItems,
    getItem,
    postItem,
    deleteItem,
    updateItem
}