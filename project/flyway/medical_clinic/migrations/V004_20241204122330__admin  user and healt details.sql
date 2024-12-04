INSERT INTO medical.users(
    id, 
    first_name, 
    last_name, 
    email, 
    password, 
    phone_number, 
    birth_date, 
    gender, 
    role_id) 
    VALUES (
        1,
        'admin',
        'admin',
        'admin@admin.pl',
        '$2a$10$Y9Zaks215Srp8dsEAu2ysuRkqwBRPRhcCIj/qFQ68XoCYsZ1saALm',
        '000000000',
        '1990-01-15',
        'NONE',
        4
    );

SELECT setval('medical.users_id_seq', (SELECT MAX(id) FROM medical.users));

CREATE TABLE medical.health_details (
    id BIGSERIAL PRIMARY KEY,
    patient_id BIGINT NOT NULL,
    blood_type CHAR(3),
    allergies TEXT,
    chronic_conditions TEXT,
    medications TEXT,
    notes TEXT,
    emergency_contact_phone VARCHAR(25),
    emergency_contact_name VARCHAR(100),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    CONSTRAINT fk_patients
    FOREIGN KEY(patient_id)
    REFERENCES medical.patients(id)
    ON DELETE CASCADE
);
