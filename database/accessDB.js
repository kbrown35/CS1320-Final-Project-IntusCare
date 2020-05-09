// This module contains client functions that access the node-postgress server's database
// const acc = require('./accessDB');

// USAGE:

// The following functions return promises, 
// which means that the data returned can only be 
// accessed inside the scope of the promise. So to use 
// these functions, you should use this syntax: 

// functionName(args).then((data) => {do something with data inside this scope})

// GET requests

// The 'got' library make it convenient to write get request promises
const got = require('got');

const getPatients = function() {
  return got('http://localhost:3001/patients').then((response) => {return JSON.parse(response.body)});
}
// Example
// getPatients().then((data) => console.log(data));

const getPatientById = function(id) {
  return got(`http://localhost:3001/patients/${id}`).then((response) => {return JSON.parse(response.body)});
}
// Example
// getPatientById('0000000000').then((data) => console.log(data));

const getFormsByPatientId = function(id) {
  return got(`http://localhost:3001/patients/${id}/forms`).then((response) => {return JSON.parse(response.body)});
}
// Example
// getFormsByPatientId('0000000000').then((data) => console.log(data));

const getAcuitiesByPatientId = function(id) {
  return got(`http://localhost:3001/patients/${id}/acuities`).then((response) => {return JSON.parse(response.body)});
}
// Example
// getAcuitiesByPatientId('0000000000').then((data) => console.log(data));

const getAcuityAndFormByFormId = function(formid) {
  return got(`http://localhost:3001/patients/forms/${formid}`).then((response) => {return JSON.parse(response.body)});
}
// Example
// getAcuityAndFormByFormId('1234567890').then((data) => console.log(data));


// POST requests
// All POST and PUT primises are designed from scratch to allow for greater control

const http = require('http');

// Resolves with patient_id of newly created patient.
const createPatient = function( 
  patient_id = null, 
  name_first,
  name_middle,
  name_last,
  date_of_birth,
  address_street,
  address_city,
  address_state,
  address_zip,
  phone,
  patient_since) {

  let postData = JSON.stringify({
    patient_id: patient_id,
    name_first: name_first,
    name_middle: name_middle,
    name_last: name_last,
    date_of_birth: date_of_birth,
    address_street: address_street,
    address_city: address_city,
    address_state: address_state,
    address_zip: address_zip,
    phone: phone,
    patient_since: patient_since
  });

  let post_patient_options = {
    hostname: 'localhost',
    port: 3001,
    path: '/patients',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': postData.length
    }
  }

  return new Promise(function(resolve, reject) {
      var req = http.request(post_patient_options, function(res) {
          if (res.statusCode < 200 || res.statusCode >= 300) {
              return reject(new Error('statusCode=' + res.statusCode));
          }
          var body = '';
          res.on('data', function(chunk) {
              body += chunk;
          });
          res.on('end', function() {
              try {
                  body = JSON.parse(body);
              } catch(e) {
                  console.log("Error parsing response body");
                  reject(e);
              }
              console.log(body.message);
              resolve(body.patient_id);
          });
      });
      req.on('error', function(err) {
          reject(err);
      });
      if (postData) {
          req.write(postData);
      }
      req.end();
  });
}

// Example:
// createPatient(patient_id = null, name_fist = 'David', name_middle = null, name_last ='Hollywood', 
//     date_of_birth = '06-12-1923', address_street = '75 Hearth St.', 
//     address_city = 'Oklahoma City', address_state = 'OK', address_zip = '73008-0456', 
//     phone = '405-662-9366', patient_since = '02-27-2013').then((data) => console.log(data));


