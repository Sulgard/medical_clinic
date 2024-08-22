INSERT INTO roles (id, name, created_at, updated_at) VALUES
(1, 'PATIENT', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'DOCTOR', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'NURSE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'ADMIN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO permissions (id, name, description, created_at, updated_at) VALUES
(1, 'PATIENT_READ', 'Permission to read patient information.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'PATIENT_WRITE', 'Permission to write patient information.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'PATIENT_CREATE', 'Permission to create new patient records.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'PATIENT_DELETE', 'Permission to delete patient records.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(5, 'PROFILE_VIEW', 'Permission to view user profile.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(6, 'PROFILE_EDIT', 'Permission to edit user profile.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(7, 'APPOINTMENT_VIEW', 'Permission to view appointments.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(8, 'APPOINTMENT_CANCEL', 'Permission to cancel appointments.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(9, 'MEDICAL_RECORD_VIEW', 'Permission to view medical records.', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO role_permissions (role_id, permission_id) VALUES
(1, 1),  -- Role ID 1 (e.g., PATIENT) with Permission ID 1 (e.g., PATIENT_READ)
(1, 2),  -- Role ID 1 (e.g., PATIENT) with Permission ID 2 (e.g., PATIENT_WRITE)
(2, 3),  -- Role ID 2 (e.g., DOCTOR) with Permission ID 3 (e.g., PATIENT_CREATE)
(2, 7),  -- Role ID 2 (e.g., DOCTOR) with Permission ID 7 (e.g., APPOINTMENT_VIEW)
(3, 5),  -- Role ID 3 (e.g., NURSE) with Permission ID 5 (e.g., PROFILE_VIEW)
(3, 8),  -- Role ID 3 (e.g., NURSE) with Permission ID 8 (e.g., APPOINTMENT_CANCEL)
(4, 9);  -- Role ID 4 (e.g., ADMIN) with Permission ID 9 (e.g., MEDICAL_RECORD_VIEW)
