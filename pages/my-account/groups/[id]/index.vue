<template>
  <div class="group-infor">
    <BContainer>
      <BRow class="d-flex justify-content-between">
        <BCol class="col-auto"> </BCol>
        <ul class="col col-auto d-flex menu mb-1 mt-1">

          <li class="text-decoration-none d-block">
            <NuxtLink :to="`/my-account/groups/${group.id}`">
              THÔNG TIN NHÓM HỌC
            </NuxtLink>
          </li>
          <li class="text-decoration-none d-block">
            <NuxtLink :to="`/my-account/groups/${group.id}#qa`">
              HỎI ĐÁP
            </NuxtLink>
          </li>
          <li class="text-decoration-none d-block">
            <NuxtLink :to="`/my-account/groups/${group.id}#rate`"> ĐÁNH GIÁ </NuxtLink>
          </li>
          <li class="text-decoration-none d-block" @click="navigateTo('/my-account')">
            <NuxtLink to="/my-account" class="user">
              <div class="avatar">
                <img src="/assets/user.png" alt="" />
              </div>
            </NuxtLink>
          </li>
        </ul>
      </BRow>
      <BRow>
        <BCol class="infor">
          <h4 class="pt-3">{{ group.subject }}</h4>
          <p class="faculty">Khoa {{ group.faculty }}</p>
          <div class="pt-4">
            <p class="topic">
              <span> Mục đích chính của nhóm: </span>
              {{ group.topic }}
            </p>
            <p class="information pb-5">
              <span>Mục tiêu muốn đạt được sau khóa học:</span>
              {{ group.information }}
            </p>
          </div>
        </BCol>
      </BRow>
    </BContainer>
  </div>
  <BContainer v-if="route.hash === ''" class="pb-5 group-infor-content">
    <BRow class="mt-3">
      <BCol>
        <h6>Người hướng dẫn</h6>
        <p class="mb-0 member-name ps-3"> {{ group.mentorAccepted.full_name }}
        </p>
        <p class="faculty faculty2">
          Khoa {{ group.mentorAccepted.faculty }}
        </p>
        <h6><span>Thành viên hiện có:</span> {{ group.quantity }} thành viên</h6>
        <div v-for="(member, index) in group.membersAccepted" :key="member.id" class="mt-2">

          <p class="mb-0 member-name">{{ index + 1 }}. {{ member.full_name }}
          </p>
          <p class="faculty faculty2">
            Khoa {{ member.faculty }}
          </p>
        </div>
        <div class="group-detail">
          <h6>Thông tin chi tiết của nhóm</h6>
          <p v-if="group.self_study === 0">
            <span>Là nhóm có người hướng dẫn</span>
          </p>
          <p v-else>
            <span>Là nhóm tự học, không có người hướng dẫn</span>
          </p>
          <p>
            <span>Địa điểm học:</span> {{ group.location_study }}
          </p>
          <p>
            <span>Thời gian học:</span> {{ group.time_study }}
          </p>
        </div>
      </BCol>
    </BRow>
  </BContainer>

  <div v-if="route.hash === '#qa'">
    <div class="full p-4">
      <div>
        <BRow v-for="data in allChat" :key="data.id" class="mb-4 pb-2">
          <BCol class="col-auto mt-2">
            <div class="user-image">
              <img src="/assets/user.png" alt="" />
            </div>
          </BCol>
          <BCol class="qa">
            <div>
              <p class="name">
                {{ data.name }} <span>{{ data.posted_on }}</span>
              </p>
              <p class="mess">
                {{ data.comment }}
              </p>
              <div class="reply">
                <BRow v-for="reply in data.replies" :key="reply.id">
                  <BCol class="col-auto">
                    <BIconArrowReturnRight />
                  </BCol>
                  <BCol>
                    <p class="name">
                      {{ reply.name }} <span>{{ reply.posted_on }}</span>
                    </p>
                    <p class="mess">
                      {{ reply.comment }}
                    </p>
                  </BCol>
                </BRow>
              </div>
              <button v-if="data.id !== showReplyMess" class="arrow-reply" @click="repClick(data)">
                <BIconArrowReturnLeft /> Trả lời
              </button>
              <BRow class="replyMess" :class="`${data.id === showReplyMess}`">
                <BFormInput id="input-live" v-model="replyMess" placeholder="Nhập trả lời" trim class="mt-2 col" />
                <button class="col" @click="sendReplyMess(data.id)">
                  <BIconSend />
                </button>
                <button class="col" @click="showReplyMess = 0">Hủy</button>
              </BRow>
            </div>
          </BCol>
        </BRow>
        <BRow class="newMess">
          <BFormInput id="input-live" v-model="newMess" placeholder="Nhập tin nhắn mới" trim class="mt-2 col" />
          <button class="col col-auto" @click="sendNewMess">
            <BIconSend />
          </button>
        </BRow>
      </div>
    </div>
  </div>
  <BContainer v-if="route.hash === '#rate'" class="pt-5 pb-5">
    <div class="mentor-rate">
      <h5 for="" class="pb-2" v-if="show_rate_mentor">Đánh giá người hướng dẫn:</h5>
      <h5 for="" class="pb-2" v-else>Đánh giá sinh viên trong nhóm:</h5>
      <div v-if="show_rate_mentor">
        <p class="mb-0 member-name"> {{ group.mentorAccepted.full_name }}
        </p>
        <p class="faculty faculty2 ps-0">
          Khoa {{ group.mentorAccepted.faculty }}
        </p>
      </div>
      <div v-else>
        <label for="" class="pt-4">1. Chọn sinh viên muốn đánh giá:</label>
        <select v-model="rate.user_id" class="form-select rate-member" required>
          <option v-for="student in group.membersAccepted" :key="student.id" :value="student.id">
          {{ student.full_name }}
          </option>
        </select>
      </div>
      <label for="" v-if="show_rate_mentor" class="pt-4">1. Những đánh giá, nhận xét bạn dành cho người hướng dẫn trong quá trình hướng dẫn
        học</label>
      <label for="" v-else class="pt-4">2. Những đánh giá, nhận xét bạn dành cho người sinh viên trong quá trình học tập</label>
      <BFormInput id="input-live" v-model="rate.comment" placeholder="Nhập đánh giá" trim class="mt-2" />
      <label for="" class="pt-4" v-if="show_rate_mentor">2. Số điểm bạn đánh giá người hướng dẫn</label>
      <label for="" class="pt-4" v-else>3. Số điểm đánh bạn giá dành cho sinh viên</label>
      <select v-model="rate.rate" class="form-select rate-number" required>
        <option :value="0">0</option>
        <option :value="1">1</option>
        <option :value="2">2</option>
        <option :value="3">3</option>
        <option :value="4">4</option>
        <option :value="5">5</option>
        <option :value="6">6</option>
        <option :value="7">7</option>
        <option :value="8">8</option>
        <option :value="9">9</option>
        <option :value="10">10</option>
      </select>
      <button class="col send-rating" @click="sendRate">
        Gửi đánh giá
      </button>
    </div>
  </BContainer>
