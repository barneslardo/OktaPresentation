require("dotenv").config();

const express = require("express");
const path = require("path-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const Sequelize = require("sequelize");
const epilogue = require("epilogue");
const OktaJwtVerifier = require("@okta/jwt-verifier");
const app = express();

const oktaJwtVerifier = new OktaJwtVerifier({
  clientId: process.env.REACT_APP_OKTA_CLIENT_ID,
  issuer: process.env.REACT_APP_OKTA_ORG_URL
});

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// mongoose.Promise = global.Promise;
// mongoose
//   .connect(
//     process.env.REACT_APP_MONGO_URI,
//     { useNewUrlParser: true }
//   )
//   .then(
//     () => {
//       console.log("Mongo is connected");
//     },
//     err => {
//       console.log("Cannot connect to Mongo" + err);
//     }
//   );

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(async (req, res, next) => {
  try {
    if (!req.headers.authorization)
      throw new Error("Authorization header is required");

    const accessToken = req.headers.authorization.trim().split(" ")[1];
    await oktaJwtVerifier.verifyAccessToken(accessToken);
    next();
  } catch (error) {
    next(error.message);
  }
});

const database = new Sequelize({
  dialect: "sqlite",
  storage: "./test.sqlite"
});

const Post = database.define("posts", {
  title: Sequelize.STRING,
  body: Sequelize.TEXT
});

epilogue.initialize({ app, sequelize: database });

epilogue.resource({
  model: Post,
  endpoints: ["/posts", "/posts/:id"]
});

const PORT = process.env.SERVER_PORT || 3001;

app.listen = PORT;
console.log("Server is running");
