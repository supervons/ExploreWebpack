addEventListener(
  'message',
  function (e) {
    console.log('Main said：' + e.data);
    this.postMessage('You said: ' + e.data);
  },
  false,
);
