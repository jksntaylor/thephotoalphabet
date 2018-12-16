SELECT o.id, o.userid, o.photoids, o.date, o.price, o.processed, o.paid, o.shipped, o.delivered, o.guestname, o.guestemail, o.guestaddress, o.guestaddress2, o.guestcity, o.gueststate, o.guestzip, u.name, u.email, u.address, u.address2, u.city, u.state, u.zip 
FROM Orders O
JOIN Users U on O.userid = U.id