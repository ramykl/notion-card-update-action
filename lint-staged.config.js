module.exports = {
  '{src,test}/*.{ts,tsx}': () => 'npm run lint',
  '{src,test}/*.{js,jsx,ts,tsx}': ['eslint --cache --fix', 'prettier --write'],
  '*.md': 'prettier --write'
}
