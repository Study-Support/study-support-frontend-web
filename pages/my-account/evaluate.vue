<template>
  <div class="full">
    <BContainer fluid>
      <BRow class="rating">
        <BTabs pills card align="end">
          <BTab title="Bạn là mentor" active>
            <div v-for="rating in ratings" :key="rating.name">
              <p class="name">{{ rating.name }}</p>
              <p class="content">{{ rating.content }}</p>
            </div>
          </BTab>
          <BTab title="Bạn là member">
            <div v-for="rating in ratings" :key="rating.name">
              <p class="name">{{ rating.name }}</p>
              <p class="content">{{ rating.content }}</p>
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

div >>> button {
  color: rgb(0, 0, 0);
  padding: 7px 20px !important;
  border-bottom: 2px solid #ededed !important;
  border-radius: 0 !important;
}

div >>> button.active {
  color: #465c71 !important;
  border-bottom: 2px solid #465c71 !important;
}
div >>> button:hover {
  color: #465c71 !important;
}
.rating {
  position: fixed;
  right: 50px;
  top: 70px;
}
</style>
