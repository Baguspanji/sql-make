require('dotenv').config()
const env = process.env
const express = require('express')
const cors = require('cors')
const path = require('path')

const expressLayouts = require('express-ejs-layouts');

const {
    sequelize
} = require('./app/models');

const PORT = env.LISTEN_PORT
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use(express.static(path.join(__dirname, '/app/public')));

app.set('views', path.join(__dirname, 'app/views'))
app.set('view engine', 'ejs')
app.use(expressLayouts)
app.set('layout', 'layouts/layout');

// app.set('layout extractScripts', true)
// app.set('layout extractStyles', true)

app.get('/', (req, res) => {
    res.locals = {
        title: 'Main View',
        message: 'This is a message'
    };

    res.render('index');
})

require('./app/router/router.api')(app)
require('./app/router/router.web')(app)

try {
    app.listen(PORT, () => console.log(`Server listen on http://localhost:${PORT}`))
} catch (error) {
    console.error('Unable to start server:', error);
}

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}