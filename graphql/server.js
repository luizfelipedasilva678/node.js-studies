const path = require("path");
const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
const { makeExecutableSchema } = require("@graphql-tools/schema");
const { loadFilesSync } = require("@graphql-tools/load-files");

const typeDefs = loadFilesSync(path.join(__dirname, "**/*.graphql"));
const resolvers = loadFilesSync(path.join(__dirname, "**/*.resolvers.js"));

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

const app = express();
app.all("/graphql", createHandler({ schema }));

app.listen({ port: 4000 });
console.log("Listening to port 4000");
