'use strict';
// const https = require('https');
// const fs = require('fs');
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
// const { createServer } = require('http')

const { parse } = require('url')

const next = require('next');

const dev = process.env.NODE_ENV !== 'production'
console.log('process.env.NODE_ENV: ', process.env.NODE_ENV);
console.log('dev: ', dev);
const hostname = 'localhost'
const port = 3000
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port })
const handle = app.getRequestHandler();


// const mailer = require('./modules/mail');
const roleMiddleware = require('./auth/roleMiddleware');
const requireAuthentication = require('./auth/authMiddleware');

const path = require('path');
const cookieParser = require('cookie-parser');

async function start(port = 5000) {
  await app.prepare();
  const server = express();
  server.use(cors());
  const limiter = rateLimit({
    windowMs: 1000,
    max: 15
  });
  server.set('trust proxy', 1);
  server.use(cookieParser());
  server.use(express.urlencoded({ extended: true }));
  server.use(express.json());

  server.use(limiter);

  server.use('/auth', require('./auth/authRoutes'));

  server.get('/auth/login', async (req, res) => {
    console.log('!!!!!!!!!!!!!!!!!!!        /auth/login');
    // const result = await handle(req, res);
    // return result;
    app.render(req, res, '/auth/login')
  });


  server.all(/^\/secure\/*/, requireAuthentication, async (req, res) => {
    console.log('secured path handler for: ', req.url);
    await handle(req, res)
  });
  server.all('/', requireAuthentication, async (req, res) => {
    console.log('secured path handler for: ', req.url);
    await handle(req, res)
  });

  server.get('*', async (req, res) => {
    await handle(req, res)
  });

  server.listen(port, () => {
    console.log(`App started on port ${port}`);
  });
  (require('./controllers/dbController')).dbConnect();

}
module.exports = { start };