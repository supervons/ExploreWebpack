import React, { useEffect } from 'react';
import { getProfile, toCamelCase } from 'base/utils';
import COMMON_VALUE from 'base/utils';
export default function app4() {
  useEffect(() => {
    console.log(COMMON_VALUE);
    getProfile()
      .then(res => {
        console.log('React call:' + JSON.stringify(res));
      })
      .catch(res => {
        console.log('err：' + JSON.stringify(res));
      });
    console.log(toCamelCase('ni hao vons'));
  }, []);
  return <div>hello, react-mfp</div>;
}
