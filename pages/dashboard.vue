<template>
  <div>
    <BContainer fluid class="top-dashboard">
      <BContainer>
        <BRow>
          <BCol>
            <BRow class="d-flex justify-content-between mt-1">
              <BCol class="col-auto">
                <span class="contact"> Contact us on <a href="#">0 800 123 4567</a> or <a href="https://dut.udn.vn/">dut.udn.vn</a></span>
              </BCol>
              <ul class="col col-auto d-flex login" v-if="dataGetMe === null">
                <li class="d-flex register">
                  <NuxtLink class="text-decoration-none d-block" to="/register"> Register </NuxtLink>
                </li>
                <li class="d-flex">
                  <NuxtLink class="text-decoration-none d-block" to="/login"> Login </NuxtLink>
                </li>
              </ul>
              <BCol v-else class="col-auto">
                <div @click="sidebarShow=!sidebarShow">
                  <div class="avatar">
                    <img src="assets/user.png" alt="">
                  </div>
                  <a href="#" class="user">{{user.fullname}}</a>
                </div>
                <div class="sidebar" :class="{sidebarShow: !sidebarShow}">
                  <button @click="sidebarShow=false">
                    <BIconX class="close"/>
                  </button>
                  <NuxtLink to="/user" class="mt-2 mb-4 user-infor d-block">
                    <div class="user-image">
                      <img src="assets/user.png" alt="">
                    </div>
                    Xem trang cá nhân
                  </NuxtLink>
                  <h5 class="m-3 text-end">Your groups</h5>
                  <div class="groups ms-3">
                    <button
                      v-for="group in dataGetMyGroups" :key="group.id"
                      class="mt-3 d-block"
                      @click="navigateTo(`/groups/${group.id}`)" 
                      
                    >
                      <BIconPeopleFill  class="me-2"/>
                      <span style="background-color: transparent" class="pt-2">{{ group.name }}</span>
                  </button>
                  </div>
                </div>
              </BCol>
            </BRow>
            <BRow class=" mt-3 mb-3 d-flex justify-content-between">
              <BCol class="col-auto">
                <NuxtLink to="/dashboard">
                  <h1>Study With Us</h1>
                </NuxtLink>
              </BCol>
              <ul class="col col-auto d-flex menu mb-1 mt-1">
                <li class="text-decoration-none d-block">
                  <NuxtLink to="/dashboard">
                    HOMEPAGE
                  </NuxtLink>
                </li>
                <li class="text-decoration-none d-block">
                  <NuxtLink to="/dashboard">
                    GROUPS
                  </NuxtLink>
                </li>
                <li class="text-decoration-none d-block">
                  <NuxtLink to="/dashboard">
                    FIND MENTOR
                  </NuxtLink>
                </li>
                <li class="text-decoration-none d-block">
                  <NuxtLink to="/dashboard">
                    MENTORS
                  </NuxtLink>
                </li>
                <li class="text-decoration-none d-block">
                  <NuxtLink to="/dashboard">
                    NOTIFICATIONS
                  </NuxtLink>
                </li>
              </ul>
            </BRow>
            <BRow v-if="sticky">
              <BCol :class="{sticky: sticky}">
                <BRow class=" mt-2 mb-2 d-flex justify-content-between">
                  <BCol class="col-auto">
                    <NuxtLink to="/dashboard">
                      <h2>Study With Us</h2>
                    </NuxtLink>
                  </BCol>
                  <ul class="col col-auto d-flex menu mb-1">
                    <li class="text-decoration-none d-block">
                      <NuxtLink to="/dashboard">
                        HOMEPAGE
                      </NuxtLink>
                    </li>
                    <li class="text-decoration-none d-block">
                      <NuxtLink to="/dashboard">
                        GROUPS
                      </NuxtLink>
                    </li>
                    <li class="text-decoration-none d-block">
                      <NuxtLink to="/dashboard">
                        FIND MENTOR
                      </NuxtLink>
                    </li>
                    <li class="text-decoration-none d-block">
                      <NuxtLink to="/dashboard">
                        MENTORS
                      </NuxtLink>
                    </li>
                    <li class="text-decoration-none d-block">
                      <NuxtLink to="/dashboard">
                        NOTIFICATIONS
                      </NuxtLink>
                    </li>
                  </ul>
                </BRow>
              </BCol>
            </BRow>
            <BRow>
              <BCol>
                <span class="horizontal"></span>
              </BCol>
            </BRow>
          </BCol>
        </BRow>
        <BRow class="mt-5">
          <BCol>
          </BCol>
          <BCol class=" header-content col-12 col-md-6">
            <BRow class="mb-5">
              <h2 class="col slogan"> Together we can change the world </h2>
            </BRow>
            <BRow class="mb-4">
              <p class="col idiom text-end"> If we do not plant knowledge when young, it will give us no shade when we are old</p>
            </BRow>
            <BRow class="">
              <BCol>
                <button @click="scrollWin" class="let-start"> Let's get started </button>
              </BCol>
            </BRow>
          </BCol>
        </BRow>
      </BContainer>
    </BContainer>
    <BContainer class="mt-5 mb-4">
      <BRow class="how-to-work pt-3 pb-4">
          <BCol>
            <BRow class="text-center mb-5">
              <h2>How to join?</h2>
            </BRow>
            <BRow class="d-flex justify-content-between three-ways">
              <BCol class="text-center col-12 col-md-4" v-for="intro in intros" :key="intro.id">
                <Intro :intro="intro" />
              </BCol>
            </BRow>
          </BCol>
        </BRow>
    </BContainer>
    <BContainer fluid class="all-groups pt-5 pb-4">
        <h3 class="ms-3">Top groups</h3>
        <BRow class="ms-1 me-1 mb-4">
          <BCol class="col-6 col-md-3 mt-4" v-for="group in topGroup" :key="group.id">
            <GroupCard
              :group="group"
            />
          </BCol>
        </BRow>
        <div class="text-end me-1 to-groups">
          <NuxtLink to="groups">
            Xem tất cả <BIconArrowRight />
          </NuxtLink>
        </div>
    </BContainer>
    <p>sdfasd</p>
    <p>sdfasd</p>
    <p>sdfasd</p>
    <p>sdfasd</p>
    <p>sdfasd</p>
  </div>
