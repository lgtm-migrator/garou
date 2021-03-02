const globby = require('globby');
const { extname } = require('path');
const slash = require('slash');

const options = {
  baseNameMatch: true,
  dot: true,
  gitignore: true,
};

const templates = ['html', 'htm'];
const styles = ['vue', ...templates, 'css', 'scss', 'less'];
const scripts = ['vue', ...templates, 'js', 'jsx', 'mjs', 'cjs'];

function switchTypes(files) {
  const io = { style: [], script: [], template: [] };
  if (files.length > 0) {
    files.forEach((file) => {
      const ext = extname(file).replace(/^\./, '');
      if (styles.includes(ext)) {
        io.style.push(file);
      }
      if (scripts.includes(ext)) {
        io.script.push(file);
      }
      if (templates.includes(ext)) {
        io.template.push(file);
      }
    });
  }
  return io;
}

function findFiles(
  patterns = ['*.{js,mjs,cjs,jsx,vue,html,htm,svg,css,scss,less}'],
  isGlobs = false,
) {
  const io = patterns.map((item) => slash(item));
  return (isGlobs ? globby(io, options) : Promise.resolve(io)).then(
    switchTypes,
  );
}

module.exports = { findFiles };
