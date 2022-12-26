<template>
  <div class="group-infor">
    <BContainer>
      <BRow class="d-flex justify-content-between">
        <BCol class="col-auto"> </BCol>
        <ul class="col col-auto d-flex menu mb-1 mt-1">
          <li class="text-decoration-none d-block">
            <NuxtLink to="/dashboard"> TRANG CHỦ </NuxtLink>
          </li>
          <li class="text-decoration-none d-block">
            <NuxtLink :to="{
              path: '/groups',
              query: { type: getConfig('constants.typeOfGroup.all') },
            }">
              NHÓM HỌC
            </NuxtLink>
          </li>
          <li class="text-decoration-none d-block">
            <NuxtLink :to="{
              path: '/groups',
              query: {
                type: getConfig('constants.typeOfGroup.findMentor'),
              },
            }">
              TÌM HƯỚNG DẪN
            </NuxtLink>
          </li>
          <li class="text-decoration-none d-block">
            <NuxtLink to="/mentors"> NGƯỜI HƯỚNG DẪN </NuxtLink>
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
          <h5 class="text-center mb-3" for="">
            Thông tin kiểm duyệt đăng ký là người hướng dẫn:
          </h5>
          <span class="beforeSubjectShow"
            >Bạn đã đăng ký là người hướng dẫn cho môn học này</span
          >
          <form @submit.prevent="submit">
            <div v-if="statusShow === 1" class="">
              <div
                v-for="(questions, index) in registerInform.answers"
                :key="questions.id"
                class="pt-2"
              >
              <span>
                  Câu hỏi số {{ index + 1 }}:
                </span>{{ questions.content }}
                <BFormInput
                  v-model="questions.answer"
                  aria-describedby="input-live-help input-live-feedback"
                  placeholder="Câu trả lời"
                  trim
                  required
                  class=""
                />
              </div>
            </div>
            <div v-if="statusShow === 2" class="">
              <div
                v-for="(questions, index) in myAnswers"
                :key="questions.id"
                class="pt-2"
              >
              <span>
                  Câu hỏi số {{ index + 1 }}:
                </span> {{ questions.content }}
                <BFormInput
                  v-model="questions.answer"
                  aria-describedby="input-live-help input-live-feedback"
                  placeholder="Câu trả lời"
                  trim
                  required
                  class=""
                />
              </div>
            </div>
            <div role="group">
              <label for=""
                >5. Bạn có đảm bảo sẽ hướng dẫn nghiêm túc, hết sức mình không?
                Nếu đánh giá không tốt về thái độ trong quá trình hướng dẫn, nhà
                trường sẽ đánh giá rèn luyện vì thái độ học tập</label
              >
              <BFormCheckbox
                id="checkbox-1"
                v-model="registerInform.confirm"
                name="checkbox-1"
                value="agreed"
                unchecked-value="not_agreed"
              >
                Tôi đảm bảo
              </BFormCheckbox>
              <span v-if="showConfirmError" class="confirm-error"
                >Bạn phải đảm bảo thông tin trên!</span
              >
            </div>

            <div v-if="statusShow === 1" class="text-end">
              <SubmitButton
                class="mt-3 submit-button"
                :is-disabled="isDisabledButton"
                :content="'Đăng ký tham gia'"
                :color="'rgb(63 88 120)'"
              />
            </div>
            <div v-if="statusShow === 2" class="text-end">
              <SubmitButton
                class="mt-3 me-3 submit-button"
                :is-disabled="isDisabledButton"
                :content="'Chỉnh sửa thông tin'"
                :color="'rgb(23 131 27)'"
                @click.prevent="update"
              />
              <SubmitButton
                class="mt-3 submit-button"
                :is-disabled="isDisabledButton"
                :content="'Hủy đăng ký'"
                :color="'rgb(255 57 57)'"
                @click.prevent="deletee"
              />
            </div>
          </form>
        </div>
      </BCol>
    </BRow>
  </BContainer>
</template>
<script setup>
import { BIconChevronRight } from 'bootstrap-icons-vue'

