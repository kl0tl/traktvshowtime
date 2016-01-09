import { join } from 'path';
import fetch from 'node-fetch';

import { url, key, secret, redirect } from 'src/trackt/config';

const oauth = options =>
  fetch(join(url, 'oauth/token'), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: {
      client_id: key,
      client_secret: secret,
      redirect_uri: redirect,
      ...options
    }
  });

export const authorize = pin =>
  oauth({ code: pin, grant_type: 'authorization_code' });

export const refresh = token =>
  oauth({ refresh_token: token, grant_type: 'refresh_token' });

const get = endpoint => token =>
  fetch(join(url, endpoint), {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
      'trackt-api-version': 2,
      'trackt-api-key': key
    }
  });

export const activities = get('sync/last_activities');

export const history = get('sync/history/episodes');
