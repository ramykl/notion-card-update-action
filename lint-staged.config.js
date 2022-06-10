module.exports = {
  '*.{ts,tsx}': () => 'npm run lint',
  '*.{js,jsx,ts,tsx}': ['eslint --cache --fix', 'prettier --write'],
  '*.md': 'prettier --write',
};
