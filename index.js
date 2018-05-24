const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
require('dotenv').config();
const products_controller = require('./products_controller/products_controller');

const app = express();

app.use(bodyParser.json());
app.use(cors());

massive(process.env.connectionString).then(dbInstance=>{
    app.set('db', dbInstance);
})

app.post('/api/products', products_controller.create);
app.get('/api/products:id', products_controller.getOne);
app.get('/api/products', products_controller.getAll);
app.put('/api/products:id', products_controller.update);
app.delete('/api/products:id', products_controller.delete);

const port = process.env.PORT || 3000;
app.listen(port,()=>{`Listening on port ${port}.`})

