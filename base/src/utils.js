import _ from 'lodash';
export function getProfile() {
  return new Promise((resolve, reject) => {
    fetch('/api/v1/profile/test')
      .then(res => {
        return res.json();
      })
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function toCamelCase(str) {
  return _.camelCase(str);
}

const COMMON_VALUE = 1;
export default COMMON_VALUE;
