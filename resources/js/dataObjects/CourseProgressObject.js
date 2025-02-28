import {remote} from "@/libraries/Remote/Remote.js";
export class CourseProgressObject {
    constructor(tag) {
        this.tag = tag
        this.currentStatus = "locked"

        this.setStatus = (status, sync = false) => {
            if (this.currentStatus !== "mastered" && _statusMap[status] > _statusMap[this.currentStatus]) {
                this.currentStatus = status
                if (sync) {
                    remote.addCourseProgressToUser(this.tag, this.currentStatus)
                }
            }
            return false
        }
    }
}

const _statusMap = {
    "locked" : 1,
    "unlocked" : 2,
    "read" : 3,
    "mastered" : 4,
}
