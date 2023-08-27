import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

//捕获调用push切换到同一路由时报错的异常。
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}

//捕获调用replace切换到同一路由时报错的异常。
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace(location) {
    return originalReplace.call(this, location).catch(err => err)
}

const routes = [
    {
        path: '/',
        meta: { title: '首页' ,breadcrumbLevel:1},
        component: () => import('@/views/layout'),
        redirect: '/home',
        children: [
            {
                path: 'home',
                name: 'home',
                meta: { title: '欢迎页', path: '/home', breadcrumbLevel: 1},
                component: () => import('@/views/home')
            },
            {
                path: 'apiCards',
                meta: { title: '文章', path: '/apiCards', breadcrumbLevel: 2},
                component: () => import('@/views/apiCards'),
                children: [

                ]
            },
            {
                path: 'qqCard',
                meta: { title: 'QQ接口', path: '/qqCard', breadcrumbLevel: 3},
                component: () => import('@/views/qq'),
            },
            {
                path: 'biliCard',
                name: 'biliCard',
                meta: { title: 'bili接口', path: '/biliCard', breadcrumbLevel: 3},
                component: () => import('@/views/bili'),
            },
            {
                path: 'biliUserCard',
                name: 'biliUserCard',
                meta: { title: 'bili用户搜索接口', path: '/biliUserCard', breadcrumbLevel: 3},
                component: () => import('@/views/bili/userList.vue')
            },
            {
                path: 'githubCard',
                meta: { title: 'git接口', path: '/githubCard', breadcrumbLevel: 3},
                component: () => import('@/views/github')
            },
            {
                path: 'todoList',
                meta: { title: '备忘录', path: '/todoListCard', breadcrumbLevel: 2},
                component: () => import('@/views/todoList')
            },
        ]
    }
]

const router = new VueRouter({ routes })

export default router