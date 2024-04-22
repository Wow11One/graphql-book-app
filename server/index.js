require('dotenv').config();
const sequelize = require('./db');
const {ApolloServer} = require('apollo-server-express');
const express = require('express');
const schema = require('./schema/schema');
const resolvers = require('./resolver/resolver');
const authMiddleware = require('./middleware/auth.middleware');
const {graphqlUploadExpress} = require('graphql-upload');
const {ApolloServerPluginLandingPageLocalDefault} = require('apollo-server-core');


const PORT = 5000
const app = express()
const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
    cache: 'bounded',
    plugins: [ApolloServerPluginLandingPageLocalDefault({embed: true})],
    context: ({req, res}) => {
        authMiddleware(req, res)
        return {isAuth: req.isAuth}
    }
});


const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        await server.start();
        app.use(graphqlUploadExpress());
        server.applyMiddleware({app});
        app.use(express.static('public'))

        app.listen(PORT, () => console.log(`server is listening ${PORT} port`));
    } catch (e) {
        console.log(e)
    }
}

start()