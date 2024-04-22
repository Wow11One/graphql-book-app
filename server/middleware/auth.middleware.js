const jwt = require('jsonwebtoken');

const authMiddleware = (req, res) => {
    const authHeader = req.get('Authorization')
    if (!authHeader) {
        req.error = "No authentication header found."
        req.isAuth = false
        return
    }

    let decoded

    try {
        const token = authHeader.split(' ')[1]
        decoded = jwt.verify(token, process.env.SECRET_KEY)
    } catch (error) {
        req.isAuth = false
        req.error = error.message
        return
    }

    if (!decoded) {
        req.isAuth = false
        req.error = "Unable to decode jwt"
        req.user = 'no'
        return
    }

    req.isAuth = true
}

module.exports = authMiddleware