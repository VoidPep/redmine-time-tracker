import {createRouter, createWebHistory} from 'vue-router'
import {useRedmineStore} from "../composables/useRedmineStore";
import { isNullOrEmpty } from "../helpers";

const redmineStore = useRedmineStore();

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

router.beforeEach(async (to, from, next) => {
    const {database, host, password, token, username} = await redmineStore.carregarConfiguracao();

    if (to.path === '/config') {
        next();
        return;
    }

    if (isNullOrEmpty(database) ||
        isNullOrEmpty(host) ||
        isNullOrEmpty(password) ||
        isNullOrEmpty(token) ||
        isNullOrEmpty(username)
    ) {
        next('/config')
        return;
    }

    next();
})

export default router