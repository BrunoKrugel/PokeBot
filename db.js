var MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');

const Score = mongoose.model('Score', mongoose.Schema({
  name: String,
  score: Number
}));

const URL = "mongodb://localhost:27017/";
const MONGO_DB = "PokeBot";
const DB_TABLE = "Score";


const dotenv = require('dotenv');
dotenv.config();
const uri = process.env.MONGODB_URI;

async function connectDB(){
  try {
    console.log("Connecting to database...");
    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.log(error);
  }
}
module.exports.connectDB=connectDB;

async function updateScores(name){
  await Score.updateOne({ name: name}, { $inc: { score: 1 } }, { upsert: true });
}
module.exports.updateScores=updateScores;


function getScores(name){
  return Score.findOne({ name: name }).exec();
}
module.exports.getScores=getScores;

function getAllScores(){
  return Score.find({}).exec();
}


function updateScore(user) {
  MongoClient.connect(URL, function (err, client) {
    if (err) throw err;
    var database = client.db(MONGO_DB);
    var myquery = { id: user };
    var newvalues = { $inc: { score: 1 } };
    database.collection(DB_TABLE).updateOne(myquery, newvalues, { upsert: true }, function (err, result) {

      if (err) throw err;
      client.close();
    });
  });
}
module.exports.updateScore=updateScore;

function getScore(user) {
  MongoClient.connect(URL, function (err, client) {
    if (err) throw err;
    var database = client.db(MONGO_DB);
    return database.collection(DB_TABLE).findOne({ id: user }, function (err, result) {
      if (err) throw err;
      //console.log(result.score)
      client.close();
    });

  });
}
module.exports.getScore=getScore;

async function getRanking() {
  MongoClient.connect(URL, function (err, client) {
    if (err) throw err;
    var database = client.db(MONGO_DB);
        database.collection(DB_TABLE).find({}, { projection: { _id: 0, id: 1, score: 1 } }).sort({ score: -1 }).limit(5).toArray(function (err, result) {
        if (err) throw err;
        client.close();
        return result;
      });
    })

}
module.exports.getRanking=getRanking;

connectDB();
updateScores('oguilher');
getScores('oguilher').then(value => console.log(value.score));
getAllScores().then(value =>{
  value.forEach(element => {
    console.log(element.name + ": " + element.score);
  })} 
);