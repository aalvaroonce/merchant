const jwt = require("jsonwebtoken")

const JWT_SECRET = process.env.JWT_SECRET

const userTokenSign = (user) => {
    const sign = jwt.sign(

        {
            _id: user._id,
            role: user.role
        },
            JWT_SECRET,
        {
            expiresIn: "24h"
        }
    )
    return sign

}

const bizTokenSign = (biz) => {

    const sign = jwt.sign(

        {
            CIF: biz.CIF,
        },
            JWT_SECRET,
    )
    return sign

}

const verifyToken = (tokenJwt) => {

    try {
        return jwt.verify(tokenJwt, JWT_SECRET)
    }
    catch(err) {
        console.log(err)
    }
}

module.exports = { userTokenSign, verifyToken, bizTokenSign }