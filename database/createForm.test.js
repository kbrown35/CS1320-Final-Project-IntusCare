const acc = require('./accessDB');

test('the data is peanut butter', () => {
  return acc.createForm(['_000000000', '0000000025',
  'yes', null, 'yes', '10-22-2020', 'yes', null, 'no', 
  '10-28-2020', 'yes', 'yes', 'yes', '10-21-2020',
  'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'severe', 'no',      
  'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 
  'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes',         
  'yes', 'yes', 'yes', 'yes', 'yes', 'yes','yes', 'yes', 'none', 'yes', 'yes', 'yes', 
  'yes', 'yes', 'yes','yes', 'other', 'yes', 'yes', 'yes', 'yes',             
  'yes', 'yes', 'yes', 'yes',                  
  'yes', 'yes', 'yes', 'yes','yes', 'yes', 'yes', 'yes','yes', 'yes', 'yes', 'yes','yes', 'yes', 'yes']
  ).then((data) => {
    let patient_id = data.patient_id;
    expect(patient_id).toBe('_000000000');
    let form_id = data.form_id;
    expect(form_id).toMatch(/^_\w{9}/)
  });
});

