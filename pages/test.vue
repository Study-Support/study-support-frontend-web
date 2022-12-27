<template>
  <div class="text-center">
    {{ a }}
    {{ b }}
    <Dropdown :a="a[0]" :b="b"/>
    <Dropdown :a="a[1]"/>
  </div>
</template>
<script setup>
definePageMeta({
  layout: false,
});
const a = ref([1,2])
const b = ref({
  content: 'ds'
})
</script>
<style scoped>

</style>