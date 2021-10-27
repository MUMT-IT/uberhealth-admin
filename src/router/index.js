import Vue from 'vue'
import VueRouter from 'vue-router'
import { auth } from '../firebase'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'MainPage',
        meta: {
            requiresAuth: true,
        },
        component: () => import('../views/Main')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login')
    },
    {
        path: '/challenges',
        name: 'ChallengeMain',
        meta: {
            requiresAuth: true,
        },
        component: () => import('../views/challenges/Main'),
    },
    {
        path: '/challenges/form',
        name: 'ChallengeForm',
        meta: {
            requiresAuth: true,
        },
        component: () => import('../views/challenges/Form'),
    },
    {
        path: '/users',
        name: 'UserMain',
        meta: {
            requiresAuth: true,
        },
        component: () => import('../views/users/Main'),
    },
    {
        path: '/users/groups',
        name: 'UserGroupMain',
        meta: {
            requiresAuth: true,
        },
        component: () => import('../views/users/groups/Main'),
    },
    {
        path: '/users/groups/:groupId',
        name: 'GroupDetail',
        meta: {
            requiresAuth: true,
        },
        component: () => import('../views/users/groups/Detail'),
    },
    {
        path: '/users/groups/new',
        name: 'NewGroupForm',
        meta: {
            requiresAuth: true,
        },
        component: () => import('../views/users/groups/NewGroup'),
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from , next)=>{
    const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
    if(requiresAuth === true && auth.currentUser === null) {
        next('/login')
    } else {
        next()
    }
})

export default router