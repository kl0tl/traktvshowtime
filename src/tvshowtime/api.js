import { join } from 'path';
import { fetch } from 'node-fetch';

import { url, key, secret } from 'src/tvshowtime/config';

export const code = () =>
  fetch(join(url, 'oauth/device/code'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      client_id: key
    }
  });

export const authorize = pin =>
  fetch(join(url, 'oauth/access_token'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      code: pin,
      client_id: key,
      client_secret: secret
    }
  });
