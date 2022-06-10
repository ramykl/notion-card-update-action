module.exports = {
  'src/*.{ts,tsx}': () => 'npm run lint',
  'src/*.{js,jsx,ts,tsx}': ['eslint --cache --fix', 'prettier --write'],
  '*.md': 'prettier --write'
}
