<template>
  <BContainer class="pt-3">
    <BRow>
      <BCol class="pb-4">
        <h5>
          <BIconChevronRight />
          <BIconChevronRight /> Đăng ký là người hướng dẫn của nhóm
        </h5>
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
        <p class="topic">
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
        <p class="quantity">
          <span>Thành viên:</span> {{ group.quantity }} thành viên
        </p>
        <div v-for="(member, index) in group.membersAccepted" :key="member.id">
          <p class="mb-0">
            {{ index + 1 }}. {{ member.full_name }} _ Khoa: {{ member.faculty }}
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
                v-for="(questions, index) in registerInform.data"
                :key="questions.id"
              >
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
            <div v-if="statusShow === 2" class="">
              <div
                v-for="(questions, index) in registerInform.myAnswers"
                :key="questions.id"
              >
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
  layout: 'page',
  middleware: 'authenticated',
})
const route = useRoute()
const isDisabledButton = ref(false)
const showConfirmError = ref(false)
const { errorAlert, successAlert } = useAlert()
const statusShow = ref(0)
const beforeSubjectShow = ref(0)
const myAnswers = ref([])
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
})
const validationErrorMessages = ref({})
const {
  data: dataGetGroup,
  get: getGroup,
  onFetchResponse: getGroupRes,
  onFetchError: getGroupErr,
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
// Lấy mentor_infor
const {
  data: dataMentorInfor,
  get: getMentorInfor,
  onFetchResponse: getMentorInforResponse,
  onFetchError: getMentorInforError,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})('/mentor', { immediate: false })
const a = () => {
  console.log('asdf')
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
    console.log('ad')
    getMentorInfor().json().execute()
  }
  // if (group.value.status === 2) {
  // }
  // else {
  //   alert("Nhóm hiện không tìm người hướng dẫn!");
  //   navigateTo('/groups?type=all');
  // }
})
getMentorInforResponse(() => {
  dataMentorInfor.value.data.data.subjects.map((subject) => {
    if (subject.id === group.value.subject_id) {
      if (subject.active === 1) {
        // Đã đk môn này r đc accept r
        beforeSubjectShow.value = 1
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
      answers: [
        { id: 47, content: 'a', answer: 'aa' },
        { id: 48, content: 'b', answer: 'aa' },
      ],
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
      answer: [
        { id: 7, content: 'a', answer: 'aa' },
        { id: 8, content: 'b', answer: 'aa' },
      ],
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
  font-size: 30px;
  font-weight: 700;
  color: rgb(0, 13, 154);
}

h5 {
  font-size: 22px;
  color: rgb(6, 101, 138);
  font-weight: 600;
}

h5:last-child {
  font-size: 20px;
  color: rgb(6, 101, 138);
  font-weight: 100;
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
}
</style>
