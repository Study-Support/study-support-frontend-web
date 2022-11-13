<template>
    <div class="mentor">
        <img :src="`${mentor.image}`" alt="">
        <div class="full"></div>
        <div class="infor">
            <h5 class="text-center">{{mentor.full_name}}</h5>
            <p class="text-center">Khoa {{mentor.faculty}} - Trường Đại học Bách Khoa - Đại học Đà Nẵng</p>
            <div class="subjects">
                <p v-for="sub in mentor.subjects" :key="sub.id">{{sub.name}}</p>
            </div>
            <p class="rating">{{mentor.rating}}</p> <BIconStar />
        </div>
    </div>
</template>
<script setup>
import { BIconStar } from 'bootstrap-icons-vue';
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
    font-size: 17px;
    line-height: 20px;
    font-weight: 600;
    margin: 10px 10px 7px 10px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}
p {
    margin: 7px 30px;
    color: rgb(174, 174, 174);
    font-size: 12px;
}
img {
    width: 100%;
}
.subjects {
    background-color: rgb(65, 65, 65);
    margin: 20px 10px 10px 10px;
    padding: 3px;
    border-radius: 5px;
}
.subjects p{
    margin: 0 10px;
    color: rgb(255, 255, 255);
    font-size: 12px;
}
.rating, svg{
   color:rgb(162, 170, 255) !important; 
}
.rating {
    display: inline-block;
    margin: 0 5px 10px 15px;
    padding-top: 10px;
    font-size: 15px;
}
svg {
    display: inline-block;
    padding-bottom: 2px;
}
</style>