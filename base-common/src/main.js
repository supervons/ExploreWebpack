import { loadRemoteEntry } from '@module-federation/client';

async function init() {
    // 加载Vue远程模块
    const { Vue } = await loadRemoteEntry('http://localhost:3001/remoteEntry.js', 'vueApp');

    // 在React中使用Vue组件
    new Vue({
        el: '#app',
        render: h => h(App),
    });
}

init();
