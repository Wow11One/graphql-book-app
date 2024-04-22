const userService = require('../service/user.service')

const userResolver = {
    Query: {
        login: async (parent, args) => {
            return await userService.login(args)
        },
        check: async (parent, args, context) => {
            return await userService.check(context)
        }
    },
    Mutation: {
        registration: async (parent, args) => {
            return await userService.registration(args)
        }
    }
}

module.exports = userResolver