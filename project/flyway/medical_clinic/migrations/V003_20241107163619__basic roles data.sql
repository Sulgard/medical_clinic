INSERT INTO medical.roles (id, name, created_at, updated_at) VALUES
(1, 'PATIENT', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'DOCTOR', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'NURSE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'ADMIN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO medical.permissions (id, name, description, created_at, updated_at) VALUES
(1, 'PATIENT_READ', 'Permission to read patient information.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'PATIENT_WRITE', 'Permission to write patient information.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'PATIENT_CREATE', 'Permission to create new patient records.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'PATIENT_DELETE', 'Permission to delete patient records.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 'PROFILE_VIEW', 'Permission to view user profile.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 'PROFILE_EDIT', 'Permission to edit user profile.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(7, 'APPOINTMENT_READ', 'Permission to view appointments.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(8, 'APPOINTMENT_DELETE', 'Permission to cancel appointments.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(9, 'MEDICAL_RECORD_VIEW', 'Permission to view medical records.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(10, 'APPOINTMENT_WRITE', 'Permission to read patient information.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(11, 'APPOINTMENT_CREATE', 'Permission to write patient information.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO medical.role_permissions (role_id, permission_id) VALUES
(1, 1),
(1, 2),
(2, 3),
(2, 7),
(3, 5),
(3, 8), 
(4, 9), 
(2,10),
(2,11);
