const tokens = require('@packages/tokens');

function tokensToTailwind(tokens) {
  const colors = {};
  for (const [key, value] of Object.entries(tokens.color)) {
    colors[key] = value.value;
  }

  return {
    theme: {
      extend: {
        colors: colors,
      },
    },
  };
}

module.exports = tokensToTailwind(tokens);
