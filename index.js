//Setup
const {
    Client,
    Intents,
    MessageEmbed
} = require('discord.js');
const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

const pokemon = require('./pokemon.json');

const db = require('./db');

//Save
const Keyv = require('keyv');
const pogo = new Keyv();

const dotenv = require('dotenv');
dotenv.config();

function getUsername(user) {
    user = user.toString();
    if (user.includes("!")) {
        user = user.split("!")[1].split(">")[0];
    } else {
        user = user.split("@")[1].split(">")[0];
    }
    let username = client.users.cache.get(user);
    if (!username) return console.log("Couldn't find the user");
    return username.username;
}

//Logs
client.once('ready', () => {
    console.log("Bot has started.");
    client.user.setActivity("Pokemon");
});
client.once('reconnecting', () => {
    console.log('Reconnecting!');
});
client.once('disconnect', () => {
    console.log('Disconnected!');
});

//Evento de mensagens
client.on('messageCreate', async message => {
    if (message.author.bot) return;

    //=============Pokemon spawn============
    // Matematica inicial
    var poke = Math.floor((Math.random() * 10) + 1);
    console.log('Inicial: ' + await pogo.get('poke'));
    var pokequest = await pogo.get('poke');
    var imagem = Math.floor((Math.random() * 898) + 1);

    //Se não existe pokemon escolhido e 30% de chance de spawnar
    if (parseInt(poke) > parseInt(6) && ((pokequest == '0') || typeof pokequest == "undefined")) {
        console.log('Pokedex: ' + pokemon[imagem - 1].toLowerCase());

        const exampleEmbed = new MessageEmbed()
            .setTitle('Quem é esse pokemon?')
            //    .setImage('https://raw.githubusercontent.com/BrunoKrugel/PokemonImages/master/1GEN/' + imagem + '.png');
            .setImage('https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' + imagem + '.png')
            .setColor('#0099ff');
        message.channel.send({
            embeds: [exampleEmbed]
        });
        // Salva o número do pokemon
        await pogo.set('poke', imagem);
        console.log('Novo: ' + await pogo.get('poke'));
    }
    var question = await pogo.get('poke', imagem);
    if ((question != 0) && (typeof question !== "undefined")) {
        console.log('Entrou pois: ' + question + ' e ' + pokemon[question - 1].toLowerCase());
        console.log(message.content.toLowerCase());
        if (message.content.toLowerCase() == pokemon[question - 1].toLowerCase()) {
            await pogo.set('poke', 0);
            message.channel.send(message.author.toString() + ' acertou');

            console.log(getUsername(message.member));
        }
        console.log('Depois: ' + await pogo.get('poke'));
    }
});
client.login(process.env.token);