</template>

<script setup>
import {
  BIconArrowReturnLeft,
  BIconArrowReturnRight,
  BIconSend,
} from 'bootstrap-icons-vue'
definePageMeta({
  layout: false,
  middleware: 'authenticated',
})

const route = useRoute()
const { errorAlert, successAlert } = useAlert()
const show_rate_mentor = ref(false)
const rate = ref({
  group_id: '',
  user_id: '',
  comment: '',
  rate: 0,
})
const group = ref({
  id: '',
  faculty: '',
  subject: '',
  topic: '',
  information: '',
  quantity: '',
  mentorAccepted: {
    id: '',
    full_name: '',
    faculty: ''
  },
  members: [
    {
      full_name: '',
      faculty: '',
    },
  ],
})
const {
  data: dataGetGroup,
  get: getGroup,
  onFetchResponse: getGroupRes,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(`groups/${route.params.id}`, { immediate: false })
const {
  data: dataPostRate,
  post: postRate,
  onFetchResponse: postRateRes,
  onFetchError: postRateErr,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})('rate', { immediate: false })

getGroup().json().execute()
getGroupRes(() => {
  group.value = dataGetGroup.value.data.group
  rate.value.group_id = dataGetGroup.value.data.group.id;
  getMe().json().execute()
})


const username = ref()
const newMess = ref('')
const replyMess = ref('')
const showReplyMess = ref(1)
const allChat = ref([])
const {
  database: databaseFirebase,
  ref: firebaseRef,
  set,
  onValue,
} = useFirebase()

