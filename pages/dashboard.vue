<template>
  <div>
    <BContainer fluid class="top-dashboard">
      <BContainer>
        <div class="notification" :class="{ notiShow: notiShow }">
          <div class="inter">
            <button @click="notiShow = !notiShow" :disabled="notiShow" class="p-2 bell">
              <BIconBellFill />
              Thông báo
            </button>
            <div class="input-group search">
              <input v-model="noti.search" class="form-control border-end-0 border" type="search"
                placeholder="Nội dung">
              <span class="input-group-append">
                <button class="btn btn-outline-secondary bg-white border-start-0 border-bottom-0 border ms-n5"
                  type="button" @click="searchNoti">
                  <BIconSearch />
                </button>
              </span>
            </div>
            <BIconX class="close" @click="notiShow = false" />
            <div class="noti-content p-2">
              <p class="noti-mess">{{ mess }}</p>
              <div v-for="noti in notifications" :key="noti.id" class="noti-item mb-4">
                <p class="time">{{ noti.time }}:</p>
                <p class="title">{{ noti.title }}</p>
                <p class="des">{{ noti.description }}</p>
              </div>
              <div class="loader">
                <InfiniteLoading v-if="loading" class="loading ms-auto me-auto" @infinite="load" />
              </div>
            </div>
          </div>
        </div>
        <BRow>
          <BCol>
            <BRow class="d-flex justify-content-between mt-1">
              <BCol class="col-auto">
                <span class="contact"> Contact us on <a href="#">0 800 123 4567</a> or <a
                    href="https://dut.udn.vn/">dut.udn.vn</a></span>
              </BCol>
              <ul class="col col-auto d-flex login" v-if="dataGetMe === null">
                <li class="d-flex register">
                  <NuxtLink class="text-decoration-none d-block" to="/register"> Đăng ký </NuxtLink>
                </li>
                <li class="d-flex">
                  <NuxtLink class="text-decoration-none d-block" to="/login"> Đăng nhập </NuxtLink>
                </li>
              </ul>
              <BCol v-else class="col-auto">
                <div @click="sidebarShow = !sidebarShow">
                  <div class="avatar">
                    <img src="assets/user.png" alt="">
                  </div>
                  <a href="#" class="user">{{ user.full_name }}</a>
                </div>
                <div class="sidebar" :class="{ sidebarShow: !sidebarShow }">
                  <button @click="sidebarShow = false">
                    <BIconX class="close" />
                  </button>
                  <NuxtLink to="/my-account" class="mt-2 mb-4 user-infor d-block">
                    <div class="user-image">
                      <img src="assets/user.png" alt="">
                    </div>
                    Xem trang cá nhân
                  </NuxtLink>
                  <div class="p-2">
                    <GroupMenu />
                  </div>
                </div>
              </BCol>
            </BRow>
            <BRow class=" mt-3 d-flex justify-content-between">
              <BCol class="col-auto">
              </BCol>
              <ul class="col col-auto d-flex menu mb-1 mt-1">
                <li class="text-decoration-none d-block">
                  <NuxtLink to="/dashboard">
                    TRANG CHỦ
                  </NuxtLink>
                </li>
                <li class="text-decoration-none d-block">
                  <NuxtLink :to="{ path: 'groups', query: { type: getConfig('constants.typeOfGroup.all') } }">
                    NHÓM HỌC
                  </NuxtLink>
                </li>
                <li class="text-decoration-none d-block">
                  <NuxtLink :to="{ path: 'groups', query: { type: getConfig('constants.typeOfGroup.findMentor') } }">
                    TÌM HƯỚNG DẪN
                  </NuxtLink>
                </li>
                <li class="text-decoration-none d-block">
                  <NuxtLink to="/mentors">
                    NGƯỜI HƯỚNG DẪN
                  </NuxtLink>
                </li>
              </ul>
            </BRow>
            <BRow v-if="sticky">
              <BCol :class="{ sticky: sticky }">
                <BRow class=" mt-2 mb-2 d-flex justify-content-between">
                  <BCol class="col-auto ps-0">
                    <a href="/dashboard">
                      <h2>Study With Us</h2>
                    </a>
                  </BCol>
                  <ul class="col col-auto d-flex menu mb-1">
                    <li class="text-decoration-none d-block">
                      <NuxtLink to="/dashboard" @click.prevent="scrollTop()">
                        TRANG CHỦ
                      </NuxtLink>
                    </li>
                    <li class="text-decoration-none d-block">
                      <NuxtLink :to="{ path: 'groups', query: { type: getConfig('constants.typeOfGroup.all') } }">
                        NHÓM HỌC
                      </NuxtLink>
                    </li>
                    <li class="text-decoration-none d-block">
                      <NuxtLink to="/dashboard">
                        TÌM HƯỚNG DẪN
                      </NuxtLink>
                    </li>
                    <li class="text-decoration-none d-block">
                      <NuxtLink to="/dashboard">
                        NGƯỜI HƯỚNG DẪN
                      </NuxtLink>
                    </li>
                  </ul>
                </BRow>
              </BCol>
            </BRow>
          </BCol>
        </BRow>
        <BRow class="pb-5 pt-2">
          <BCol class=" header-content col-12 col-lg-6">
            <BRow class="mb-4">
              <h1 class="col slogan"> Study With Us </h1>
            </BRow>
            <BRow class="mb-4">
              <p class="col idiom col-12 col-auto"> 
                Học… học để là chính mình, và học để từ bỏ với vẻ thanh cao những gì không phải là mình.
              </p>
            </BRow>
            <BRow class="">
              <BCol>
                <button @click="scrollWin" class="let-start"> Các cách tham gia </button>
              </BCol>
            </BRow>
          </BCol>
        </BRow>
      </BContainer>
    </BContainer>
    <BContainer class="full-intro">
      <!-- <div class="intro"> -->
        <Intro />
      <!-- </div> -->
    </BContainer>
    <BContainer fluid class="all-groups pb-5">
      <h3 class="ms-3">Nhóm học</h3>
      <BRow class="ms-1 me-1 mb-4">
        <BCol class="col-6 col-md-3 mt-4" v-for="group in topGroup" :key="group.id">
          <GroupCard :group="group" />
        </BCol>
      </BRow>
      <div class="text-end me-1 more">
        <NuxtLink :to="{ path: 'groups', query: { type: getConfig('constants.typeOfGroup.findMember') } }">
          Xem thêm
          <BIconArrowRight />
        </NuxtLink>
      </div>
    </BContainer>
    <BContainer class="mentors">
      <h3 class="text-center">Người hướng dẫn</h3>
      <p class="text-center a"> Những bạn hiện là người hướng dẫn của nhà trường</p>
      <div class="bg">
      </div>
      <div class="mentor-item">
        <div class="up d-flex">
          <div class="up-left">
            <Mentor :mentor="topMentor[0]" />
          </div>
          <div class="up-right">
            <div class="up-right-item">
              <Mentor :mentor="topMentor[1]" />
            </div>
            <div class="up-right-item">
              <Mentor :mentor="topMentor[2]" />
            </div>
          </div>
        </div>
      </div>
      <div class="text-end me-1 more">
        <NuxtLink to="mentors">
          Xem thêm
          <BIconArrowRight />
        </NuxtLink>
      </div>
    </BContainer>
    <BContainer fluid class="find-mentors">
      <BContainer>
        <BRow>
          <BCol>
            <div class="d-flex justify-content-around flex-wrap">
              <FindMentor v-for="group in topGroupFindMentor" :key="group.id" :group="group" class="item" />
            </div>
          </BCol>
          <BCol class="content">
            <h2>Tìm kiếm người hướng dẫn</h2>
            <div class="text-center">
              <NuxtLink :to="{ path: 'groups', query: { type: getConfig('constants.typeOfGroup.findMentor') } }"
                class="more">
                Xem thêm
              </NuxtLink>
            </div>
          </BCol>
        </BRow>
      </BContainer>
    </BContainer>
    <BContainer class="self-study mt-5">
      <BRow class="d-flex justify-content-between">
        <BCol class="col-6">
          <div class="img">
            <img src="assets/self.jpg" alt="">
          </div>
        </BCol>
        <BCol class="content col-5">
          <h2>Tham gia các nhóm tự học để nâng cao kiến thức</h2>
          <p>Đây là các nhóm không có người hướng dẫn, có thể là nhóm nghiên cứu khoa học, học nhóm... tìm thành viên để
            cùng nhau học tập, nghiên cứu.</p>
          <div class="pt-5">
            <NuxtLink :to="{ path: 'groups', query: { type: getConfig('constants.typeOfGroup.selfStudy') } }"
              class="more">
              Xem chi tiết
            </NuxtLink>
          </div>
        </BCol>
      </BRow>
    </BContainer>
    <p>ádfasdfasdf</p>
    <p>ádfasdfasdf</p>
    <p>ádfasdfasdf</p>
    <p>ádfasdfasdf</p>
    <p>ádfasdfasdf</p>
  </div>
