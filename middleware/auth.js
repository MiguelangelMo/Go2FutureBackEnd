const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {

    const token = req.header("x-auth-token");

    if (!token) return res.status(401).json({ msn: "Permiso no valido" })

    try {
        const tokenEncrypt = jwt.verify(token, process.env.token);
        req.users = tokenEncrypt.users;
        next();
    } catch (error) {
        res.status(401).json({ msn: "Token no valido" })
    }

}