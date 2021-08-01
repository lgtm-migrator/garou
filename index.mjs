import { handleJSON } from './lib/handle-json.mjs';
import { handleScript } from './lib/handle-script.mjs';
import sortStyle from './lib/sort-style/index.cjs';
import { sortTemplate } from './lib/sort-template.mjs';
import { findFiles } from './lib/utils.mjs';

async function runSorter({ style, script, template, configJSON }) {
  if (style.length > 0) {
    await sortStyle(style);
  }
  if (script.length > 0) {
    await handleScript(script);
  }
  if (template.length > 0) {
    await sortTemplate(template);
  }
  if (configJSON.length > 0) {
    await handleJSON(configJSON);
  }
}

export default function action(pattern) {
  findFiles(pattern) // eslint-disable-next-line consistent-return
    .then((files) => {
      if (Object.values(files).flat().length > 0) {
        return runSorter(files);
      }
      console.log('No files matching the pattern were found');
    })
    .catch(console.error);
}
