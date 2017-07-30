const fs = require('fs-promise');
const glob = require('glob');
const path = require('path');


async function fontGen(pathPrefix) {

  let resolver;
  let promise = new Promise(resolve => {
    resolver = resolve;
  });

  glob(path.join(pathPrefix, 'res/**/*.woff2'), {}, async (error, filenames) => {
    let fonts = {};
    for(const filename of filenames) {
      const file = fs.readFileSync(filename);
      const name = path.basename(filename, '.woff2');
      fonts[name] = file.toString('base64');
    }

    const fontjs = `(() => {
      const fonts = ${JSON.stringify(fonts)};
      for(const name in fonts) {
        const id = name + '-font';
        const font = fonts[name];
        const s = document.createElement('style');
        s.setAttribute('id', id);
        s.innerHTML = [
          '@font-face {',
          'font-family: "' + name + '";',
          'src: url(data:application/x-font-woff2;charset=utf-8;base64,' + font + ') format("woff2");',
          '}'
        ].join('\\n');
        document.body.appendChild(s);
      }
    })();`;
    await fs.writeFile(path.join(pathPrefix, 'gen', 'fonts.js'), fontjs);
    resolver();
  });
  return promise;
}

module.exports = fontGen;
