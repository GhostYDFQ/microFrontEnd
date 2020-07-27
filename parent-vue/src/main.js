import Vue from 'vue'
import App from './App.vue'
import router from './router'
import {registerApplication, start} from 'single-spa';

Vue.config.productionTip = false;

async function loadScript(url){
	return new Promise( (resolve, reject) => {
		const script = document.createElement('script');
		script.src = url;
		script.onload = resolve;
		script.onerror = reject;
		document.head.appendChild(script);
	})
}


registerApplication('vueApp',
    // 匹配到就执行
    async () => {
		await loadScript(`http://localhost:10000/js/chunk-vendors.js`);
		await loadScript(`http://localhost:10000/js/app.js`);
		return window.singleVue;
    },
    
    // 匹配子应用
    location => location.pathname.startsWith('/vue'),
    
    // 传递给子项目声明周期的属性
	function () {
		return {
			'test': '传递给子项目'
		}
	}
 
);

// 开启应用
start();

new Vue({
	router,
	render: h => h(App)
}).$mount('#app');
