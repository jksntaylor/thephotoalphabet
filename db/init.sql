CREATE TABLE Photos (
    id SERIAL PRIMARY KEY,
    letter VARCHAR(1),
    photo_url TEXT
);

CREATE TABLE Users (
    id SERIAL PRIMARY KEY,
    email VARCHAR,
    hash VARCHAR,
    address VARCHAR,
    city VARCHAR,
    state VARCHAR(2),
    zip INTEGER
);

CREATE TABLE Orders (
    id SERIAL PRIMARY KEY,
    user_id REFERENCES Users,
    photo_ids INTEGER[] REFERENCES Photos,
    date DATE,
    price DECIMAL
);