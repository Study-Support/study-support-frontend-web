<template>
    <div class="mentor">
        <button @click="toast">asd</button>
    </div>
</template>
<script setup>
const toast = () => {
    const {$toast} = useNuxtApp();
    $toast('HELOOOOOOOOOOO','success', 2000);
}
</script>
<style scoped>
.mentor {
    display: block;
    height: 200px;
    width: 300px;
    background-color: red;
    overflow: hidden;
}
a {
    display: block;
    height: 100%;
    width: 100%;
}
.infor {
    /* display: none; */
}
img {
    width: 100%;
    /* height: 100%; */
}
/* :src="`assets/mentor/${mentor.img}`"
    <NuxtLink :to="{path:`mentors/${mentor.id}`}">

*/
button {
    color: red;
}
</style>