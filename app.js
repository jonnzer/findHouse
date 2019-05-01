const express = require('express');
const app = express();
const path = require('path');
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, './views'));
app.get('/', function (req, res) {
    res.render('pug-html/index');
});
app.listen(8070, () => {
    console.log('start  8070 port');
});
