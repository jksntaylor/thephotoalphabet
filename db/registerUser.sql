INSERT INTO Users (name, email, hash, address, address2, city, state, zip)
VALUES ($1, $2, $3, '', '', '', '', '')
RETURNING *;