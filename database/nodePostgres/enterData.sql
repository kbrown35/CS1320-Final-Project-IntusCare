INSERT INTO patients(patient_id, name_first, name_middle, name_last, date_of_birth, address_street, 
	address_city, address_state, address_zip, phone, patient_since, created_on)
VALUES ('_000000000', 'George', 'D', 'Weissman', to_date('10-28-1934', 'MM-DD-YYYY'),
    '15 Barnes St.', 'Quincy', 'MA', '02171', '617-734-1372', 
    to_date('12-21-2019', 'MM-DD-YYYY'), default),
    ('_000000001', 'Macy', 'Patricia', 'Gordon', to_date('10-28-1939', 'MM-DD-YYYY'),
    '1A Boylston St.', 'Boston', 'MA', '02446-3756', '617-864-9091', 
    to_date('11-22-2019', 'MM-DD-YYYY'), default), 
    ('_000000002', 'Caroline', 'Fucht', 'Branson', to_date('12-03-1920', 'MM-DD-YYYY'),
    '312-35 Main Ave.', 'Stoughton', 'MA', '02335', '617-212-4423', 
    to_date('10-01-2019', 'MM-DD-YYYY'), default),
    ('_000000003', 'David', null, 'Rosenberg', to_date('06-10-1927', 'MM-DD-YYYY'),
    '72-B Huffington Way', 'Laurel', 'MA', '02001-2710', '781-292-8738', 
    to_date('08-17-2018', 'MM-DD-YYYY'), default),
    ('_000000004', 'Amy', 'Sevanah', 'Scaliosa', to_date('07-13-1939', 'MM-DD-YYYY'),
    '444 Western St.', 'Weston', 'MA', '02557', '781-377-9565', 
    to_date('09-09-2017', 'MM-DD-YYYY'), default);

