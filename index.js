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

//Save
const Keyv = require('keyv');
const pogo = new Keyv(); // for in-memory storage

const dotenv = require('dotenv');
dotenv.config();

//Pokedex
var pokedex = require('./pokedex.json');

//Logs
client.once('ready', () => {
    console.log("Bot has started.");
    client.user.setActivity("Pokemon");
    console.log(pokedex.pokemon.abra);
});
client.once('reconnecting', () => {
    console.log('Reconnecting!');
});
client.once('disconnect', () => {
    console.log('Disconnected!');
});

client.on("guildMemberAdd", (member) => {
    member.guild.defaultChannel.send('${member.user} chegou.');
});

//Evento de mensagens
client.on('messageCreate', async message => {

    // Se não for o proprio bot
    if (message.author.bot) return;

    //@all
    if (!message.content.startsWith(process.env.prefix) && message.mentions.everyone && !message.author.bot) return message.channel.send('Ta marcando pq é corno?');

    //=============Pokemon spawn============
    // Matematica inicial
    var poke = Math.floor((Math.random() * 10) + 1);
    console.log('Inicial: ' + await pogo.get('poke'));
    var pokequest = await pogo.get('poke');
    var imagem = Math.floor((Math.random() * 151) + 1);

    //Se não existe pokemon escolhido e 30% de chance de spawnar
    if (parseInt(poke) > parseInt(7) && ((pokequest == '0') || typeof pokequest == "undefined")) {
        console.log('Pokedex: ' + pokemon[imagem - 1].toLowerCase());

        const exampleEmbed = new MessageEmbed()
            .setTitle('Quem é esse pokemon?')
            .setImage('https://raw.githubusercontent.com/BrunoKrugel/PokemonImages/master/1GEN/' + imagem + '.png');
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
        }
        console.log('Depois: ' + await pogo.get('poke'));
    }

    //========================== Ignora o proprio bot e mensagens q n sejam para o bot =======================
    if (!message.content.toLowerCase().startsWith(process.env.prefix)) return;

    //Salva os parametros em ARGS    
    const args = message.content.split(' ');

    if (message.content.toLowerCase().startsWith(process.env.prefix)) {
        let primary = args[1];
        //=================
        switch (primary) {
            case "catch":
                //https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png change number
                break;
                //============== Fun Section
            case "say":
                const sayMessage = args.join(" ");
                message.delete();
                // 9 = "poke say "
                message.channel.send(sayMessage.slice(9));
                break;
            case "help":
                break;
            default:
                break;
        }
    }
});
client.login(process.env.token);