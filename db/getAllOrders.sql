SELECT o.id, o.userid, o.photoids, o.date, o.price, o.processed, o.paid, o.shipped, o.delivered, u.name, u.email, u.address, u.address2, u.city, u.state, u.zip 
FROM Orders O
JOIN Users U on O.userid = U.id