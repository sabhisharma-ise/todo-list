
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

app.set('views', __dirname + '/views');

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.get('/favicon.ico', (req, res) => res.status(204));
app.get('/favicon.png', (req, res) => res.status(204));

mongoose.connect(`mongodb+srv://${User}:${Pass}@cluster0.7jeavzk.mongodb.net/${DB}`);

// Items Schema
const itemSchema = new mongoose.Schema({
    name: String
});

// Items Model
const Item = mongoose.model('Item', itemSchema);

// Lists Schema
const listSchema = new mongoose.Schema({
    name: String,
    items: [itemSchema],
});

// Lists Model
const List = mongoose.model('List', listSchema);

app.get('/', function (req, res) {
    res.render('username'); // Render a page to input the username
});

app.post('/getList', function (req, res) {
    const username = _.capitalize(_.lowerCase(req.body.username));
    res.redirect('/' + username);
});

app.get('/:username', function (req, res) {

    const username = _.capitalize(_.lowerCase(req.params.username));
    let day = date.getDate();

    List.findOne({ name: username }).then(function (foundList) {
        
        if (!foundList) {
            // Create a new list for the user
            const list = new List({
                name: username,
                items: [],
            });
            list.save();
            res.render('list.ejs', {
                listTitle: day,
                newListItems: list.items,
                username: username
            });
        } else {
            // Show the user's existing list
            res.render('list.ejs', {
                listTitle: day,
                newListItems: foundList.items,
                username: username
            });
        }
    });
});

app.post('/', async function (req, res) {

    const itemName = req.body.newItem;
    const username = req.body.username;

    const item = new Item({
        name: itemName
    });

    List.findOne({ name: username }).then(function (foundList) {
        if (foundList) {
            foundList.items.push(item);
            foundList.save();
        }
        res.redirect('/' + username);
    });
});

app.post("/delete", async function (req, res) {

    const checkedItemId = (req.body.checkbox);
    const username = req.body.username;

    List.findOneAndUpdate({ name: username }, { $pull: { items: { _id: checkedItemId } } }).then(function () {
        res.redirect('/' + username);
    });

});

app.get("/about", function (req, res) {
    res.render("about");
});

app.listen(process.env.PORT || 3000, function () {
    console.log("Server started on port 3000")
});