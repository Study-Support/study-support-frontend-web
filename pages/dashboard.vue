<template>
  <div>
    <BContainer fluid class="top-dashboard">
      <BContainer class="a">
        <BRow>
          <BCol>
            <BRow class="d-flex justify-content-between">
              <BCol class="col-auto">
                <span class="contact"> Contact us on <a href="#">0 800 123 4567</a> or <a href="https://dut.udn.vn/">dut.udn.vn</a></span>
              </BCol>
              <ul class="col col-auto d-flex login">
                <li class="d-flex">
                  <NuxtLink class="text-decoration-none d-block" to="/exchanges/expense"> Register </NuxtLink>
                </li>
                <li class="d-flex">
                  <NuxtLink class="text-decoration-none d-block" to="/exchanges/expense"> Login </NuxtLink>
                </li>
              </ul>
            </BRow>
            <BRow class="mt-3 mb-3 d-flex justify-content-between">
              <BCol class="col-auto">
                <NuxtLink to="/dashboard">
                  <!-- <img src="assets/logo_dark.png" alt=""> -->
                  <h1>Study With Us</h1>
                </NuxtLink>
              </BCol>
              <ul class="col col-auto d-flex menu">
                <li class="text-decoration-none d-block" :style="{'background-color':'#1dbb90'}">HOMEPAGE</li>
                <li class="text-decoration-none d-block">GROUPS</li>
                <li class="text-decoration-none d-block">FIND MENTOR</li>
                <li class="text-decoration-none d-block">MENTORS</li>
                <li class="text-decoration-none d-block">NOTIFICATIONS</li>
              </ul>
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
            <img src="assets/laptop.png" alt="" class="laptop">
          </BCol>
          <BCol class="ms-5">
            <BRow class="mb-5">
              <h2 class="col col-9"> Together we can change the world </h2>
            </BRow>
            <BRow class="mb-4">
              <p class="col col-10"> Study while others are sleeping, work while others are loafing, prepare while others are playing, and dream while others are wishing. </p>
            </BRow>
            <BRow>
              <BCol>
                <span class="let-start"> Let's get started </span>
              </BCol>
            </BRow>
          </BCol>
        </BRow>
      </BContainer>
  </BContainer>
  </div>
</template>
<script setup>
import "@fontsource/love-ya-like-a-sister";
definePageMeta({
  layout: false,
});
const handleScroll = () => {
      // Any code to be executed when the window is scrolled
      this.isUserScrolling = (window.scrollY > 0);
      console.log('calling handleScroll');
}
onMounted(() => {
  this.handleDebouncedScroll = debounce(this.handleScroll, 100);
  window.addEventListener('scroll', this.handleDebouncedScroll);
})
onBeforeDestroy(() => {
  window.removeEventListener('scroll', this.handleDebouncedScroll);
})
</script>
<style scoped>
* {
  color: white;
}
h1, h2 {
  font-family: "Love Ya Like A Sister";
}
h2 {
  display: block;
  min-width: 20px;
}
h1 {
  margin: 0px;
}
.top-dashboard {
  background-image: url("assets/background.png");
  background-repeat: none;
  background-size: 100%;
  min-height:  703px;
}

.top-dashboard {
    position: relative;
}
.top-dashboard:after {
    content : "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    background-image: url("assets/background.jpg");
    width: 100%;
    height: 100%;
    opacity : 0.2;
    z-index: -1;
}
ul.login li a {
  background-color: #1dbb90;
  color:white;
  padding: 5px 15px;
  margin-right: 5px;
  border-radius: 0 0 4px 4px;
  box-shadow: -4px 3px 0px 0px rgb(0 0 0 / 20%);
  font-size: small;
}
span.contact {
  font-size: small;
}
span.contact a {
  color: rgb(171, 171, 171);
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
ul.menu li:first-child {
  box-shadow: -4px 3px 0px 0px rgb(0 0 0 / 20%);
}
ul.menu li:last-child {
  margin-right: 0px;
  padding-right: 0px;
}
ul.menu li:hover {
  box-shadow: -4px 3px 0px 0px rgb(0 0 0 / 20%);
  background-color: #1dbb90;
  /* -webkit-transition: background-color 1000ms linear;
  -ms-transition: background-color 1000ms linear; */
  transition: background-color 300ms linear;
}
.horizontal {
  height: 0.4em;
  width: 100%;
  display: block;
  background-color: white;
  border-radius: 5px;
  box-shadow: -4px 3px 0px 0px rgb(0 0 0 / 20%);
}
img.laptop {
  width: 100%;

}
.let-start {
  display: inline-block;
  background-color: white;
  color: rgb(20,154,189);
  width: 200px;
  text-align: center;
  padding: 10px;
  border-radius: 5px;
  box-shadow: -4px 4px 0px 0px rgb(0 0 0 / 20%);
}
</style>
