const { buildSchema } = require("graphql");
const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");

const schema = buildSchema(`
    type Query {
        description: String
    }
`);

const root = {
  description: "Teste description",
};

const app = express();
app.all("/graphql", createHandler({ schema, rootValue: root, graphiql: true }));

app.listen({ port: 4000 });
console.log("Listening to port 4000");
