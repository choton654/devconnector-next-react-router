const express = require('express');
const nextJS = require('next');
const dbConnect = require('./utils/dbConnect');

async function start() {
  const dev = process.env.NODE_ENV !== 'production';
  const app = nextJS({ dev });
  const handle = app.getRequestHandler();
  const server = express();
  await app.prepare();

  // db connect
  dbConnect();

  // body parser
  server.use(express.json({ extended: false }));

  const users = require('./routes/users');
  const posts = require('./routes/posts');
  const profile = require('./routes/profile');

  server.use('/api/users', users);
  server.use('/api/profile', profile);
  server.use('/api/posts', posts);

  server.all('*', (req, res) => {
    return handle(req, res);
  });

  // Redirect all requests to main entrypoint pages/index.js
  // server.get('/*', async (req, res, next) => {
  //   try {
  //     app.render(req, res, '/');
  //   } catch (e) {
  //     next(e);
  //   }
  // });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:3000`);
  });
}

start();
