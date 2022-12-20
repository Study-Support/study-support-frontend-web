<template>
  <div class="full">
    <BContainer class="col result-my-account">
        <BRow class="rating">
          <BTabs pills card align="end">
            <BTab title="Bạn là mentor" active>
              <div v-for="(rating, index) in ratings.mentorRatings" :key="rating.name">
                <p class="name">{{index + 1}}. Nhóm {{ rating.group }}</p>
                <p class="content">Đánh giá: {{ rating.comment }}</p>
              </div>
            </BTab>
            <BTab title="Bạn là member">
              <div v-for="(rating, index) in ratings.userRatings" :key="rating.name">
                <p class="name">{{index + 1}}. Nhóm {{ rating.group }}</p>
                <p class="content">Đánh giá: {{ rating.comment }}</p>
              </div>
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
})
const ratings = ref({
  mentorRatings: [],
  userRatings: [],
})

// Lấy đánh giá của mình
const {
  data: dataRating,
  get: getRating,
  onFetchResponse: getRatingResponse,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})('/rate', { immediate: false })
getRating().json().execute()
getRatingResponse(() => {
  ratings.value = dataRating.value.data
})
</script>
<style scoped>
.full {
  padding: 10px;
}

h2{
  color: black;
  font-size: 30px;
  padding-bottom: 20px;
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
.result-my-account div>>>button {
  color: rgb(0, 0, 0);
  padding: 7px 20px !important;
  border-bottom: 2px solid #ededed !important;
  border-radius: 0 !important;
}
.result-my-account div>>>button.active {
  color: #465c71 !important;
  border-bottom: 2px solid #465c71 !important;
}
.result-my-account  div>>>button:hover {
  color: #465c71 !important;
}
.rating {
  position: fixed;
  right: 50px;
  top: 70px;
  width: 70%;
}
.card-header:first-child {
  padding-bottom: 20px;
}
</style>