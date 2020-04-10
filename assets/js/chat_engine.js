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
        this.socket.on('connect',function(){
            console.log('COnnection established using sockets')
        });
    }
}