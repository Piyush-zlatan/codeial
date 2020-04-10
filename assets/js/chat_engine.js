// this file is for client side events
class ChatEngine{
    constructor(chatBoxId, userEmail){
        this.chatBox = $(`#${chatBoxId}`);
        this.userEmail = userEmail;

        this.socket = io.connect('http://localhost:5000');

        if(this.userEmail){
            this.connectionHandler();
        }
    }

    // this will manage to and fro connection between observer and subscriber
    connectionHandler(){
        let self = this;

        this.socket.on('connect',function(){
            console.log('COnnection established using sockets')
        });

        //Emitting the event to ask to join the room
        self.socket.emit('join_room',{
            user_email: self.userEmail,
            chatroom: 'codeial'
        });

        self.socket.on('user_joined',function(data){
            console.log('A user joined',data);
        })
    }
}