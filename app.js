const express          = require('express');
const app              = express();
const login            = require('./routes/login');
const query            = require('./routes/query');

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({
	extended: true
}));
app.use(express.static('public'));
app.use('/login', login);
app.use('/query', query);

module.exports = app;