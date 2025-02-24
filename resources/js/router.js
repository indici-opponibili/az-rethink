import { createRouter, createWebHistory } from "vue-router";

import Home from '@/Pages/home.vue'

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: Home,
            name: "Home"
        },
    ]
});
