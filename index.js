//Setup
const Discord = require("discord.js");
const config = require('./config.json');
const pokemon = require('./pokemon.json');
const client = new Discord.Client();
const Sequelize = require('sequelize');
const fs = require('fs');

//Save
const Keyv = require('keyv');
const pogo = new Keyv(); // for in-memory storage


const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    // SQLite only
    storage: 'database.sqlite',
});

//Roubei do muller fodasi
const peixes = [
    'https://i.imgur.com/8q8tCpJ.png',
    'https://i.imgur.com/t7xxQvM.png',
    'https://i.imgur.com/G44kVY7.png',
    'https://i.imgur.com/Mxme9dt.png',
    'https://i.imgur.com/cZdrfpF.png',
    'https://i.imgur.com/cyP98eU.png',
    'https://i.imgur.com/yDWzesj.png',
    'https://i.imgur.com/hrmfOym.png',
    'https://i.imgur.com/2a9ivW1.png',
    'https://i.imgur.com/CfLxk0c.png',
    'https://i.imgur.com/0UObVR1.png',
    'https://i.imgur.com/TkJAbwN.png',
    'https://i.imgur.com/l3svjDw.png',
    'https://i.imgur.com/MoDTqst.png',
    'https://i.imgur.com/EzOFO9L.png',
    'https://i.imgur.com/zJ7naVj.png',
    'https://i.imgur.com/q0dtE3T.png',
    'https://i.imgur.com/f1TWTFU.png',
    'https://i.imgur.com/mqOeipV.png',
    'https://i.imgur.com/zQwM1tI.png',
    'https://i.imgur.com/dXR9WTp.png',
    'https://i.imgur.com/eLSJ0ap.png',
    'https://i.imgur.com/QrWqbal.png',
    'https://i.imgur.com/YSmpeXI.png',
    'https://i.imgur.com/Cvg38Rd.png',
    'https://i.imgur.com/pfn0jzn.png',
    'https://i.imgur.com/IGEj1Kj.png',
    'https://i.imgur.com/vXXmf5m.png',
    'https://i.imgur.com/TdfbTHH.png',
    'https://i.imgur.com/kP5WVBY.png',
    'https://i.imgur.com/UyBQMAc.png',
    'https://i.imgur.com/jadIWJy.png',
];

const ofensas = [", tem dois cu",
    " tem pau pequeno",
    " é corno",
    " vai ti fude",
    "queima a rosca",
    " enfia no cu",
    " tem tourette",
    " comeu os cu do Zielort",
    " tem inveja do kyogre do biluga",
    " feeda no badorants",
    " come minhoca no sea of thieves",
    " é chifrudo",
    " guampudo do caralho",
    " queimou carne de peixe e botou a culpa no bk",
    " fez o Zielort quitar do discord"
];

//Pokedex
var pokedex = require('./pokedex.json');
//let pokedex = JSON.parse(pkm);

//Logs
client.once('ready', () => {
    console.log("Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.");
    client.user.setActivity("Pokemon");
    console.log(pokedex.pokemon.abra);
});
client.once('reconnecting', () => {
    console.log('Reconnecting!');
});
client.once('disconnect', () => {
    console.log('Disconnect!');
});

client.on("guildMemberAdd", (member) => {
    member.guild.defaultChannel.send('${member.user} has joined this server');
});

//Evento de mensagens
client.on('message', async message => {

    // Se não for o proprio bot
    if (message.author.bot) return;
    //@all
    if (!message.content.startsWith(config.prefix) && message.mentions.everyone && !message.author.bot) return message.channel.send('Ta marcando pq, corno?');

    // Mensagem customizada
    var mens = Math.floor((Math.random() * 20) + 1);
    if (parseInt(mens) == parseInt(5)) {
        message.channel.send(message.author.toString() + " " + ofensas[Math.floor(Math.random() * ofensas.length)]);
    }

    //=============Pokemon spawn============
    // Matematica inicial
    var poke = Math.floor((Math.random() * 10) + 1);
    console.log('Inicial: ' + await pogo.get('poke'));
    var pokequest = await pogo.get('poke');
    //Se não existe pokemon escolhido
    if (parseInt(poke) > parseInt(1) && ((pokequest == '0') || typeof pokequest == "undefined")) {
        var imagem = Math.floor((Math.random() * 151) + 1);
        console.log('Pokedex: ' + pokemon[imagem-1].toLowerCase());
        const exampleEmbed = new Discord.MessageEmbed()
            .setTitle('Quem é esse pokemon?')
            .setImage('https://raw.githubusercontent.com/BrunoKrugel/PokemonImages/master/1GEN/' + imagem + '.png');
        message.channel.send(exampleEmbed);
        // Salva o número do pokemon
        await pogo.set('poke', imagem);
        console.log('Novo: ' + await pogo.get('poke'));
    }
    var question = await pogo.get('poke', imagem);
    if ((question != 0) && (typeof question !== "undefined")) {
        console.log('entrou pq: ' + question + ' e ' + pokemon[question-1].toLowerCase());
        console.log(message.content.toLowerCase());
        if (message.content.toLowerCase() == pokemon[question-1].toLowerCase()) {
            await pogo.set('poke', 0);
            message.channel.send(message.author.toString() + 'acertou');
        }
        console.log('Depois: ' + await pogo.get('poke'));
    };

    //========================== Ignora o proprio bot e mensagens q n sejam para o bot =======================
    if (!message.content.toLowerCase().startsWith(config.prefix)) return;

    //Salva os parametros em ARGS    
    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();

    if (message.content.toLowerCase().startsWith(config.prefix)) {
        let param = args[0];
        let seco = args[1];
        //=================
        switch (param) {
            case "catch":
                //https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png change number
                break;
                //============== Fun Section
            case "say":
                // makes the bot say something and delete the message. As an example, it's open to anyone to use. 
                // To get the "message" itself we join the `args` back into a string with spaces: 
                const sayMessage = args.join(" ");
                // Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
                message.delete().catch(O_o => {});
                // And we get the bot to say the thing: 
                message.channel.send(sayMessage.slice(3));
                break;
            case "peixe":
                //message.channel.send({ files: [peixes[Math.floor(Math.random() * peixes.length)].toString()] });
                message.channel.send({
                    embed: {
                        color: 3447003,
                        image: {
                            url: peixes[Math.floor(Math.random() * peixes.length)].toString(),
                        },
                    }
                });
                break;
            case "help":
                break;
            default:
                break;
        }
    };
});
client.login(config.token);