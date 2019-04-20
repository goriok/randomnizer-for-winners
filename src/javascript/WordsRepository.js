const fs = require('fs');

module.exports = class NamesRepository {
    getNames() {
        let names = fs.readFileSync('names').toString();
        return names.split('\n');
    }

    getAdjectives() {
        let names = fs.readFileSync('adjectives').toString();
        return names.split('\n');
    }
};