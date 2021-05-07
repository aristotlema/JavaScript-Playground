-- psql -U postgres -- open pg terminal

-- \l - lists all databases

-- \c database_name - move into database

-- \dt - show table in db

CREATE DATABASE todo_database;

-- \c todo_database

CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    description VARCHAR(255)
);