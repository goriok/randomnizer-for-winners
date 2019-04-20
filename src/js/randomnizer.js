const random = (getRandomName, getRandomWord, existsLabel, saveLabel) => {
  const MAX_ATTEMPTS = 1000;

  const generateRandomName = (maxAttempts) => {
    if(--maxAttempts === 0) throw 'not possible to generate a label';

    const label = `${getRandomName()} ${getRandomWord()}`;

    if (existsLabel(label)) {
      return generateRandomName(maxAttempts)
    }else{
      saveLabel(label);
      return label;
    }
  };

  return generateRandomName(MAX_ATTEMPTS)
};

module.exports = { random };
