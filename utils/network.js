import querystring  from 'qs';
import { AsyncStorage } from 'react-native';

export const domain = 'http://localhost:9090';

async function request(url, method, data) {
  const options = {
    method: method.toUpperCase(),
    headers: {
      'Content-Type': 'application/json',
      'token': await AsyncStorage.getItem('token') || '',
    },
  }
  if (method.toUpperCase() === 'GET') {
    url += `?${querystring.stringify(data)}`;
  }
  if (method.toUpperCase() === 'POST') {
    options.body = JSON.stringify(data);
  }

  return fetch(url, options).then(response => response.json());
}

export default {
  get: function(url, data) {
    return request(domain + url, 'GET', data);
  },
  post: function(url, data) {
    return request(domain + url, 'POST', data);
  }
}
