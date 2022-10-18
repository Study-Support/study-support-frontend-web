<template>
    <div class="mentor">
        <img :src="`${image}`" alt="">
        <div>
            <h4>Hoàng Thị Thu Như</h4>
            <p></p>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    image: {
    type: String,
}})
</script>
<style scoped>
.mentor {
    display: block;
    height: 100%;
    width: 100%;
    overflow: hidden;
}
.infor {
    /* display: none; */
}
img {
    width: 100%;
}
/* :src="`assets/mentor/${mentor.img}`"
    <NuxtLink :to="{path:`mentors/${mentor.id}`}">

*/
</style>