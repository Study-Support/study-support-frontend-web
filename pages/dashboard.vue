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
                <li class="d-flex register">
                  <NuxtLink class="text-decoration-none d-block" to="/exchanges/expense"> Register </NuxtLink>
                  <!-- <div class="register-form">
                    <a href="#" class="popup-close">
                      <BIconX class="x-close"/>
                    </a>
                    <form action="">
                      <div role="group">
                        <BFormInput
                          aria-describedby="input-live-help input-live-feedback"
                          placeholder="Họ và tên"
                          trim
                          required
                          class="mt-2"
                        />
                        <BFormInvalidFeedback>
                          <ValidationErrorMessage :messages="validationErrorMessages.fullname" />
                        </BFormInvalidFeedback>
                      </div>
                    </form>
                  </div> -->
                </li>
                <li class="d-flex login">
                  <NuxtLink class="text-decoration-none d-block" to="/exchanges/expense"> Login </NuxtLink>
                </li>
              </ul>
              <!-- <BCol class="">
                
              </BCol> -->
            </BRow>
            <BRow>
              <BCol :class="{sticky: sticky}">
                <BRow class=" mt-3 mb-3 d-flex justify-content-between">
                  <BCol class="col-auto">
                    <NuxtLink to="/dashboard">
                      <!-- <img src="assets/logo_dark.png" alt=""> -->
                      <h1>Study With Us</h1>
                    </NuxtLink>
                  </BCol>
                  <ul class="col col-auto d-flex menu">
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
          <BCol class="ms-5">
            <BRow class="mb-5">
              <h2 class="col col-9 slogan"> Together we can change the world </h2>
            </BRow>
            <BRow class="mb-4">
              <p class="col col-10 idiom"> Being ignorant is not so much a shame, as being unwilling to learn</p>
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
import {BIconX} from 'bootstrap-icons-vue';
definePageMeta({
  layout: false,
});
const sticky = ref(false);
window.document.body.onscroll = function() {
  console.log(window.scrollY);
  if(window.scrollY > 170) {
    sticky.value = true;
  }
  if(window.scrollY < 100) {
    sticky.value = false;
  }
}
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
    /* background-image: url("assets/background.png"); */
    width: 100%;
    height: 100%;
    opacity : 0.2;
    z-index: -1;
}
ul.login li>a {
  background-color: #148063a1;
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
  background-color: white;
  border-radius: 5px;
  box-shadow: -4px 3px 0px 0px rgb(0 0 0 / 20%);
}
img.laptop {
  width: 100%;
}
.slogan {
  /* color: #65e0aa; */
}
.idiom {
  text-align: left;
  line-height: 25px;
  letter-spacing: 0px;
  font-size: 19px;
}
.let-start {
  display: inline-block;
  background-color: white;
  color: rgb(7, 109, 53);
  /* width: 200px; */
  text-align: center;
  padding: 20px;
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
  transition: transform 2s;
  box-shadow: -4px 3px 0px 0px rgb(0 0 0 / 20%);
  background-color: #018763;
  display: flex;
  justify-content: center;
}
.sticky>div {
  margin-bottom: 0 !important;
  width: 90%;
}
.register {
  position: relative;
}
.register-form {
  position: absolute;
  top: 3em;
  right: -3.85em;;
  padding: 3em 2.5em 2em;
  background-color: red;
  width: 37.5em;
}
.popup-close {
  display: block;
  font-size: 1.25em;
  line-height: 1em;
  width: 1em;
  height: 1em;
  position: absolute;
  right: 0;
  top: 0;
  margin: 0.5em 0.5em 0 0;
  text-align: center;
  border-radius: 3px;
  background-color: #f4f7f9;
}
.x-close {
  color: #ccc;
  display: block;
}
/* .popup-close:before {
    font-family: 'fontello';
    content: '\e8ac';
    line-height: 1em;
    padding: 0 !important;
    margin: 0 !important;
} */
</style>
