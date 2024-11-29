CREATE TABLE medical.roles (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

CREATE TABLE medical.users (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    birth_date DATE NOT NULL,
    gender VARCHAR(50) NOT NULL, 
    role_id BIGINT NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    CONSTRAINT fk_role
        FOREIGN KEY(role_id) 
        REFERENCES medical.roles(id)
);

CREATE TABLE medical.refresh_token (
    id BIGSERIAL PRIMARY KEY,
    token VARCHAR(255) NOT NULL,
    user_id BIGINT NOT NULL,
	expires_at TIMESTAMP,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    CONSTRAINT fk_refresh_token_user
        FOREIGN KEY(user_id) REFERENCES medical.users(id)
);

CREATE TABLE medical.patients (
    id BIGSERIAL PRIMARY KEY,
    insurance_number VARCHAR(255) NOT NULL,
    -- Inherits from User
    CONSTRAINT fk_patient_user
        FOREIGN KEY(id) 
        REFERENCES medical.users(id)
);

CREATE TABLE medical.doctors (
    id BIGSERIAL PRIMARY KEY,
    medical_license VARCHAR(255) UNIQUE NOT NULL,
    specialization VARCHAR(255) NOT NULL,
    -- Inherits from User
    CONSTRAINT fk_doctor_user
        FOREIGN KEY(id) 
        REFERENCES medical.users(id)
);

