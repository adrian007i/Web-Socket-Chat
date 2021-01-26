var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');




app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); 

//index route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

//get messages
app.get('/messages', (req, res) => {
  Message.find({}, (err, messages) => {
    res.send(messages);
  })
});

//post messages to database
app.post('/sendmessages', (req, res) => {
  var message = new Message(req.body);
  message.save((err) => {
    if (err)
      res.sendStatus(500);
    else{
      res.sendStatus(200);
      io.emit('message', req.body);
    }   
  })
})

//websocket connection
io.on('connection', function(socket){
  console.log('a user connected');
      socket.on('disconnect', function(){
      console.log('user disconnected');
  });
});

//Listening for connection
const port = 8080;
app.listen(port, () => {
  console.log(`Server running on port:${port}`);
});

//Connecting to the mongo database
const dbUrl = "mongodb+srv://adrian007i:Password101!@cluster0.yliji.mongodb.net/chat-app?retryWrites=true&w=majority";
var Message = mongoose.model('Message', { name: String, message: String, time: String }); 
mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
  if (err)
      console.error(err);
  else
      console.log("Connected to the mongodb"); 
});

