module.exports = class NameGenerator {
    constructor(namesRepository, random){
        this.namesRepository = namesRepository;
        this.random = random;
        this.excludedNames = [];
    };

    getRandomNames() {
        let names = this.namesRepository.getNames();
        let adjectives = this.namesRepository.getAdjectives();

        let name = this.random.getRandom(names , adjectives);
        if(!this.excludedNames || this.hasBeenUsedAlready(name)){
            let namesFiltered = this.filterNotIntersectedItens(name.split(" ")[0], names);
            name = this.random.getRandom(namesFiltered , adjectives);
        }

        this.excludedNames.push(this.excludedNames);
        return name;
    }

    hasBeenUsedAlready(name){
        let result = !!!this.excludedNames.filter((item) => item === name);
        console.log("excluded names: " + this.excludedNames + ", name:" + name + " result:" + result);

        return result;
    }

    filterNotIntersectedItens(value, array){
        return array.filter((item) => {
            console.log("value: " + value + " array:" + array);
            return item !== value
        });
    }
};

