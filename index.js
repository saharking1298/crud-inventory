const express = require('express');
const {v4: uuid} = require('uuid');
const methodOverride = require('method-override');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

app.use(express.urlencoded({extended: true}))

app.set('view engine', 'ejs');

let inventory = [
    {item: "Gold", qty: 252},
    {item: "Healing Potion", qty: 3},
    {item: "Rusty Sword", qty: 1},
];

function assignIds(){
    for(item of inventory){
        item.id = uuid();
    }
}

assignIds();

app.get('/', (req, res) => {
    res.redirect('/inventory');
});

app.get('/inventory', (req, res) => {
    res.render('Inventory', {inventory});
});

app.get('/inventory/new', (req, res) => {
    res.sendFile('html/NewItem.html', {root: 'public'});
});

app.get('/inventory/:id', (req, res) => {
    const {id} = req.params;
    res.render('Show', {item: inventory.find(val => val.id === id)});
});

app.get('/inventory/:id/edit', (req, res) => {
    const {id} = req.params;
    res.render('EditItem', {item: inventory.find(val => val.id === id)});
});

app.post('/inventory', (req, res) => {
    const {item, qty} = req.body;
    inventory.push({item, qty, id: uuid()});
    res.redirect('/inventory');
});

app.patch('/inventory/:id', (req, res) => {
    console.log(req.body)
    const {id} = req.params;
    const {item, qty} = req.body;
    const listItem = inventory.find(val => val.id === id);
    if(listItem){
        listItem.item = item;
        listItem.qty = qty;
    }
    res.redirect('/inventory');
});

app.delete('/inventory/:id', (req, res) => {
    const {id} = req.params;
    inventory = inventory.filter(val => val.id !== id);
    res.redirect('/inventory');
});

app.listen(PORT, () => {
    console.log("App listening on port: " + PORT);
    console.log("http://localhost:3000");
});

// GET /inventory - View inventory contents
// POST /inventory - Add a new item
// PUT /inventory/:id - Change an item
// DELETE /inventory/:id - Delete an item
// GET /inventory/new - Create item form
// GET /inventory/:id/edit - Edit item form
// GET /inventory/:id - Show an item