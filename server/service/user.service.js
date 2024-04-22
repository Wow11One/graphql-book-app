const {User} = require('../models/models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const generateJwt = (id, email, role) => {
    return jwt.sign({id, email, role},
        process.env.SECRET_KEY,
        {expiresIn: '24h'})
}

class UserService {
    async registration({username, password}) {
        if (!username || !password) {
            return new Error('not correct email or password')
        }
        const candidate = await User.findOne({where: {username}})
        if (candidate) {
            return new Error('user with such email already exists')
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({username, password: hashPassword})
        const token = generateJwt(user.id, user.email, user.role)

        return {token}
    }

    async login({password, username}) {
        const user = await User.findOne({where: {username}})
        if (!user) {
            return new Error('email or password is not found')
        }

        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return new Error('password is not correct')
        }
        const token = generateJwt(user.id, user.email, user.role)

        return {token}
    }

    async check({isAuth}) {
        return isAuth
    }
}

module.exports = new UserService()