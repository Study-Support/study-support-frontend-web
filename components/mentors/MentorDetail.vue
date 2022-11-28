<template>
  <div class="full">
    <NuxtLink :to="{ path: `/mentors/${mentor.id}` }">
      <div class="img">
        <img :src="`${mentor.image}`" alt="">
      </div>
      <div class="infor">
        <h5 class="text-center">{{mentor.full_name}}</h5>
        <p class="faculty text-center">Khoa {{mentor.faculty}}</p>
        <div class="subjects">
          <p v-for="sub in mentor.subjects" :key="sub.id">{{ sub.name }}</p>
        </div>
        <div class="d-flex justify-content-between back">
          <p class="rating">
            <BIconPeopleFill />
            {{ mentor.group_quantity }} nhóm
          </p>
          <p class="rating">
            <BIconHeartFill />
            {{ mentor.rating }} 
          </p>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>
<script setup>
import { BIconHeartFill, BIconPeopleFill } from 'bootstrap-icons-vue';
const props = defineProps({
	mentor: {
		type: Object,
	}
})
</script>
<style scoped>
.full {
  width: 260px;
  border: 1px solid #e5e5e5;
  border-radius: 8px;
  padding-top: 15px;
  height: 100%;
  position: relative;
}

.img {
  width: 180px;
  height: 180px;
  border-radius: 90px;
  overflow: hidden;
  margin: auto;
  border: 1px solid #e5e5e5;
}

img {
  width: 100%;
}
.infor {
  padding: 0 14px 0 14px;
}

h5 {
  font-size: 18px;
  line-height: 25px;
  font-weight: 600;
  color: #333333;
  margin: 15px 10px 5px 10px;
}

.subjects {
  background-color: #E6EDEB;
  margin: 20px 0 50px 0;
  padding: 5px 3px;
  border-radius: 5px;
}

.subjects p {
  margin: 0 10px;
  color: rgb(0, 0, 0);
  font-size: 12px;
  line-height: 18px;
}

.faculty {
  color: rgb(101, 101, 101);
  font-size: 12px;
}

.rating {
  color: rgb(0, 0, 0) !important;
}
.back {
  margin-top: 20px;
  position: absolute;
  width: 100%;
  bottom: 0;
  right: 0;
  padding:0 14px 0 14px;
}
.back p {
  font-size: 15px;
  margin-bottom: 10px !important;
}

svg {
  display: inline-block;
  padding-bottom: 4px;
  margin-right: 2px;
  font-size: 21px;
  color: #b2c4bf !important;
}
</style>