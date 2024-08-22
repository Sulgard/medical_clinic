-- First, create the roles table
CREATE TABLE roles (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL, -- Stores the enum value as a string or use ENUM as needed
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- Next, create the permissions table
CREATE TABLE permissions (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL, -- Stores the enum value as a string or use ENUM as needed
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
    id BIGSERIAL PRIMARY KEY NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20) NOT NULL,
    birth_date DATE NOT NULL,
    gender VARCHAR(50) NOT NULL, -- Stores the enum value as a string or use ENUM as needed
    role_id BIGINT NOT NULL,
    created_at TIMESTAMP,
    updated_at TIMESTAMP,
    CONSTRAINT fk_role
        FOREIGN KEY(role_id) 
        REFERENCES roles(id)
);

-- Create the refresh_token table
CREATE TABLE refresh_token (
    id BIGSERIAL PRIMARY KEY,
    token VARCHAR(255) NOT NULL,
	expires_at TIMESTAMP,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);

-- Finally, create the patients table
CREATE TABLE patients (
    id BIGSERIAL PRIMARY KEY,
    insurance_number VARCHAR(255) NOT NULL,
    -- Inherits from User
    CONSTRAINT fk_patient_user
        FOREIGN KEY(id) 
        REFERENCES users(id)
);

-- Create the doctors table
CREATE TABLE doctors (
    id BIGSERIAL PRIMARY KEY,
    medical_license VARCHAR(255) UNIQUE NOT NULL,
    specialization VARCHAR(255) NOT NULL,
    -- Inherits from User
    CONSTRAINT fk_doctor_user
        FOREIGN KEY(id) 
        REFERENCES users(id)
);