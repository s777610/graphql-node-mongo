const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const keys = require("./config/keys");
const cors = require("cors");

const app = express();

// allow cross-origin requests
app.use(cors());

//////////////////////
// Connect to Mongo //
//////////////////////
mongoose.connect(
  `mongodb://${keys.mongoUser}:${
    keys.mongoPassword
  }@ds231207.mlab.com:31207/gql-course`,
  { useNewUrlParser: true }
);
mongoose.connection.once("open", () => {
  console.log("connected to mongodb");
});

app.use(
  "/graphql",
  graphqlHTTP({
    schema, // graphql schema
    graphiql: true
  })
);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Listening for requests on port ${PORT}`);
});
