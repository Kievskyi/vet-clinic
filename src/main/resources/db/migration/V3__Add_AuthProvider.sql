ALTER TABLE users
    ADD COLUMN auth_provider enum ('LOCAL','GOOGLE','FACEBOOK') null;