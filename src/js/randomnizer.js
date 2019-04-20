const defaultActions = {
  getRandomNameCallback: () => {
  },
  getRandomWordCallback: () => {
  },
  existsLabelCallback: () => {
  },
  saveLabelCallback: () => {
  },
};

const random = (actions = defaultActions) => {
  const MAX_ATTEMPTS = 1000;

  const generateRandomName = (maxAttempts) => {
    if (--maxAttempts === 0) throw 'not possible to generate a label';

    const label = `${actions.getRandomNameCallback()} ${actions.getRandomWordCallback()}`;

    if (actions.existsLabelCallback(label)) {
      return generateRandomName(maxAttempts)
    } else {
      actions.saveLabelCallback(label);
      return label;
    }
  };

  return generateRandomName(MAX_ATTEMPTS)
};

module.exports = { random, defaultActions };