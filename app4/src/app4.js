import React, { useEffect } from "react";
import { getProfile, toCamelCase } from "base/utils";
export default function app4() {
  useEffect(() => {
    getProfile().then((res) => {
      alert("React call:" + JSON.stringify(res));
    });
    console.log(toCamelCase("ni hao vons"));
  }, []);
  return <div>hello, react-mfp</div>;
}
