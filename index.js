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

const ofensas = [
    ", tem dois cu",
    " tem pau pequeno",
    " é corno",
    " vai ti fude",
    " queima a rosca",
    " enfia no cu",
    " tem tourette",
    " comeu os cu do Zielort",
    " tem inveja do kyogre do biluga",
    " feeda no badorants",
    " come minhoca no sea of thieves",
    " é chifrudo",
    " guampudo do caralho",
    " queimou carne de peixe e botou a culpa no bk",
    " fez o Zielort quitar do discord",
    " ficou com pressão baixa no oral",
    " reza 3 pau nosso",
    " joga new world",
    " joga de yumi externa",
    " goza com pau dos outros"
];

//Pokedex
var pokedex = require('./pokedex.json');
//let pokedex = JSON.parse(pkm);

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

    // Mensagem customizada
    var mens = Math.floor((Math.random() * 20) + 1);
    if (parseInt(mens) < parseInt(10)) {
        message.channel.send(message.author.toString() + " " + ofensas[Math.floor(Math.random() * ofensas.length)]);
    }

    //=============Pokemon spawn============
    // Matematica inicial
    var poke = Math.floor((Math.random() * 10) + 1);
    console.log('Inicial: ' + await pogo.get('poke'));
    var pokequest = await pogo.get('poke');

    //Se não existe pokemon escolhido e 30% de chance de spawnar
    if (parseInt(poke) > parseInt(7) && ((pokequest == '0') || typeof pokequest == "undefined")) {
        var imagem = Math.floor((Math.random() * 151) + 1);
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
    };

    //========================== Ignora o proprio bot e mensagens q n sejam para o bot =======================
    if (!message.content.toLowerCase().startsWith(process.env.prefix)) return;

    //Salva os parametros em ARGS    
    const args = message.content.split(' ');

    if (message.content.toLowerCase().startsWith(process.env.prefix)) {
        let primary = args[1];
        let secondary = args[2];
        //=================
        switch (primary) {
            case "catch":
                //https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png change number
                break;
                //============== Fun Section
            case "say":
                const sayMessage = args.join(" ");
                message.delete().catch(O_o => {});
                // 9 = "poke say "
                message.channel.send(sayMessage.slice(9));
                break;
            case "peixe":
                const exampleEmbed = new MessageEmbed()
                    .setImage(peixes[Math.floor(Math.random() * peixes.length)].toString());
                message.channel.send({
                    embeds: [exampleEmbed]
                });

                break;
            case "help":
                break;
            default:
                break;
        }
    };
});
client.login(process.env.token);