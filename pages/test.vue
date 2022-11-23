<template>
  <div>
    THU NHU
    <button @click="a">nhan</button>
  </div>
  <div v-for="data in result" :key="data">
    {{data.username}}
    {{data.mess}}
  </div>
</template>
<script setup>

definePageMeta({
  layout: false,
});
const {database, ref, push, onValue} = useFirebase();
const result = reactive([]);
const a = () => {
  push(ref(database, "colen"), {
    username: 'thunhu',
    mess: 'co len',
  });
};
const b = () => {
  result = [];
  onValue(ref(database, "colen"), (data) => {
    data.forEach((d) => {
      result.push(d.val());
    });
  })
};
onMounted(() => {
  b();
});
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