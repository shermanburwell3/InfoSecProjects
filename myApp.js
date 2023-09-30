const express = require('express');
const app = express();
const helmet = require('helmet');
app.use(helmet.hidePoweredBy());                   //removes "X-Powered-By" header
app.use(helmet.frameguard({action: 'deny'}));      //prevents <frame> and <iframe> clickjacking
app.use(helmet.xssFilter());                       //mitigates risk of cross site scripting (XSS) attacks
app.use(helmet.noSniff());                         //avoids inferring the Response MIME Type   
app.use(helmet.ieNoOpen());                        //prevents IE from opening untrusted HTML    

//converting 90 days into seconds.
let ninetyDaysInSeconds = 90 *24 * 60 * 60;
let timeInSeconds = ninetyDaysInSeconds;
app.use(helmet.hsts({maxAge: timeInSeconds, force: true}));        //forces browsers to access site with HTTPS only
app.use(helmet.dnsPrefetchControl());              //prevents browsers from storing DNS records for added security in exchange for performance
app.use(helmet.noCache());                         //prevents caching, ensuring clients always use the newest version of the site, in exchange for performance





module.exports = app;
const api = require('./server.js');
app.use(express.static('public'));
app.disable('strict-transport-security');
app.use('/_api', api);
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
let port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Your app is listening on port ${port}`);
});
