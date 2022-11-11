const socketIo = require('socket.io')
const { sequelize } = require('../models')

const users = new Map()
const userSockets = new Map()

const SocketServer = (server) => {
  const io = socketIo(server)

  io.on('connection', (socket) => {

    socket.on('join', async (user) => {

      let sockets = []

      console.log('New User Joined: ', user.firstName)

      if (users.has(user.id)) {
        const existingUser = users.get(user.id)
        existingUser.sockets = [...existingUser.sockets, ...[socket.id]]
        users.set(user.id, existingUser)
        sockets = [...existingUser.sockets, ...[socket.id]]
        userSockets.set(socket.id, user.id)
      } else {
        users.set(user.id, { id: user.id, sockets: [] })
        sockets.push(socket.id)
        userSockets.set(socket.id, user.id)
      }

      const onlineFriends = [] //ids

      const chatters = getChatters(user.id) //query 

      console.log(chatters)

      // notify his friends that user is now online
      for (let i = 0; i < chatters.length; i++) {
        if (users.has(chatters[i])) {
          const chatter = users.get(chatters[i])
          chatter.sockets.forEach(socket => {
            try {
              io.to(socket).emit('online', user)
            } catch (error) { }
          })
          onlineFriends.push(chatter.id)
        }
      }

      // send to user sockets which of his friends are online
      sockets.forEach(socket => {
        try {
          io.to(socket).emit('friends', onlineFriends)
        } catch (error) { }
      })

      // io.to(socket.id).emit('typing', 'User typing...')
    })

    socket.on('disconnect', async () => {
      users.forEach((user, key) => {
        user.sockets.forEach(socketUser => {
          if (socketUser === socket.id) {
            const user = users.get(userSockets.get(socket.id))

            if (user.sockets.length > 1) {
              user.sockets = user.sockets.filter(sock => {
                if (sock !== socket.id) return true

                return false
              })

              users.set(user.id, user)
            }
          } else {
            const chatters = getChatters(user.id)

            for (let i = 0; i < chatters.length; i++) {
              if (users.has(chatters[i])) {
                const chatter = users.get(chatters[i])
                chatters.sockets.forEach(socket => {
                  try {
                    io.to(socket).emit('offline', user)
                  } catch (error) { }
                })
                onlineFriends.push(chatter.id)
              }
            }

            userSockets.delete(socket.id)
            users.delete(user.id)
          }
        })
      })
    })
  })
}

const getChatters = async (userId) => {
  try {
    const [results, metada] = await sequelize.query(`
    select "cu"."userId" from "ChatUser" as cu
    inner join (
      select "c"."id" from "Chats" as c
      where exists (
        select "u"."id" from "Users" as u
        inner join "ChatUsers" on u.id = "ChatUsers"."userId"
        where u.id = ${parseInt(userId)} and c.id = "ChatUsers"."chatId"
      )
    ) as cjoin on cjoin.id = "cu"."chatId"
    where "cu"."userId" != ${parseInt(userId)}`)

    return results.length > 0 ? results.map(el => el.userId) : []
  } catch (error) {
    console.log(error)
    return []
  }
}

module.exports = SocketServer