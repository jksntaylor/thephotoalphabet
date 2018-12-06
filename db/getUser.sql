SELECT id, name, email, hash FROM Users
WHERE email = $1;