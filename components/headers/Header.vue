<template>
  <div>
    <BContainer fluid class="position-fixed top-0 start-0 menu-top">
      <BContainer>
        <BRow class="d-flex justify-content-between mt-2">
          <BCol class="col-auto ps-0">
            <NuxtLink to="/dashboard">
              <h2>Study With Us</h2>
            </NuxtLink>
          </BCol>
          <ul class="col col-auto d-flex menu mb-1">
            <li class="text-decoration-none d-block">
              <NuxtLink to="/dashboard">
                TRANG CHỦ
              </NuxtLink>
            </li>
            <li class="text-decoration-none d-block">
              <NuxtLink :to="{ path: '/groups', query: { type: getConfig('constants.typeOfGroup.all') } }">
                NHÓM HỌC
              </NuxtLink>
            </li>
            <li class="text-decoration-none d-block">
              <NuxtLink :to="{ path: '/groups', query: { type: getConfig('constants.typeOfGroup.findMentor') } }">
                TÌM HƯỚNG DẪN
              </NuxtLink>
            </li>
            <li class="text-decoration-none d-block">
              <NuxtLink to="/mentors">
                NGƯỜI HƯỚNG DẪN
              </NuxtLink>
            </li>
            <li  class="text-decoration-none d-block">
              <NuxtLink to="/my-account">
                <div class="avatar">
                  <img src="/assets/user.png" alt="">
                </div>
              </NuxtLink>
            </li>
          </ul>
        </BRow>
        <!-- <div class="sidebar" :class="{ sidebarShow: !sidebarShow }">
          <button @click="sidebarShow = false">
            <BIconX class="close" />
          </button>
          <NuxtLink to="/my-account" class="mt-2 mb-4 user-infor d-block">
            <div class="user-image">
              <img src="assets/user.png" alt="">
            </div>
            Xem trang cá nhân
          </NuxtLink>
        </div> -->
      </BContainer>
    </BContainer>
    <div class="back-header" />
  </div>
</template>
  
<script setup>
import { BIconBoxArrowLeft, BIconX, BIconPeopleFill } from 'bootstrap-icons-vue';
import "@fontsource/love-ya-like-a-sister";

const { getConfig } = useConfig();
// const { token, deleteToken } = useToken();
// const sidebarShow = ref(false);
// const user = ref({
//   id: '',
//   full_name: '',
// });
// const userId = ref({
//   user_id: '',
// });
// const myGroups = ref([]);
// // Tạo url lấy user theo id
// const { url: url1 } = useUrl({
//   path: '/groups',
//   queryParams: userId.value,
// });
// // Lấy thông tin user
// const {
//   data: dataGetMe,
//   get: getMe,
//   onFetchResponse: getMeResponse,
//   onFetchError: getMeError,
// } = useFetchApi({
//   requireAuth: true,
//   disableHandleErrorUnauthorized: false,
// })(
//   '/user',
//   { immediate: false },
// );
// // Lấy groups của user đang đăng nhập
// const {
//   data: dataGetMyGroups,
//   get: getGroups,
//   onFetchResponse: getGroupsResponse,
//   onFetchError: getGroupsError,
// } = useFetchApi({
//   requireAuth: false,
//   disableHandleErrorUnauthorized: false,
// })(
//   url1,
//   { immediate: false },
// );

// getGroupsResponse(() => {
//   myGroups.value = dataGetMyGroups.value.data.data;
// });
// getMe().json().execute();
// getMeResponse(() => {
//   user.value = dataGetMe.value.data.data;
//   userId.value.user_id = user.value.id;
//   getGroups().json().execute();
// });
// getMeError(() => {
//   // deleteToken();
// });

</script>

<style scoped>
*,
a {
  color: white;
}

.menu-top {
  background-color: #465C71;
  z-index: 100;
}

h5 {
  color: rgb(0, 108, 240);
}

.container-fluid {
  border-bottom: 1px solid black;

}

h2 {
  font-family: "Love Ya Like A Sister";
  display: block;
  min-width: 20px;
}

li {
  font-size: 13px;
  font-weight: 700;
  padding: 0 16px;
  margin-right: 5px;
  line-height: 3em;
  text-transform: uppercase;
  border-radius: 4px;
  box-shadow: -4px 3px 0px 0px rgb(0 0 0 / 0%);
  background-color: transparent;
}

li:last-child {
  margin-right: 0px;
  padding-right: 0px;
}

li a:hover {
  color: rgb(0, 108, 240);
  transition: color 300ms linear;
}

.sidebar {
  position: fixed;
  top: 0px;
  right: 0px;
  background-color: rgb(58, 65, 62);
  height: 100vh;
  width: 50vh;
  transition: all 200ms linear;
}

.sidebar a {
  color: white;
}

.sidebar span {
  color: white;
}

.sidebar svg {
  color: rgb(1, 116, 188);
}

.sidebarShow {
  right: -50vh;
}

.sidebar button {
  border: 0px;
  background-color: rgb(58, 65, 62);
  text-align: left;
}

.sidebar button .close {
  color: white;
  font-weight: bold;
  font-size: 30px;
}

.sidebar .user-image {
  width: 35px;
  height: 35px;
  margin-left: 5px;
  margin-right: 5px;
  display: inline-block;
}

.sidebar .user-image img {
  width: 100%;
  border-radius: 60px;
}

.sidebar .user-infor {
  /* background-color: black; */
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
}

.avatar {
  width: 30px;
  height: 30px;
  display: inline-block;
  margin-right: 5px;
  border: 1px solid black;
  border-radius: 15px;
  overflow: hidden;
}

.avatar img {
  width: 100%;
  vertical-align: 0px;
}
</style>
