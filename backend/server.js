const express = require('express');
const router = require('./config/routes');
const app = express();


app.use('/api',router);

app.listen(process.env.PORT||3000, console.log('SERVER is Up and Running'));