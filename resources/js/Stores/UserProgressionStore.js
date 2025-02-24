import {defineStore} from "pinia";
import {achievements as achievementJson} from "@/Content/achievements.js";
import {progress as progressJson} from "@/Content/progress.js"
import {AchievementObject} from "@/dataObjects/AchievementObject.js";
import {ProgressObject} from "@/dataObjects/ProgressObject.js";

export const useUserProgressionStore = defineStore("userProgression", {
    state: () => ({
        achievementsMap : {},
        progressMap : {}
    }),
    getters: {},
    actions: {
        populateAchievements(remoteAchievements){
            achievementJson.forEach(item => this.achievementsMap[item.tag] = new AchievementObject(item))
            //a bit of error handling is needed
            remoteAchievements.forEach(item => this.achievementsMap[item.tag].advance(item.step))
        },
        populateProgress(remoteProgress){
            progressJson.forEach(item => this.progressMap[item.tag] = new ProgressObject(item))
            //a bit of error handling is needed
            remoteProgress.forEach(item => this.progressMap[item.tag].advance(item.step))
        }
    },
})
