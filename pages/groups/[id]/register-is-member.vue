<template>
  <div class="group-infor">
    <BContainer>
      <BRow class="d-flex justify-content-between">
        <BCol class="col-auto"> </BCol>
        <ul class="col col-auto d-flex menu mb-1 mt-1">
          <li class="text-decoration-none d-block">
            <a href="/dashboard"> TRANG CHỦ </a>
          </li>
          <li class="text-decoration-none d-block">
            <a href="/groups?type=all">
              NHÓM HỌC
          </a>
          </li>
          <li class="text-decoration-none d-block">
            <a href="/groups?type=2">
              TÌM HƯỚNG DẪN
            </a>
          </li>
          <li class="text-decoration-none d-block">
            <a href="/mentors"> NGƯỜI HƯỚNG DẪN </a>
          </li>
          <li class="text-decoration-none d-block" @click="navigateTo('/my-account')">
            <a href="/my-account" class="user">
              <div class="avatar">
                <img src="/assets/user.png" alt="" />
              </div>
            </a>
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
            <p class="information">
              <span>Mục tiêu muốn đạt được sau khóa học:</span>
              {{ group.information }}
            </p>
          </div>
        </BCol>
      </BRow>
    </BContainer>
  </div>
  <BContainer>

    <BRow class="mt-3">
      <BCol>
        <h6 class="pb-4"><span>Thành viên hiện có:</span> {{ group.quantity }} thành viên</h6>
        <!-- <p><span>1. Thành viên hiện có:</span> {{ group.quantity }} thành viên</p> -->
        <div v-for="(member, index) in group.membersAccepted" :key="member.id" class="mt-2">
          
          <p class="mb-0 member-name">{{index + 1}}. {{ member.full_name }}
          </p>
          <p class="faculty faculty2">
            Khoa {{ member.faculty }}
          </p>
        </div>
        <div class="group-detail">
          <h6 class="pb-4 pt-4">Thông tin chi tiết của nhóm</h6>
          <p v-if="group.self_study === 0">
            <span>Là nhóm có người hướng dẫn</span> 
          </p>
          <p v-else>
            <span>Là nhóm tự học, không có người hướng dẫn</span> 
          </p>
          <p>
            <span>Địa điểm học:</span> {{group.location_study}}
          </p>
          <p>
            <span>Thời gian học:</span> {{group.time_study}}
          </p>
        </div>

        <div class="mt-5 register">
          <h5 class="text-center pb-3" for="">
            Thông tin kiểm duyệt đăng ký thành viên
          </h5>
          <p v-if="statusShow === 2" class="notice-success mb-2">
            <span>Bạn đã đăng ký tham gia nhóm học!.</span>
            Nhóm trưởng sẽ xem xét thông tin đăng ký của bạn và thêm bạn vào
            nhóm. Theo dõi email để cập nhật thông tin nhé!
            <span class="pt-4 mb-0">Thông tin đăng ký của bạn:</span>
          </p>
          <form @submit.prevent="submit">
            <div v-if="statusShow === 1" class="survey_questions">
              <div v-for="(questions, index) in group.survey_questions" :key="questions.id" class="pt-2">
                <span>
                  Câu hỏi số {{ index + 1 }}:
                </span> 
                {{ questions.content }}
                <BFormInput v-model="questions.answer" aria-describedby="input-live-help input-live-feedback"
                  placeholder="Câu trả lời" trim required class="" />
              </div>
            </div>
            <div v-if="statusShow === 2" class="survey_questions">
              <div v-for="(questions, index) in myAnswers" :key="questions.id" class="pt-2">
                <span>
                  Câu hỏi số {{ index + 1 }}:
                </span>  
                {{ questions.question }}
                <BFormInput v-model="questions.content" aria-describedby="input-live-help input-live-feedback"
                  placeholder="Câu trả lời" trim required class="" />
              </div>
            </div>

            <div role="group" class="pt-3">
              <label for="">Bạn có đảm bảo sẽ học tập chăm chỉ, nghiêm túc không? Nếu đánh
                giá không tốt về thái độ trong quá trình học, nhà trường sẽ đánh
                giá rèn luyện vì thái độ học tập</label>
              <BFormCheckbox id="checkbox-1" v-model="registerInform.confirm" name="checkbox-1" value="agreed"
                unchecked-value="not_agreed">
                Tôi đảm bảo
              </BFormCheckbox>
              <span v-if="showConfirmError" class="confirm-error">Bạn phải đảm bảo thông tin trên!</span>
            </div>
            <div v-if="statusShow === 1" class="text-end">
              <SubmitButton class="mt-3 submit-button" :is-disabled="isDisabledButton" :content="'Đăng ký tham gia'"
                :color="'rgb(63 88 120)'" />
            </div>
            <div v-if="statusShow === 2" class="text-end">
              <SubmitButton class="mt-3 me-3 submit-button" :is-disabled="isDisabledButton"
                :content="'Chỉnh sửa thông tin'" :color="'rgb(23 131 27)'" @click.prevent="update" />
              <SubmitButton class="mt-3 submit-button" :is-disabled="isDisabledButton" :content="'Hủy đăng ký'"
                :color="'rgb(255 57 57)'" @click.prevent="deletee" />
            </div>
          </form>
        </div>
      </BCol>
    </BRow>
  </BContainer>
