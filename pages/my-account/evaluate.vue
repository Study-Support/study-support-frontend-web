<template>
  <div class="full">
    <BContainer fluid>
      <BRow class="rating">
        <h5>Đánh giá mentor dành cho bạn</h5>
        <BTabs pills card align="end">
          <BTab title="Bạn là mentor" active>
            <div v-for="rating in ratings" :key="rating.name">
              <p class="name">{{ rating.name }}</p>
              <p class="content">{{ rating.content }}</p>
            </div>
          </BTab>
          <BTab title="Bạn là member">
            thu nhu
          </BTab>
        </BTabs>

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
const ratingsMentor = ref([]);


// Lấy đánh giá của mình
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
// Lấy đánh giá của mình là mentor
const {
  data: dataRatingMentor,
  get: getRatingMentor,
  onFetchResponse: getRatingMentorResponse,
  onFetchError: getRatingMentorError,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(
  '/user/rating',
  { immediate: false },
);
getRatingMentor().json().execute();
getRatingMentorResponse(() => {
  ratingsMentor.value = dataRatingMentor.value.data;
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

div>>>button {
  color: rgb(0, 0, 0);
  padding: 5px 20px !important;
  transition: .5s ease;
}

div>>>button.active {
  color: rgb(255, 255, 255) !important;
  background-color: rgb(34, 29, 29) !important;
}
</style>
