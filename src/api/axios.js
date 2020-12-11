import Vue from 'vue';
import axios from 'axios';
import store from '../store/index';
import qs from 'qs';
import router from '../router/router';
import { removeCookie } from '../utils/cookie'

/**
 * @param {*} url 请求url
 * @param {*} [params={}] 请求参数
 * @param {string} [method='post'] 请求方法
 * @param {boolean} [isformData=false] 参数是否附带文件
 */

axios.interceptors.request.use(config => {
	const token = store.state.adminInfo.admin_token;
	if (token) {
		// let getToken = `Bearer ${token}`;
		// config.headers.common['Authorization'] = getToken;
		config.headers.common['token'] = token;
	}
	return config;
});

const loginStatus = ['401', '401.1'];
const errorStatus = ['400', '403'];
const serverStatus = ['404', '500'];
const base_url = process.env.VUE_APP_API;
const seat_base_url = process.env.VUE_APP_SEAT_API;

export const reqJsonData = async ({
	url,
	params = {},
	method = 'post',
	isformData = false,
	types = ''
}) => {
	if (process.env.NODE_ENV === 'production') {
		switch (types) {
			case 'seat' : axios.defaults.baseURL = seat_base_url; break;
			default: axios.defaults.baseURL = base_url;
		}
		url = !types ? url.split('/api')[1] : url.split('/seat')[1];
	}
	const config = {
		method,
		url,
		headers: {
			'Content-Type': !isformData ? 'application/json' : 'multipart/form-data', // 带有表单数据时的Content-Type
			'If-Modified-Since': '0' // 防止ie浏览器对ie的axios的缓存
		}
	};
	if (!isformData) {
		if (method === 'get' || method === 'GET') {
			config.params = params;
			config.paramsSerializer = params => {
				return qs.stringify(params, { arrayFormat: 'indices' });
			};
		} else {
			// config.data = params
			config.data = qs.parse(params);
		}
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
    return new Promise((resolve, reject) => {
		try {
			const Axios = !isformData ? axios(config) : axios.post(config.url, transformRequest, config);
			Axios
				.then(res => {
					// console.log(res.data.errorCode);
					if (loginStatus.includes(res.data.status)) {
						Vue.prototype.errorPopHandler(res.data.status === '401' ? '用户信息已过期，请重新登陆' : '登陆失败，请重试');
						removeCookie();
						router.push({ path: '/admin/login' });
						return resolve();
					}
					if (errorStatus.includes(res.data.status)) {
						Vue.prototype.errorPopHandler(res.data.error.message);
						return resolve();
					}
					if (serverStatus.includes(res.data.status)) {
						Vue.prototype.errorPopHandler('服务器错误，请联系管理员');
						return resolve();
					}
					resolve(res.data || {});
				})
				.catch(err => {
					console.log(err);
					Vue.prototype.errorPopHandler(err);
					resolve();
				});
		} catch (error) {
			Vue.config.errorHandler(error);
			resolve();
		}
	});
}