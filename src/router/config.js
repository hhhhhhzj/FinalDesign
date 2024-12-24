const routes = [
    {
        path: '/index',
        component: () => import('@/views/admin/AdminHome.vue'),
        requireAdmin: true
    },
    {
        path: '/user-manage/userlist',
        component: () => import('@/views/admin/UserList.vue'),
        requireAdmin: true
    },
    {
        path: '/house-manage/houselist',
        component: () => import('@/views/admin/house-manage/HouseList.vue'),
        requireAdmin: true
    },
    {
        path: '/house-manage/addhouse',
        component: () => import('@/views/admin/house-manage/HouseAdd.vue'),
        requireAdmin: true
    },
    {
        path: '/',
        redirect: '/index',
        requireAdmin: true
    },

]
export default routes