</template>
<script setup>
import "@fontsource/love-ya-like-a-sister";
import InfiniteLoading from 'v3-infinite-loading';
import 'v3-infinite-loading/lib/style.css';
import { BIconX, BIconPeopleFill, BIconArrowRight, BIconBellFill, BIconSearch } from 'bootstrap-icons-vue';
import "@fontsource/quicksand";

definePageMeta({
  layout: false,
});
const { token, deleteToken } = useToken();
const { getConfig } = useConfig();
const loading = ref(true);
const sticky = ref(false);
const sidebarShow = ref(false);
const notiShow = ref(false);
const notifications = ref([]);
const mess = ref('');
const noti = ref({
  search: '',
  page: 0,
});
const user = ref({
  id: '',
  full_name: '',
});
const topGroup = ref([
]);
const topGroupFindMentor = ref([
]);
const topMentor = ref([
  {
    full_name: '',
    subject: '',
  },
  {
    full_name: '',
    subject: '',
  },
  {
    full_name: '',
    subject: '',
  },
]);

// Lấy thông tin user
const {
  data: dataGetMe,
  get: getMe,
  onFetchResponse: getMeResponse,
  onFetchError: getMeError,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(
  '/user',
  { immediate: false },
);

// Lấy tất cả mentor
const {
  data: dataGetMentors,
  get: getMentors,
  onFetchResponse: getMentorsResponse,
} = useFetchApi({
  requireAuth: false,
  disableHandleErrorUnauthorized: false,
})(
  '/mentors',
  { immediate: false },
);

// tạo url lấy nhóm tìm member
const { url: url2 } = useUrl({
  path: '/groups',
  queryParams: {
    type: getConfig('constants.typeOfGroup.findMember'),
  },
});
// tạo url lấy nhóm tìm mentor
const { url: url4 } = useUrl({
  path: '/groups',
  queryParams: {
    type: getConfig('constants.typeOfGroup.findMentor'),
  },
});

const { url: url3 } = useUrl({
  path: '/notifications',
  queryParams: noti.value,
});
// Lấy tất cả thông báo
const {
  data: dataGetNotis,
  get: getNotis,
  onFetchResponse: getNotisResponse,
} = useFetchApi({
  requireAuth: false,
  disableHandleErrorUnauthorized: false,
})(
  url3,
  { immediate: false },
);

// Lấy groups đang tìm member
const {
  data: dataGetTopGroup,
  get: getTopGroup,
  onFetchResponse: getTopGroupResponse
} = useFetchApi({
  requireAuth: false,
  disableHandleErrorUnauthorized: false,
})(
  url2,
  { immediate: false },
);
getTopGroup().json().execute();
getTopGroupResponse(() => {
  topGroup.value = dataGetTopGroup.value.data.data.slice(0, 4);
})
// Lấy groups đang tìm mentor
const {
  data: dataGetGroupFindMentor,
  get: getGroupFindMentor,
  onFetchResponse: GetGroupFindMentorResponse
} = useFetchApi({
  requireAuth: false,
  disableHandleErrorUnauthorized: false,
})(
  url4,
  { immediate: false },
);
getGroupFindMentor().json().execute();
GetGroupFindMentorResponse(() => {
  topGroupFindMentor.value = dataGetGroupFindMentor.value.data.data.slice(0, 6);
})

getMentors().json().execute();
getMentorsResponse(() => {
  topMentor.value = dataGetMentors.value.data.data.slice(0, 3);
})

getMe().json().execute();
getMeResponse(() => {
  user.value = dataGetMe.value.data;
  getGroups().json().execute();
});
getMeError(() => {
  // deleteToken();
});


getNotisResponse(() => {
  // notifications.value = dataGetNotis.value.data.data;
  if (dataGetNotis.value.data.data.length !== 0) {
    notifications.value = notifications.value.concat(dataGetNotis.value.data.data);
  }
  if (dataGetNotis.value.data.data.length < getConfig('constants.pagination')) {
    loading.value = false;
  }
  if (notifications.value.length === 0) {
    mess.value = 'Không có thông báo nào!';
  }
});
// Lấy dữ liệu notifications theo paginate
const load = () => {
  setTimeout(() => {
    noti.value.page += 1;
    getNotis().json().execute();
  }, 100);
};
// nhấn search notifications
const searchNoti = () => {
  mess.value = '';
  noti.value.page = 0;
  loading.value = true;
  notifications.value = [];
};
// Set sticky menu
window.document.body.onscroll = function () {
  if (window.scrollY > 150) {
    sticky.value = true;
  }
  else {
    sidebarShow.value = false;
    sticky.value = false;
  }
};
const scrollWin = () => {
  window.scrollTo(0, 350);
}
const scrollTop = () => {
  window.scrollTo(0, 0);
}
</script>
<style scoped>
.top-dashboard h1,
.top-dashboard h2,
.top-dashboard h3 {
  font-family: "Love Ya Like A Sister";
}

/* .top-dashboard h2 {
  color: #ffffff;
  font-size: 28px;
  text-transform: uppercase;
  font-weight: 700;
  line-height: 30px;
} */

.header-content {
  margin-top: 20px;
}

h1 {
  margin: 0px;
  color: #ffffff;
}

.top-dashboard {
  background-color: rgb(96, 132, 141);
  background-image: url("assets/bg1.png");
  background-repeat: none;
  background-size: 100%;
  /* min-height: 615px; */
  /* min-height:  480px; */
  color: white;
  position: relative;
}

.top-dashboard a {
  color: white;
}

.top-dashboard:after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.2;
  z-index: -1;
}

