import {redirectToHome} from "@/Libraries/middlewares/Utilities.js";
import {coursesMap} from "@/Content/courses.js";
import {extractCourseInfoFromRoute, extractLevelInfoFromRoute} from "@/Libraries/Routes/RoutesUtilities.js";
import {AppContent} from "@/Content/content.js";

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
    if(AppContent.courses[routeInfo.index].levels.some(el => el.prettyName === to.params.levelId)){
        next()
        return
    }
    redirectToHome(next)
}

function redirectIfChapterDoesntExist(to, from, next){
    //do' per scontato che l'opera e il livello esistano (uso queste guard sempre contatenate tra loro)
    const routeInfo = extractLevelInfoFromRoute(to)
    if(AppContent.courses[routeInfo.courseInfo.index].levels[routeInfo.levelInfo.index]
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
