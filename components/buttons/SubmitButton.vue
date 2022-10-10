<template>
  <div>
    <BButton
      class="mt-2"
      type="submit"
      :style="{ backgroundColor: color }"
      :disabled="isDisabled"
    >
      <img v-if="isDisabled" src="../../assets/ajax-loader.gif" alt="">
      <span v-if="!isDisabled"> {{ content }} </span>
    </BButton>
  </div>
</template>
<script>
export default {
  props: {
    content: {
      type: String,
    },
    color: {
      type: String,
    },
    isDisabled: {
      type: Boolean,
    },
  },
};
</script>
<style scoped>
button {
  width: 100%;
  min-height: 40px;
  border-radius: 8px !important;
  background-color: black;
  color: white;
  border: none;
}
button img {
    height: 100% !important;
}
</style>
