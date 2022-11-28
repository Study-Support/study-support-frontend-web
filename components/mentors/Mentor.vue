<template>
    <div class="mentor">
        <img :src="`${mentor.image}`" alt="">
        <div class="full"></div>
        <div class="infor">
            <p>Khoa: {{mentor.faculty}}</p>
            <h5>Tên: {{mentor.full_name}}</h5>
            <div class="subjects">
                <p v-for="sub in mentor.subjects" :key="sub.id">{{sub.name}}</p>
            </div>
            <p>{{mentor.rating}}</p>
        </div>
    </div>
</template>
<script setup>
const props = defineProps({
    mentor: {
    type: Object,
}})
</script>
<style scoped>
* {
    box-sizing: border-box;
}
.mentor {
    display: block;
    height: 100%;
    width: 100%;
    overflow: hidden;
    position: relative;
    padding: 0px !important;
    border: 1px solid rgba(39, 99, 64, 0.244);

}
.mentor:hover .full {
    opacity: 1;
}
.mentor:hover .infor {
    bottom: 0;
}
.full { 
    position: absolute;
    opacity: 0;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(240, 240, 240, 0.228);
    transition: all  0.5s ease-in-out;
}
.infor {
    position: absolute;
    bottom: -150px;
    left: 0px;
    width: 100%;
    background-color: black;
    color: white;
    transition: all  0.4s ease-in-out;
}
h5 {
    font-size: 18px;
    line-height: 20px;
    font-weight: 700;
    margin: 10px 10px 7px 10px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}
p {
    margin: 7px 10px;
    color: rgb(174, 174, 174);
    font-size: small;
}
img {
    width: 100%;
}
.subjects p{
    margin: 0 10px;
    color: rgb(255, 255, 255);
    font-size: 12px;
}
</style>