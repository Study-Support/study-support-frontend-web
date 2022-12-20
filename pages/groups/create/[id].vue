<template>
  <div class="full">
    <div class="header">
      <div class="img">
        <button class="back-button" @click="navigateTo('/dashboard')">
          <BIconArrowLeft />
        </button>
      </div>
      <div class="form">
        <BContainer class="register">
          <h4 class="pb-2">Đăng ký nhu cầu tạo nhóm học</h4>
          <form class="row" @submit.prevent="submit">
            <BCol>
              <BRow>
                <label class="title"
                  >1. Chọn môn học bạn muốn đăng ký học</label
                >
                <BCol>
                  <label for="">Chọn khoa</label>
                  <select
                    v-model="faculty.faculty_id"
                    class="form-select col"
                    required
                  >
                    <option value="" disabled selected>Khoa của bạn</option>
                    <option
                      v-for="faculty in faculties"
                      :key="faculty.id"
                      :value="faculty.id"
                    >
                      {{ faculty.name }}
                    </option>
                  </select>
                </BCol>
                <BCol>
                  <label for="">Chọn môn học</label>
                  <select
                    v-model="data.subject_id"
                    class="form-select col"
                    required
                  >
                    <option value="" disabled selected>Chọn môn học</option>
                    <option
                      v-for="subject in subjects"
                      :key="subject.id"
                      :value="subject.id"
                    >
                      {{ subject.name }}
                    </option>
                  </select>
                </BCol>
                <BFormGroup>
                  <label for="">Bạn muốn nhóm thuộc loại nào?</label>
                  <BFormRadio
                    v-model="data.self_study"
                    :aria-describedby="ariaDescribedby"
                    name="some-radios"
                    value="0"
                  >
                    Nhóm có người hướng dẫn
                  </BFormRadio>
                  <BFormRadio
                    v-model="data.self_study"
                    :aria-describedby="ariaDescribedby"
                    name="some-radios"
                    value="1"
                  >
                    Nhóm tự học
                  </BFormRadio>
                </BFormGroup>
              </BRow>
              <BRow>
                <label class="title">2. Thông tin nhóm học</label>
                <BCol>
                  <div role="group">
                    <label for="">Mục đích tạo nhóm học?</label>
                    <BFormInput
                      v-model="data.topic"
                      :state="
                        validationErrorMessages.topic === undefined
                          ? null
                          : false
                      "
                      aria-describedby="input-live-help input-live-feedback"
                      placeholder="Mục đích nhóm học"
                      trim
                      required
                      class=""
                    />
                    <BFormInvalidFeedback>
                      <ValidationErrorMessage
                        :messages="validationErrorMessages.topic"
                      />
                    </BFormInvalidFeedback>
                  </div>
                  <div role="group">
                    <label for=""
                      >Thông tin cụ thể về những gì mà bạn muốn học, mục tiêu
                      sau khi kết thúc khóa học?</label
                    >
                    <BFormTextarea
                      v-model="data.information"
                      :state="
                        validationErrorMessages.information === undefined
                          ? null
                          : false
                      "
                      aria-describedby="input-live-help input-live-feedback"
                      placeholder="Thông tin cụ thể"
                      trim
                      required
                    />
                    <BFormInvalidFeedback>
                      <ValidationErrorMessage
                        :messages="validationErrorMessages.information"
                      />
                    </BFormInvalidFeedback>
                  </div>
                  <div role="group">
                    <label for="">Mô tả về thời gian học?</label>
                    <BFormTextarea
                      v-model="data.time_study"
                      :state="
                        validationErrorMessages.time_study === undefined
                          ? null
                          : false
                      "
                      aria-describedby="input-live-help input-live-feedback"
                      placeholder="Thời gian"
                      trim
                      required
                    />
                    <BFormInvalidFeedback>
                      <ValidationErrorMessage
                        :messages="validationErrorMessages.time_study"
                      />
                    </BFormInvalidFeedback>
                  </div>
                  <div role="group">
                    <label for="">Mô tả về địa điểm học?</label>
                    <BFormTextarea
                      v-model="data.location_study"
                      :state="
                        validationErrorMessages.location_study === undefined
                          ? null
                          : false
                      "
                      aria-describedby="input-live-help input-live-feedback"
                      placeholder="Địa điểm"
                      trim
                      required
                    />
                    <BFormInvalidFeedback>
                      <ValidationErrorMessage
                        :messages="validationErrorMessages.location_study"
                      />
                    </BFormInvalidFeedback>
                  </div>

                  <div class="survey_questions">
                    <label for=""
                      >Tạo câu hỏi dùng để duyệt thành viên đăng ký tham gia vào
                      nhóm:</label
                    >
                    <button @click.prevent="addQuestion">Thêm câu hỏi</button>
                    <div
                      v-for="(questions, index) in data.survey_questions"
                      :key="questions.id"
                      class="mt-3"
                    >
                      Câu hỏi số {{ index + 1 }}:
                      <button @click.prevent="del(index)">Xóa</button>
                      <BFormInput
                        v-model="questions.content"
                        aria-describedby="input-live-help input-live-feedback"
                        placeholder="câu hỏi"
                        trim
                        required
                        class=""
                      />
                    </div>
                  </div>

                  <div role="group">
                    <label for=""
                      >Bạn có đảm bảo sẽ học tập chăm chỉ, nghiêm túc không? Nếu
                      đánh giá không tốt về thái độ trong quá trình học, nhà
                      trường sẽ đánh giá rèn luyện vì thái độ học tập</label
                    >
                    <BFormCheckbox
                      id="checkbox-1"
                      v-model="data.confirm"
                      name="checkbox-1"
                      value="agreed"
                      unchecked-value="not_agreed"
                    >
                      Đảm bảo
                    </BFormCheckbox>
                    <span v-if="showConfirmError" class="confirm-error"
                      >Bạn phải đảm bảo thông tin
                    </span>
                  </div>
                </BCol>
              </BRow>
            </BCol>
            <div class="text-end">
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
                :content="'Hủy đăng ký nhu cầu'"
                :color="'rgb(255 57 57)'"
                @click.prevent="deletee"
              />
            </div>
          </form>
        </BContainer>
      </div>
    </div>
  </div>
