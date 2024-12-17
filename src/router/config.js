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
        path: '/userlist',
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
]
export default routes