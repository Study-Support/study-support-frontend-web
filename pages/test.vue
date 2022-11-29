<template>
  <div>
    <button @click="a">click</button>
    <div v-for="data in result" :key="data">
      {{ data.username }}
      {{ data.mess }}
    </div>
  </div>
</template>
<script setup>
import { v4 as uuidv4 } from 'uuid';
definePageMeta({
  layout: false
});
const {
  database: databaseFirebase,
  ref: firebaseRef,
  push,
  onValue
} = useFirebase();
let result = ref([]);
const a = () => {
  result.value = [];
  push(firebaseRef(databaseFirebase, "aaaaa"), {
    username: 'thunhu',
    mess: 'aaaaa',
  });
};
const bb = () => {
  result.value = [];
  console.log(result.value);
  onValue(firebaseRef(databaseFirebase, "aaaaa"), (data) => {
    result.value = [];
    data.forEach((d) => {
      result.value.push(d.val());
    });
  })
};
onMounted(() => {
  bb();
  let userId = uuidv4();
  console.log(userId);
  userId = uuidv4();
  console.log(userId);
})
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