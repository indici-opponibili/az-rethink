import axios from "axios";

const achievementToJson = (achievement) => {
    return {
        tag : achievement.tag,
        step : achievement.step,
    }
}

const progressToJson = (progress) => {
    return {
        tag : progress.tag,
        step : progress.step,
        category: progress.category,
    }
}

function addAchievementToUser(tag, step){
    axios.post('/user/achievements/add', {tag, step})
        .catch(err => console.log(err))
}

function addProgressToUser(tag, step, category){
    axios.post('/user/progress/add', {tag, step, category})
        .catch(err => console.log(err))
}

export const remote = {
    addProgressToUser,
    addAchievementToUser
}
