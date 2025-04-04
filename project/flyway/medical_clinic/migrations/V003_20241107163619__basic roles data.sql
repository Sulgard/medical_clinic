INSERT INTO medical.roles (id, name, created_at, updated_at) VALUES
(1, 'PATIENT', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'DOCTOR', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'NURSE', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'ADMIN', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);

INSERT INTO medical.appointment_type (id, name, price, created_at, updated_at) VALUES
(1, 'Consultation', 150.00, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(2, 'Follow-up', 75.50, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(3, 'Diagnostics', 250.75, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
(4, 'Routine Check-up', 120.25, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP);
