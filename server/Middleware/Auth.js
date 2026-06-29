const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {

    try {

        const token = req.header("auth-token");

        console.log("TOKEN:", token);

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "No token found"
            });
        }

        const verified = jwt.verify(token, "home-service");

        console.log("VERIFIED USER:", verified);

        req.userid = verified;

        next();

    } catch (error) {

        console.log(error);

        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }
};

module.exports = auth;