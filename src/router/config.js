const routes = [
    {
        path: '/index',
        component: () => import('@/views/admin/AdminHome.vue')
    },
    {
        path: '/center',
        component: () => import('@/views/admin/Center.vue')
    },
    {
        path: '/user-manage/userlist',
        component: () => import('@/views/admin/UserList.vue')
    },
    {
        path: '/house-manage/houselist',
        component: () => import('@/views/admin/house-manage/HouseList.vue')
    },
    {
        path: '/house-manage/addhouse',
        component: () => import('@/views/admin/house-manage/HouseAdd.vue')
    },
    {
        path: '/',
        redirect: '/index'
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'notfound',
        component: () => import('@/views/notfound/NotFound.vue')
    }
]
export default routes