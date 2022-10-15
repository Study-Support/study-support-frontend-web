<template>
  <div>
    <BContainer fluid class="top-dashboard">
      <BContainer class="a">
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
                      v-for="group in dataGetGroups" :key="group.id"
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
          <BCol class="">
          </BCol>
          <BCol class="ms-5 header-content">
            <BRow class="mb-5">
              <h2 class="col slogan"> Together we can change the world </h2>
            </BRow>
            <BRow class="mb-4">
              <p class="col idiom text-end"> If we do not plant knowledge when young, it will give us no shade when we are old</p>
            </BRow>
            <BRow class="">
              <BCol>
                <span class="let-start"> Let's get started </span>
              </BCol>
            </BRow>
          </BCol>
        </BRow>
      </BContainer>
    </BContainer>
    <BContainer class="mt-5 mb-5">
      <BRow class="how-to-work pt-3 pb-4">
          <BCol>
            <BRow class="text-center mb-5">
              <h2>How to join?</h2>
            </BRow>
            <BRow class="d-flex justify-content-between three-ways">
              <BCol class="text-center col-md-4">
                <div class="img m-auto">
                  <img src="assets/ways/25-layers.png" alt=""/>
                </div>
                <NuxtLink to="groups/create">
                  <h3>Sign up group</h3>
                </NuxtLink>
                <h6>Bạn đang cảm thấy khó khăn với một môn học và cần sự giúp đỡ của các anh, chị để được cải thiện, hãy đăng ký nhu cầu tạo nhóm học để nhà trường xem xét nhé
                </h6>
              </BCol>
              <BCol class="text-center col-md-4">
                <div class="img m-auto">
                  <img src="assets/ways/21-layers.png" alt=""/>
                </div>
                <NuxtLink to="/groups">
                  <h3>Join to group</h3>
                </NuxtLink>
                <h6>
                  Những nhóm bên dưới là những nhóm đã được nhà trường xem xét, bạn cũng cảm thấy chưa tốt môn đó thì join vào cùng học với mọi người nhé
                </h6>
              </BCol>
              <BCol class="text-center col-md-4">
                <div class="img m-auto">
                  <img src="assets/ways/28-layers.png" alt=""/>
                </div>
                <NuxtLink to="/mentors/create">
                  <h3>Sign up to be a mentor</h3>
                </NuxtLink>
                <h6>
                  Những nhóm đã được nhà trường xem xét bên dưới đang thiếu mentor đấy, nếu bạn học tốt và đạt điểm cao môn đó thì đăng ký làm mentor nhóm nhé
                </h6>
              </BCol>
            </BRow>
          </BCol>
        </BRow>
    </BContainer>
    <BContainer fluid class="all-groups">
        <h3 class="pt-5 pb-4">Top groups</h3>
        <BRow>
          <BCol>
            <GroupCard />
          </BCol>
          <BCol>
            <GroupCard />
          </BCol>
          <BCol>
            <GroupCard />
          </BCol>
          <BCol>
            <GroupCard />
          </BCol>
        </BRow>
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
import {BIconX, BIconPeopleFill} from 'bootstrap-icons-vue';
definePageMeta({
  layout: false,
});
const sticky = ref(false);
const sidebarShow = ref(false);
const user = ref({
  fullname: '',
})
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
const {
  data: dataGetGroups,
  get: getGroups,
  onFetchResponse: getGroupsResponse,
  onFetchError: getGroupsError,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(
  '/groups',
  {immediate: false},
);
getMe().json().execute();
getMeResponse(() => {
  user.value = dataGetMe.value;
});
getGroups().json().execute();

// Set sticky menu
window.document.body.onscroll = function() {
  console.log(window.scrollY);
  if(window.scrollY > 150) {
    sticky.value = true;
  }
  else {
    sidebarShow.value = false;
    sticky.value = false;
  }
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
  background-image: url("assets/background.png");
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
  /* -webkit-transition: background-color 1000ms linear;
  -ms-transition: background-color 1000ms linear; */
  transition: color 300ms linear;
}
.horizontal {
  height: 0.2em;
  width: 100%;
  display: block;
  background-color:#e7fff5;
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
  /* color: rgb(7, 109, 53); */
  color: rgb(34, 107, 71);
  /* width: 200px; */
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
  transition: all 250ms linear;
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
.how-to-work h3 {
  font-weight: 700;
  font-size: 24px;
  margin-bottom: 5px;
  color:#273044;
}
.how-to-work h6 {
  font-size: 15px;
  color: rgba(39,48,68,0.7);
  line-height: 27px;
  padding: 20px;
}
.there-ways>div {
}
.three-ways .img {
  width: 150px;
  margin-bottom: 15px !important;
}
.three-ways img {
  width: 100%;
}
.all-groups {
  background-color: #eff4fa;
}
.all-groups h3 {
  line-height: 36px;
  font-weight: 700;
  font-size: 40px;
  font-family: sans-serif;
  color: #273044;
}

</style>
