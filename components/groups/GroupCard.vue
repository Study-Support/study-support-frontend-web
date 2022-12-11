<template>
    <NuxtLink :to="{ path: `/groups/${group.id}` }" class="fulls">
        <div class="image">
            <img :src="`${group.img}`" alt="">
            <span v-if="group.self_study === true" class="tag">Tự học</span>
            <span v-if="(group.status === 1 && showStatus)" class="statusTag">Tuyển thành viên</span>
            <span v-if="(group.status === 2 && showStatus)" class="statusTag">Tuyển mentor</span>
            <span v-if="(group.status === 3 && showStatus)" class="statusTag">Đang học</span>
        </div>
        <div class="content m-3">
            <p class="">Khoa {{group.faculty}}</p>
            <h5>{{group.subject}}</h5>
            <p class="quantity"> {{group.quantity}} Thành viên</p>
        </div>
    </NuxtLink>
</template>
<script setup>
const props = defineProps({
  group: {
    type: Object,
  },
  showStatus: {
    type: Boolean,
  }
});
</script>
<style scoped>
* {
    color: black;
}
.fulls {
    background-color: white;
    border-radius: 5px;
    box-shadow: 0 5px 8px 0 rgb(0 0 0 / 10%);
    overflow: hidden;
    display: block;
    height: 100%;
    padding-bottom: 40px;
    position: relative;
}
.fulls:hover img {
    transform: scale(1.05);
    border-radius: 10px 10px 0 0;
}
.image {
    height: 200px;
    overflow: hidden;
    position: relative;
}
.tag {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgb(113, 196, 255);
    padding: 4px 5px 4px 5px;
    font-size: 14px;
}
.statusTag {
    position: absolute;
    top: 0;
    right: 0;
    background-color: rgb(113, 196, 255);
    padding: 4px 5px 4px 5px;
    font-size: 14px;
}
.image img{
    width: 100%;
    transition: .3s ease;
    height: 100%;
}
.content>p:first-child {
    margin: 0 0 5px;
    color: #aaa;
    font-size: 13px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}
.quantity {
    padding: 8px 0 0;
    margin-right: 15px;
    border-top: 1px solid #e0e0e0;
    font-size: 13px;
    align-self: center;
    position: absolute;
    bottom: 0;
    left: 15px;
    display: block;
    width: 90%;
    margin-bottom: 13px;
}
h5 {
    font-size: 18px;
    line-height: 20px;
    /* height: 40px; */
    font-weight: 700;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}
</style>