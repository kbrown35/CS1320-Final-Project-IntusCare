const express = require('express');
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');
const path = require('path');

// controllers that deal with rendering pages
const patientsHandler = require('./controllers/patients.js');
const upcomingHandler = require('./controllers/upcoming.js');
const pastHandler = require('./controllers/past.js');
const acuityHandler = require('./controllers/acuity.js');
const formHandler = require('./controllers/form.js');
const scoreHandler = require('./controllers/score.js');

const app = express();
const port = 3000;

app.use((req, res, next) => {
    next();
});
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(cookieParser());

// sets up handlebars
app.engine('hbs', hbs({extname: 'hbs',
                        defaultLayout: 'layout',
                        layoutsDir: __dirname + '/views/layouts/',
                        partialsDir: 'views/partials'
                    }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// renders pages
app.get('/', (req, res) => res.sendFile('login.html' , {root: __dirname + "/views/"}));
app.get('/patients', patientsHandler.renderPatients);
app.get('/:patient', upcomingHandler.renderUpcoming);
app.get('/:patient/past', pastHandler.renderPast);
app.get('/:patient/acuity', acuityHandler.renderAcuity);
app.get('/:patient/form', formHandler.renderForm);
app.get('/:patient/:assessment', scoreHandler.renderScore);
// submits form
app.post('/:patient/form/submit', formHandler.submitForm);
// gets form
app.post('/:patient/:assessment/get', formHandler.getForm);
// not found page
app.get('*', (req, res) => res.sendStatus(404));

// confirmation message that server is running
app.listen(port, () => console.log(`Acuity Tool server listening on http://localhost:${port}`));