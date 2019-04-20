
module.exports = class Randomnizer {
    getRandom(array1, array2) {
        let firstArrayRandom = array1[this.getRandomNumber(array1.length)];
        let secondArrayRandom = array2[this.getRandomNumber(array2.length)];
        return firstArrayRandom + " " + secondArrayRandom;
    }

    getRandomNumber(limit) {
        return Math.floor(Math.random() * (limit - 0));
    }
};