</template>
<script setup>
import "@fontsource/love-ya-like-a-sister";
import {BIconX, BIconPeopleFill, BIconArrowRight} from 'bootstrap-icons-vue';
definePageMeta({
  layout: false,
});
const sticky = ref(false);
const sidebarShow = ref(false);
const intros = ref([
  {
    title: 'Sign up group',
    content: 'Bạn đang cảm thấy khó khăn với một môn học và cần sự giúp đỡ của các anh, chị để được cải thiện, hãy đăng ký nhu cầu tạo nhóm học để nhà trường xem xét nhé',
    img: 'intro1.png',
  },
  {
    title: 'Join to group',
    content: 'Những nhóm bên dưới là những nhóm đã được nhà trường xem xét, bạn cũng cảm thấy chưa tốt môn đó thì join vào cùng học với mọi người nhé',
    img: 'intro2.png',
  },
  {
    title: 'Sign up to be a mentor',
    content: 'Những nhóm đã được nhà trường xem xét bên dưới đang thiếu mentor đấy, nếu bạn học tốt và đạt điểm cao môn đó thì đăng ký làm mentor nhóm nhé',
    img: 'intro3.png',
  }
])
const userId = ref({
  user_id: '',
});
const user = ref({
  id: '',
  fullname: '',
});
const topGroup = ref([
]);
const {
  data: dataGetMe,
  get: getMe,
  onFetchResponse: getMeResponse,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(
  '/users/me',
  {immediate: false},
  );
const {url: url1} = useUrl({
  path: '/groups',
  queryParams: userId.value,
});
const {url: url2} = useUrl({
  path: '/groups',
  queryParams: {
    isAccept: 'true'
  },
});
const {
  data: dataGetMyGroups,
  get: getGroups,
  onFetchResponse: getGroupsResponse,
  onFetchError: getGroupsError,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(
  url1,
  {immediate: false},
);
const {
  data: dataGetTopGroup,
  get: getTopGroup,
  onFetchResponse: getTopGroupResponse
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(
  url2,
  {immediate: false},
);
getTopGroup().json().execute();
getTopGroupResponse(()=> {
  topGroup.value = dataGetTopGroup.value.slice(0, 4);
})
getMe().json().execute();
getMeResponse(() => {
  user.value = dataGetMe.value;
  userId.value.user_id = dataGetMe.value.id;
  getGroups().json().execute();
});

// Set sticky menu
window.document.body.onscroll = function() {
  if(window.scrollY > 150) {
    sticky.value = true;
  }
  else {
    sidebarShow.value = false;
    sticky.value = false;
  }
};
const scrollWin = () => {
  window.scrollTo(0, 570);
}
</script>
<style scoped>

.top-dashboard h1, .top-dashboard h2, .top-dashboard h3 {
  font-family: "Love Ya Like A Sister";
}
.top-dashboard h2{
  display: block;
  min-width: 20px;
}
.header-content {
  text-align: right;
  margin-top: 45px;
}

h1 {
  margin: 0px;
  color: #ffffff;
}
h5 {
  color: rgb(36, 125, 67);
}
.top-dashboard {
  background-image: url("assets/background9.png");
  background-repeat: none;
  background-size: 100%;
  min-height:  615px;
  color: white;
  position: relative;
}

.top-dashboard a{
  color: white;
}
.top-dashboard:after {
    content : "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity : 0.2;
    z-index: -1;
}
ul.login {
  padding-right: 0px;
}
ul.login li>a {
  background-color: #148063a1;
  padding: 5px 15px;
  margin-right: 5px;
  border-radius: 0 0 4px 4px;
  box-shadow: -4px 3px 0px 0px rgb(0 0 0 / 20%);
  font-size: small;
}
a.user {
  margin-right: 8px;
  font-size: small;
  color: rgb(0, 74, 36);
}
span.contact {
  font-size: small;
  color: rgb(225, 225, 225);
}
span.contact a {
  color: rgb(3, 104, 25);
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
  color: #096d52;
  transition: color 300ms linear;
}
.horizontal {
  height: 0.2em;
  width: 100%;
  display: block;
  background-color:#ffffff;
  border-radius: 5px;
  box-shadow: -4px 3px 0px 0px rgb(0 0 0 / 20%);
}
img.laptop {
  width: 100%;
}
.idiom {
  text-align: left;
  line-height: 25px;
  letter-spacing: 0px;
  font-size: 19px;
}
.let-start {
  display: inline-block;
  background-color: #cbf8eb;;
  color: rgb(34, 107, 71);
  text-align: center;
  padding: 15px;
  border-radius: 5px;
  box-shadow: -4px 4px 0px 0px rgb(0 0 0 / 20%);
  font-weight: bold;
  font-family: Arial;
  white-space: nowrap; 
  line-height: 18px;
  letter-spacing: 0px;
  font-weight: 700;
  font-size: 18px;
  border: none;
}
.sticky {
  position: fixed !important;
  top: 0;
  left: 0;
  transition: all 2s;
  box-shadow: -4px 3px 0px 0px rgb(0 0 0 / 20%);
  background-color: #148063;
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
  right:0px;
  background-color: rgba(58, 65, 62, 0.977);
  height: 100vh;
  width: 50vh;
  transition: all 200ms linear;
}
.sidebar span {
  color: white;
}
.sidebar svg {
  color: rgb(36, 125, 67);
}
.sidebarShow {
  right:-50vh;
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
  background-color: black;
  margin: 10px;
  padding: 10px;
  border-radius: 5px;
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
.how-to-work h2{
  line-height: 46px;
  font-weight: 700;
  font-size: 40px;
  font-family: sans-serif;
  color: #273044;
}
.all-groups {
  background-color: #eff4fa;
}
.all-groups h3 {
  line-height: 36px;
  font-weight: 700;
  font-size: 35px;
  font-family: sans-serif;
  color: #273044;
}
.to-groups a, .to-groups svg {
  color: black;
  font-size: 20px;
  font-weight: 700;
  /* background-color: #096d52; */
}
</style>
