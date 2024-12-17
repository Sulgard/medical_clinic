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

INSERT INTO medical.medicines(id, name, category, dosage_form, manufacturer) VALUES
 (1, 'Paracetamol', 'Analgesic/Antipyretic', 'Tablet', 'Acme Pharmaceuticals'),
 (2, 'Amoxicillin', 'Antibiotic', 'Capsule', 'Medico Labs'),
 (3, 'Metformin', 'Antidiabetic', 'Tablet', 'Diabeto Inc.'),
 (4, 'Ibuprofen', 'Non-Steroidal Anti-Inflammatory Drug', 'Suspension', 'PharmaCare'),
 (5, 'Salbutamol', 'Bronchodilator', 'Inhaler', 'BreatheWell'),
 (6, 'Cetirizine', 'Antihistamine', 'Tablet', 'AllergyFree Meds'),
 (7, 'Omeprazole', 'Proton Pump Inhibitor', 'Capsule', 'GastroHealth Pharma'),
 (8, 'Diclofenac', 'NSAID', 'Gel', 'PainAway Labs'),
 (9, 'Amlodipine', 'Antihypertensive', 'Tablet', 'CardioCare'),
 (10, 'Multivitamin', 'Supplement', 'Syrup', 'NutriPlus Labs');

SELECT setval('medical.medicines_id_seq', (SELECT MAX(id) FROM medical.medicines));