// Resolves with object {data : {patient_id: patient_id, form_id: form_id}}.
const createForm = function(formArray) {

  let postData = JSON.stringify({
    assessor_id: formArray[1],
    _1_1: formArray[2],
    _1_1a: formArray[3],
    _1_1b: formArray[4],
    _1_1c: formArray[5],
    _1_2: formArray[6],
    _1_2a: formArray[7],
    _1_2b: formArray[8],
    _1_2c: formArray[9],
    _1_3: formArray[10],
    _1_3a: formArray[11],
    _1_3b: formArray[12], 
    _1_3c: formArray[13],
    _1_4: formArray[14],
    _1_4a: formArray[15],
    _1_5: formArray[16],
    _1_5a: formArray[17],
    _1_6: formArray[18],
    _1_6a: formArray[19],
    _1_6b: formArray[20],
    _1_6c: formArray[21],
    _2_1: formArray[22],
    _2_1a: formArray[23],
    _2_1b: formArray[24],
    _2_1c: formArray[25],
    _2_1d: formArray[26],
    _2_2: formArray[27],
    _2_2a: formArray[28],
    _2_2b: formArray[29],
    _2_2c: formArray[30],
    _2_3: formArray[31],
    _2_3a: formArray[32],
    _2_3b: formArray[33],
    _2_3c: formArray[34],
    _2_4: formArray[35],
    _2_4a: formArray[36],
    _2_4b: formArray[37],
    _2_4c: formArray[38],
    _2_5: formArray[39],
    _2_5a: formArray[40],
    _2_5b: formArray[41],
    _2_5c: formArray[42],
    _2_5d: formArray[43],
    _2_5e: formArray[44],
    _2_6: formArray[45],
    _2_6a: formArray[46],
    _2_6b: formArray[47],
    _2_6c: formArray[48],
    _3_1: formArray[49],
    _3_1a: formArray[50],
    _3_1b: formArray[51],
    _3_2: formArray[52],
    _3_2a: formArray[53],
    _3_2b: formArray[54],
    _3_2c: formArray[55],
    _3_3: formArray[56],
    _3_3a: formArray[57],
    _3_3b: formArray[58],
    _3_4: formArray[59],
    _3_4a: formArray[60],
    _3_4b: formArray[61],
    _3_5: formArray[62],
    _3_5a: formArray[63],
    _3_5b: formArray[64],
    _3_5c: formArray[65],
    _3_6: formArray[66],
    _3_6a: formArray[67],
    _3_6b: formArray[68],
    _3_6c: formArray[69],
    _4_1: formArray[70],
    _4_2: formArray[71],
    _4_3: formArray[72],
    _4_4: formArray[73],
    _5_1: formArray[74],
    _5_1a: formArray[75],
    _5_2: formArray[76],
    _5_2a: formArray[77],
    _5_2b: formArray[78],
    _5_2c: formArray[79],
    _5_3: formArray[80],
    _5_3a: formArray[81],
    _5_3b: formArray[82],
    _5_3c: formArray[83],
    _5_4: formArray[84],
    _5_4a: formArray[85],
    _5_4b: formArray[86],
    _5_5: formArray[87],
    _5_5a: formArray[88],
    _5_5ai: formArray[89]
  });

  let post_form_options = {
    hostname: 'localhost',
    port: 3001,
    path: `/patients/${formArray[0]}/forms`,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': postData.length
    }
  }

  return new Promise(function(resolve, reject) {
      var req = http.request(post_form_options, function(res) {
          if (res.statusCode < 200 || res.statusCode >= 300) {
              return reject(new Error('statusCode=' + res.statusCode));
          }
          var body = '';
          res.on('data', function(chunk) {
              body += chunk;
          });
          res.on('end', function() {
              try {
                  body = JSON.parse(body);
              } catch(e) {
                  console.log("Error parsing response body");
                  reject(e);
              }
              console.log(body.message);
              resolve(body.data);
          });
      });
      req.on('error', function(err) {
          reject(err);
      });
      if (postData) {
          req.write(postData);
      }
      req.end();
  });
}

// example use
// createForm(['_000000000', '_000000025',
// 'yes', null, 'yes', '10-22-2020', 'yes', null, 'no', 
// '10-28-2020', 'yes', 'yes', 'yes', '10-21-2020',
// 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'severe', 'no',      
// 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 
// 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes',         
// 'yes', 'yes', 'yes', 'yes', 'yes', 'yes','yes', 'yes', 'none', 'yes', 'yes', 'yes', 
// 'yes', 'yes', 'yes','yes', 'other', 'yes', 'yes', 'yes', 'yes',             
// 'yes', 'yes', 'yes', 'yes',                  
// 'yes', 'yes', 'yes', 'yes','yes', 'yes', 'yes', 'yes','yes', 'yes', 'yes', 'yes','yes', 'yes', 'yes']
// ).then((data) => console.log(data));


// PUT to patients

var put_patient_options = {
  hostname: 'localhost',
  port: 3001,
  path: null,
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': null
  }
}