const {
  data: dataGetMe,
  get: getMe,
  onFetchResponse: getMeResponse,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})('/user', { immediate: false })
getMeResponse(() => {
  username.value = dataGetMe.value.data.full_name
  if(dataGetMe.value.data.account_id !== group.value.mentorAccepted.id) {
    show_rate_mentor.value = true;
    rate.value.user_id = group.value.mentorAccepted.id;
  }
})
postRateRes(() => {
  successAlert('Đánh giá thành công!');
  rate.value.comment = '';
  rate.value.rate = 0;
})
postRateErr(() => {
  errorAlert(dataPostRate.value.meta.error_message)
})
const sendNewMess = () => {
  if (newMess.value !== '') {
    allChat.value = []
    const time = new Date().getTime()
    set(firebaseRef(databaseFirebase, `groups/${route.params.id}/${time}`), {
      id: time,
      name: username.value,
      comment: newMess.value,
      posted_on: new Date().toLocaleString(),
      iduser: '3',
    })
    newMess.value = ''
    // const time = '1671963465011'
    // set(firebaseRef(databaseFirebase, `groups/${route.params.id}/${time}/comment`), newMess.value)
    // newMess.value = ''
  }
}
const sendReplyMess = (id) => {
  if (replyMess.value !== '') {
    allChat.value = []
    const time = new Date().getTime()
    set(
      firebaseRef(
        databaseFirebase,
        `groups/${route.params.id}/${id}/replies/${time}`
      ),
      {
        id: time,
        name: username.value,
        parent: 'adf',
        comment: replyMess.value,
        iduser: 'a',
        posted_on: new Date().toLocaleString(),
        url: 'a',
      }
    )
    replyMess.value = ''
    showReplyMess.value = 0
  }
}
const bb = () => {
  allChat.value = []
  onValue(
    firebaseRef(databaseFirebase, `groups/${route.params.id}`),
    (data) => {
      allChat.value = []
      data.forEach((d) => {
        allChat.value.push(d.val())
      })
    }
  )
}
const repClick = (data) => {
  replyMess.value = ''
  if (showReplyMess.value !== data.id) {
    showReplyMess.value = data.id
  } else {
    showReplyMess.value = 0
  }
}
const sendRate = () => {
  postRate(rate.value).json().execute();
}
onMounted(() => {
  bb()
})
</script>

<style scoped>
select {
  width: 80px;
}
label {
  font-style: italic;
}

.group-detail {
  font-size: 14px;
}

.group-detail span,
form span {
  margin-bottom: 0;
  font-style: italic;
  margin-top: 0;
  color: rgb(0, 0, 0);
  font-weight: 600;
}

form {
  font-size: 14px;
}

.group-detail p {
  margin-bottom: 10px;
}

h6 {
  font-size: 16px;
  line-height: 26px;
  margin: 0;
  padding-bottom: 10px !important;
  padding-top: 20px;
  font-weight: 700;
  text-transform: uppercase;
  color: #000000;
  font-family: 'Roboto', sans-serif;
  margin-top: 30px;
}

h6::after {
  content: '';
  display: block;
  background-color: #000000;
  width: 100px;
  height: 5px;
  border-radius: 3px;
  margin-top: 5px;
  margin-bottom: 0px;
}

