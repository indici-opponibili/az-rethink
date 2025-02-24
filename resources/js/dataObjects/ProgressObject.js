import {remote} from "@/Libraries/remote.js";

export class ProgressObject{
    constructor(progressJson){
        this.tag = progressJson.tag
        this._category = progressJson.category
        this._totalSteps = progressJson.steps
        this._currentStep = 0
        this.isComplete = false

        this.isComplete = () => this._currentStep === this._totalSteps

        this.advance = async (toStep = null, sendToServer = false) => {

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
                        remote.addProgressToUser(this.tag, this._currentStep, this._category)
                    }
                }
                return true
            }
        }
    }
}
