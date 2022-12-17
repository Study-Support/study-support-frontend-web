<template>
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
  console.log(file);
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
<style scoped></style>
