import { createRouter, createWebHistory } from "vue-router";

import Home from '@/Pages/Home.vue'

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: Home,
            name: "Home",
            alias: ["/app"],
            //meta: { transition: "operas" }
        },
    ]
});
