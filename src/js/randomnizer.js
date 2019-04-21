const fs = require('fs');

const randomNumber = (max, math = Math) => {
  return math.floor(math.random() * math.floor(max));
};

const readLinesFromFile = (repo = fs, path) => {
  const contentBuffer = repo.readFileSync(path);
  return contentBuffer.toString().split('\n');
};

const readRandomLineFromFile = (repo, path, getRandomNumber = randomNumber) => {
  const lines = readLinesFromFile(repo, path);
  return lines[getRandomNumber(lines.length)];
};

const defaultActions = {
  getRandomNameCallback: (dao = fs, getRandomNumber) => {
    return readRandomLineFromFile(dao,'names', getRandomNumber)
  },
  getRandomWordCallback: (dao = fs, getRandomNumber) => {
    return readRandomLineFromFile(dao,'words', getRandomNumber)
  },
  existsLabelCallback: (label, dao = fs) => {
    const lines = readLinesFromFile(dao, 'labels');
    return lines.includes(label);
  },
  saveLabelCallback: (label, dao = fs) => {
    dao.appendFileSync('labels', Buffer.from(label+'\n'));
  },
};

const random = (actions = defaultActions) => {
  const MAX_ATTEMPTS = 1000;

  const generateRandomName = (maxAttempts) => {
    if (--maxAttempts === 0) return 'not possible to generate a label';

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

module.exports = { random, defaultActions, randomNumber };