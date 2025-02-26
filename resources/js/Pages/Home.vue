<script setup>
import {useUserProgressionStore} from "@/Stores/UserProgressionStore.js";
import {useRoute, useRouter} from "vue-router";

const props = defineProps({
    userProgression : {type : Object}
})

const UserProgression = useUserProgressionStore()


UserProgression.populateAchievements(props.userProgression.data.achievements)
UserProgression.populateContentProgress(props.userProgression.data.contentProgress)
UserProgression.populateCoursesProgress(props.userProgression.data.courseProgress)

UserProgression.setCourseStatus(1, "unlocked")

const route = useRoute();

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
