import {remote} from "@/libraries/Remote/Remote.js";

export class GlossaryWordProgressObject {
    constructor(tag) {
        this.tag = tag
        this.read = false

        this.setWordRead = (sync = false) => {
            if(!this.read) {
                this.read = true
                if (sync) {
                    remote.addGlossaryWordProgressToUser(this.tag)
                }
            }
            return false
        }
    }
}
