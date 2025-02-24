<script setup>

import axios from "axios";

function guestLogin(){
    axios.post('/guest-login')
}

</script>

<template>
<div>
    <button class="" @click="guestLogin">Login</button>
</div>
</template>

<style scoped>

</style>
