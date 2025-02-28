<script setup>
import {useUserProgressionStore} from "@/Stores/UserProgressionStore.js";
import {useRoute, useRouter} from "vue-router";
import {onMounted} from "vue";
import {unmute} from "@/libraries/external/unmute.js";
import initSW from "@/libraries/pushNotifications/PushNotifications.js";

const props = defineProps({
    userProgression : {type : Object}
})

const UserProgression = useUserProgressionStore()


UserProgression.populateAchievements(props.userProgression.data.achievements)
UserProgression.populateContentProgress(props.userProgression.data.contentProgress)
UserProgression.populateCoursesProgress(props.userProgression.data.courseProgress)
UserProgression.populateGlossaryWordsProgress(props.userProgression.data.glossaryWordProgress)

console.log(props.userProgression.data.glossaryWordProgress)

UserProgression.setCourseStatus(1, "unlocked")
UserProgression.unlockWord(1)
UserProgression.advanceContentProgress("video_1_viewed")
UserProgression.advanceContentProgress("audio_1_listened")

initSW()

const route = useRoute();

onMounted(() => {
    let context = (window.AudioContext || window.webkitAudioContext) ?
        new (window.AudioContext || window.webkitAudioContext)() : null;

    if (context) {
        unmute(context);
    }
})

</script>

<template>
    <main>
        <router-view v-slot="{ Component }" >
            <Transition
                :name="route?.meta?.transition || 'home-route'"
                appear
                mode="out-in"
                :css="false"
                @enter="null"
                @leave="null">
                <!--@enter="homeTransitions.transitions.onEnter"
                @leave="homeTransitions.transitions.onLeave"-->
                <component :is="Component" />
            </Transition>
        </router-view>
    </main>
</template>
