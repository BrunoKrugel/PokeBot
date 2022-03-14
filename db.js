var MongoClient = require('mongodb').MongoClient;

const URL = "mongodb://localhost:27017/";
const MONGO_DB = "PokeBot";
const DB_TABLE = "Score";

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

user = "oguilher";
getRanking().then(value => console.log(value));
//console.log(getScore("oguilher"));

/* .sort({score: -1}).limit(5).toArray( function (err, result) {
      if (err) throw err;      
      client.close();
    }); */