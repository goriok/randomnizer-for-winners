const { random, defaultActions } = require('../js/randomnizer');

describe('randomnizer.random', () => {
  const DEFAULT_RANDOM_NAME = 'name';
  const DEFAULT_RANDOM_WORD = 'something';
  function getMockedActions() {
    return {
      getRandomNameCallback: jest.fn().mockReturnValue(DEFAULT_RANDOM_NAME),
      getRandomWordCallback: jest.fn().mockReturnValue(DEFAULT_RANDOM_WORD),
      existsLabelCallback: jest.fn().mockReturnValue(false),
      saveLabelCallback: jest.fn(),
    };
  }

  test('should generate a label', () => {
    const label = random(getMockedActions());
    expect(label).toEqual('name something');
  });

  test('should not repeat generated label 2', () => {
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

  test('should not have infinite loop', () => {
    let mockedActions = getMockedActions();
    mockedActions.existsLabelCallback = jest.fn()
      .mockReturnValue(true);

    expect(() => random(mockedActions)).toThrow( 'not possible to generate a label');
  });

  test('should save generated labels', () => {
    let mockedActions = getMockedActions();
    mockedActions.saveLabelCallback = jest.fn();

    random(mockedActions);
    expect(mockedActions.saveLabelCallback).toBeCalledTimes(1);
  });
});

describe('randomnizer.getRandomName', () => {
  const { getRandomNameCallback } = defaultActions;

  it('should get a random name from file names', () => {

  })
});