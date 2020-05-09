const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3001;
const db = require('./queries');

app.use(bodyParser.json());

app.use(
  bodyParser.urlencoded({
		extended: true,
	})
);

app.get('/', (request, response) => {
  response.json({ info: 'CS132 IntusCare Team Postgres DB API' })
});

app.get('/patients', db.getPatients);
app.get('/patients/:id', db.getPatientById);
app.get('/patients/:id/forms', db.getFormsByPatientId);
app.get('/patients/:id/acuities', db.getAcuitiesByPatientId);
app.get('/patients/forms/:formid', db.getAcuityAndFormByFormId);
app.post('/patients', db.createPatient);
app.post('/patients/:id/forms', db.createForm);
app.put('/patients/:id', db.updatePatientById);
app.put('/patients/forms/:formid', db.updateFormById);
app.delete('/patients/:id', db.deletePatientById),
app.delete('/patients/forms/:formid', db.deleteFormById);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});


