const express = require('express') ;
const app = express() ;
var mqtt = require('mqtt');
var cors = require('cors');
app.use(cors({
    origin: ["http://127.0.0.1:3000"],
    credentials: true,
}));

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});



let x = {} ;

app.get("/:lat/:lng" ,(req,res) => {
    console.log(req.params);
    const client = mqtt.connect('mqtt://localhost:1234')
    const topic = 'iot';
    res.send({success: "sended successfully"});
    client.on('connect', ()=>{
            client.publish(topic, JSON.stringify(req.params));
            console.log('Message sent!', JSON.stringify(req.params) );
            x = JSON.stringify(req.params) ;
    })
})

app.get("/",(req,res) => {
    res.send(JSON.stringify(x));
})


app.listen(5000,() => {
    console.log("Listening to port 5000") ;
})