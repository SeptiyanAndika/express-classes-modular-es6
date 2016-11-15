let routes = {
  'get /': {
    controller: 'user',
    action: 'index',
    middlewares:[]
  },
  'post /login': {
    controller: 'user',
    action: 'authenticate',
    middlewares:['auth.authenticate']
  },
  'post /register': {
    controller: 'user',
    action: 'register',
    middlewares:['auth.register']
  }

}

module.exports = routes
