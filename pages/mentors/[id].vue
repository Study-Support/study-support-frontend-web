<template>
  <div>
    <BContainer>
      <BRow>
        <BCol class="content col-9 mt-5">
          <div class="header">
            <div class="img">
            </div>
            <div class="header-content">
              <div class="number">
                <p class="rating">
                  <BIconPeopleFill />
                  3 nhóm
                </p>
                <p class="rating">
                  <BIconHeartFill />
                  4
                </p>
              </div>
              <div class="invite">
                <button>
                  invite
                </button>
              </div>
            </div>
            <div class="img-center">
              <div class="d-flex">
                <div class="avatar">
                  <img src="/assets/mentors/m1.jpg" alt="">
                </div>
                <div class="name">
                  <h5>HOÀNG THỊ THU NHƯ</h5>
                  <p>Khoa công nghệ thông tin</p>
                </div>
              </div>
              <div class="line">

              </div>
              <div class="back">
                <img src="/assets/mentors/back.png" alt="">
              </div>
            </div>
          </div>
        </BCol>
        <BCol class="sidebar">

        </BCol>
      </BRow>

    </BContainer>
  </div>
</template>
<script setup>
import { BIconPeopleFill, BIconHeartFill } from 'bootstrap-icons-vue';

definePageMeta({
  layout: 'page',
  middleware: 'authenticated',
});

const {
  data: dataMentorsRelate,
  get: getMentorsRelate,
  onFetchResponse: getMentorsRelateResponse,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: true,
})(
  '/faculties',
  { immediate: false },
);
// /groups?search=&faculty=1&type=2&page=0
</script>
<style scoped>
.header {
  border-radius: 15px;
  padding: 13.75px;
  box-shadow: 1px 1px 5px 0 rgb(0 0 0 / 20%);
  position: relative;
}

.img {
  height: 300px;
  background: url('assets/mentors/keyboard.png') no-repeat center center;
  background-size: cover;
  border-radius: 15px;
  overflow: hidden;

}

.header-content {
  padding: 40px 0px 0px 0px;
  display: flex;
  justify-content: space-between;
}

.rating {
  color: rgb(0, 0, 0) !important;
}

.number {
  padding-left: 20px !important;
  display: flex;
  justify-content: space-between;
}

.number p {
  font-size: 15px;
  margin-bottom: 10px !important;
}

svg {
  display: inline-block;
  padding-bottom: 4px;
  margin-right: 2px;
  font-size: 21px;
  color: #63A393 !important;
}

img {
  width: 100%;
}

.invite {
  min-width: 220px;
}

.number {
  min-width: 170px;
}

.invite button {
  background-color: #63A393;
  border: none;
  padding: 3px 30px;
  border-radius: 10px;
  min-width: 100%;
}

.img-center {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}

.img-center .name {
  margin-top: 45px;
  color: white;
  margin-left: 20px;
}

.img-center .name h5 {
  font-weight: 700;
  text-transform: uppercase;
  display: inline-block;
  margin-bottom: 20px;
  vertical-align: middle;
  color: #fff;
  position: relative;
}

.img-center .name p {
  margin-bottom: 0;
  font-size: 14px;
  font-style: italic;
  margin-top: 0;
  color: #fff;
}

.img-center .avatar {
  width: 152px;
  height: 152px;
  background-color: white;
  box-shadow: 0 6px 8px 0 rgb(0 0 0 / 16%), 0 6px 8px 0 rgb(0 0 0 / 16%);
  border: 5px solid #ffffff;
  overflow: hidden;
  cursor: pointer;
  transition: .5s;
  border-radius: 76px;
  margin-left: 40px;
}

.img-center .back {
  width: 180px;
  margin: auto;
  margin-bottom: -10px;
}

.img-center .line {
  height: 4px;
  width: 120px;
  background-color: #63A393;
  margin: auto;
  margin-bottom: 15px;
  border-radius: 2px;
  margin-top: 30px;
}
</style>
   