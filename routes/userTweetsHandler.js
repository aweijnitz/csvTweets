var os = require('os');
var fs = require('fs');
var all = require("promised-io/promise").all;

var path = require('path');
var util = require('util');

var json2csv = require('json2csv');

var Twitter = require('twitter');
var keys = {
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
};
var twitterClient = new Twitter(keys);


/**
 * Private helper to sanity check a string before using it.
 * @param str
 * @returns {boolean}
 */
var isDefined = function (str) {
    return (typeof str != 'undefined' && null != str && '' != str);
}

var stripAlpha = function (name) {
    if (name.indexOf('@') == 0)
        return name.slice(1);
    return name;
}

/**
 * Public. Takes care of downloading tweets and return the result.
 * @param req
 * @param res
 */
var handleForm = function userTweetsHandler(appConf, log4js) {
    var logger = log4js.getLogger("tweetDL");


    return function handleUpload(req, res) {

        var twitterName = req.query.twitterName;

        if (!isDefined(twitterName)) {
            res.render('error', {message: 'Missing Twitter name. Try /tweets?twitterName=aweijnitz'});
        } else {
            twitterClient.get('statuses/user_timeline', {
                screen_name: stripAlpha(twitterName),
                count: 200,
                contributor_details: false,
                include_rts: false
            }, function (error, tweets, response) {
                if (error) throw error;
                json2csv({data: tweets, fields: ['created_at', 'text', 'id_str']}, function (err, csv) {
                    if (err) throw err;
                    res.set('Content-Type', 'text/csv');
                    res.send(csv);
                });
            });
        }
    };
};

module.exports = handleForm;
