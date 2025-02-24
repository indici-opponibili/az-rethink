import {remote} from "@/Libraries/remote.js";

export class AchievementObject {
    constructor(achievementJson) {

        this.tag = achievementJson.tag
        this._totalSteps = achievementJson.steps
        this._currentStep = 0
        this.isComplete = false

        this.isComplete = () => this._currentStep === this._totalSteps

        this.advance = (toStep = null, sendToServer = false) => {
            //abort IF is completed OR the step we want to go is lower than the current one
            if(this.isComplete() || (toStep!=null && toStep <= this._currentStep)){
                return false
            } else {
                let stepsToAdvance = 1
                if(toStep!=null && toStep <= this._totalSteps){
                    stepsToAdvance = toStep-this._currentStep
                }
                for(let i = 0; i < stepsToAdvance; i++){
                    this._currentStep += 1
                    if(sendToServer){
                        remote.addAchievementToUser(this.tag, this._currentStep)
                    }
                }
                return true
            }
        }
    }


}
