DO $create_enums$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'yn') THEN
      CREATE DOMAIN YN VARCHAR(3)
        CHECK (VALUE IN ('yes', 'no'));
    END   IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'severity_enum') THEN
      CREATE DOMAIN SEVERITY_ENUM VARCHAR(8)
        CHECK (VALUE IN ('mild', 'moderate', 'severe'));
    END   IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'education_enum') THEN
      CREATE DOMAIN EDUCATION_ENUM VARCHAR 
        CHECK (VALUE IN ('none', 'grade school', 'high school', 'some college', 'associates', 'bachelors', 'masters', 'doctorate', 'postdoc', 'certification'));
    END   IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'transportation_enum') THEN
      CREATE DOMAIN TRANSPORTATION_ENUM VARCHAR
        CHECK (VALUE IN ('walk', 'wheel', 'cycle', 'drive', 'public bus', 'public train', 'transport service', 'family', 'other'));
    END   IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'risk_enum') THEN
      CREATE DOMAIN RISK_ENUM VARCHAR
        CHECK (VALUE IN ('low', 'moderate', 'high', 'very high'));
    END   IF;

END  $create_enums$;

DROP TABLE IF EXISTS patients;

CREATE TABLE IF NOT EXISTS patients(
  patient_id VARCHAR(10) PRIMARY KEY,
  name_first VARCHAR NOT NULL,
  name_middle VARCHAR,
  name_last VARCHAR NOT NULL,
  date_of_birth TIMESTAMPTZ NOT NULL,
  address_street VARCHAR NOT NULL,
  address_city VARCHAR NOT NULL,
  address_state CHAR(2) NOT NULL,
  address_zip VARCHAR(10) NOT NULL,
  phone VARCHAR(12) NOT NULL,
  patient_since TIMESTAMPTZ NOT NULL,
  created_on TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT chk_phone CHECK (phone ~ '[0-9][0-9][0-9]-[0-9][0-9][0-9]-[0-9][0-9][0-9][0-9]'));

DROP TABLE IF EXISTS form_data;

CREATE TABLE IF NOT EXISTS form_data(
  form_id VARCHAR(10) PRIMARY KEY, 
  patient_id VARCHAR(10) NOT NULL REFERENCES patients(patient_id) ON DELETE CASCADE ON UPDATE CASCADE,
  assessor_id VARCHAR(10) NOT NULL,
  created_on TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "1_1" YN NOT NULL,
  "1_1a" YN, 
  "1_1b" YN,
  "1_1c" DATE,
  "1_2" YN NOT NULL,
  "1_2a" YN, 
  "1_2b" YN,
  "1_2c" DATE,
  "1_3" YN NOT NULL,
  "1_3a" YN, 
  "1_3b" YN,
  "1_3c" DATE,
  "1_4" YN NOT NULL,
  "1_4a" YN, 
  "1_5" YN NOT NULL,
  "1_5a" YN,
  "1_6" YN NOT NULL,
  "1_6a" YN, 
  "1_6b" SEVERITY_ENUM,
  "1_6c" YN,

  "2_1" YN NOT NULL,
  "2_1a" YN, 
  "2_1b" YN,
  "2_1c" YN,
  "2_1d" YN,
  "2_2" YN NOT NULL,
  "2_2a" YN, 
  "2_2b" YN,
  "2_2c" YN,
  "2_3" YN NOT NULL,
  "2_3a" YN, 
  "2_3b" YN,
  "2_3c" YN,
  "2_4" YN NOT NULL,
  "2_4a" YN,
  "2_4b" YN,
  "2_4c" YN,
  "2_5" YN NOT NULL,
  "2_5a" YN,
  "2_5b" YN,
  "2_5c" YN,
  "2_5d" YN,
  "2_5e" YN,
  "2_6" YN NOT NULL,
  "2_6a" YN, 
  "2_6b" YN,
  "2_6c" YN,

  "3_1" YN NOT NULL,
  "3_1a" YN, 
  "3_1b" YN,
  "3_2" YN NOT NULL,
  "3_2a" YN, 
  "3_2b" YN,
  "3_2c" YN,
  "3_3" YN NOT NULL,
  "3_3a" EDUCATION_ENUM, 
  "3_3b" YN,
  "3_4" YN NOT NULL,
  "3_4a" YN,
  "3_4b" YN,
  "3_5" YN NOT NULL,
  "3_5a" YN,
  "3_5b" YN,
  "3_5c" TRANSPORTATION_ENUM,
  "3_6" YN NOT NULL,
  "3_6a" YN, 
  "3_6b" YN,
  "3_6c" YN,

  "4_1" YN NOT NULL,
  "4_2" YN NOT NULL,
  "4_3" YN NOT NULL,
  "4_4" YN NOT NULL,

  "5_1" YN NOT NULL,
  "5_1a" YN, 
  "5_2" YN NOT NULL,
  "5_2a" YN, 
  "5_2b" YN,
  "5_2c" YN,
  "5_3" YN NOT NULL,
  "5_3a" YN, 
  "5_3b" YN,
  "5_3c" YN,
  "5_4" YN NOT NULL,
  "5_4a" YN,
  "5_4b" YN,
  "5_5" YN, 
  "5_5a" YN,
  "5_5ai" YN
);

DROP TABLE IF EXISTS acuities; 

CREATE TABLE IF NOT EXISTS acuities(
  form_id VARCHAR(10) PRIMARY KEY REFERENCES form_data(form_id) ON DELETE CASCADE ON UPDATE CASCADE,
  patient_id VARCHAR(10) NOT NULL REFERENCES patients(patient_id) ON DELETE CASCADE ON UPDATE CASCADE,
  assessor_id VARCHAR(10) NOT NULL,
  date_submitted TIMESTAMPTZ,
  score_p1 INT NOT NULL, 
  score_p2 INT NOT NULL,
  score_p3 INT NOT NULL,
  score_p4 INT NOT NULL,
  score_p5 INT NOT NULL,
  score_total INT NOT NULL,
  risk RISK_ENUM
);