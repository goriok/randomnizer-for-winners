const NameGenerator = require('./src/javascript/NameGenerator');
const NamesRepository = require('./src/javascript/WordsRepository');
const RandomNumberGenerator = require('./src/javascript/Randomnizer');

let nameGenerator = new NameGenerator(new NamesRepository(), new RandomNumberGenerator());
console.log(nameGenerator.getRandomNames());