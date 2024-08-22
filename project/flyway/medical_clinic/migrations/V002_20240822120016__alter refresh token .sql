-- Add the user_id column to the refresh_token table
ALTER TABLE refresh_token
ADD COLUMN user_id BIGINT NOT NULL;

-- Add a foreign key constraint to link user_id with the users table
ALTER TABLE refresh_token
ADD CONSTRAINT fk_refresh_token_user
FOREIGN KEY (user_id) REFERENCES users(id);