INSERT INTO form_data VALUES 
  ('_234567890', '_000000000', '_000000025', DEFAULT, 
  'yes', null, 'yes', to_date('10-22-2020', 'MM-DD-YYYY'), 'yes', 'yes', 'yes', 
  to_date('10-28-2020', 'MM-DD-YYYY'), 'yes', 'yes', 'yes', to_date('10-21-2020', 'MM-DD-YYYY'),
  'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'severe', 'no',
                             
  'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 
  'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes',
                           
  'yes', 'yes', 'yes', 'yes', 'yes', 'yes','yes', 'yes', 'none', 'yes', 'yes', 'yes', 
  'yes', 'yes', 'yes','yes', 'other', 'yes', 'yes', 'yes', 'yes',
                             
  'yes', 'yes', 'yes', 'yes',
                             
  'yes', 'yes', 'yes', 'yes','yes', 'yes', 'yes', 'yes','yes', 'yes', 'yes', 'yes','yes', 'yes', 'yes', 'no'
  ), 
  ('_345678901', '_000000001', '_000000025', DEFAULT, 
  'no', 'no', 'no', to_date('02-06-2018', 'MM-DD-YYYY'), 'no', 'no', 'no', 
  to_date('10-28-2020', 'MM-DD-YYYY'), 'no', 'no', 'no', to_date('01-29-2020', 'MM-DD-YYYY'),
  'no', 'no', 'no', 'no', 'no', 'no', 'mild', 'no',
                             
  'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 
  'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no',
                           
  'no', 'no', 'no', 'no', 'no', 'no','no', 'no', 'postdoc', 'no', 'no', 'no', 
  'no', 'no', 'no','no', 'family', 'no', 'no', 'no', 'no',
                             
  'no', 'no', 'no', 'no',
                             
  'no', 'no', 'no', 'no','no', 'no', 'no', 'no','no', 'no', 'no', 'no','no', 'no', 'no', 'no'
  ),
  ('_234567891', '_000000000', '_000000026', DEFAULT, 
  'yes', 'yes', 'yes', to_date('10-22-2020', 'MM-DD-YYYY'), 'no', null, null, 
  null, 'no', null, null, null,
  'yes', 'yes', 'no', 'yes', 'yes', 'yes', 'moderate', 'no',
                             
  'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 
  'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes',
                           
  'no', null, null, 'yes', 'yes', 'no','yes', 'yes', 'none', 'yes', 'yes', 'yes', 
  'yes', 'yes', 'yes','yes', 'transport service', 'yes', 'yes', 'yes', 'yes',
                             
  'yes', 'no', 'yes', 'no',
                             
  'yes', 'yes', 'yes', 'yes','yes', 'yes', 'yes', 'yes','yes', 'yes', 'yes', 'yes','yes', 'yes', 'yes', 'no'
  ), 
  ('_345678902', '_000000001', '_000000026', DEFAULT, 
  'no', 'no', 'no', to_date('02-06-2018', 'MM-DD-YYYY'), 'yes', 'no', 'no', 
  to_date('10-28-2020', 'MM-DD-YYYY'), 'no', 'no', 'no', to_date('01-29-2020', 'MM-DD-YYYY'),
  'no', 'no', 'no', 'no', 'no', 'no', 'mild', 'no',
                             
  'yes', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 
  'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no',
                           
  'no', 'no', 'no', 'no', 'no', 'no','no', 'no', 'postdoc', 'no', 'no', 'no', 
  'no', 'no', 'no','no', 'family', 'no', 'no', 'no', 'no',
                             
  'yes', 'yes', 'no', 'yes',
                             
  'no', 'no', 'no', 'no','no', 'no', 'no', 'no','no', 'no', 'no', 'no','no', 'no', 'no', 'yes'
  ),
  ('_123456789', '_000000002', '_000000026', DEFAULT, 
  'yes', null, 'yes', to_date('11-02-2020', 'MM-DD-YYYY'), 'no', 'yes', 'yes', 
  to_date('10-31-2020', 'MM-DD-YYYY'), 'yes', 'yes', 'yes', to_date('10-21-2020', 'MM-DD-YYYY'),
  'yes', 'no', 'yes', 'no', 'yes', 'no', 'mild', 'no',
                             
  'yes', 'no', 'yes', 'yes', 'no', 'yes', 'yes', 'no', 'yes', 'no', 'yes', 'no', 'yes', 'no', 
  'yes', 'no', 'yes', 'no', 'yes', 'no', 'yes', 'no', 'yes', 'no', 'yes', 'no', 'yes',
                           
  'yes', 'no', 'yes', 'no', 'yes', 'no','yes', 'no', 'doctorate', 'no', 'yes', 'no', 
  'no', 'yes', 'no','yes', 'walk', 'yes', 'no', 'yes', 'no',
                             
  'yes', 'no', 'yes', 'no',
                             
  'yes', 'no', 'yes', 'no','yes', 'no', 'yes', 'no','yes', 'no', 'yes', 'no','yes', 'no', 'yes', 'no'
  ), 
  ('_345678903', '_000000003', '_000000026', DEFAULT, 
  'yes', 'no', 'no', to_date('01-01-2017', 'MM-DD-YYYY'), 'yes', 'no', 'no', 
  to_date('12-28-2020', 'MM-DD-YYYY'), 'no', 'no', 'no', to_date('01-29-2020', 'MM-DD-YYYY'),
  'no', 'no', 'no', 'no', 'no', 'no', 'mild', 'no',
                             
  'yes', 'no', 'no', 'yes', 'no', 'no', 'no', 'yes', 'no', 'no', 'yes', 'no', 'no', 'no', 
  'no', 'no', 'no', 'yes', 'no', 'no', 'yes', 'no', 'no', 'yes', 'no', 'no', 'no',
                           
  'yes', 'no', 'no', 'no', 'yes', 'no','no', 'no', 'bachelors', 'no', 'no', 'no', 
  'no', 'no', 'no','no', 'drive', 'no', 'no', 'no', 'no',
                             
  'no', 'no', 'yes', 'no',
                             
  'yes', 'no', 'no', 'no','yes', 'no', 'no', 'no','yes', 'no', 'no', 'no','no', 'yes', 'no', 'no'
  ),
  ('_234567892', '_000000004', '_000000026', DEFAULT, 
  'yes', null, 'yes', to_date('10-22-2020', 'MM-DD-YYYY'), 'yes', 'yes', 'yes', 
  to_date('10-28-2020', 'MM-DD-YYYY'), 'yes', 'yes', 'yes', to_date('10-21-2020', 'MM-DD-YYYY'),
  'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'severe', 'no',
                             
  'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 
  'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes', 'yes',
                           
  'yes', 'yes', 'yes', 'yes', 'yes', 'yes','yes', 'yes', 'none', 'yes', 'yes', 'yes', 
  'yes', 'yes', 'yes','yes', 'other', 'yes', 'yes', 'yes', 'yes',
                             
  'yes', 'yes', 'yes', 'yes',
                             
  'yes', 'yes', 'yes', 'yes','yes', 'yes', 'yes', 'yes','yes', 'yes', 'yes', 'yes','yes', 'yes', 'yes', 'no'
  ), 
  ('_345678904', '_000000003', '_000000026', DEFAULT, 
  'yes', 'no', 'no', to_date('02-06-2018', 'MM-DD-YYYY'), 'yes', 'no', 'no', 
  to_date('10-28-2020', 'MM-DD-YYYY'), 'no', 'no', 'no', to_date('01-29-2020', 'MM-DD-YYYY'),
  'yes', 'no', 'no', 'yes', 'yes', 'yes', 'moderate', 'no',
                             
  'yes', 'no', 'yes', 'yes', 'no', 'yes', 'yes', 'no', 'no', 'yes', 'no', 'yes', 'no', 'no', 
  'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'no', 'yes', 'no', 'yes',
                           
  'yes', 'no', 'yes', 'no', 'no', 'no','yes', 'no', 'bachelors', 'no', 'yes', 'yes', 
  'no', 'yes', 'yes','no', 'family', 'no', 'no', 'no', 'no',
                             
  'yes', 'yes', 'no', 'yes',
                             
  'yes', 'no', 'no', 'no','yes', 'no', 'no', 'yes','no', 'yes', 'no', 'yes','no', 'yes', 'no', 'no'
  );