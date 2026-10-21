// Rebuild the single-file offline HTML after editing src/app.js.
// Requires Node.js; the shipped index.html needs no Node.js or network access.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const indexPath = path.join(root, 'index.html');
const appPath = path.join(root, 'src', 'app.js');
const html = fs.readFileSync(indexPath, 'utf8');
const app = fs.readFileSync(appPath, 'utf8').trim() + '\n';
const begin = '<script>\\n(function () {'; // Used only as a descriptive marker below.
const marker = '<script>\\n(function () {';
// The last inline JavaScript block is the multilingual atlas UI.
const start = html.lastIndexOf(marker.replace('\\n', '\n'));
const end = html.indexOf('</script></body></html>', start);
if (start < 0 || end < 0) throw new Error('Atlas app script block not found');
const output = html.slice(0, start) + '<script>\n' + app + html.slice(end);
fs.writeFileSync(indexPath, output, 'utf8');
console.log('Updated index.html with src/app.js');