.group-infor-content p {
  color: rgb(96, 96, 96);
  font-size: 14px;
}

.infor {
  color: white;
  padding-top: 50px;
}

.infor span {
  font-style: normal;
}

.faculty {
  margin-bottom: 0;
  font-size: 14px;
  font-style: italic;
  margin-top: 0;
  color: rgb(207, 207, 207);
}

.faculty2 {
  color: rgb(0, 0, 0);
  padding-left: 20px;
}

.member-name {
  line-height: 22px;
  font-weight: 600;
}

.topic,
.information {
  margin-bottom: 0;
  font-size: 14px;
  font-style: italic;
  margin-top: 0;
  color: rgb(255, 255, 255);
}
.information {
  padding-bottom: 30px;
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


h4 {
  font-weight: 700;
  text-transform: uppercase;
  display: inline-block;
  vertical-align: middle;
  color: #fff;
  position: relative;
}

h5:first-child {
  font-size: 20px;
  color: rgb(0, 0, 0);
  text-transform: uppercase;
  font-weight: 600;
}

.group-infor {
  background-image: url('assets/laptop.jpg');
  background-color: rgb(96, 139, 141);
  background-repeat: none;
  background-size: 100%;
  color: white;
  padding-top: 20px;
}

.group-infor a {
  color: rgb(255, 255, 255);
}




label span {
  display: block;
  font-size: 13px;
  padding-bottom: 10px;
  color: rgb(87, 87, 87);
}

.full {
  background-color: #efefef;
  min-height: 50vh;
  position: relative;
  padding-bottom: 70px !important;
}

.replyMess {
  padding: 0 0 0 40px;
}

.replyMess button {
  display: inline-block;
  width: auto;
}

.replyMess input {
  display: inline-block;
  width: 88%;
}

.qa>div>p {
  color: rgb(1, 1, 118);
}

.reply>div {
  padding-left: 40px;
  padding-top: 0px;
}

.reply>div>div:first-child {
  padding-top: 5px;
}

.reply>div>div {
  padding: 0px;
}
.reply p {
  font-size: 13.5px !important;
}
.qa .true {
  display: block;
}

.qa .false {
  display: none;
}

button {
  border: none;
  background-color: transparent;
}

.qa .arrow-reply:hover {
  color: rgb(17, 17, 190);
}

.qa .arrow-reply:hover svg {
  color: rgb(17, 17, 190);
}

.qa {
  background-color: white;
  padding-bottom: 10px;
  border-radius: 5px;
  -webkit-box-shadow: 9px 9px 14px -13px rgba(110, 110, 110, 1);
  -moz-box-shadow: 9px 9px 14px -13px rgba(110, 110, 110, 1);
  box-shadow: 9px 9px 14px -13px rgba(110, 110, 110, 1);
}

.qa .name {
  font-weight: 600;
  padding: 10px;
  font-size: 15px;
  padding-bottom: 0;
}

.qa .name span,
.qa .arrow-reply {
  font-size: 14px;
  font-weight: 200;
  color: rgb(93, 93, 93);
  padding-left: 10px;
}

.qa .mess {
  padding: 10px;
  padding-top: 0;
}

p {
  margin-bottom: 0 !important;
}

.newMess {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  padding: 20px;
  padding-left: 65px;
  background-color: #efefef;
  padding-top: 20px;
  border-top: 0.5px solid rgb(235, 235, 235);
}

.user-image {
  width: 35px;
  height: 35px;
  margin-left: 5px;
  margin-right: 5px;
  display: inline-block;
}

.user-image img {
  width: 100%;
  border-radius: 60px;
}
.send-rating {
  border: 1px solid rgb(174, 174, 174);
  border-radius: 3px;
  padding: 3px 30px;
  background-color: #dedede;
  margin-left: auto;
  display: block;
  margin-top: 20px;
}
select.rate-number {
  margin-top: 10px;
  height: 35px;
}
select.rate-member {
  width: 50%;
  margin-top: 10px;
}
</style>