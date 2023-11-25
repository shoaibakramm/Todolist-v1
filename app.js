const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const date = require(__dirname+'/date.js');

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

mongoose.connect('mongodb://localhost:27017/todolistDB', {useNewUrlParser: true}); 

const itemsSchema = {

    name: String

};

const Item = mangoose.model('Item',itemsSchema);

const item1 = new Item({
    name : 'Welcome to your todolist'
});

const item2 = new Item({
    name : 'meowmeowmoew'
});

const item3 = new Item({
    name : 'hehehheheheh'
});

const defaultItems = [item1, item2 , item3];

Item.insertMany(defaultItems,function(err){
    if (err) {
        console.log(err);
    } else{
        console.log('succesfull saved items');
    }

});

let items=['Work','Play','Sleep'];
let workitems = [];


app.get('/', function(req,res){

    let day = date.getdate();
    

    res.render('list',{listtitle: day, newlistitems :items});
    
    });

app.post('/',function(req,res) {

    let item = req.body.newitem;

    if (req.body.list === 'work list'){

        workitems.push(item);
        res.redirect('/work');

    }
    else {

        items.push(item);
        res.redirect('/');

    }

});
    
app.get('/work', function(req,res){
    res.render('list',{listtitle: 'work list', newlistitems: workitems});

});

app.post('/work', function(req,res){

    let item = req.body.newitem;
    workitems.push(item);
    res.redirect('/work');

})

app.get('/about', function(req,res){

    res.render('about');

});



app.listen(3000, function(){
    console.log('server is running on port 3000');
});