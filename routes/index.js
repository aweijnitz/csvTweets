var appConf = require('../conf/appConfig.json');
var express = require('express');
var router = express.Router();

var throttle = require('micron-throttle');
express().use(throttle({
        burst: appConf.server.throttle.rate,
        rate: appConf.server.throttle.burst,
        ip: true
    }
));

var log4js = require('log4js');
log4js.configure('./conf/log4js.json');
var logger = log4js.getLogger("index");


// Load route handlers (doubling as rudimentary MVC controllers)
var userTweetsHandler = require('./userTweetsHandler.js');

// Remember, in Express 4, '/' is the root under which this route is mounted, so does not
// necessarily correspond to the absolute root of the domain.
//
router.get('/', function (req, res) {
    logger.debug('Serving / --> index.hjs');
    res.render('index', {title: 'csvTweets'});
});

router.get('/tweets', userTweetsHandler(appConf, log4js));


module.exports = router;
