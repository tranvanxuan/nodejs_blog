const path = require('path');
const express = require('express');
const morgan = require('morgan');
var methodOverride = require('method-override');
const handlebars = require('express-handlebars');
const SortMiddleware = require('./app/middlewares/sortMiddlewares');

const route = require('./routes/index');
const db = require('./config/db');

//Connect to DB
db.connect();

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

//submit form
app.use(
    express.urlencoded({
        extended: true,
    }),
);
//client gui len
app.use(express.json());

// override with POST having ?_method=DELETE
app.use(methodOverride('_method'));

//Custom middleware
app.use(SortMiddleware);

//http logger
app.use(morgan('combined'));

//template engine
app.engine(
    'hbs',
    handlebars.engine({
        extname: '.hbs',
        helpers: require('./helpers/handlebars'),
    }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Routes init
route(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
