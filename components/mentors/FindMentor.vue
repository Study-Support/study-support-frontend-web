<template>
    <NuxtLink :to="{ path: `/groups/${group.id}` }" class="find-mentor">
        <p class="faculty">Khoa {{group.faculty}}</p>
        <h5>{{group.subject}}</h5>
        <p class="quantity">Nhóm {{group.quantity}} thành viên</p>
        <!-- <p class="faculty">Khoa Công nghệ thông tin</p>
        <h5>Lập trình hướng đối tượng</h5>
        <p class="quantity"> 3 Thành viên</p> -->
    </NuxtLink>
</template>
<script setup>
const props = defineProps({
  group: {
    type: Object,
  }
});
</script>
<style scoped>
* {
    box-sizing: border-box;
}
.find-mentor {
    height: 170px;
    min-width: 100px;
    background-color: #9fd5ff;
    background-color: #dbefff;
    flex: 0 0 calc(33.3% - 10px);
    margin-bottom: 10px;
    padding: 12px;
    position: relative;
    border-radius: 10px;
    color: black;
    transition: all .4s;
}
.find-mentor:hover {
    margin-top: -5px;
}
.faculty {
    margin: 0 0 5px;
    color: rgb(76, 76, 76);
    font-size: 12px;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}
h5 {
    font-size: 16px;
    line-height: 20px;
    /* height: 40px; */
    font-weight: 700;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
}
.quantity {
    padding: 8px 0 0;
    margin-right: 15px;
    border-top: 1px solid #787b7d;
    font-size: 13px;
    align-self: center;
    position: absolute;
    bottom: 0;
    left: 15px;
    display: block;
    width: 85%;
    margin-bottom: 13px;
}
</style>