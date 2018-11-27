INSERT INTO Users (name, email, hash, address, city, state, zip)
VALUES ($1, $2, $3, null, null, null, null)
RETURNING *;