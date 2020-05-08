const {ApolloServer} = require('apollo-server');

const {typeDefs, resolvers} = require('./schema');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: args => ({"authToken": args.req.headers.authorization})
});

server.listen().then(({url}) => {
    console.log(`🚀 Server ready at ${url}`);
});

