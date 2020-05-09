const Pool = require('pg').Pool;
const pool = new Pool({
  user: 'intusadmin',
	host: 'localhost',
	database: 'intus',
	password: 'cs132',
	port: '5432',
});

const getPatients = (request, response) => {
  pool.query('SELECT * FROM patients ORDER BY name_last ASC;', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
}

const getPatientById = (request, response) => {
  const id = request.params.id;

  pool.query('SELECT * FROM patients WHERE patient_id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
}

const getFormsByPatientId = (request, response) => {
  const id = request.params.id;

  pool.query('SELECT * FROM form_data WHERE patient_id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
}

const getAcuitiesByPatientId = (request, response) => {
  const id = request.params.id;

  pool.query('SELECT * FROM acuities WHERE patient_id = $1 ORDER BY date_submitted DESC', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
}

const getAcuityAndFormByFormId = (request, response) => {
  const id = request.params.formid;

  pool.query('SELECT * FROM acuities NATURAL JOIN form_data WHERE form_id = $1', [id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
}

// Old method of making new ids that weren't the same as existing ids. 
// Problem with this method is that it relies on all patients to have been processed through
// this API, which may not be true, and also it is not resiliant to crashes. 

// let patient_id_seq = 0;
// let unsequenced_patient_ids = new Set();

// const newPatientId = function(id = null) {
//   if (id && id >= patient_id_seq && !unsequenced_patient_ids.has(id)) {
//     unsequenced_patient_ids.add(id);
//     return id;
//   } 
//   while (unsequenced_patient_ids.has(patient_id_seq)) {
//     unsequenced_patient_ids.delete(patient_id_seq)
//     patient_id_seq += 1;
//   }
//   let new_id = patient_id_seq;
//   patient_id_seq += 1;
//   return new_id;
// }

// Random ID creator, source: https://gist.github.com/gordonbrander/2230317
var id_maker = function () {
  return '_' + Math.random().toString(36).substr(2, 9);
};

const createPatient = (request, response) => {
  let { patient_id,
    name_first,
    name_middle,
    name_last,
    date_of_birth,
    address_street,
    address_city,
    address_state,
    address_zip,
    phone,
    patient_since
    } = request.body;
  
  patient_id = patient_id ? patient_id : id_maker();
  date_of_birth = new Date(date_of_birth);
  patient_since = new Date(patient_since);
  const now = new Date();

  pool.query(
    `INSERT INTO patients (
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
      patient_since, 
      created_on
    ) VALUES (
      $1, $2, $3, 
      $4, $5, $6, 
      $7, $8, $9, 
      $10, $11, $12
    ) 
    RETURNING patient_id;` ,
    
    [ patient_id, 
      name_first,
      name_middle,
      name_last,
      date_of_birth,
      address_street,
      address_city,
      address_state,
      address_zip,
      phone,
      patient_since, 
      now ],

    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send({message: `Patient added with ID: ${results.rows[0].patient_id}`, patient_id: results.rows[0].patient_id});
    }
  );    
}

const createForm = (request, response) => {
  
  const patient_id = request.params.id;

  let {
    assessor_id,
    _1_1, _1_1a, _1_1b, _1_1c, 
    _1_2, _1_2a, _1_2b, _1_2c, 
    _1_3, _1_3a, _1_3b, _1_3c, 
    _1_4, _1_4a, 
    _1_5, _1_5a, 
    _1_6, _1_6a, _1_6b, _1_6c, 
    _2_1, _2_1a, _2_1b, _2_1c, _2_1d, 
    _2_2, _2_2a, _2_2b, _2_2c, 
    _2_3, _2_3a, _2_3b, _2_3c, 
    _2_4, _2_4a, _2_4b, _2_4c, 
    _2_5, _2_5a, _2_5b, _2_5c, _2_5d, _2_5e, 
    _2_6, _2_6a, _2_6b, _2_6c, 
    _3_1, _3_1a, _3_1b, 
    _3_2, _3_2a, _3_2b, _3_2c, 
    _3_3, _3_3a, _3_3b, 
    _3_4, _3_4a, _3_4b, 
    _3_5, _3_5a, _3_5b, _3_5c, 
    _3_6, _3_6a, _3_6b, _3_6c, 
    _4_1, _4_2, _4_3, _4_4, 
    _5_1, _5_1a, 
    _5_2, _5_2a, _5_2b, _5_2c, 
    _5_3, _5_3a, _5_3b, _5_3c, 
    _5_4, _5_4a, _5_4b, 
    _5_5, _5_5a, _5_5ai} = request.body;

  form_id = id_maker();
  
  created_on = new Date();
  _1_1c = new Date(_1_1c);
  _1_2c = new Date(_1_2c); 
  _1_3c = new Date(_1_3c);

  pool.query(
    `INSERT INTO form_data VALUES ( 
      $1, $2, $3, $4,
      $5, $6, $7, $8,
      $9, $10, $11, $12,
      $13, $14, $15, $16,
      $17, $18, $19, $20,
      $21, $22, $23, $24,
      $25, $26, $27, $28,
      $29, $30, $31, $32,
      $33, $34, $35, $36,
      $37, $38, $39, $40,
      $41, $42, $43, $44,
      $45, $46, $47, $48,
      $49, $50, $51, $52,
      $53, $54, $55, $56,
      $57, $58, $59, $60,
      $61, $62, $63, $64,
      $65, $66, $67, $68,
      $69, $70, $71, $72,
      $73, $74, $75, $76,
      $77, $78, $79, $80,
      $81, $82, $83, $84,
      $85, $86, $87, $88,
      $89, $90, $91, $92
    ) 
    RETURNING form_id, patient_id;
     `,
     [form_id, 
      patient_id,
      assessor_id,
      created_on,
      _1_1, _1_1a, _1_1b, _1_1c, 
      _1_2, _1_2a, _1_2b, _1_2c, 
      _1_3, _1_3a, _1_3b, _1_3c, 
      _1_4, _1_4a, 
      _1_5, _1_5a, 
      _1_6, _1_6a, _1_6b, _1_6c, 
      
      _2_1, _2_1a, _2_1b, _2_1c, _2_1d, 
      _2_2, _2_2a, _2_2b, _2_2c, 
      _2_3, _2_3a, _2_3b, _2_3c, 
      _2_4, _2_4a, _2_4b, _2_4c, 
      _2_5, _2_5a, _2_5b, _2_5c, _2_5d, _2_5e, 
      _2_6, _2_6a, _2_6b, _2_6c, 
      
      _3_1, _3_1a, _3_1b, 
      _3_2, _3_2a, _3_2b, _3_2c, 
      _3_3, _3_3a, _3_3b, 
      _3_4, _3_4a, _3_4b, 
      _3_5, _3_5a, _3_5b, _3_5c, 
      _3_6, _3_6a, _3_6b, _3_6c, 
      
      _4_1, _4_2, _4_3, _4_4, 
      
      _5_1, _5_1a, 
      _5_2, _5_2a, _5_2b, _5_2c, 
      _5_3, _5_3a, _5_3b, _5_3c, 
      _5_4, _5_4a, _5_4b, 
      _5_5, _5_5a, _5_5ai],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send({message: `Form: ${results.rows[0].form_id} submitted for patient with ID: ${results.rows[0].patient_id}`, data: {patient_id: results.rows[0].patient_id, form_id: results.rows[0].form_id}});
    }
  );
}

const updatePatientById = (request, response) => {
  const patient_id = request.params.id;
  let {
    name_first,
    name_middle,
    name_last,
    date_of_birth,
    address_street,
    address_city,
    address_state,
    address_zip,
    phone,
    patient_since } = request.body; 

  console.log("patient_id: " + patient_id);
  console.log("name_first: " + name_first);

  date_of_birth = new Date(date_of_birth);
  patient_since = new Date(patient_since);

  pool.query(
    `UPDATE patients 
      SET name_first = $1,
      name_middle = $2,
      name_last = $3,
      date_of_birth = $4,
      address_street = $5,
      address_city = $6,
      address_state = $7,
      address_zip = $8,
      phone = $9,
      patient_since = $10
      WHERE patient_id = $11
      RETURNING patient_id;`,
     [name_first,
      name_middle,
      name_last,
      date_of_birth,
      address_street,
      address_city,
      address_state,
      address_zip,
      phone,
      patient_since,
      patient_id],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Patient modified with ID: ${results.rows[0].patient_id}`);
    }
  );
}

const updateFormById = (request, response) => {
  const form_id = request.params.formid;
  let {
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
    _5_5ai } = request.body;

  console.log(_1_1c);
  console.log(_1_2c); 
  console.log(_1_3c); 

  pool.query(
    `UPDATE form_data SET  
      "1_1" = $1,
      "1_1a" = $2,
      "1_1b" = $3,
      "1_1c" = $4,
      "1_2" = $5,
      "1_2a" = $6,
      "1_2b" = $7,
      "1_2c" = $8,
      "1_3" = $9,
      "1_3a" = $10,
      "1_3b" = $11,
      "1_3c" = $12,
      "1_4" = $13,
      "1_4a" = $14,
      "1_5" = $15,
      "1_5a" = $16,
      "1_6" = $17,
      "1_6a" = $18,
      "1_6b" = $19,
      "1_6c" = $20,
      "2_1" = $21,
      "2_1a" = $22,
      "2_1b" = $23,
      "2_1c" = $24,
      "2_1d" = $25,
      "2_2" = $26,
      "2_2a" = $27,
      "2_2b" = $28,
      "2_2c" = $29,
      "2_3" = $30,
      "2_3a" = $31,
      "2_3b" = $32,
      "2_3c" = $33,
      "2_4" = $34,
      "2_4a" = $35,
      "2_4b" = $36,
      "2_4c" = $37,
      "2_5" = $38,
      "2_5a" = $39,
      "2_5b" = $40,
      "2_5c" = $41,
      "2_5d" = $42,
      "2_5e" = $43,
      "2_6" = $44,
      "2_6a" = $45,
      "2_6b" = $46,
      "2_6c" = $47,
      "3_1" = $48,
      "3_1a" = $49,
      "3_1b" = $50,
      "3_2" = $51,
      "3_2a" = $52,
      "3_2b" = $53,
      "3_2c" = $54,
      "3_3" = $55,
      "3_3a" = $56,
      "3_3b" = $57,
      "3_4" = $58,
      "3_4a" = $59,
      "3_4b" = $60,
      "3_5" = $61,
      "3_5a" = $62,
      "3_5b" = $63,
      "3_5c" = $64,
      "3_5ci" = $65,
      "3_6" = $66,
      "3_6a" = $67,
      "3_6b" = $68,
      "3_6c" = $69,
      "4_1" = $70,
      "4_2" = $71,
      "4_3" = $72,
      "4_4" = $73,
      "5_1" = $74,
      "5_1a" = $75,
      "5_2" = $76,
      "5_2a" = $77,
      "5_2b" = $78,
      "5_2c" = $79,
      "5_3" = $80,
      "5_3a" = $81,
      "5_3b" = $82,
      "5_3c" = $83,
      "5_4" = $84,
      "5_4a" = $85,
      "5_4b" = $86,
      "5_5" = $87,
      "5_5a" = $88,
      "5_5ai" = $89
    WHERE form_id = $90
    RETURNING form_id, patient_id;
     `,
     [_1_1,
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
      _5_5ai,
      form_id
    ],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(200).send(`Form: ${results.rows[0].form_id} updated for patient with ID: ${results.rows[0].patient_id}`);
    }
  );
}

const deletePatientById = (request, response) => {
  const patient_id = request.params.id;

  pool.query('DELETE FROM patients WHERE patient_id = $1 RETURNING patient_id;', [patient_id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Patient deleted with ID: ${results.rows[0].patient_id}`);
  });
};

const deleteFormById = (request, response) => {
  const form_id = request.params.formid;

  pool.query('DELETE FROM form_data WHERE form_id = $1 RETURNING form_id;', [form_id], (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).send(`Form deleted with ID: ${results.rows[0].form_id} of patient with ID: ${results.rows[0].patient_id}`);
  });
};

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
  deleteFormById
}
