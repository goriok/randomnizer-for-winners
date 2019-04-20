const NameGenerator = require("../../src/javascript/NameGenerator");
const Randomnizer = require("../../src/javascript/Randomnizer");


describe('randomnizer-for-winners with a common set of names and adjectives', function () {
    let names = ["nome1", "nome2", "nome3"];
    let adjectives = ["adj1", "adj2", "adj3"];
    let repoMock;
    let randomnizer;

    beforeEach(() => {
        jest.clearAllMocks();
        repoMock = { getNames: () => names, getAdjectives: () => adjectives };
        randomnizer = new Randomnizer();
    });

    it('should generate random name from file', () => {
        randomnizer.getRandomNumber = () => 2;
        const nameGenerator = new NameGenerator(repoMock, randomnizer);
        expect(nameGenerator.getRandomNames()).toBe("nome3 adj3");
    });

    it('should not duplicate names', () => {
        randomnizer.getRandomNumber = () => 0;
        const nameGenerator = new NameGenerator(repoMock, randomnizer);

        expect(nameGenerator.getRandomNames()).toBe("nome1 adj1");
        expect(nameGenerator.getRandomNames()).not.toBe("nome1 adj1");
    });
});