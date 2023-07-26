import React, { Suspense, useEffect } from "react";
import Vue from "vue/dist/vue.min.js"; // 引入完整版，否则不能解析vue的组件对象语法
import vue2 from "vue1/vue-home";
const RemoteApp = React.lazy(() => import("app4/home"));

export default function APP() {
  useEffect(() => {
    new Vue({
      render: (h) => h(vue2),
    }).$mount("#vueApp");
  }, []);
  return (
    <div>
      hello, 123
      <div id="vueApp" />
      <Suspense fallback={"loading..."}>
        <RemoteApp />
      </Suspense>
    </div>
  );
}
