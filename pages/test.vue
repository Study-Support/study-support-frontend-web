<!-- <template>
  <div class="full">
    <label for="imageFile">ádfasd</label>
    <input
      id="imageFile"
      type="file"
      name=""
      hidden
      accept="image/gif, image/jpg, image/png"
      @change="chooseFile"
    />
  </div>
</template>

<script setup>
const {
  storage, stRef, uploadBytes, getDownloadURL
} = useFirebase()
const chooseFile = () => {
  const file = document.querySelector('input[type=file]').files[0]
  const storageRef = stRef(storage, "file/" + file.name);
  uploadBytes(storageRef, file)
  getDownloadURL(stRef(storage, "file/" + file.name)).then(function(url) {
    console.log(url);
  })
  // if (file) {
  //   const reader = new FileReader()
  //   let rawImg = null
  //   reader.onload = () => {
  //     rawImg = reader.result
  //     console.log('aad')
  //     console.log(rawImg)
  //   }
  //   reader.readAsDataURL(file)
  // }
}
</script>
<style scoped></style> -->


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
  rtRef: firebaseRef,
  push,
  onValue
} = useFirebase();
let result = ref([]);
const a = () => {
  result.value = [];
  console.log('asdf')
  push(firebaseRef(databaseFirebase, "aaaaa"), {
    username: 'thunhu',
    mess: 'aaaaa',
  });
  console.log('asdf')
};
const bb = () => {
  result.value = [];
  onValue(firebaseRef(databaseFirebase, "aaaaa"), (data) => {
    result.value = [];
    data.forEach((d) => {
      result.value.push(d.val());
    });
  })
};
onMounted(() => {
  bb();
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