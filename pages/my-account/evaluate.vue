<template>
  <div class="full">
    <BContainer fluid>
      <BRow class="rating">
        <h5>Đánh giá mentor dành cho bạn</h5>
        <div v-for="rating in ratings" :key="rating.name">
          <p class="name">{{ rating.name }}</p>
          <p class="content">{{ rating.content }}</p>
        </div>
      </BRow>
    </BContainer>
  </div>
</template>
  
<script setup>
definePageMeta({
  layout: 'logout-page',
  middleware: 'authenticated',
});
const ratings = ref([]);


// Lấy đánh giá
const {
  data: dataRating,
  get: getRating,
  onFetchResponse: getRatingResponse,
  onFetchError: getRatingError,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(
  '/user/rating',
  { immediate: false },
);
getRating().json().execute();
getRatingResponse(() => {
  ratings.value = dataRating.value.data;
})
// Lấy thông tin cá nhân

</script>
<style scoped>
.full {
  padding: 10px;
}
h5 {
  font-size: 20px;
}
.name {
  font-weight: 600;
  margin: 0;
}
.content {
  font-size: 13px;
}
</style>
