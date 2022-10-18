<template>
    <div class="mentor">
        <img src="assets/mentors/m1.jpg" alt="">
        <!-- <div class="infor">
            <h3>Hoàng Thị Thu Như</h3>
        </div> -->
    </div>
</template>
<script setup>
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
</style>