</template>

<script setup>
import { BIconArrowLeft } from 'bootstrap-icons-vue'
definePageMeta({
  layout: false,
})

const route = useRoute()
const { errorAlert, successAlert } = useAlert()
const isDisabledButton = ref(false)
const showConfirmError = ref(false)
const data = ref({
  information: '',
  topic: '',
  time_study: '',
  location_study: '',
  confirm: 'not_agreed',
  self_study: 0,
  faculty_id: '',
  subject_id: '',
})
const validationErrorMessages = ref({})

const faculty = ref({
  faculty_id: '',
})
const faculties = ref([])
const subjects = ref([])

// Tạo url môn học theo khoa
const { url: url1 } = useUrl({
  path: '/subjects',
  queryParams: faculty.value,
})
const {
  data: dataFaculty,
  get: getFaculty,
  onFetchResponse: getFacultyResponse,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: true,
})('/faculties', { immediate: false })
const {
  data: dataSubject,
  get: getSubject,
  onFetchResponse: getSubjectResponse,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: true,
})(url1, { immediate: false })
// Lấy thông tin group
const {
  data: dataGetGroup,
  get: getGroup,
  onFetchResponse: getGroupRes,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(`groups/${route.params.id}`, { immediate: false })
// sửa thông tin
const {
  data: dataPutCreateGroup,
  put: putCreateGroup,
  onFetchResponse: putCreateGroupResponse,
  onFetchError: putCreateGroupError,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: true,
})(`groups/${route.params.id}`, { immediate: false })
// sửa thông tin
const {
  data: dataDelCreateGroup,
  delete: delCreateGroup,
  onFetchResponse: delCreateGroupResponse,
  onFetchError: delCreateGroupError,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: true,
})(`groups/${route.params.id}`, { immediate: false })

getFaculty().json().execute()
getFacultyResponse(() => {
  faculties.value = dataFaculty.value.data.data
})
getSubjectResponse(() => {
  subjects.value = dataSubject.value.data
})

getGroup().json().execute()
// xử lý thông tin nhóm
getGroupRes(() => {
  // kiểm tra thực sự nhóm đang đợi duyệt không.
  data.value = dataGetGroup.value.data.group
  faculty.value.faculty_id = data.value.faculty_id
  // if (dataGetGroup.value.data.status === 0) {
  //   data.value = dataGetGroup.value.data;
  //   faculty.value.faculty_id = data.value.faculty_id;
  // }
  // else {
  //   alert("Nhóm hiện không đợi duyệt!");
  //   navigateTo('/dashboard');
  // }
})

// Xử lý sửa group
putCreateGroupResponse(() => {
  isDisabledButton.value = false
  successAlert('Chỉnh sửa thông tin thành công!')
})
putCreateGroupError(() => {
  isDisabledButton.value = false
  errorAlert(dataPutCreateGroup.value.meta.error_message)
})

// Xử lý xóa group
delCreateGroupResponse(() => {
  isDisabledButton.value = false
  successAlert('Đã xóa nhu cầu tạo nhóm học!', () => {
    navigateTo('/dashboard')
  })
})
delCreateGroupError(() => {
  isDisabledButton.value = false
  errorAlert(dataDelCreateGroup.value.meta.error_message)
})
watch(faculty.value, () => {
  getSubject().json().execute()
  data.value.faculty_id = faculty.value.faculty_id
})
const update = () => {
  isDisabledButton.value = true
  showConfirmError.value = false
  if (data.value.confirm !== 'agreed') {
    showConfirmError.value = true
    isDisabledButton.value = false
  } else {
    putCreateGroup(data.value).json().execute()
  }
}
const deletee = () => {
  isDisabledButton.value = true
  showConfirmError.value = false
  delCreateGroup().json().execute()
}
const addQuestion = () => {
  data.value.survey_questions.push({
    id: null,
    content: '',
  })
}
const del = (index) => {
  data.value.survey_questions.splice(index, 1)
}
</script>

<style scoped>
.full {
  background-color: #dfe6ec;
}

h4 {
  font-weight: 600;
  font-size: 27px;
}

.register {
  background-color: #ffffff;
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

.header .img {
  height: 40vh;
  overflow: hidden;
  z-index: 1;
  background-image: url('/assets/groups/create.jpg');
}

.header img {
  width: 100%;
}

.back-button {
  margin-left: 20px;
  border: none;
  background-color: transparent;
  font-size: 45px;
  font-weight: 700;
}

.form {
  margin-top: -60px;
  min-height: 60vh;
}

.container {
  padding: 35px;
}

label {
  font-size: 14px;
  color: rgba(0, 123, 49, 0.886);
  padding-left: 2px;
  padding-bottom: 3px;
  margin-top: 15px;
}

label.title {
  font-weight: 600;
  font-size: 16px;
  margin-top: 10px;
  color: black;
}

.confirm-error {
  color: red;
  font-size: 13px;
}

.success {
  color: rgb(0, 179, 0);
}

.survey_questions button {
  border: none;
  background-color: transparent;
  text-decoration: underline;
}
</style>