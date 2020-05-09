const acc = require('./accessDB');
const assert = require('assert');


acc.getPatients().then((data) => {
  assert(data != null);
  console.log('getPatients test passed!')
});

acc.getPatientById('_000000000').then((data) => {
  assert(data != null);
  console.log('getPatientById test passed!')
});

acc.getFormsByPatientId('_000000000').then((data) => {
  assert(data != null);
  console.log('getFormsByPatientId test passed!');
});

acc.getAcuitiesByPatientId('_000000000').then((data) => {
  assert(data != null);
  console.log('getFormsByPatientId test passed!');
});

acc.getAcuityAndFormByFormId('_234567892').then((data) => {
  assert(data[0].score_total == 45);
  console.log('getFormsByPatientId test passed!');
});


