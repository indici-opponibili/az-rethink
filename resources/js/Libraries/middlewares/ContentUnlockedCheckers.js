import {extractChapterInfoFromRoute, extractLevelInfoFromRoute} from "@/Libraries/Routes/RoutesUtilities.js";
import {useUserProgressionStore} from "@/Stores/UserProgressionStore.js";
import {redirectToHome} from "@/Libraries/middlewares/Utilities.js";

function redirectIfChapterNotUnlocked(to, from, next){
    const routeInfo = extractChapterInfoFromRoute(to)

    const courseIndex = routeInfo.courseInfo.index
    const levelIndex = routeInfo.levelInfo.index
    const chapterIndex = routeInfo.chapterInfo.index

    const UserProgression = useUserProgressionStore()

    if(UserProgression.getLevelStatus(courseIndex, levelIndex) === "locked" ||
        UserProgression.getChapterStatus(courseIndex, levelIndex, chapterIndex) === "locked"){
        redirectToHome(next)
    }
    next()
}

function redirectIfLevelNotUnlocked(to, from, next){
    const routeInfo = extractLevelInfoFromRoute(to)
    const courseIndex = routeInfo.courseInfo.index
    const levelIndex = routeInfo.levelInfo.index

    const UserProgression = useUserProgressionStore()

    if (UserProgression.getLevelStatus(courseIndex, levelIndex) === "locked") {
        redirectToHome(next)
    }
    next()
}

export {
    redirectIfChapterNotUnlocked,
    redirectIfLevelNotUnlocked
}



