const chokidar = require('chokidar');
const { buildTokens } = require('./style-dictionary');

const watcher = chokidar.watch('src/**/*.json', {
  persistent: true
});

console.log('Watching for changes in design tokens...');

watcher.on('add', (path) => {
  console.log(`File ${path} has been added`);
  buildTokens();
});

watcher.on('change', (path) => {
  console.log(`File ${path} has been changed`);
  buildTokens();
});
