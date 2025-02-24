import {remote} from "@/Libraries/remote.js";

export class AchievementObject {
    constructor(achievementJson) {

        this.tag = achievementJson.tag
        this._totalSteps = achievementJson.steps
        this._currentStep = 0
        this.isComplete = false

        this.isComplete = () => this._currentStep === this._totalSteps

        this.advance = async (toStep = null, sendToServer = false) => {
            if(this.isComplete || (toStep!=null && toStep <= this._currentStep)){
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
                if(this._currentStep >= this._totalSteps){
                    this.isComplete = true
                }
                return true
            }
        }
    }


}
