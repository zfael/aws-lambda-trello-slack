'use strict';

var Trello = require("node-trello");
var request = require("request");

var trelloKey = "";
var trelloToken = "";

var slackAPI = "https://slack.com/api/chat.postMessage";
var slackToken = "";
var slackChannel = "";

console.log('Loading function');

exports.handler = (event, context, callback) => {

    if (event && event.comment && event.comment.body) {

        var comment = event.comment.body;
        var cardFromComment = "";
        var idList = "";
        var posQA = comment.indexOf("@qa");
        var posDeploy = comment.indexOf("@deploy");
        if (posQA > -1) {
            cardFromComment = `[AUTO] ${comment.substr(posQA + 4)}`;
            idList = "57430870c5ab65f903a3159d";
        } else if (posDeploy > -1) {
            cardFromComment = `[AUTO] ${comment.substr(posDeploy + 7)}`;
            idList = "580665fb9ba6802a14cf8dfc";
        }

        var t = new Trello(trelloKey, trelloToken);
        var newCard = {
            name: cardFromComment,
            desc: comment,
            idList: idList,
            pos: 'top'
        };

        t.post("/1/cards/", newCard, function (err, data) {
            if (err) {
                callback("ERROR: " + err);
                console.log(`failed creating card: ${err}`);
                return;
            };

            request
                .post(slackAPI)
                .form({
                    token: slackToken,
                    channel: slackChannel,
                    text: `Card created: ${cardFromComment}`
                })
                .on('response', function (response) {
                    callback(null, "card created");
                });

            console.log("card created");
        });

    }
};