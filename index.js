require('dotenv').config();
var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose'); 

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false })); 
const dbUrl = "mongodb+srv://"+process.env.DBUSER+":"+process.env.DBPASSWORD+"@"+process.env.HOST+"/chat-app?retryWrites=true&w=majority";
var Message = mongoose.model('Message', { name: String, message: String, time: String }); 


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
      io.emit('message', req.body);
      res.sendStatus(200);
    }   
  })
})

//websocket connection
io.on('connection', () =>{
  console.log('a user is connected')
})

//Listening for connection
const port = 8080;
var server = http.listen(port, () => {
  console.log('server is running on port', server.address().port);
});

//Connecting to the mongo database
mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true}, (err) => {
  if (err)
      console.error(err);
  else
      console.log("Connected to the mongodb"); 
});

