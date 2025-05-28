import {createRouter, createWebHistory} from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: () => import('../views/HomeView.vue')
    },
    {
        path: '/config',
        name: 'Config',
        component: () => import('../views/ConfigView.vue')
    },
    {
        path: '/timetracker',
        name: 'TimeTracker',
        component: () => import('../views/TimeTrackerView.vue')
    },
    {
        path: '/tasks',
        name: 'Tasks',
        component: () => import('../views/TasksView.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router