const { random, defaultActions, randomNumber } = require('../js/randomnizer');

describe('randomnizer.random', () => {
  const DEFAULT_RANDOM_NAME = 'name';
  const DEFAULT_RANDOM_WORD = 'something';

  const getMockedActions = () => {
    return {
      getRandomNameCallback: jest.fn().mockReturnValue(DEFAULT_RANDOM_NAME),
      getRandomWordCallback: jest.fn().mockReturnValue(DEFAULT_RANDOM_WORD),
      existsLabelCallback: jest.fn().mockReturnValue(false),
      saveLabelCallback: jest.fn(),
    };
  };

  it('should generate a label', () => {
    const label = random(getMockedActions());
    expect(label).toEqual('name something');
  });

  it('should not repeat generated label 2', () => {
    let mockedActions = getMockedActions();
    mockedActions.getRandomNameCallback = jest.fn()
      .mockReturnValueOnce('name')
      .mockReturnValueOnce('name')
      .mockReturnValueOnce('name2');

    mockedActions.existsLabelCallback = jest.fn()
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false);

    random(mockedActions);

    expect(random(mockedActions)).toEqual('name2 something');
  });

  it('should not have infinite loop', () => {
    let mockedActions = getMockedActions();
    mockedActions.existsLabelCallback = jest.fn()
      .mockReturnValue(true);

    expect(random(mockedActions)).toBe( 'not possible to generate a label');
  });

  it('should save generated labels', () => {
    let mockedActions = getMockedActions();
    mockedActions.saveLabelCallback = jest.fn();

    random(mockedActions);
    expect(mockedActions.saveLabelCallback).toBeCalledTimes(1);
  });
});

describe('defaultActions', () => {

  const getFsReadSyncFileMock = (fileContent) => {
    return {
      readFileSync: jest.fn().mockReturnValue(Buffer.from(fileContent, 'utf-8')),
    };
  };

  it('should get a random name from file names', () => {
    const {getRandomNameCallback} = defaultActions;
    const fs = getFsReadSyncFileMock('name1\nname2\nname3');

    const getRandomNumber = jest.fn().mockReturnValueOnce(1);
    const randomName = getRandomNameCallback(fs, getRandomNumber);

    expect(fs.readFileSync).toBeCalledWith('names');
    expect(getRandomNumber).toBeCalledWith(3);
    expect(randomName).toBe('name2');
  });

  it('should get a random word from files words', () => {
    const { getRandomWordCallback } = defaultActions;

    const fs = getFsReadSyncFileMock('word1\nword2\nword3\nword4');

    const getRandomNumber = jest.fn().mockReturnValueOnce(1);
    const randomName = getRandomWordCallback(fs, getRandomNumber);

    expect(fs.readFileSync).toBeCalledWith('words');
    expect(getRandomNumber).toBeCalledWith(4);
    expect(randomName).toBe('word2');
  });

  describe('randomnizer.existsLabelCallback', () => {
    const { existsLabelCallback } = defaultActions;

    it('should check if name exists', () => {
      const fs = getFsReadSyncFileMock('label 1\nlabel 2\nlabel 3\nlabel 4');
      const hasLabel = existsLabelCallback('label 4', fs);

      expect(fs.readFileSync).toBeCalledWith('labels');
      expect(hasLabel).toBe(true);
    });

    it('should check if name doesn\'t exists', () => {
      const fs = getFsReadSyncFileMock('label 1\nlabel 2\nlabel 3\nlabel 4');
      const hasLabel = existsLabelCallback('label 7', fs);

      expect(fs.readFileSync).toBeCalledWith('labels');
      expect(hasLabel).toBe(false);
    })
  });

  it('should call writeFileSync with label buffer', () => {
    const {saveLabelCallback} = defaultActions;

    const fs = {appendFileSync: jest.fn()};

    const label = 'name something';
    saveLabelCallback(label, fs);

    expect(fs.appendFileSync).toBeCalledWith('labels', Buffer.from(label + '\n', 'utf-8'));
  });
});

describe('randomNumber', () => {
  it('should generate a random number', () => {
    const math = Math;
    math.random = () => 0.85;

    const number =  randomNumber(50, math);
    expect(number).toBe(42);
  })
});

describe('fs module', () => {
  test('integration', () => {
    const {getRandomNameCallback} = defaultActions;
    expect(getRandomNameCallback()).toBeTruthy();
  })
});