</template>

<script setup>
// link đã kiểm tra liệu người dùng đã đăng ký nhóm chưa (Kiểm tra trong list member có user k)
// link đã kiểm tra liệu id nhóm ở link đúng là status là 1_tìm member k
import { BIconPersonFill } from 'bootstrap-icons-vue'
definePageMeta({
  layout: false,
  middleware: 'authenticated',
})
const route = useRoute()
const isDisabledButton = ref(false)
const showConfirmError = ref(false)
const { errorAlert, successAlert } = useAlert()
const { getConfig } = useConfig()

const statusShow = ref(0)
const myAnswers = ref()
const group = ref({
  id: '',
  faculty: '',
  subject: '',
  topic: '',
  information: '',
  quantity: '',
  status: '',
  members: [
    {
      full_name: '',
      faculty: '',
    },
  ],
  survey_questions: [],
})
const registerInform = ref({
  confirm: 'not_agreed',
})

const {
  data: dataGetGroup,
  get: getGroup,
  onFetchResponse: getGroupRes,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(`groups/${route.params.id}`, { immediate: false })

// đăng ký là Member
const {
  data: dataMember,
  post: postMember,
  onFetchResponse: postMemberRes,
  onFetchError: postMemberErr,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(`/groups/${route.params.id}/join`, { immediate: false })
// update Member
const {
  data: dataMemberPut,
  put: putMember,
  onFetchResponse: putMemberRes,
  onFetchError: putMemberErr,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(`/groups/${route.params.id}/join`, { immediate: false })
// Xóa Member
const {
  data: dataMemberdel,
  delete: delMember,
  onFetchResponse: delMemberRes,
  onFetchError: delMemberErr,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(`/groups/${route.params.id}/join`, { immediate: false })

getGroup().json().execute()
getGroupRes(() => {
  group.value = dataGetGroup.value.data.group
  group.value.survey_questions.map((item) => {
    item.answer = ''
  })
  myAnswers.value = dataGetGroup.value.data.myAnswers
  // kiểm tra thực sự nhóm đang tìm Member k hay nhập bừa id
  if (group.value.status === 1) {
    console.log(myAnswers.value)
    if (myAnswers.value.length !== 0) {
      statusShow.value = 2
    } else {
      statusShow.value = 1
    }
  } else {
    alert('Nhóm hiện không tìm sinh viên tham gia học!')
    navigateTo('/groups?type=all')
  }
})

postMemberRes(() => {
  isDisabledButton.value = false
  successAlert('Bạn đã đăng ký thành công!')
  statusShow.value = 2
  getGroup().json().execute()
})
postMemberErr(() => {
  isDisabledButton.value = false
  errorAlert(dataMember.value.meta.error_message)
})

putMemberRes(() => {
  isDisabledButton.value = false
  successAlert('Chỉnh sửa thông tin thành công!')
  group.value.survey_questions = dataMemberPut.value.data.survey_questions
})
putMemberErr(() => {
  isDisabledButton.value = false
  errorAlert(dataMemberPut.value.meta.error_message)
})

delMemberRes(() => {
  isDisabledButton.value = false
  successAlert('Hủy đăng ký thành công!')
  statusShow.value = 1
  registerInform.value.difficult = ''
  registerInform.value.target = ''
  registerInform.value.note = ''
  registerInform.value.confirm = 'not_agreed'
})
delMemberErr(() => {
  isDisabledButton.value = false
  errorAlert(dataMemberdel.value.meta.error_message)
})

const submit = () => {
  isDisabledButton.value = true
  showConfirmError.value = false
  if (registerInform.value.confirm !== 'agreed') {
    showConfirmError.value = true
    isDisabledButton.value = false
  } else {
    postMember({
      answers: group.value.survey_questions,
    })
      .json()
      .execute()
  }
}
const update = () => {
  isDisabledButton.value = true
  showConfirmError.value = false
  if (registerInform.value.confirm !== 'agreed') {
    showConfirmError.value = true
    isDisabledButton.value = false
  } else {
    console.log(myAnswers.value)
    putMember({
      answers: myAnswers.value,
    })
      .json()
      .execute()
  }
}
const deletee = () => {
  isDisabledButton.value = true
  showConfirmError.value = false
  delMember().json().execute()
}
</script>

<style scoped>
label {
  font-style: italic;
}
.group-detail {
  font-size: 14px;
}
.group-detail span, form span{
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
  padding-bottom: 8px;
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
  min-height: 300px;
  color: white;
  padding-top: 20px;
}

.group-infor a {
  color: rgb(255, 255, 255);
}

.register {
  background-color: #edf1f5;
  padding: 20px;
  border-radius: 5px;
  margin-top: 80px !important;
}

.submit-button>>>button {
  width: 200px;
}

.submit-button {
  display: inline-block;
}

form>div {
  margin-top: 10px;
}

.confirm-error {
  color: red;
  font-size: 13px;
}

.notice-success span {
  font-weight: 600;
  color: green;
}

.notice-success span:last-child {
  color: rgb(0, 0, 0);
  display: block;
  font-size: large;
}
</style>
