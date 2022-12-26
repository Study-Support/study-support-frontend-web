<template>
  <div class="full">
    <BContainer fluid class="col result-my-account">
        <BRow class="rating">
          <BTabs pills card align="end">
            <BTab title="Bạn là mentor" active class="tab">
              <div v-if="ratings.mentorRatings.length === 0">
                <p>Không có đánh giá nào!</p>
              </div>
              <div v-for="(rating, index) in ratings.mentorRatings" :key="rating.name">
                <p class="name">{{index + 1}}. Nhóm: {{ rating.group }}</p>
                <p class="content">Người hướng dẫn: {{ rating.account_from }}</p>
                <p class="content">Nhận xét: {{ rating.comment }}</p>
                <p class="content">Đánh giá: {{ rating.rating }} điểm</p>
              </div>
            </BTab>
            <BTab title="Bạn là member">
              <div v-if="ratings.userRatings.length === 0">
                <p>Không có đánh giá nào!</p>
              </div>
              <div v-for="(rating, index) in ratings.userRatings" :key="rating.name">
                <p class="name">{{index + 1}}. Nhóm: {{ rating.group }}</p>
                <p class="content"> <span>Người hướng dẫn:</span> {{ rating.account_from }}</p>
                <p class="content"> <span>Nhận xét:</span> {{ rating.comment }}</p>
                <p class="content"> <span>Đánh giá:</span> {{ rating.rating }} điểm</p>
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
  ratings.value = dataRating.value.data.data
})
</script>
<style scoped>
.full {
  /* padding: 10px; */
}
div >>> .tab-content {
  padding-top: 30px;
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
  /* font-size: 18px; */
  text-transform: uppercase;
}
.content {
  font-size: 13px;
  padding-left: 17px;
  font-style: italic;
  padding-top: 5px;
  margin-bottom: 0;
  color:#3a5167;
}
.content span {
  font-style: normal;
  font-size: 14px;
  font-weight: 600;
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