import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
// import Login from '../view/admin/login';

const router = new VueRouter({
	mode: 'hash',
	routes: [
		{
			path: '/',
			component: () => import('../components/HelloWorld.vue'),
		},
		{
			path: '/admin',
			name: 'admin',
            component: () => import('../view/admin/index.vue'),
            children: [
                {
                    path: 'login',
                    name: 'login',
                    component: () => import('../view/admin/login.vue'),
                },
                {
                    path: 'management',
                    name: 'management',
                    component: () => import('../components/admin/Management.vue'),
                    redirect: 'management/home',
                    children: [
                        {
                            path: 'home',
                            name: 'home',
                            component: () => import('../components/admin/Home.vue'),
                        },
                        {
                            path: 'info',
                            name: 'info',
                            component: () => import('../components/admin/self/Info.vue'),
                        },
                        {
                            path: 'fun-setting',
                            name: 'fun-setting',
                            component: () => import('../components/admin/self/FunctionSetting.vue'),
                        }
                    ]
                }
            ]
		},
		{
            path: '/user',
            name: 'user',
            component: () => import('../view/user/index.vue'),
            children: [
                {
                    path: 'show',
                    name: 'show',
                    component: () => import('../view/user/show.vue'),
                }
            ]
		}
	]
});

// router.beforeEach(async (to, from, next) => {
//     console.log(to, from, next);
//     return next();
// });
export default router;