import {defineStore} from "pinia";
import {achievements as achievementJson} from "@/Content/achievements.js";
import {contentProgress as contentProgressJson} from "@/Content/contentProgress.js"
import {AchievementObject} from "@/DataObjects/AchievementObject.js";
import {ContentProgressObject} from "@/DataObjects/ContentProgressObject.js";
import {AppData} from "@/Content/AppData.js";
import {CourseProgressObject} from "@/DataObjects/CourseProgressObject.js";

export const useUserProgressionStore = defineStore("userProgression", {
    state: () => ({
        achievementsMap : {},
        contentProgressMap : {},
        courseProgressMap : {},
    }),
    getters: {
        isAchievementComplete(state){
            return (tag) => state.achievementsMap[tag].isComplete();
        },
        isContentProgressComplete(state){
            return (tag) => state.contentProgressMap[tag].isComplete();
        },
        getLevelStatus(state){
            return (courseId, levelId) => {
                const levelTag = getLevelProgressTag(courseId, levelId)
                return state.courseProgressMap[levelTag].currentStatus
            }
        },
        getChapterStatus(state){
            return (courseId, levelId, chapterId) => {
                const chapterTag = getChapterProgressTag(courseId, levelId, chapterId)
                return state.courseProgressMap[chapterTag].currentStatus
            }
        }
    },
    actions: {
        populateAchievements(remoteAchievements){
            achievementJson.forEach(item => this.achievementsMap[item.tag] = new AchievementObject(item))
            //a bit of error handling is needed
            remoteAchievements.forEach(item => this.achievementsMap[item.tag].advance(item.step))
        },
        populateContentProgress(remoteProgress){
            contentProgressJson.forEach(item => this.contentProgressMap[item.tag] = new ContentProgressObject(item))
            AppData.glossary.forEach(group => group.items.forEach(word => {
                const {tag, wordAsProgress} = wordToProgress(word.id)
                this.contentProgressMap[tag] = new ContentProgressObject(wordAsProgress)
            }))
            //a bit of error handling is needed
            remoteProgress.forEach(item => this.contentProgressMap[item.tag].advance(item.step))
        },
        populateCoursesProgress(remoteProgress){
            for (const course of AppData.courses){
                console.log(course)
                const courseTag = getCourseProgressTag(course.id)
                this.courseProgressMap[courseTag] = new CourseProgressObject(courseTag)
                for (const level of course.levels){
                    const levelTag = getLevelProgressTag(course.id, level.id)
                    this.courseProgressMap[levelTag] = new CourseProgressObject(levelTag)
                    for (const chapter of level.chapters){
                        const chapterTag = getChapterProgressTag(course.id, level.id, chapter.id)
                        this.courseProgressMap[chapterTag] = new CourseProgressObject(chapterTag)
                    }
                }
            }
            remoteProgress.forEach(item => this.courseProgressMap[item.tag].setStatus(item.status))
        },
        advanceAchievement(tag){
            return this.achievementsMap[tag].advance(null, true)
        },
        advanceContentProgress(tag){
            return this.contentProgressMap[tag].advance(null, true)
        },
        setCourseStatus(courseId, status){
            const courseTag = getCourseProgressTag(courseId)
            return this.courseProgressMap[courseTag].setStatus(status, true)
        },
        setLevelStatus(courseId, levelId, status){
            const levelTag = getLevelProgressTag(courseId, levelId)
            return this.courseProgressMap[levelTag].setStatus(status, true)
        },
        setChapterStatus(courseId, levelId, chapterId, status){
            const chapterTag = getChapterProgressTag(courseId, levelId,chapterId)
            return this.courseProgressMap[chapterTag].setStatus(status, true)
        },
        unlockWord(wordId){
            const {tag} = wordToProgress(wordId)
            return this.advanceContentProgress(tag)
        }
    },
})


function getCourseProgressTag(courseId){
    return `CO${courseId}`;
}

function getLevelProgressTag(courseId, levelId){
    return `LV${levelId}_CO${courseId}`;
}

function getChapterProgressTag(courseId, levelId, chapterId){
    return `CH${chapterId}_LV${levelId}_CO${courseId}`;
}

function wordToProgress(id){
    const tag = `word_${id}`
    return {
        tag,
        wordAsProgress : {
            tag,
            steps : 1,
            category : "glossary_word"
        }
    }
}
