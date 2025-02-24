<script setup>
import {useUserProgressionStore} from "@/Stores/UserProgressionStore.js";

const props = defineProps({
    userProgression : {type : Object}
})

const UserProgression = useUserProgressionStore()

UserProgression.populateAchievements(props.userProgression.achievements)
UserProgression.populateProgress(props.userProgression.progress)

</script>

<template>
    <div class="m-0 flex h-screen w-screen flex-1 justify-center bg-slate-700">
        <div class="m-0 self-center rounded-xl flex justify-center bg-slate-100 p-16 transition duration-500 ease-in-out hover:bg-yellow-300 hover:delay-0 hover:duration-500">
            <h1 class="text-3xl font-bold">{{$t('hello')}}</h1>
        </div>
    </div>
</template>
