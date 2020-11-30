import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store/index';
import { getCookie, isTokenEnable } from '@/utils/cookie';
// import { adminLogin } from '@/api/api'

//TODO: 禁止全局路由错误处理打印，这个也是vue-router开发者给出的解决方案
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'hash',
    routes: [
        {
            path: '/',
            component: () => import('../components/HelloWorld.vue'),
        },
        {
            path: '/user',
            name: 'user',
            component: () => import('../view/user/index.vue'),
            meta: {
                tag: 'unlogin'
            },
            children: [
                {
                    path: 'show',
                    name: 'show',
                    component: () => import('../view/user/show.vue'),
                }
            ]
        },
        {
            path: '/:page',
            name: 'unLogin',
            component: () => import('../components/common/UnLoginFrame.vue'),
            meta: {
                tag: 'unlogin'
            }
        },
        {
            path: '/admin',
            name: 'admin',
            component: () => import('../view/admin/index.vue'),
            redirect: 'admin/management/home',
            children: [
                {
                    path: 'login',
                    name: 'login',
                    component: () => import('../view/admin/login.vue'),
                },
                {
                    path: 'free-buy',
                    name: 'free-buy',
                    component: () => import('../components/admin/Buy/Buy.vue'),
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: 'package-buy',
                    name: 'package-buy',
                    component: () => import('../components/admin/Buy/BuyPackage.vue'),
                    meta: {
                        requiresAuth: true
                    }
                },
                {
                    path: 'management',
                    name: 'management',
                    component: () => import('../components/admin/Management.vue'),
                    redirect: 'management/home',
                    meta: {
                        requiresAuth: true
                    },
                    children: [
                        {
                            path: 'home',
                            name: 'home',
                            component: () => import('../components/admin/Home.vue'),
                            meta: {
                                requiresAuth: true
                            }
                        },
                        {
                            path: 'info',
                            name: 'info',
                            component: () => import('../components/admin/self/Info.vue'),
                        },
                        {
                            path: 'logs',
                            name: 'logs',
                            component: () => import('../components/admin/self/DailyLog.vue')
                        },
                        {
                            path: 'sub-account',
                            name: 'sub-account',
                            component: () => import('../components/admin/self/SubAccounts.vue')
                        },
                        {
                            path: 'function-setting',
                            name: 'function-setting',
                            component: () => import('../components/admin/self/FunctionSetting.vue'),
                        },
                        {
                            path: 'seat-using',
                            name: 'Using',
                            component: () => import('../components/admin/main/Using.vue'),
                            meta: {
                                keepAlive: true // 需要被缓存
                            }
                        },
                        {
                            path: 'seat-setting',
                            name: 'Setting',
                            component: () => import('../components/admin/main/Setting.vue'),
                            meta: {
                                keepAlive: true // 需要被缓存
                            }
                        },
                        {
                            path: 'seat-list',
                            name: 'List',
                            component: () => import('../components/admin/main/List.vue'),
                            meta: {
                                //keepAlive: true // 需要被缓存
                            }
                        },
                        {
                            path: 'baberrage-show',
                            name: 'baberrage',
                            component: () => import('../components/admin/others/Baberrage.vue'),
                            meta: {
                                keepAlive: true // 需要被缓存
                            }
                        }
                    ]
                }
            ]
        }
    ]
});

router.beforeEach(async (to, from, next) => {
    // console.log(to, from)
    const tokenEnable = isTokenEnable();
    if (to.matched.some(route => route.meta && route.meta.requiresAuth) && store.state.adminInfo.admin_token) {
        //TODO: token过期后应刷新保持登录，反之退出登录
        // console.log(store.state.adminInfo, isTokenEnable());
        if (!tokenEnable) {
            return to.name === 'login' ? next() : next({ path: '/admin/login' });
        }
    } else {
        if (to.matched.some(route => route.meta && route.meta.tag && route.meta.tag === 'unlogin')) {
            return next();
        }
        if (!tokenEnable) {
            return to.name === 'login' ? next() : next({ path: '/admin/login' });
        } else {
            const userStorage = getCookie('loginInfo');
            let user = userStorage ? JSON.parse(userStorage) : undefined;
            console.log(user);
            if (user) store.commit('SET_ADMIN_INFO', user);
            else {
                return to.name === 'login' ? next() : next({ path: '/admin/login' });
            }
        }
    }
    return next();
});

export default router;