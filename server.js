var express = require('express');
var app = express();
var mongojs = require("mongojs");
var db = mongojs('contactlist',['contactllistapp']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get("/contactllistapp",function(req,res){
    console.log("I recieved a GET request");

    db.contactlist.find(function(err,docs){
        console.log(docs);
        res.json(docs);
    });    
});

app.post('/contactllistapp',function(req,res){
    console.log(req.body);
    db.contactlist.insert(req.body,function(err,doc){
        res.json(doc);
    });
});
app.delete('/contactllistapp/:id',function(req,res){
    var id= req.params.id;
    console.log(id);
    db.contactlist.remove({_id: mongojs.ObjectId(id)},function(err,doc){
        res.json(doc);
        
    })
})

app.get('/contactllistapp/:id',function(req,res){
    var id = req.params.id;
    console.log(id);
    db.contactlist.findOne({_id: mongojs.ObjectId(id)},function(err,doc){
        res.json(doc);
    });
})

app.put('/contactllistapp/:id',function(req,res){
    var id = req.params.id;
    console.log(req.body.name);
    db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
        update: {$set: {name: req.body.name,email: req.body.email, number: req.body.number}}, new: true},function(err,doc){
        res.json(doc);
    }
    );
});
        
app.listen(3000);
console.log("Server running in the port 3000");