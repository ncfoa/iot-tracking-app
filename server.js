const express = require('express') ;
const app = express() ;


app.get("/:lat/:lng" ,(req,res) => {
    console.log(req.params);
    res.send({success: "sended successfully"});
})

app.listen(5000,() => {
    console.log("Listening to port 5000") ;
})