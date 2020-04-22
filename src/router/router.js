import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
// import Login from '../view/admin/login';

const router = new VueRouter({
	mode: 'history',
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