import { createRouter, createWebHistory } from "vue-router";

import Courses from "@/Pages/Courses.vue";
import Levels from "@/Pages/Levels.vue";
import Chapters from "@/Pages/Chapters.vue";
import Content from "@/Pages/Content.vue";
import {
    redirectIfChapterDoesntExist,
    redirectIfLevelDoesntExist,
    redirectIfOperaDoesntExist
} from "@/Libraries/middlewares/ContentExistCheckers.js";
import {
    redirectIfChapterNotUnlocked,
    redirectIfLevelNotUnlocked
} from "@/Libraries/middlewares/ContentUnlockedCheckers.js";

export const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: Courses,
            name: "Corsi",
            alias: ["/app"],
            //meta: { transition: "operas" }
        },
        {
            path: "/app/:courseId",
            component : Levels,
            name: "Livelli",
            beforeEnter : [redirectIfOperaDoesntExist],
            meta: { transition: "levels" },
        },
        {
            path: "/app/:courseId/:levelId",
            component: Chapters,
            name: "Capitoli",
            meta: { transition: "chapters" },
            beforeEnter : [redirectIfOperaDoesntExist, redirectIfLevelDoesntExist, redirectIfLevelNotUnlocked],
        },
        {
            path: "/app/:courseId/:levelId/:chapterId",
            component: Content,
            name: "Content",
            meta: { transition: "content" },
            beforeEnter : [redirectIfOperaDoesntExist, redirectIfLevelDoesntExist,
                redirectIfChapterDoesntExist, redirectIfChapterNotUnlocked],
        },
    ]
});
