const temp = [
  'https://example.com',
  'https://example.com',
  'https://example.com1',
  'https://example.com',
  'https://example.com',
  'https://example.com',
  'https://example.com',
];

function chunk(arr, chunk) {
  let result = [];
  for (let i = 0, len = arr.length; i < len; i += chunk) {
    result.push(arr.slice(i, i + chunk));
  }
  return result;
}

function getData(url) {
  return new Promise((resolve, reject) => {
    fetch(url)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

const splitArr = chunk(temp, 2);
(async function () {
  for (let temp of splitArr) {
    const promiseAll = temp.map(res => getData(res));
    const result = await Promise.all(promiseAll);
    console.log(result);
  }
})();
