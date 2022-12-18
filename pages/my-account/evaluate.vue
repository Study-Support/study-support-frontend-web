<template>
  <div class="full">
    <div class="row d-flex">
      <div class="sidebar-my-account col col-auto menu">
        <a href="/dashboard" class="menu-top">
          <h2>Study With Us</h2>
        </a>
        <div>
          <p>
            <BIconChevronDown /> Trang cá nhân
          </p>
          <button class="i1" :class="`${route.path.substring(12, 15)}`" @click="navigateTo('/my-account')">
            <BIconPersonFill /> Thông tin cá nhân
          </button>
          <button class="i2" :class="`${route.path.substring(12, 15)}`" @click="navigateTo('/my-account/evaluate')">
            <BIconPencilSquare /> Đánh giá của bạn
          </button>
          <button class="i8" :class="`${route.path.substring(12, 15)}`" @click="navigateTo('/my-account/mentor-infor')">
            <BIconPersonVideo3 /> Thông tin làm mentor
          </button>
        </div>
        <div>
          <p>
            <BIconChevronDown /> Nhóm của tôi
          </p>
          <button class="i3" :class="`${route.path.substring(19, 28)}`"
            @click="navigateTo('/my-account/groups/is-member')">
            <BIconPeopleFill /> Nhóm là thành viên
          </button>
          <button class="i4" :class="`${route.path.substring(19, 28)}`"
            @click="navigateTo('/my-account/groups/is-mentor')">
            <BIconPersonVideo3 /> Nhóm là mentor
          </button>
        </div>
        <div>
          <p>
            <BIconChevronDown /> Yêu cầu chờ duyệt
          </p>
          <button class="i5" :class="`${route.path.substring(19, 37)}`"
            @click="navigateTo('/my-account/groups/request-create-group')">
            <BIconPlusCircle /> Nhu cầu tạo nhóm
          </button>
          <button class="i6" :class="`${route.path.substring(19, 37)}`"
            @click="navigateTo('/my-account/groups/request-is-member')">
            <BIconPeopleFill /> Yêu cầu là thành viên
          </button>
          <button class="i7" :class="`${route.path.substring(19, 37)}`"
            @click="navigateTo('/my-account/groups/request-is-mentor')">
            <BIconPersonVideo3 /> Yêu cầu là mentor
          </button>
        </div>
      </div>

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
  </div>
</template>

<script setup>

import '@fontsource/love-ya-like-a-sister'
import {
  BIconChevronDown,
  BIconPencilSquare,
  BIconPeopleFill,
  BIconPersonFill,
  BIconPersonVideo3,
  BIconPlusCircle,
} from 'bootstrap-icons-vue'
const route = useRoute()
definePageMeta({
  layout: false,
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
