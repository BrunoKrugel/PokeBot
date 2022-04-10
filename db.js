const mongoose = require('mongoose');

const Score = mongoose.model('Score', mongoose.Schema({
  name: String,
  score: Number
}));

const dotenv = require('dotenv');
dotenv.config();

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

connectDB();
updateScores('oguilher');
getScores('oguilher').then(value => console.log(value.score));
getAllScores().then(value =>{
  value.forEach(element => {
    console.log(element.name + ": " + element.score);
  })} 
);