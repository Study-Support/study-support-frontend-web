<template>
    <div class="row d-flex">
      <div class="sidebar-my-account col col-auto menu">
        <a href="/dashboard" class="menu-top"><h2>Study With Us</h2></a>
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
    <BRow class="ms-1 me-1 mb-4">
      <BCol
        v-for="group in groupsIsMember"
        :key="group.id"
        class="col-6 col-md-3 mt-4"
      >
        <GroupCard
          :group="group"
          @click="navigateTo(`/groups/${group.id}/register-is-member`)"
        />
      </BCol>
    </BRow>
      </BContainer>
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
const groupsIsMember = ref([])

// Tạo url lấy groups user đang tham gia học
const { url: url1 } = useUrl({
  path: 'user/groups',
  queryParams: {
    is_mentor: 0,
    accepted: 0,
  },
})

// Lấy groups của user đang đăng nhập
const {
  data: dataGetgroupsIsMember,
  get: getgroupsIsMember,
  onFetchResponse: getgroupsIsMemberResponse,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(url1, { immediate: false })

getgroupsIsMember().json().execute()
getgroupsIsMemberResponse(() => {
  groupsIsMember.value = dataGetgroupsIsMember.value.data.data
})
</script>
<style scoped>
h2{
  color: black;
  font-size: 30px;
  padding-bottom: 20px;
}
</style>
