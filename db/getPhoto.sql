SELECT id, photoUrl FROM Photos
WHERE letter = $1
AND letterCount = $2;