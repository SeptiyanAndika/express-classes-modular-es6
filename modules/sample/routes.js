let routes = {
  'get /': {
    controller: 'sample',
    action: 'index',
    middlewares:['auth.checkToken']
  },
  'get /single/:id': {
    controller: 'sample',
    action: 'findById',
    middlewares:[]
  },
  'get /single': {
    controller: 'sample',
    action: 'findOne',
    middlewares:[]
  },
  'post /': {
    controller: 'sample',
    action: 'save',
    middlewares:[]
  },
  'put /': {
    controller: 'sample',
    action: 'update',
    middlewares:[]
  },
  'delete /:id': {
    controller: 'sample',
    action: 'delete',
    middlewares:[]
  }

}

module.exports = routes
