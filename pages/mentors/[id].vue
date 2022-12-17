<template>
  <div>
    <BContainer>
      <BRow>
        <BCol class="content col-9 mt-5">
          <div class="header">
            <div class="img"></div>
            <div class="header-content">
              <div class="number">
                <p class="rating">
                  <BIconPeopleFill />
                  {{ mentorInfor.group_quantity }} nhóm
                </p>
                <p class="rating">
                  <BIconHeartFill />
                  {{ mentorInfor.rating }}
                </p>
              </div>
              <div class="invite">
                <button @click="showInvite = true">Gửi lời mời</button>
              </div>
            </div>
            <div class="img-center">
              <div class="d-flex">
                <div class="avatar">
                  <img src="/assets/mentors/m1.jpg" alt="" />
                </div>
                <div class="name">
                  <h5>{{ mentorInfor.full_name }}</h5>
                  <p>Khoa {{ mentorInfor.faculty }}</p>
                </div>
              </div>
              <div class="line"></div>
              <div class="back">
                <img src="/assets/mentors/back.png" alt="" />
              </div>
            </div>
          </div>
          <div class="mentor-infor">
            <div class="subject-infor">
              <h6>Hướng dẫn các môn học:</h6>
              <div>
                <p
                  v-for="(subject, index) in mentorInfor.subjects"
                  :key="subject.id"
                >
                  {{ index + 1 }}.
                  {{ subject.name }}
                </p>
              </div>
            </div>
            <div class="subject-infor">
              <h6>Đánh giá của người học:</h6>
              <div>
                <p
                  v-for="(subject, index) in mentorInfor.subjects"
                  :key="subject.id"
                >
                  {{ index + 1 }}.
                  {{ subject.name }}
                </p>
              </div>
            </div>
          </div>
        </BCol>
        <BCol class="sidebar"> </BCol>
      </BRow>
      <div class="update" :class="{ show: showInvite }">
        <div class="update-infor">
          <button class="close" @click="showInvite = false">
            <BIconX />
          </button>
          <form @submit.prevent="invite()">
            <div role="group">
              <BFormInput
                v-model="inviteInfor.inviteLink"
                :state="
                  validationErrorMessages.inviteLink === undefined
                    ? null
                    : false
                "
                aria-describedby="input-live-help input-live-feedback"
                placeholder="Link nhóm mời"
                trim
                required
              />
              <BFormInvalidFeedback>
                <ValidationErrorMessage
                  :messages="validationErrorMessages.inviteLink"
                />
              </BFormInvalidFeedback>
            </div>
            <BRow class="invite-button">
              <button type="submit">Gửi lời mời</button>
            </BRow>
          </form>
        </div>
      </div>
    </BContainer>
  </div>
</template>
<script setup>
import { BIconPeopleFill, BIconHeartFill, BIconX } from 'bootstrap-icons-vue'

definePageMeta({
  layout: false,
  middleware: 'authenticated',
})

const route = useRoute()
const showInvite = ref(false)
const { successAlert } = useAlert()
const inviteInfor = ref({
  inviteLink: '',
  mentor_id: '',
})
const mentorInfor = ref({
  id: '',
  full_name: '',
  image: '',
  faculty: '',
  subjects: [],
  rating: '',
  group_quantity: '',
})
const validationErrorMessages = ref([])
const {
  data: dataMentor,
  get: getMentor,
  onFetchResponse: getMentorResponse,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: true,
})(`mentors/${route.params.id}`, { immediate: false })
getMentor().json().execute()
getMentorResponse(() => {
  mentorInfor.value = dataMentor.value.data
  inviteInfor.value.mentor_id = mentorInfor.value.id
})
const { post: postInvite, onFetchResponse: postInviteResponse } = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: true,
})('/post-invite', { immediate: false })
postInviteResponse(() => {
  showInvite.value = false
  successAlert('Gửi lời mời thành công!')
})

const invite = () => {
  postInvite(inviteInfor.value).json().execute()
  inviteInfor.value.inviteLink = ''
}
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
  color: #1c5991;
}

img {
  width: 100%;
}

.invite {
  min-width: 220px;
  z-index: 10;
}

.number {
  min-width: 170px;
}

.invite button {
  background-color: #7198be;
  border: none;
  padding: 3px 30px;
  border-radius: 10px;
  min-width: 100%;
  /* color: rgb(242, 242, 242); */
}

.img-center {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}

.img-center .name {
  margin-top: 50px;
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
  transition: 0.5s;
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
  background-color: #1c5991;
  margin: auto;
  margin-bottom: 15px;
  border-radius: 2px;
  margin-top: 30px;
}

.update {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(224, 224, 224, 0.461);
  z-index: 1000;
}

.update-infor {
  background-color: rgb(182 209 218);
  width: 400px;
  padding: 10px;
  padding-top: 30px;
  margin: auto;
  align-content: center;
  position: relative;
  border-radius: 5px;
}

.update-infor .close {
  position: absolute;
  top: 0px;
  right: 0px;
  background-color: transparent;
  border: none;
}

.update-infor .close svg {
  color: black;
  font-size: 25px;
  font-weight: bold;
}

.update-infor input {
  width: 96%;
  margin-left: 7px;
}

.update.show {
  display: flex;
}

.update p {
  padding-left: 2px !important;
  margin: 5px !important;
}

.update p span {
  font-size: 15px !important;
  font-weight: 600;
}

.invite-button {
  margin: auto !important;
}

.invite-button button {
  display: inline-block;
  width: 120px;
  margin-left: auto !important;
  border: none;
  background-color: transparent;
  margin-top: 20px;
  text-decoration: underline;
}

.mentor-infor {
  margin-top: 50px;
}

.mentor-infor h6 {
  font-size: 18px;
  line-height: 26px;
  margin: 0;
  padding-bottom: 8px;
  font-weight: 700;
  text-transform: uppercase;
  color: #1c5991;
  font-family: 'Roboto', sans-serif;
  margin-top: 30px;
}

.mentor-infor h6::after {
  content: '';
  display: block;
  background-color: #1c5991;
  width: 100px;
  height: 5px;
  border-radius: 3px;
  margin-top: 5px;
  margin-bottom: 0px;
}

.mentor-infor p {
  line-height: 22px;
  margin-bottom: 0 !important;
  margin-top: 0 !important;
  display: block;
  margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-family: -apple-system, system-ui, BlinkMacSystemFont, segoe ui, Roboto,
    helvetica neue, fira sans, Ubuntu, Oxygen, oxygen sans, Cantarell,
    droid sans, apple color emoji, segoe ui emoji, segoe ui emoji,
    segoe ui symbol, lucida grande, Helvetica, Arial, sans-serif;
  color: #555;
  font-size: 14px;
}
</style>
