import * as lodash from 'lodash';
const objectValues = lodash.values;

import * as path from 'path';
import * as fse from 'fs-extra';

import * as groupByParams from 'group-by-params';

(() => {
  const shotsSet = fse.readJSONSync(path.resolve(__dirname, '../fixtures/shots_set.json'));

  const groupByParamsShots = groupByParams(shotsSet, 'meta.type');

  groupByParamsShots.forEach(({values, params}) => {
    const dirName = objectValues(params).join('_');
    const writePath = path.resolve(__dirname, `../fixtures/${dirName}/shots_set.json`);

    const sets = values.slice(10);

    fse.ensureFileSync(writePath);
    fse.writeJSONSync(writePath, sets);
  });
})();
