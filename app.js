
const express = require('express');
const mongoose = require('mongoose');
const _ = require('lodash')
const date = require(__dirname + '/date.js');
const dotenv = require('dotenv');

dotenv.config();

const User = process.env.username;
const Pass = process.env.password;
const DB = process.env.database;

const app = express();  

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

mongoose.connect(`mongodb+srv://${User}:${Pass}@cluster0.7jeavzk.mongodb.net/${DB}`);

// Items Schema
const itemSchema = new mongoose.Schema ({
    name: String
});

// Items Model
const Item = mongoose.model('Item', itemSchema);

// Lists Schema
const listSchema = new mongoose.Schema ({
    name: String,
    items: [itemSchema]
});

// Lists Model
const List = mongoose.model('List', listSchema);

app.get('/', function(req, res) {

    let day = date.getDate();

    Item.find({}).then(function(items) {
    
        res.render('list', {
            listTitle: day, 
            newListItems: items
        });

    });

});

app.post('/', async function(req, res) {

    const itemName = req.body.newItem;
    const listName = req.body.list;

    const item = new Item ({
        name: itemName
    });

    const day = date.getDate();

    if (listName === day) {
        
        item.save();
        res.redirect('/');
    
    } else {

        await List.updateOne({name: listName}, {$push: {items: item}});
        
        res.redirect('/' + listName);

    }
});

app.post("/delete", async function(req, res) {

    const checkedItemId = (req.body.checkbox);
    const listName = req.body.listName;
    
    const day = date.getDate();

    if (listName === day) {
        
        await Item.findByIdAndDelete(checkedItemId);
        res.redirect('/');
    
    } else {

        await List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: checkedItemId}}});
            
        res.redirect('/' + listName);
    
    }
});

app.get('/:customListName', function(req, res) {

    const customListName = _.capitalize(_.lowerCase(req.params.customListName));

    List.findOne({name: customListName}).then(function(foundList) {
        
        if (!foundList) {
            // Create a new list
            const list = new List ({
                name: customListName,
                items: []
            });
            
            list.save();
            setTimeout(function() {
                res.redirect('/' + customListName);
            }, 100);

        
        } else {
            // Show an existing list
            List.find({name: customListName}).then(function(customList) {
                res.render('list', {
                    listTitle: customListName, 
                    newListItems: customList[0].items
                });
            });
        }
    });

});

app.get("/about", function(req, res) {
    res.render("about");
});

app.listen(process.env.PORT || 3000, function() {
    console.log("Server started on port 3000")
});