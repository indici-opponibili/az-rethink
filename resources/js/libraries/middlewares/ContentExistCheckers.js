import {redirectToHome} from "@/libraries/middlewares/Utilities.js";
import coursesMap from "~/appData/courses.json";
import {extractCourseInfoFromRoute, extractLevelInfoFromRoute} from "@/libraries/Routes/RoutesUtilities.js";
import {AppData} from "@/content/AppData.js";

function redirectIfOperaDoesntExist(to, from, next){
    if(Object.values(coursesMap).some(el => el.prettyName === to.params.courseId)){
        next()
        return
    }
    redirectToHome(next)
}

function redirectIfLevelDoesntExist(to, from, next){
    //do' per scontato che l'opera esista (uso queste guard sempre contatenate tra loro)
    const routeInfo = extractCourseInfoFromRoute(to)
    if(AppData.courses[routeInfo.index].levels.some(el => el.prettyName === to.params.levelId)){
        next()
        return
    }
    redirectToHome(next)
}

function redirectIfChapterDoesntExist(to, from, next){
    //do' per scontato che l'opera e il livello esistano (uso queste guard sempre contatenate tra loro)
    const routeInfo = extractLevelInfoFromRoute(to)
    if(AppData.courses[routeInfo.courseInfo.index].levels[routeInfo.levelInfo.index]
        .chapters.some(el => el.prettyName === to.params.chapterId)){
        next()
        return
    }
    redirectToHome(next)
}

export {
    redirectIfChapterDoesntExist,
    redirectIfLevelDoesntExist,
    redirectIfOperaDoesntExist
}
