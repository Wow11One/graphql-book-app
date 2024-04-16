require('dotenv').config()
const express = require('express')
const cors = require('cors')
const sequelize = require('./db')
const models = require('./models/models')
const {graphqlHTTP} = require('express-graphql')
const schema = require('./schema/schema')
const resolver = require('./resolver/resolver')

const app = express()
const PORT = 5000

app.use(cors())
app.use('/graphql', graphqlHTTP({
    graphiql: true,
    schema,
    rootValue: resolver
}))

const start = async () => {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, () => console.log(`server is listening ${PORT} port`))
    } catch (e) {
        console.log(e)
    }
}

start()