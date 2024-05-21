
const express = require('express');
const mongoose = require('mongoose');
const date = require(__dirname + '/date.js');

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

mongoose.connect('mongodb://localhost:27017/todolistDB');

// Item Schema
const itemSchema = new mongoose.Schema ({
    name: String
});

// Item Model
const Item = mongoose.model('Item', itemSchema);

app.get('/', function(req, res) {

    let day = date.getDay();

    Item.find({}).then(function(items) {
    
        res.render('list', {
            listTitle: day, 
            newListItems: items
        });

    });

});

app.post('/', function(req, res) {

    const itemName = req.body.newItem;

    const item = new Item ({
        name: itemName
    });

    item.save();

    res.redirect('/');

});

app.post("/delete", async function(req, res) {

    const checkedItemId = (req.body.checkbox);
    
    await Item.findByIdAndDelete(checkedItemId);

    res.redirect('/');

});

app.get('/:list', function(req, res) {

    const requestedList = req.params.list;

    const requestedItem = mongoose.model(requestedList + 'Item', itemSchema);

        requestedItem.find({}).then(function(items) {
        
            res.render('requestedList', {
                listTitle: requestedList, 
                newListItems: items
            });

        });

    app.post('/'+requestedList, function(req, res) {
        const itemName = req.body.newItem;

        const item = new requestedItem ({
            name: itemName
        });

        item.save();

        res.redirect('/'+requestedList);
    });

    app.post('/delete/'+requestedList, async function(req, res) {
        const checkedItemId = (req.body.checkbox);
        
        await requestedItem.findByIdAndDelete(checkedItemId);

        res.redirect('/'+requestedList);
    })

});


app.get("/about", function(req, res) {
    res.render("about");
});

app.listen(3000, function() {
    console.log("Server started on port 3000")
});