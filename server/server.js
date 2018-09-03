const path = require('path');
const express = require('express');
                     
const publicPath = path.join(__dirname, '/../public');
const config = path.join(__dirname, '/../config/config');

require(config);


var app = express();
const port = process.env.PORT;

app.use(express.static(publicPath));

app.listen(port, () => {
  console.log(`Started up at port ${port}`);
});

module.exports = {app};