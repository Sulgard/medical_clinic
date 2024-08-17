-- First, create the roles table
CREATE TABLE roles (
    id BIGINT PRIMARY KEY,
    name VARCHAR(50) NOT NULL, -- Stores the enum value as a string or use ENUM as needed
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- Next, create the permissions table
CREATE TABLE permissions (
    id BIGINT PRIMARY KEY,
    name VARCHAR(50) NOT NULL, -- Stores the enum value as a string or use ENUM as needed
    description TEXT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- Create the role_permissions join table
CREATE TABLE role_permissions (
    role_id BIGINT,
    permission_id BIGINT,
    PRIMARY KEY(role_id, permission_id),
    CONSTRAINT fk_role_permissions_role
        FOREIGN KEY(role_id) 
        REFERENCES roles(id),
    CONSTRAINT fk_role_permissions_permission
        FOREIGN KEY(permission_id) 
        REFERENCES permissions(id)
);

-- Now, create the users table
CREATE TABLE users (
    id BIGINT PRIMARY KEY,
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    phone_number VARCHAR(20),
    birth_date DATE,
    gender VARCHAR(50), -- Stores the enum value as a string or use ENUM as needed
    role_id BIGINT,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    CONSTRAINT fk_role
        FOREIGN KEY(role_id) 
        REFERENCES roles(id)
);

-- Create the refresh_token table
CREATE TABLE refresh_token (
    id BIGINT PRIMARY KEY,
    token VARCHAR(255) NOT NULL,
    expiry_date TIMESTAMP,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- Finally, create the patients table
CREATE TABLE patients (
    id BIGINT PRIMARY KEY,
    insurance_number VARCHAR(255),
    -- Inherits from User
    CONSTRAINT fk_patient_user
        FOREIGN KEY(id) 
        REFERENCES users(id)
);

-- Create the doctors table
CREATE TABLE doctors (
    id BIGINT PRIMARY KEY,
    medical_license VARCHAR(255) UNIQUE,
    specialization VARCHAR(255),
    -- Inherits from User
    CONSTRAINT fk_doctor_user
        FOREIGN KEY(id) 
        REFERENCES users(id)
);