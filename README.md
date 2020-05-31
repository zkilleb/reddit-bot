# Reddit Bot

## Installation

* Run npm install
* Create creds.js at top level of project with format
```javascript
module.exports = {
    creds: {
        "clientId": <clientId>,
        "clientSecret": <clientSecret>,
        "userAgent": <userAgent>,
        "username": <userName>,
        "password": <password>
    },
    subreddit: <subreddit_name>,
    botOwner: <botowner_username>,
    botName: <botname>,
    flair: <flair_text>,
    postTitle: <post_text>
};
```
* Run npm start

## TODOs

* Handle Promise object returned when accessing author