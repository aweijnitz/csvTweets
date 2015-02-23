# csvTweets.js
Server that takes a twitter username and returns a CSV file with the latest tweets.

![UI](doc/ui.png?raw=true "Screenshot of UI")



## Install
First clone/save this repo

    cd csvTweets.js
    mkdir logs
	npm install

### Configure API keys

* Login to twitter and create an application
* Copy [setAPIKeys_EXAMPLE.sh](setAPIKeys_EXAMPLE.sh) to ```setAPIKeys.sh```
* Fill in the API keys in the file ```setAPIKeys.sh```

### Configure port

Edit the file [appConfig.json](conf/appConfig.json). The default port is 8888.

## Run
	run.sh


Point browser to [localhost:8888](http://localhost:8888)

## Run tests
	npm test

	
## Change the code

All interesting stuff happens in [userTweetsHandler.js](routes/userTweetsHandler.js).