const updatePatientById = function(
  patient_id, 
  name_first,
  name_middle,
  name_last,
  date_of_birth,
  address_street,
  address_city,
  address_state,
  address_zip,
  phone,
  patient_since) {

  let data = JSON.stringify({
    name_first: name_first,
    name_middle: name_middle,
    name_last: name_last,
    date_of_birth: date_of_birth,
    address_street: address_street,
    address_city: address_city,
    address_state: address_state,
    address_zip: address_zip,
    phone: phone,
    patient_since: patient_since
  });

  console.log("DATA:" + data);

  put_patient_options.path = `/patients/${patient_id}`;
  put_patient_options.headers['Content-Length'] = data.length;

  let request = http.request(put_patient_options, response => {
    console.log(`statusCode: ${response.statusCode}`);
    response.on('data', d => {
      process.stdout.write(d);
    });
  });

  request.on('error', error => {
    console.error(error);
  });

  request.write(data);
  request.end();
}

// example use
// updatePatientById('0000000001', 'Sally', 'G', 'Wells', '11/09/1938', '12 Brooks Rd.', 'Wilmington', 'CT', '09978', '744-991-9901', '11-01-2019');

var put_form_options = {
  hostname: 'localhost',
  port: 3001,
  path: null,
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': null
  }
}

// Updates form entries, given the form_id, which is the first argument. 
// Triggers automatic update or form's acuity. 

const updateFormById = function(
  form_id,
  _1_1,
  _1_1a, 
  _1_1b,
  _1_1c,
  _1_2,
  _1_2a, 
  _1_2b,
  _1_2c,
  _1_3,
  _1_3a, 
  _1_3b,
  _1_3c,
  _1_4,
  _1_4a, 
  _1_5,
  _1_5a,
  _1_6,
  _1_6a, 
  _1_6b,
  _1_6c,

  _2_1,
  _2_1a, 
  _2_1b,
  _2_1c,
  _2_1d,
  _2_2,
  _2_2a, 
  _2_2b,
  _2_2c,
  _2_3,
  _2_3a, 
  _2_3b,
  _2_3c,
  _2_4,
  _2_4a,
  _2_4b,
  _2_4c,
  _2_5,
  _2_5a,
  _2_5b,
  _2_5c,
  _2_5d,
  _2_5e,
  _2_6,
  _2_6a, 
  _2_6b,
  _2_6c,

  _3_1,
  _3_1a, 
  _3_1b,
  _3_2,
  _3_2a, 
  _3_2b,
  _3_2c,
  _3_3,
  _3_3a, 
  _3_3b,
  _3_4,
  _3_4a,
  _3_4b,
  _3_5,
  _3_5a,
  _3_5b,
  _3_5c,
  _3_5ci,
  _3_6,
  _3_6a, 
  _3_6b,
  _3_6c,

  _4_1,
  _4_2,
  _4_3,
  _4_4,

  _5_1,
  _5_1a, 
  _5_2,
  _5_2a, 
  _5_2b,
  _5_2c,
  _5_3,
  _5_3a, 
  _5_3b,
  _5_3c,
  _5_4,
  _5_4a,
  _5_4b,
  _5_5,
  _5_5a,
  _5_5ai   
  ) {

  let data = JSON.stringify({
    _1_1: _1_1,
    _1_1a: _1_1a,
    _1_1b: _1_1b,
    _1_1c: _1_1c,
    _1_2: _1_2,
    _1_2a: _1_2a,
    _1_2b: _1_2b,
    _1_2c: _1_2c,
    _1_3: _1_3,
    _1_3a: _1_3a,
    _1_3b: _1_3b,
    _1_3c: _1_3c,
    _1_4: _1_4,
    _1_4a: _1_4a,
    _1_5: _1_5,
    _1_5a: _1_5a,
    _1_6: _1_6,
    _1_6a: _1_6a,
    _1_6b: _1_6b,
    _1_6c: _1_6c,
    _2_1: _2_1,
    _2_1a: _2_1a,
    _2_1b: _2_1b,
    _2_1c: _2_1c,
    _2_1d: _2_1d,
    _2_2: _2_2,
    _2_2a: _2_2a,
    _2_2b: _2_2b,
    _2_2c: _2_2c,
    _2_3: _2_3,
    _2_3a: _2_3a,
    _2_3b: _2_3b,
    _2_3c: _2_3c,
    _2_4: _2_4,
    _2_4a: _2_4a,
    _2_4b: _2_4b,
    _2_4c: _2_4c,
    _2_5: _2_5,
    _2_5a: _2_5a,
    _2_5b: _2_5b,
    _2_5c: _2_5c,
    _2_5d: _2_5d,
    _2_5e: _2_5e,
    _2_6: _2_6,
    _2_6a: _2_6a,
    _2_6b: _2_6b,
    _2_6c: _2_6c,
    _3_1: _3_1,
    _3_1a: _3_1a,
    _3_1b: _3_1b,
    _3_2: _3_2,
    _3_2a: _3_2a,
    _3_2b: _3_2b,
    _3_2c: _3_2c,
    _3_3: _3_3,
    _3_3a: _3_3a,
    _3_3b: _3_3b,
    _3_4: _3_4,
    _3_4a: _3_4a,
    _3_4b: _3_4b,
    _3_5: _3_5,
    _3_5a: _3_5a,
    _3_5b: _3_5b,
    _3_5c: _3_5c,
    _3_5ci: _3_5ci,
    _3_6: _3_6,
    _3_6a: _3_6a,
    _3_6b: _3_6b,
    _3_6c: _3_6c,
    _4_1: _4_1,
    _4_2: _4_2,
    _4_3: _4_3,
    _4_4: _4_4,
    _5_1: _5_1,
    _5_1a: _5_1a,
    _5_2: _5_2,
    _5_2a: _5_2a,
    _5_2b: _5_2b,
    _5_2c: _5_2c,
    _5_3: _5_3,
    _5_3a: _5_3a,
    _5_3b: _5_3b,
    _5_3c: _5_3c,
    _5_4: _5_4,
    _5_4a: _5_4a,
    _5_4b: _5_4b,
    _5_5: _5_5,
    _5_5a: _5_5a,
    _5_5ai: _5_5ai
  });

  put_form_options.path = `/patients/forms/${form_id}`;
  put_form_options.headers['Content-Length'] = data.length;

  let request = http.request(put_form_options, response => {
    console.log(`statusCode: ${response.statusCode}`);
    response.on('data', d => {
      process.stdout.write(d);
    });
  });

  request.on('error', error => {
    console.error(error);
  });

  request.write(data);
  request.end();
}

