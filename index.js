const express = require('express');
const app = express();
const env = require('./config/config');
const bodyParser = require('body-parser');

const db = require('./models/index.js');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* ROUTE SECTION STARTS */
app.get('/', async (req, res) => {
    res.send("GET  <br/> <a href='/fruits'>http://localhost:3000/fruits</a><br/> Get all records from Fruits Table <br/><br/>" + 
             "GET  <br/> <a href='/vegetables'>http://localhost:3000/vegetables</a>  <br/> Get all records from Vegetables Table <br/><br/>" + 
             "POST <br/> http://localhost:3000/fruit       <br/> Save a new Fruit into Fruits Table         <br/> {name: 'Orange', color: 'orange'} <br/><br/>" + 
             "POST <br/> http://localhost:3000/vegetable   <br/> Save a new Vegetable into Vegetables Table <br/> {name: 'Carrot', color: 'red'} <br/><br/>" + 
             "GET  <br/> <a href='/fruit/1'>http://localhost:3000/fruit/1</a><br/> Get details for fruit with id: 1 <br/><br/>" + 
             "GET  <br/> <a href='/vegetable/1'>http://localhost:3000/vegetable/1</a><br/> Get details for Vegetable with id: 1 <br/><br/>");
});

app.get('/fruits', async (req, res) => {
    const fruits = await db.Fruits.findAll({raw: true});
    res.json(fruits);
});

app.get('/vegetables', async (req, res) => {
    const vegetables = await db.Vegetables.findAll({raw: true});
    res.json(vegetables);
});

app.post('/fruit', async (req, res) => {
    try {
        const newFruit = new db.Fruits(req.body)
        await newFruit.save()
        res.json({ fruit: newFruit })
    } catch(error) {
        console.error(error)
    }
});

app.post('/vegetable', async (req, res) => {
    try {
        const newVeg = new db.Vegetables(req.body)
        await newVeg.save()
        res.json({ fruit: newVeg })
    } catch(error) {
        console.error(error)
    }
});

app.get('/fruit/:id', async (req, res) => {
    const id = req.params.id
    try {
        const fruit = await db.Fruits.findAll({ where: {id: id}});
        res.json({ fruit })
    }
    catch(error) {
        console.error(error)
    }    
});

app.get('/vegetable/:id', async (req, res) => {
    const id = req.params.id
    try {
        const vegetable = await db.Vegetables.findAll({ where: {id: id}});
        res.json({ vegetable })
    }
    catch(error) {
        console.error(error)
    }    
});
/* ROUTE SECTION ENDS */

app.listen(process.env.PORT || 3000, () => console.log(`app listening on port 3000!`))