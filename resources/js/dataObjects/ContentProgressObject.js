import {remote} from "@/libraries/Remote/Remote.js";

export class ContentProgressObject {
    constructor(progressJson){
        this.tag = progressJson.tag
        this._category = progressJson.category
        this._totalSteps = progressJson.steps
        this._currentStep = 0

        this.isComplete = () => this._currentStep === this._totalSteps

        this.advance = (toStep = null, sendToServer = false) => {

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
                        remote.addContentProgressToUser(this.tag, this._currentStep, this._category)
                    }
                }
                return true
            }
        }
    }
}
