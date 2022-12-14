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
const chooseFile = () => {
  const file = document.querySelector('input[type=file]').files[0]
  if (file) {
    const reader = new FileReader()
    let rawImg = null
    reader.onload = () => {
      rawImg = reader.result
      console.log('aad')
      console.log(rawImg)
    }
    reader.readAsDataURL(file)
  }
}
</script>
<style scoped></style>
