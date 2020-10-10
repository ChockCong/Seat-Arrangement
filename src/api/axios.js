import Vue from 'vue';
import axios from 'axios';
import store from '../store/index';
import qs from 'qs';
import router from '../router/router';

/**
 * @param {*} url 请求url
 * @param {*} [params={}] 请求参数
 * @param {string} [method='post'] 请求方法
 * @param {boolean} [isformData=false] 参数是否附带文件
 */

const base_url = process.env.VUE_APP_API;
if (process.env.NODE_ENV === 'production') axios.defaults.baseURL = base_url;
export const reqJsonData = async ({
	url,
	params = {},
	method = 'post',
	isformData = false,
}) => {
	if (process.env.NODE_ENV === 'production') {
		url = url.split('/api')[1];
	}
	const config = {
		method,
		url,
		headers: {
			'Content-Type': !isformData ? 'application/json' : 'multipart/form-data', // 带有表单数据时的Content-Type
			'If-Modified-Since': '0' // 防止ie浏览器对ie的axios的缓存
		}
	};
	if (method === 'get' || method === 'GET') {
		config.params = params;
		config.paramsSerializer = params => {
			return qs.stringify(params, { arrayFormat: 'indices' });
		};
	} else {
        // config.data = params
		config.data = qs.parse(qs.stringify(params));
    }
	// 带有表单数据并且有文件时的请求格式
	const transformRequest = new FormData();
	if (isformData) {
		for (let key in params) {
			if (Array.isArray(params[key])) {
				params[key].forEach((element, index) => {
					for (let k in element) {
						if (Array.isArray(element[k])) {
							element[k].forEach((el, i) => {
								transformRequest.append(`${key}[` + index + `][${k}][` + i + `]`, el);
							});
						} else {
							transformRequest.append(`${key}[` + index + `][${k}]`, element[k]);
						}
					}
				});
			} else {
				transformRequest.append(key, params[key]);
			}
		}
    }
    return new Promise(resolve => {
		try {
			const Axios = !isformData ? axios(config) : axios.post(config.url, transformRequest, config);
			Axios
				.then(res => {
					// console.log(res.data.errorCode);
					if (['401', '401.1'].includes(res.data.status)) {
						Vue.prototype.errorPopHandler(res.data.status === '401' ? '未登陆失败，请先进行登录' : '登陆失败，请重试');
						router.push({ path: '/admin/login' });
						return resolve();
					}
					if (res.data.status === '500') {
						Vue.prototype.errorPopHandler('操作失败，请重试或刷新页面');
						return resolve();
					}
					resolve(res.data || {});
				})
				.catch(err => {
					console.log(err);
					if (err.response && err.response.status === '401.1') {
						// removeLoginInfo();
						router.push({ path: '/admin/login' });
						resolve();
						return;
					}
				});
		} catch (error) {
			resolve();
			Vue.config.errorHandler(error);
		}
	});
}
axios.interceptors.request.use(config => {
	const token = store.state.admin_token;
	if (token) {
		let getToken = `Bearer ${token}`;
		config.headers.common['Authorization'] = getToken;
	}
	return config;
});