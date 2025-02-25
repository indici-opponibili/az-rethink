import {useRoute} from "vue-router";
import {AppContent} from "@/Content/content.js";

function extractOperaRouteInfo(){
    const route = useRoute()
    return extractCourseInfoFromRoute(route)
}

function extractCourseInfoFromRoute(route){
    const courseId = route.params.courseId
    const courseIndex = AppContent.courses.findIndex(el => el.prettyName === courseId);

    return {
        id : courseId,
        index : courseIndex
    }
}

function extractLevelRouteInfo(){
    const route = useRoute()
    return extractLevelInfoFromRoute(route)
}

function extractLevelInfoFromRoute(route){
    const levelId = route.params.levelId
    const courseInfo = extractCourseInfoFromRoute(route)

    const levelIndex = AppContent.courses[courseInfo.index].levels.findIndex(el => el.prettyName === levelId);

    return {
        courseInfo: courseInfo,
        levelInfo : {
            id : levelId,
            index : levelIndex
        }
    }
}

function extractChapterRouteInfo(){
    const route = useRoute()
    return extractChapterInfoFromRoute(route)
}

function extractChapterInfoFromRoute(route){
    const chapterId = route.params.chapterId
    const levelRouteInfo = extractLevelInfoFromRoute(route)
    const chapterIndex = AppContent.courses[levelRouteInfo.courseInfo.index]
        .levels[levelRouteInfo.levelInfo.index]
        .chapters.findIndex(el => el.prettyName === chapterId)

    return{
        ...levelRouteInfo,
        chapterInfo : {
            id : chapterId,
            index : chapterIndex
        }
    }
}

export {
    extractChapterRouteInfo,
    extractLevelRouteInfo,
    extractOperaRouteInfo,
    extractChapterInfoFromRoute,
    extractLevelInfoFromRoute,
    extractCourseInfoFromRoute,
}
