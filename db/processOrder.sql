INSERT INTO Orders (userid, config, date, price, processed, paid)
VALUES ($6, $7, $8, $9, true, true);

UPDATE Users
SET address = $1,
    address2 = $2,
    city = $3,
    state = $4,
    zip = $5
WHERE id = $6;