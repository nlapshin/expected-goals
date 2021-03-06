import common from './common';

import caleyv1 from './caleyv1';
import caleyv2 from './caleyv2';

import * as caleyv1Helpers from './caleyv1/helper';
import * as caleyv2Helpers from './caleyv2/helper';

const xg = {
  models: {
    caleyv1,
    caleyv2,
  },
  helpers: {
    caleyv1: caleyv1Helpers,
    caleyv2: caleyv2Helpers,
  },
  common,
};

export default xg;
