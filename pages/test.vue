<template>
  <div>
    <div class="a">
      {{aa.aaa}}
      <Subject />
    </div>
  </div>
</template>
<script setup>
const aa = ref({
  aaa: 'sdfasdf',
})
</script>
<style scoped>
* {
  color: black;
}
.a {
  width: 270px;
}
</style>