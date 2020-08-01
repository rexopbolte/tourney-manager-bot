const Discord = require('discord.js');
const { token,  prefix, giphyToken } = require('./config.json');
const client = new Discord.Client();

var GphApiClient = require('giphy-js-sdk-core')
giphy = GphApiClient(giphyToken)

client.once('ready', () => {
    console.log('Online!');

    client.user.setPresence({
        status: "online",
        game: {
            name: "by Rex",
            type: "DEVELOPING"
        }
    });
});

client.on('message', message => {

    if(message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS' ])){
    //console.log(message.content);
    if(message.content.startsWith( '..kick')) {
    //message.channel.send('Kick')

    let member = message.mentions.members.first();
    member.kick().then((member) => {
        giphy.search('gifs', {"q" : "fail"})
        .then((response) =>{
            var totalResponses = response.data.length;
            var responseIndex = Math.floor((Math.random() * 10) + 1) %totalResponses;
            var responseFinal = response.data[responseIndex];

            message.channel.send(":wave: " + member.displayName + " has been kicked", {
                files: [responseFinal.images.fixed_height.url]
            })
        }).catch(() => {
            message.channel.send('Error ugh');
        })
       

    })
    }
}
})

client.on('message', message => {

    if(message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS' ])){
    //console.log(message.content);
    if(message.content.startsWith( '..ban')) {
    //message.channel.send('Kick')

    let member = message.mentions.members.first();
    member.ban().then((member) => {
        giphy.search('gifs', {"q" : "ban"})
        .then((response) =>{
            var totalResponses = response.data.length;
            var responseIndex = Math.floor((Math.random() * 10) + 1) %totalResponses;
            var responseFinal = response.data[responseIndex];

            message.channel.send(":wave: " + member.displayName + " has been banned", {
                files: [responseFinal.images.fixed_height.url]
            })
        }).catch(() => {
            message.channel.send('Error ugh');
        })
       

    })
    }
}
})

client.login(token);

