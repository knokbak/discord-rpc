var config = require('./config.json');
console.info(config.messages.start);

var DiscordRPC = require('discord-rpc');

var rpc = new DiscordRPC.Client({ transport: config.transport });
var started = new Date();

async function setGame(){
    if(!rpc) return console.warn(config.messages.norpc);
    console.info(config.messages.update);
    
    rpc.setActivity({
        details: config.data.details,
        state: config.data.state,
        largeImageKey: config.data.largeImageKey,
        largeImageText: config.data.largeImageText,
        smallImageKey: config.data.smallImageKey,
        smallImageText: config.data.smallImageText,
        startTimestamp: started,
        instance: config.data.instance
    });
}

rpc.on('ready', async() => {
    console.info('Now connected to Discord RPC!');

    setGame();

    setInterval(() => {
    setGame();
    }, 20000);
});

rpc.login({ clientId: config.clientID }).catch(console.error);