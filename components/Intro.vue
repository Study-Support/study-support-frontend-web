<template>
  <div class="a">
    <BRow class="d-flex justify-content-around">
      <BCol>
        <div class="img">
          <img :src="`${intros[0].img}`" alt="" />
        </div>
        <NuxtLink :to="{ path: intros[0].to.path, query: intros[0].to.query }">
          <h3>{{ intros[0].title }}</h3>
        </NuxtLink>
        <h6>
          {{ intros[0].content }}
        </h6>
      </BCol>
      <BCol>
        <div class="img">
          <img :src="`${intros[1].img}`" alt="" />
        </div>
        <NuxtLink :to="{ path: intros[1].to.path, query: intros[1].to.query }">
          <h3>{{ intros[1].title }}</h3>
        </NuxtLink>
        <h6>
          {{ intros[1].content }}
        </h6>
      </BCol>
      <BCol>
        <div class="img">
          <img :src="`${intros[2].img}`" alt="" />
        </div>
        <NuxtLink :to="{ path: intros[2].to.path, query: intros[2].to.query }">
          <h3>{{ intros[2].title }}</h3>
        </NuxtLink>
        <h6>
          {{ intros[2].content }}
        </h6>
      </BCol>
    </BRow>
  </div>
</template>
<script setup>
const { getConfig } = useConfig();
const intros = ref([
  {
    title: 'Đăng ký nhu cầu',
    content: 'Bạn cần sự giúp đỡ của các anh, chị để được cải thiện môn học hoặc nhóm để cùng nhau học tập, hãy đăng ký nhu cầu tạo nhóm học.',
    img: 'https://firebasestorage.googleapis.com/v0/b/nuxt3-firestore-33ccb.appspot.com/o/for-fontend%2Fintro1.png?alt=media&token=6da81474-88d0-4657-a07a-63814abaa346',
    to: {
      path: 'groups/create',
      query: '',
    }
  },
  {
    title: 'Tham gia nhóm',
    content: 'Nhóm học là nhóm sẽ có người hướng dẫn. Nhóm tự học có thể là nhóm nghiên cứu khoa học, học nhóm... không có người hướng dẫn.',
    img: 'https://firebasestorage.googleapis.com/v0/b/nuxt3-firestore-33ccb.appspot.com/o/for-fontend%2Fintro2.png?alt=media&token=b33d15d4-161f-4725-921f-65b108a6a2da',
    to: {
      path: 'groups',
      query: {
        type: getConfig('constants.typeOfGroup.all')
      }
    }
  },
  {
    title: 'Là người hướng dẫn',
    content: 'Những nhóm ở mục tìm người hướng dẫn, nếu bạn học tốt và đạt điểm cao môn đó thì đăng ký nhé',
    img: 'https://firebasestorage.googleapis.com/v0/b/nuxt3-firestore-33ccb.appspot.com/o/for-fontend%2Fintro3.png?alt=media&token=bc98236a-2d1a-481b-829c-ec1877a9180e',
    to: {
      path: 'groups',
      query: {
        type: getConfig('constants.typeOfGroup.findMentor')
      },
    }
  }
])
</script>
<style scoped>
h3 {
  font-weight: 700;
  font-size: 18px;
  margin-bottom: 5px;
  text-transform: uppercase;
  color: #062f88;
}

h6 {
  font-size: 13px;
  color: rgba(39, 48, 68, 0.7);
  line-height: 20px;
  /* padding: 20px; */
}

.img {
  width: 80px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 15px !important;
  margin-top: -60px;
}

img {
  width: 100%;
}
.col {
  background-color: #f3f9ffea;
  margin: 0 10px;
  text-align: center;
  padding: 20px;
}
.a {
  width: 100%;
}
</style>