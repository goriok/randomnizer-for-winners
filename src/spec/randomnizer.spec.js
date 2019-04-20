const { random }= require('../js/randomnizer');

describe('randomnizer.random', () => {
  const DEFAULT_RANDOM_NAME = 'name';
  const DEFAULT_RANDOM_WORD = 'something';

  const getDefaultRandomWord = jest.fn()
    .mockReturnValue(DEFAULT_RANDOM_WORD);

  const getDefaultRandomName = jest.fn()
    .mockReturnValue(DEFAULT_RANDOM_NAME);

  const defaultExistsLabel = jest.fn()
    .mockReturnValue(false);

  const defaultSaveLabel = jest.fn();

  test('should generate a label', () => {
    const label = random(getDefaultRandomName, getDefaultRandomWord, defaultExistsLabel, defaultSaveLabel);
    expect(label).toEqual('name something');
  });

  test('should not repeat generated label 2', () => {
    const getRandomName = jest.fn()
      .mockReturnValueOnce('name')
      .mockReturnValueOnce('name')
      .mockReturnValueOnce('name2');

    const existsLabel = jest.fn()
      .mockReturnValueOnce(false)
      .mockReturnValueOnce(true)
      .mockReturnValueOnce(false);

    random(getRandomName, getDefaultRandomWord, existsLabel, defaultSaveLabel);
    const label = random(getRandomName, getDefaultRandomWord, existsLabel, defaultSaveLabel);

    expect(label).toEqual('name2 something');
  });

  test('should not have infinite loop', () => {
    const existsLabel = jest.fn()
      .mockReturnValue(true);

    expect(() => random(getDefaultRandomName, getDefaultRandomWord, existsLabel)).toThrow( 'not possible to generate a label');
  });

  test('should save generated labels', () => {
    const saveLabel = jest.fn();

    random(getDefaultRandomName, getDefaultRandomWord, defaultExistsLabel, saveLabel);
    expect(saveLabel).toBeCalledTimes(1);
  });
});

describe('randomnizer.getRandomName', () => {
  it('should get a random name from file names', () => {

  })
});