/**
 * Created by mns on 10/21/16.
 */

var Botkit = require('botkit');
var settings = require('./settings.json');
var controller = Botkit.slackbot();
var apiai = require("apiai");
ai = apiai(settings.apiai_uri);

console.log(settings);
var bot = controller.spawn({
    token: settings.bot_token
})

bot.startRTM(function (err, bot, payload) {
    if (err) {
        throw new Error('Could not connect to Slack');
    }
});

controller.hears('hello', 'direct_message', function (bot, message) {
    console.log(message)
    var request = ai.textRequest("what is your name")
    request.on('response', function (response) {
        console.log(response)
        bot.reply(message, {
            attachments: [
                {
                    title: response,
                    callback_id: '123',
                    attachment_type: 'default'
                }
            ]
        });
    });
    request.on('response', function (response) {
        console.log(response)
    });

    request.end();

});

