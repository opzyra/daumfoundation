// server.js
const { createServer } = require('http');
const next = require('next');

const port = process.env.NEXT_PUBLIC_APP_PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    handle(req, res);
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(
      `Server is running on port ${process.env.NEXT_PUBLIC_APP_PORT}`,
    );
    console.log(`VERSION: ${process.env.npm_package_version}`);
    console.log(`APP: ${process.env.NEXT_PUBLIC_APP_NAME}`);
    console.log(`ENV: ${process.env.NODE_ENV}`);
  });
});
