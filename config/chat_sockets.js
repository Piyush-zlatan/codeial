// This file is for server side events
module.exports.chatSockets = function(socketServer){
    let io = require('socket.io')(socketServer);

    io.sockets.on('connection',function(socket){
        console.log('new connection received',socket.id);

        socket.on('disconnect',function(){
            console.log('Socket Disconnected')
        });

        // on detects the event emitted by client
        socket.on('join_room',function(data){
            console.log('joining request received ',data);
            // event to join the chat room if available else create the room.
            socket.join(data.chatroom);
            // notifying users that a new user has joined
            io.in(data.chatroom).emit('user_joined',data);
        });

        socket.on('send_message',function(data){
            io.in(data.chatroom).emit('receive_message',data);
        })

    });

}