const socketIo = require('socket.io')

const users = new Map()

const SocketServer = (server) => {
  const io = socketIo(server)

  io.on('connection', (socket) => {

    socket.on('join', async (user) => {

      let sockets = []

      console.log('New User Joined: ', user.firstName)

      if(users.has(user.id)) {
        const existingUser = users.get(user.id)
        existingUser.sockets = [...existingUser.sockets, ...[socket.id]]
        users.set(user.id, existingUser)
        sockets = [...existingUser.sockets, ...[socket.id]]
      } else {
        users.set(user.id, {id: user.id, sockets: []})
        sockets.push(socket.id)
      }

      const onlineFriends = [] //ids

      const chatters = [] //query 

      // notify his friends that user is now online
      for (let i = 0; i < chatters.length; i++) {
        if(users.has(chatters[i].id)) {
          const chatter = users.get(chatters[i])
          chatters.sockets.forEach(socket => {
            try {
              io.to(socket).emit('online', user)
            } catch (error) {}
          })
          onlineFriends.push(chatter.id)
        }
      }

      // send to user sockets which of his friends are online
      sockets.forEach(socket => {
        try {
          io.to(socket).emit('friends', onlineFriends)
        } catch (error) {}
      })

      io.to(socket.id).emit('typing', 'User typing...')
    })
  })
}

module.exports = SocketServer