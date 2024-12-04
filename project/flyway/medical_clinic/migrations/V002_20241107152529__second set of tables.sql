-- table to store patients addresses 
CREATE TABLE medical.address (
    id BIGSERIAL PRIMARY KEY,
    country VARCHAR(200) NOT NULL,
    province VARCHAR(200),
    city VARCHAR(200) NOT NULL,
    zip_code VARCHAR(10),
    street VARCHAR(200) NOT NULL,
    local_number VARCHAR(50) NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

--adding extra column to patient table
ALTER TABLE medical.patients
ADD COLUMN address_id BIGINT,
ADD CONSTRAINT fk_address_id FOREIGN KEY (address_id)
REFERENCES medical.address(id);

CREATE TABLE medical.appointment_type (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    price double precision,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

--table to store information about appointments
CREATE TABLE medical.appointment (
    id BIGSERIAL PRIMARY KEY,
    patient_id BIGINT NOT NULL,
    doctor_id BIGINT NOT NULL,
    appointment_date DATE NOT NULL,
    appointment_time TIME NOT NULL,
    appointment_type_id BIGINT NOT NULL,
    cancellation_resason VARCHAR(255),
    description TEXT,
    notes TEXT,
    status VARCHAR(100),
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    CONSTRAINT fk_patient
        FOREIGN KEY (patient_id)
        REFERENCES medical.patients(id),
    CONSTRAINT fk_doctor
        FOREIGN KEY (doctor_id)
        REFERENCES medical.doctors(id),
    CONSTRAINT fk_appointment_type
        FOREIGN KEY (appointment_type_id)
        REFERENCES medical.appointment_type
);

--table to store perscriptions for each appointment
CREATE TABLE medical.prescriptions (
    id BIGSERIAL PRIMARY KEY,
    medication_name VARCHAR(255) NOT NULL,
    quantity VARCHAR(255),
    instruction VARCHAR(255) NOT NULL,
    appointment_id BIGINT NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    CONSTRAINT fk_appointment
        FOREIGN KEY(appointment_id) REFERENCES medical.appointment(id)
);

--table to store billing for each appointment
CREATE TABLE medical.billing (
    id BIGSERIAL PRIMARY KEY,
    payment_method VARCHAR(255),
    appointment_id BIGINT NOT NULL,
    patient_id BIGINT NOT NULL,
    --switch to double precision in the future
    amount double precision NOT NULL,
    payment_date TIMESTAMP,
    billing_date TIMESTAMP,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    CONSTRAINT fk_patient
        FOREIGN KEY(patient_id)
        REFERENCES medical.patients(id)
);

--table to store information about doctors availability
CREATE TABLE medical.doctor_availability (
    id BIGSERIAL PRIMARY KEY,
    doctor_id BIGINT NOT NULL,
    available_date DATE NOT NULL,
    available_time TIME NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    CONSTRAINT fk_doctor
        FOREIGN KEY(doctor_id)
        REFERENCES medical.doctors(id)
);