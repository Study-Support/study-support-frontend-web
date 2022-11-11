<template>
    <div>
        <div class="img m-auto p-2">
            <img :src="`assets/intros/${intro.img}`" alt=""/>
        </div>
        <NuxtLink :to="{ path: intro.to.path, query: intro.to.query }">
            <h3>{{intro.title}}</h3>
        </NuxtLink>
        <h6>
            {{intro.content}}
        </h6>
    </div>
</template>
<script setup>
const props = defineProps({
    intro: {
    type: Object,
}
});
</script>
<style scoped>
h3 {
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 5px;
  color:#273044;
}
h6 {
  font-size: 15px;
  color: rgba(39,48,68,0.7);
  line-height: 27px;
  /* padding: 20px; */
}
.img {
  width: 150px;
  margin-bottom: 15px !important;
}
img {
  width: 100%;
}
</style>