definePageMeta({
  layout: false,
  middleware: 'authenticated',
})
const route = useRoute()
const { getConfig } = useConfig()
const isDisabledButton = ref(false)
const showConfirmError = ref(false)
const { errorAlert, successAlert } = useAlert()
const statusShow = ref(0)
const beforeSubjectShow = ref(0)
const myAnswers = ref()
const group = ref({
  id: '',
  faculty: '',
  subject: '',
  topic: '',
  information: '',
  quantity: '',
  membersAccepted: [
    {
      full_name: '',
      faculty: '',
    },
  ],
  data: [],
})
const registerInform = ref({
  confirm: 'not_agreed',
  answers: [

  ]
})
const {
  data: dataGetGroup,
  get: getGroup,
  onFetchResponse: getGroupRes,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(`groups/${route.params.id}`, { immediate: false })
// đăng ký là mentor
const {
  data: dataMentor,
  post: postMentor,
  onFetchResponse: postMentorRes,
  onFetchError: postMentorErr,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(`/groups/${route.params.id}/join`, { immediate: false })
// update mentor
const {
  data: dataMentorPut,
  put: putMentor,
  onFetchResponse: putMentorRes,
  onFetchError: putMentorErr,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(`/groups/${route.params.id}/join`, { immediate: false })
// Xóa mentor
const {
  data: dataMentordel,
  delete: delMentor,
  onFetchResponse: delMentorRes,
  onFetchError: delMentorErr,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(`/groups/${route.params.id}/join`, { immediate: false })
// Lấy câu hỏi cho mentor
const {
  data: dataMentorQuestion,
  get: getMentorQuestion,
  onFetchResponse: getMentorQuestionResponse,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})('/mentor-questions', { immediate: false })
// Lấy mentor_infor
const {
  data: dataMentorInfor,
  get: getMentorInfor,
  onFetchResponse: getMentorInforResponse,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})('/mentor', { immediate: false })
const a = () => {
  getGroup().json().execute()
}
a()
getGroupRes(() => {
  group.value = dataGetGroup.value.data.group
  myAnswers.value = dataGetGroup.value.data.myAnswers

  // Kiểm tra đăng ký là mentor cho nhóm này chưa
  if (myAnswers.value.length !== 0) {
    statusShow.value = 2
  } else {
    statusShow.value = 1
    // Chưa đk môn này thì kiểm tra coi có dk môn này chưa
    getMentorInfor().json().execute()
  }

})
getMentorQuestionResponse(() => {
  registerInform.value.answers = dataMentorQuestion.value.data.data
  registerInform.value.answers.map((item) => {
    item.answer = ''
  })
})
getMentorInforResponse(() => {
  dataMentorInfor.value.data.data.subjects.map((subject) => {
    if (subject.subject_id === group.value.subject_id) {
      if (subject.active === 1) {
        // Đã đk môn này r đc accept r
        beforeSubjectShow.value = 1
        // lấy câu hỏi cho mentor đăng ký
        getMentorQuestion().json().execute();
      } else {
        // Đã đk đang đợi duyệt
        beforeSubjectShow.value = 2
      }
    } else {
      // Đã đk đang đợi duyệt
      beforeSubjectShow.value = 3
    }
  })
  if (beforeSubjectShow.value === 2) {
    errorAlert(
      'Đăng ký là người hướng dẫn cho môn học này đang đợi duyệt',
      () => {
        navigateTo('/my-account/mentor-infor')
      }
    )
  } else if (beforeSubjectShow.value === 3) {
    errorAlert('Bạn chưa đăng ký là người hướng dẫn cho môn học này', () => {
      navigateTo('/my-account/mentor-infor?request=create')
    })
  }
})
postMentorRes(() => {
  isDisabledButton.value = false
  successAlert('Bạn đã đăng ký thành công!')
  statusShow.value = 2
  getGroup().json().execute()
})
postMentorErr(() => {
  isDisabledButton.value = false
  errorAlert(dataMentor.value.meta.error_message)
})

putMentorRes(() => {
  isDisabledButton.value = false
  successAlert('Chỉnh sửa thông tin thành công!')
  registerInform.value = dataMentorPut.value.data
})
putMentorErr(() => {
  isDisabledButton.value = false
  errorAlert(dataMentorPut.value.meta.error_message)
})

delMentorRes(() => {
  isDisabledButton.value = false
  successAlert('Hủy đăng ký thành công!')
  statusShow.value = 1
  registerInform.value.confirm = 'not_agreed'
  // getGroup().json().execute();
})
delMentorErr(() => {
  isDisabledButton.value = false
  errorAlert(dataMentordel.value.meta.error_message)
})

const submit = () => {
  isDisabledButton.value = true
  showConfirmError.value = false
  if (registerInform.value.confirm !== 'agreed') {
    showConfirmError.value = true
    isDisabledButton.value = false
  } else {
    postMentor({
      // answers: group.value.data
      answers: registerInform.value.answers
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
    putMentor({
      // answers: group.value.myAnswer
      answers: myAnswers.value,
    })
      .json()
      .execute()
  }
}
const deletee = () => {
  isDisabledButton.value = true
  showConfirmError.value = false
  delMentor().json().execute()
}
</script>
<style scoped>
label {
  font-style: italic;
  margin-top: 20px;
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
  margin-bottom: 7px !important;
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
.submit-button {
  display: inline-block;
}

.submit-button >>> button {
  width: 200px;
}

form > div {
  margin-top: 10px;
}

label span {
  display: block;
  font-size: 13px;
  padding-bottom: 10px;
  color: rgb(87, 87, 87);
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

.quantity span {
  font-weight: 600;
}

.beforeSubjectShow {
  display: block;
  font-size: 13px;
  padding-bottom: 10px;
  color: rgb(0, 0, 0);
  text-align: center;
}
</style>