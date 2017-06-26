'use strict';

process.env.DEBUG = 'actions-on-google:*';
const App = require('actions-on-google').ApiAiApp;

const WELCOME_INTENT = 'input.welcome';
const SEARCH_WORD_INTENT = 'input.searchWord';
const SEARCH_WORD_ARGUMENT = 'searchWord';

exports.twitterSearch = (request, response) => {

    const app = new App({request, response});

    function welcomeIntent(app) {
        app.ask('Welcome to Twitter Search! Say a search word.');
    }

    function searchWordIntent(app) {
        const searchWord = app.getArgument(SEARCH_WORD_ARGUMENT);
        var twitter = require('twitter');

        var client = new twitter({
            consumer_key:        '',
            consumer_secret:     '',
            access_token_key:    '',
            access_token_secret: '',
        });

        client.get('search/tweets', {q: '#' + searchWord}, function(error, tweets, response) {
            //console.log(tweets);
            console.log(tweets.statuses[0].text);
            console.log(tweets.statuses[0].text.replace(/http\S+/gi, '').replace(/#\S+/g, '').replace(/@\S+/g, ''));
            app.tell(tweets.statuses[0].text.replace(/http\S+/gi, '').replace(/#\S+/g, '').replace(/@\S+/g, ''));
            //app.tell('You said ' + searchWord);
        });
    }

    const actionMap = new Map();
    actionMap.set(WELCOME_INTENT, welcomeIntent);
    actionMap.set(SEARCH_WORD_INTENT, searchWordIntent);
    app.handleRequest(actionMap);
}