ul.login {
  padding-right: 0px;
}

ul.login li>a {
  background-color: #0d77a8;
  padding: 5px 15px;
  margin-right: 5px;
  border-radius: 0 0 4px 4px;
  box-shadow: -4px 3px 0px 0px rgb(0 0 0 / 20%);
  font-size: small;
}

a.user {
  margin-right: 8px;
  font-size: small;
  font-weight: 600;
  color: rgb(12, 122, 206);
}

span.contact {
  font-size: small;
  color: rgb(190, 190, 190);
}

span.contact a {
  color: rgb(132, 200, 252);
}

img {
  width: 250px;
}

ul.menu li {
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

ul.menu li:last-child {
  margin-right: 0px;
  padding-right: 0px;
}

ul.menu li a:hover {
  color: rgb(0, 108, 240);
  transition: color 300ms linear;
}

.horizontal {
  height: 0.2em;
  width: 100%;
  display: block;
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: -4px 3px 0px 0px rgb(0 0 0 / 20%);
}

img.laptop {
  width: 100%;
}

.idiom {
  text-align: left;
  line-height: 28px;
  letter-spacing: 0px;
  font-size: 19px;
}

.let-start {
  display: inline-block;
  background-color: rgb(249, 253, 255);
  color: #0b0b0b;
  text-align: center;
  padding: 13px;
  border-radius: 5px;
  box-shadow: -4px 4px 0px 0px rgb(0 0 0 / 20%);
  font-weight: bold;
  font-family: Arial;
  font-size: 17px !important;
  white-space: nowrap;
  line-height: 18px;
  letter-spacing: 0px;
  font-weight: 700;
  border: none;
}

.sticky {
  position: fixed !important;
  top: 0;
  left: 0;
  transition: all 2s;
  box-shadow: -4px 3px 0px 0px rgb(0 0 0 / 20%);
  background-color: rgb(10, 103, 175);
  display: flex;
  justify-content: center;
  z-index: 1000;
}

.sticky>div {
  margin-bottom: 0 !important;
  width: 90%;
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
  border: 1px solid rgb(146, 146, 146);
  border-radius: 5px;
  font-weight: 600;
}

.sidebar .groups {
  height: 70%;
  overflow: auto;
  text-align: left;
}

.sidebar .groups button {
  text-align: left;
}

.avatar {
  width: 26px;
  height: 26px;
  display: inline-block;
  margin-right: 5px;
}

.avatar img {
  width: 100%;
  border-radius: 13px;
}
.all-groups {
  /* background-color: #EFF4FA; */
}

.all-groups h3 {
  line-height: 26px;
  font-weight: 600;
  font-size: 32px;
  font-family: sans-serif;
  color: #1e2d26;
}

.more a,
.more svg {
  color: black;
  font-size: 20px;
  font-weight: 700;
  /* background-color: #096d52; */
}

.mentors {
  margin-top: 30px;
  padding: 30px 30px 0px 30px;
  position: relative;
}

.mentors .bg {
  position: absolute;
  top: 120px;
  left: -65px;
  width: 60%;
  height: 75%;
  background-color: #bcceddea;
  /* background-color: #effaf4; */
  z-index: -10000;
}

.mentors h3 {
  line-height: 36px;
  font-weight: 700;
  font-size: 40px;
  font-family: sans-serif;
  color: #273044;
}

.mentors .a {
  font-size: 16px;
  color: #5a5e65;
  line-height: 20px;
}

.mentor-item {
  padding: 60px 20% 0 12%;
  z-index: 10;
}

.mentor-item>div {
  /* padding: 2px; */
}

.mentor-item .up {
  height: 450px;

  /* background-color: red; */
}

.mentor-item .up-right,
.mentors .up-left {
  height: 100%;
  width: 50%;
  padding: 2px;
}

.mentor-item .up-right>div:first-child {
  padding-bottom: 2px;
}

.mentor-item .up-right-item {
  height: 50%;
}

.mentors .more {
  position: absolute;
  bottom: 0;
  right: -40px;
}

.notification {
  position: fixed;
  bottom: 0;
  right: 20px;
  border-radius: 3px 3px 0 0;
  transition: all .4s;
  overflow: hidden;
  width: 130px;
  height: 40px;
  z-index: 10000;
  box-shadow: 0 0 7px 0 #999;
  background-color: rgb(216, 224, 231);

}

.notification .search {
  display: inline-block;
  color: black;
  width: 400px;
  text-align: center;
}

.notification .search input {
  margin: 5px;
  margin-right: 0;
  width: 70%;
  display: inline-block;
  border-radius: 4px 0 0 4px !important;
}

.notification .search button {
  border-radius: 0 4px 4px 0;
  margin-bottom: 3px;
  height: 34px;
  padding: 0 9px;
  display: inline-block;
  border-left: 1px solid rgb(223, 223, 223) !important;
  color: black;
}

.notification .search button:hover svg {
  color: rgb(7, 30, 95)
}

.notification .noti-mess {
  color: red;
}

.notification .bell {
  border: none;
  width: 130px;
  height: 40px;
  color: black;
  background-color: rgb(216, 224, 231);
}

.notiShow {
  height: 420px;
  width: 600px;
}

.inter {
  position: relative;
}

.notiShow .close {
  position: absolute;
  top: 3px;
  right: 3px;
  font-weight: bold;
  font-size: 30px;
  color: black;
}

.notiShow .noti-content {
  color: black;
  height: 400px;
  overflow: auto;
  background-color: rgb(255, 255, 255);
}

.noti-item p {
  margin: 0;
}

.noti-item .time {
  margin: 0 0 5px;
  /* color: #aaa; */
  color: red;
  font-size: 13px;
  font-weight: 600;
  display: inline-block;
}

.noti-item .title {
  margin: 0 0 5px;
  color: #003eff;
  font-weight: 600;
  font-size: 15px;
  display: inline-block;
  padding-left: 5px;
}

.noti-item .des {
  font-size: 15px;
  padding-left: 20px;
}

.loading>>>div {
  margin: auto;
}

.find-mentors {
  background-image: url("assets/mentor.jpg");
  margin-top: 100px;
}

.find-mentors .container {
  padding: 130px 0;
}

.find-mentors .item:nth-child(2n) {
  background-color: white;
}

.content h2 {
  font-family: 'Quicksand';
  line-height: 60px;
  font-weight: 700;
  font-size: 45px;
  color: #ffffff;
  text-align: center;
  padding: 50px 100px;
}

.content .more {
  border: 1.5px solid white;
  padding: 15px 50px;
  color: white;
  border-radius: 4px;
  font-weight: 400;
  font-size: larger;
  transition: all .3s;
}

.content .more:hover {
  background-color: white;
  color: rgb(56, 56, 56);

}

.self-study .content h2 {
  color: #0e1928;
  padding: 50px 0 20px 0;
  text-align: left;
  line-height: 52px;
}

.self-study .content p {
  font-size: 18px;
  line-height: 32px;
  color: #848484;
}

.self-study .content .more {
  border-color: black;
  color: black;
}

.self-study .content .more {
  border-color: transparent;
  background-color: #3075a9;
  color: white;
}

.self-study .content .more:hover {
  background-color: #668eb0;
}

.self-study .img {
  height: 300px;
  width: 100%;
  background-color: red;
  margin-top: 10%;
  overflow: hidden;
  border-radius: 10px;
}

.self-study img {
  width: 100%;
}
.full-intro {
  padding-top: 80px;
  padding-bottom: 80px;
}
.intro {
  width: 70%;
  margin: auto;
}
.back {
  height: 300px;
}
</style>
