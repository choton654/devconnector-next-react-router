const express = require("express");
const nextJS = require("next");
const dbConnect = require("./utils/dbConnect");
const Cors = require("cors");

async function start() {
  const dev = process.env.NODE_ENV !== "production";
  const port = process.env.PORT || 3000;
  const app = nextJS({ dev });
  const handle = app.getRequestHandler();
  const server = express();
  await app.prepare();

  // db connect
  dbConnect();

  // body parser
  server.use(express.json({ extended: false }));
  server.use(Cors());

  const users = require("./routes/users");
  const posts = require("./routes/posts");
  const profile = require("./routes/profile");

  server.use("/api/users", users);
  server.use("/api/profile", profile);
  server.use("/api/posts", posts);

  server.all("*", (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:3000`);
  });
}

start();
