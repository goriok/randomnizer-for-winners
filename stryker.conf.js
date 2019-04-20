module.exports = function(config) {
  config.set({
    mutate: ['src/js/randomnizer.js'],
    mutator: "javascript",
    packageManager: "npm",
    reporters: ["clear-text"],
    testRunner: "jest"
  });
};
