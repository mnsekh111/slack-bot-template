/**
 * Created by mns on 10/21/16.
 */

var Botkit = require('botkit');
var settings = require('./settings.json');
var controller = Botkit.slackbot();

console.log(settings);
var bot = controller.spawn({
    token: settings.bot_token
})

bot.startRTM(function(err,bot,payload) {
    if (err) {
        throw new Error('Could not connect to Slack');
    }
});

controller.hears('hello', 'direct_message', function(bot, message) {
    console.log(message)
    bot.replyPublic(message,{
        text:"hello world"
    },function(err){

    });
});