// example use:
// updateFormById('2345678901',
//   'yes', null, 'yes', '10-22-2020', 'yes', null, 'no', 
//   '10-28-2020', 'yes', 'yes', 'yes', '10-21-2020',
//   'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'severe', 'no',
                            
//   'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 
//   'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes',
                          
//   'yes', 'yes', 'yes', 'yes', 'yes', 'yes','yes', 'yes', 'none', 'yes', 'yes', 'yes', 
//   'yes', 'yes', 'yes','yes', 'other', 'space shuttle', 'yes', 'yes', 'yes', 'yes',
                            
//   'yes', 'yes', 'yes', 'yes',
                            
//   'yes', 'yes', 'yes', 'yes','yes', 'yes', 'yes', 'yes','yes', 'yes', 'yes', 'yes','yes', 'yes', 'yes'
// );


// DELETE patient by id

var delete_patient_options = {
  hostname: 'localhost',
  port: 3001,
  path: null,
  method: 'DELETE'
}

const deletePatientById = function(id) {

  delete_patient_options.path = `/patients/${id}`;

  let request = http.request(delete_patient_options, response => {
    console.log(`statusCode: ${response.statusCode}`);
    console.log('HEADERS: ' + JSON.stringify(response.headers));
  });

  request.on('error', error => {
    console.error(error);
  });

  request.end();
}

// example:
// deletePatientById('0000000000');

var delete_form_options = {
  hostname: 'localhost',
  port: 3001,
  path: null,
  method: 'DELETE'
}

const deleteFormById = function(form_id) {

  delete_form_options.path = `/patients/forms/${form_id}`;

  let request = http.request(delete_form_options, response => {
    console.log(`statusCode: ${response.statusCode}`);
    console.log('HEADERS: ' + JSON.stringify(response.headers));
  });

  request.on('error', error => {
    console.error(error);
  });

  request.end();
}

// example
// deleteFormById('1234567890');

module.exports = {
  getPatients,
  getPatientById,
  getFormsByPatientId,
  getAcuitiesByPatientId,
  getAcuityAndFormByFormId,
  createPatient,
  createForm,
  updatePatientById,
  updateFormById,
  deletePatientById,
  deleteFormById,
}