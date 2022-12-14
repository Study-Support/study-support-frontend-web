<template>
  <BContainer class="pt-3">
    <BRow>
      <BCol class="pb-3">
        <h5>>> Đăng ký là thành viên của nhóm</h5>
      </BCol>
    </BRow>
    <BRow>
      <BCol class="col-4">
        <div class="img">
          <img src="/assets/groups/g1.png" alt="" />
        </div>
      </BCol>
      <BCol class="group-infor">
        <h4 class="pt-3 pb-4">{{ group.subject }}</h4>
        <p><span>Khoa:</span> {{ group.faculty }}</p>
        <p class="title">
          <span> Tóm tắt thông tin: </span>
          {{ group.topic }}
        </p>
        <span>Thông tin chi tiết</span>
        <p class="information">
          {{ group.information }}
        </p>
      </BCol>
    </BRow>
    <BRow class="mt-3">
      <BCol>
        <p><span>Thành viên hiện có:</span> {{ group.quantity }} thành viên</p>
        <div v-for="(member, index) in group.membersAccepted" :key="member.id">
          <p class="mb-0">
            {{ index + 1 }}. {{ member.full_name }} _ Khoa: {{ member.faculty }}
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
              <div
                v-for="(questions, index) in group.survey_questions"
                :key="questions.id"
              >
                Câu hỏi số {{ index + 1 }}: {{ questions.content }}
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
            <div v-if="statusShow === 2" class="survey_questions">
              <div v-for="(questions, index) in myAnswers" :key="questions.id">
                Câu hỏi số {{ index + 1 }}: {{ questions.question }}
                <BFormInput
                  v-model="questions.content"
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
                >Bạn có đảm bảo sẽ học tập chăm chỉ, nghiêm túc không? Nếu đánh
                giá không tốt về thái độ trong quá trình học, nhà trường sẽ đánh
                giá rèn luyện vì thái độ học tập</label
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
// link đã kiểm tra liệu người dùng đã đăng ký nhóm chưa (Kiểm tra trong list member có user k)
// link đã kiểm tra liệu id nhóm ở link đúng là status là 1_tìm member k
definePageMeta({
  layout: 'page',
  middleware: 'authenticated',
})
const route = useRoute()
const isDisabledButton = ref(false)
const showConfirmError = ref(false)
const { errorAlert, successAlert } = useAlert()
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
.img {
  /* background-color: red; */
  height: 250px;
  max-width: 300px;
  border-radius: 3px;
  border: 0.5px solid rgb(172, 172, 172);
}

img {
  width: 100%;
  height: 100%;
}

h4 {
  font-size: 25px;
  font-weight: 700;
  color: rgb(0, 13, 154);
}

h5:first-child {
  font-size: 23px;
  color: rgb(0, 85, 119);
}

h5:last-child {
  font-size: 18px;
  color: rgb(0, 85, 119);
  font-weight: 600;
}

.group-infor span {
  color: rgb(0, 16, 192);
  display: inline-block;
  width: 130px;
}

.register {
  background-color: #dfe6ec;
  padding: 20px;
}

.submit-button >>> button {
  width: 200px;
}

.submit-button {
  display: inline-block;
}

form > div {
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
