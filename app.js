const pjson = require('./package.json');
const express = require('express');
const httpProxy = require('http-proxy');
const app = express();
const nunjucks = require('nunjucks');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

require('dotenv').config();

if (!process.env.EXPRESS_ENV) {
  console.error('Server environment not properly set up. Are you missing the .env file?');
  return;
}

const isDevelopment = process.env.EXPRESS_ENV !== 'production';

const serverPort = process.env.EXPRESS_PORT || 3000;

app.use(cookieParser());

const apiUrl = process.env.EXPRESS_API_URL;
let apiProxyOpts = {};
if (isDevelopment) {
  apiProxyOpts = {
    changeOrigin: true,
    target: {
      https: true,
    }
  };
}
const apiProxy = httpProxy.createProxyServer(apiProxyOpts);

nunjucks.configure('views', {
    autoescape: true,
    express: app,
    watch: true
});

function getBaseVars() {
    return {
        apiPaths: JSON.stringify({
          api: '/api/v1.0',
          auth: '/auth/v1.0',
          backOffice: '/backoffice/v1.0'
        }),
        appVersion: pjson.version
    };
}

app.get('/', (req, res) => {
    vars = getBaseVars();
    vars.currentRouteKey = 'home';
    res.render('index.html', vars);
});


function forwardApi(req, res) {
  console.log(`fowarding auth traffic to ${apiUrl}`);
  apiProxy.web(req, res, { target: apiUrl });
}

app.use(express.static('static'));

app.listen(serverPort, () => console.log(`${isDevelopment ? 'DEVELOPMENT' : 'PRODUCTION'} Server listening on port ${serverPort}.`));
