const express = require('express');
const router = require('./config/routes');
const app = express();
let controller = require('./controllers/mainController');

app.use(controller.shouldUpdate);

app.use('/api',router);

app.listen(process.env.PORT||3000, console.log('SERVER is Up and Running'));