<template>
    <div>
      <BCol class="ps-4 col-auto">
        <NuxtLink to="/dashboard">
          <h2>Study With Us</h2>
        </NuxtLink>
      </BCol>
      <div class="menu">
        <div>
          <p>
            <!-- <BIconChevronDown />  -->
          </p>
          <button
            class="i1"
            :class="`${route.path.substring(21, 23)}`"
            @click="navigateTo(`/my-account/groups/${route.params.id}`)"
          >
            <BIconPersonFill /> Thông tin nhóm học
          </button>
          <button
            class="i2"
            :class="`${route.path.substring(21, 23)}`"
            @click="navigateTo(`/my-account/groups/${route.params.id}/members`)"
          >
            <BIconPencilSquare /> Thành viên
          </button>
          <button
            class="i8"
            :class="`${route.path.substring(21, 23)}`"
            @click="navigateTo(`/my-account/groups/${route.params.id}/qa`)"
          >
            <BIconPersonVideo3 /> Trò chuyện
          </button>
        </div>
        <!-- <div>
                  <p>
                      <BIconChevronDown /> 
                  </p>
                  <button class="i3" :class="`${route.path.substring(19,28)}`" @click="navigateTo('/my-account/groups/is-member')">
                      <BIconPeopleFill /> Nhóm là thành viên
                  </button>
                  <button class="i4" :class="`${route.path.substring(19,28)}`" @click="navigateTo('/my-account/groups/is-mentor')">
                      <BIconPersonVideo3 /> Nhóm là mentor
                  </button>
              </div>
              <div>
                  <p>
                      <BIconChevronDown /> Yêu cầu chờ duyệt
                  </p>
                  <button class="i5" :class="`${route.path.substring(19,37)}`" @click="navigateTo('/my-account/groups/request-create-group')">
                      <BIconPlusCircle /> Nhu cầu tạo nhóm
                  </button>
                  <button class="i6" :class="`${route.path.substring(19,37)}`" @click="navigateTo('/my-account/groups/request-is-member')">
                      <BIconPeopleFill /> Yêu cầu là thành viên
                  </button>
                  <button class="i7" :class="`${route.path.substring(19,37)}`" @click="navigateTo('/my-account/groups/request-is-mentor')">
                      <BIconPersonVideo3 /> Yêu cầu là mentor
                  </button>
              </div> -->
      </div>
    </div>
  </template>
  <script setup>
  import {
    BIconPencilSquare,
    BIconPersonFill,
    BIconPersonVideo3,
  } from 'bootstrap-icons-vue'
  import '@fontsource/love-ya-like-a-sister'
  const route = useRoute()
  const a = () => {
    console.log(route.path.substring(21, 23))
  }
  a()
  </script>
  
  <style scoped>
  h2 {
    font-family: 'Love Ya Like A Sister';
    display: block;
    min-width: 20px;
  }
  * {
    color: rgb(0, 0, 0);
  }
  .menu {
    padding: 15px 15px 15px 0;
  }
  
  .i1,
  .i2.me,
  .i8.qa {
    background-color: #d3e3fd !important;
  }
  
  .i1.me,
  .i1.qa {
    background-color: transparent !important;
  }
  
  .menu > div p {
    margin-top: 20px;
    margin-bottom: 5px;
    font-weight: 600;
    padding-left: 15px;
  }
  
  .menu > div > button {
    border-radius: 0 12px 12px 0;
    padding: 4px 4px 4px 15px;
    color: rgb(0, 0, 0);
    display: block;
    width: 100%;
    text-align: left;
    border: none;
    background-color: transparent;
  }
  
  .menu > div > button:hover {
    background-color: rgb(230, 230, 230);
  }
  
  svg {
    font-size: 13px;
    margin-right: 10px;
  }
  </style>