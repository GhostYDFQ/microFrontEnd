import Vue from 'vue';
import App from './App.vue';
import router from './router';
import singleSpaVue from "single-spa-vue";

Vue.config.productionTip = false;

const appOptions = {
  el: '#vue', // 指定父容器基座的挂载点
  router,
  render: h => h(App)
};



const lifecycle = singleSpaVue({
  Vue,
  appOptions
});

// 当有父项目作为基座的时候，要从自己的服务上面加载自己的文件
if(window.singleSpaNavigate){
  __webpack_public_path__ = 'http://localhost:10000/';
}

// 如果没有父项目作为基座的时候，自己能够独立启用项目
if(!window.singleSpaNavigate){
  delete appOptions.el;
  new Vue(appOptions).$mount('#app')
}

export const bootstrap = lifecycle.bootstrap;
export const mount = lifecycle.mount;
export const unmount = lifecycle.unmount;

