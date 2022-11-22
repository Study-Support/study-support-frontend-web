<template>
  <div>
    <div class="a">
      aasd
      <StarRating v-model="rating"/>
      asdfass
    </div>
  </div>
</template>
<script setup>
const {StarRating} = useNuxtApp();
definePageMeta({
  layout: false,
});
const aa = ref({
  aaa: 'sdfasdf',
})
const rating = ref(5)

</script>
<style scoped>
* {
  color: black;
}

.a {
  width: 900px;
  margin: auto;
  padding-top: 100px;
}
</style>