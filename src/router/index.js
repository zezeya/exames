import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'


Vue.use(VueRouter)

export default new VueRouter({
    routes: [{
            path: '/',
            name: 'home',
            component: HomeView,
            children: [{
                    path: '/jscomponent',
                    name: 'jscomponent',
                    // route level code-splitting
                    // this generates a separate chunk (about.[hash].js) for this route
                    // which is lazy-loaded when the route is visited.
                    component: () =>
                        import ( /* webpackChunkName: "jscomponent" */ '../views/JsView.vue')
                },
                {
                    path: '/mytask',
                    name: 'mytask',
                    // route level code-splitting
                    // this generates a separate chunk (about.[hash].js) for this route
                    // which is lazy-loaded when the route is visited.
                    component: () =>
                        import ( /* webpackChunkName: "mytask" */ '../views/MytaskView.vue')
                },
                {
                    path: '/setid',
                    name: 'setid',
                    // route level code-splitting
                    // this generates a separate chunk (about.[hash].js) for this route
                    // which is lazy-loaded when the route is visited.
                    component: () =>
                        import ( /* webpackChunkName: "setid" */ '../views/SetidView.vue')
                },
                {
                    path: '/setAvate',
                    name: 'setAvate',
                    // route level code-splitting
                    // this generates a separate chunk (about.[hash].js) for this route
                    // which is lazy-loaded when the route is visited.
                    component: () =>
                        import ( /* webpackChunkName: "setAvate" */ '../views/SetAvateView.vue')
                },
                {
                    path: '/createTask',
                    name: 'createTask',
                    // route level code-splitting
                    // this generates a separate chunk (about.[hash].js) for this route
                    // which is lazy-loaded when the route is visited.
                    component: () =>
                        import ( /* webpackChunkName: "createTask" */ '../views/CreateTaskView.vue')
                },
                {
                    path: '/listTask',
                    name: 'listTask',
                    // route level code-splitting
                    // this generates a separate chunk (about.[hash].js) for this route
                    // which is lazy-loaded when the route is visited.
                    component: () =>
                        import ( /* webpackChunkName: "listTask" */ '../views/ListTaskView.vue')
                },
                {
                    path: '/listuser',
                    name: 'listuser',
                    // route level code-splitting
                    // this generates a separate chunk (about.[hash].js) for this route
                    // which is lazy-loaded when the route is visited.
                    component: () =>
                        import ( /* webpackChunkName: "listuser" */ '../views/ListUserView.vue')
                },
                {
                    path: '/creatrole',
                    name: 'creatrole',
                    // route level code-splitting
                    // this generates a separate chunk (about.[hash].js) for this route
                    // which is lazy-loaded when the route is visited.
                    component: () =>
                        import ( /* webpackChunkName: "creatrole" */ '../views/CreateRoleView.vue')
                },
                {
                    path: '/detailTask',
                    name: 'detailTask',
                    // route level code-splitting
                    // this generates a separate chunk (about.[hash].js) for this route
                    // which is lazy-loaded when the route is visited.
                    component: () =>
                        import ( /* webpackChunkName: "detailTask" */ '../views/DetailTaskView.vue')
                },
                {
                    path: '/listRole',
                    name: 'listRole',
                    // route level code-splitting
                    // this generates a separate chunk (about.[hash].js) for this route
                    // which is lazy-loaded when the route is visited.
                    component: () =>
                        import ( /* webpackChunkName: "listRole" */ '../views/ListRoleView.vue')
                },

                {
                    path: '/detailTask',
                    name: 'detailTask',
                    // route level code-splitting
                    // this generates a separate chunk (about.[hash].js) for this route
                    // which is lazy-loaded when the route is visited.
                    component: () =>
                        import ( /* webpackChunkName: "detailTask" */ '../views/DetailTaskView.vue')
                },
                {
                    path: '/createPermission/',
                    name: 'createPermission',
                    // route level code-splitting
                    // this generates a separate chunk (about.[hash].js) for this route
                    // which is lazy-loaded when the route is visited.
                    component: () =>
                        import ( /* webpackChunkName: "createPermission" */ '../views/CreatePermission.vue')
                },

            ]
        },

        {
            path: '/login',
            name: 'login',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ( /* webpackChunkName: "login" */ '../views/LoginView.vue')
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () =>
                import ( /* webpackChunkName: "about" */ '../views/AboutView.vue')
        },
        // {
        //     path: '/homecomponent',
        //     name: 'homecomponent',
        //     // route level code-splitting
        //     // this generates a separate chunk (about.[hash].js) for this route
        //     // which is lazy-loaded when the route is visited.
        //     component: () =>
        //         import ( /* webpackChunkName: "homecomponent" */ '../components/HomeComponent')
        // },

        // {
        //     path: '/htmlcomponent',
        //     name: 'htmlcomponent',
        //     // route level code-splitting
        //     // this generates a separate chunk (about.[hash].js) for this route
        //     // which is lazy-loaded when the route is visited.
        //     component: () =>
        //         import ( /* webpackChunkName: "htmlcomponent" */ '../components/HtmlComponent')
        // },
        // {
        //     path: '/csscomponent',
        //     name: 'csscomponent',
        //     // route level code-splitting
        //     // this generates a separate chunk (about.[hash].js) for this route
        //     // which is lazy-loaded when the route is visited.
        //     component: () =>
        //         import ( /* webpackChunkName: "csscomponent" */ '../components/CssComponent')
        // },
        // {
        //     path: '/questioncomponent',
        //     name: 'questioncomponent',
        //     // route level code-splitting
        //     // this generates a separate chunk (about.[hash].js) for this route
        //     // which is lazy-loaded when the route is visited.
        //     component: () =>
        //         import ( /* webpackChunkName: "questioncomponent" */ '../components/QuestionComponent')
        // }
    ]
})

// const routes = 




// export default router