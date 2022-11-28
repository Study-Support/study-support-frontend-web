<template>
  <div class="full">
    <div class="header">
      <div class="img">
        <button class="back-button" @click="router.go(-1);">
          <BIconArrowLeft />
        </button>
      </div>
      <div class="form">
        <BContainer class="register">
          <h4 class=" pb-2" v-if="!isSuccess">Đăng ký nhu cầu tạo nhóm học</h4>
          <h4 class=" pb-2 success" v-else>Đăng ký nhu cầu tạo nhóm học đã thực hiện thành công!</h4>
          <p>Đăng ký sẽ được nhà trường xem xét thông tin và duyệt nếu nhóm học thực sự cần thiết và nội dung đảm bảo.
            Chú ý kiểm tra email để nắm thông tin. Nếu nhóm được duyệt, với tư cách là người tạo nhóm bạn sẽ duyệt thành viên đăng ký tham gia nhóm. Bạn có thể chỉnh
            sửa hoặc xóa yêu cầu trước khi nhà
            trường thực hiện duyệt.</p>
          <form @submit.prevent="submit" class="row" v-if="!isSuccess">
            <BCol>
              <BRow>
                <label class="title">1. Chọn môn học bạn muốn đăng ký học</label>
                <BCol>
                  <label for="">Chọn khoa</label>
                  <select v-model="faculty.faculty_id" class="form-select col" required>
                    <option value="" disabled selected>Khoa của bạn</option>
                    <option v-for="faculty in faculties" :key="faculty.id" :value="faculty.id">
                      {{ faculty.name }}
                    </option>
                  </select>
                </BCol>
                <BCol>
                  <label for="">Chọn môn học</label>
                  <select v-model="data.subject_id" class="form-select col" required>
                    <option value="" disabled selected>Chọn môn học</option>
                    <option v-for="subject in subjects" :key="subject.id" :value="subject.id">
                      {{ subject.name }}
                    </option>
                  </select>
                </BCol>
                <BFormGroup>
                  <label for="">Bạn muốn nhóm thuộc loại nào?</label>
                  <BFormRadio v-model="data.self_study" :aria-describedby="ariaDescribedby" name="some-radios"
                    value=0>
                    Nhóm có người hướng dẫn
                  </BFormRadio>
                  <BFormRadio v-model="data.self_study" :aria-describedby="ariaDescribedby" name="some-radios"
                    value=1>
                    Nhóm tự học
                  </BFormRadio>
                </BFormGroup>
              </BRow>
              <BRow>
                <label class="title">2. Thông tin nhóm học</label>
                <BCol>
                  <div role="group">
                    <label for="">Mục đích tạo nhóm học?</label>
                    <BFormInput v-model="data.topic" :state="validationErrorMessages.topic === undefined ? null : false"
                      aria-describedby="input-live-help input-live-feedback" placeholder="Mục đích nhóm học" trim required
                      class="" />
                    <BFormInvalidFeedback>
                      <ValidationErrorMessage :messages="validationErrorMessages.topic" />
                    </BFormInvalidFeedback>
                  </div>
                  <div role="group">
                    <label for="">Thông tin cụ thể về những gì mà bạn muốn học, mục tiêu sau khi kết
                      thúc khóa
                      học?</label>
                    <BFormTextarea v-model="data.information"
                      :state="validationErrorMessages.information === undefined ? null : false"
                      aria-describedby="input-live-help input-live-feedback" placeholder="Thông tin cụ thể" trim required />
                    <BFormInvalidFeedback>
                      <ValidationErrorMessage :messages="validationErrorMessages.information" />
                    </BFormInvalidFeedback>
                  </div>
                  <div role="group">
                    <label for="">Mô tả về thời gian học?</label>
                    <BFormTextarea v-model="data.time_study"
                      :state="validationErrorMessages.time_study === undefined ? null : false"
                      aria-describedby="input-live-help input-live-feedback" placeholder="Thời gian" trim required />
                    <BFormInvalidFeedback>
                      <ValidationErrorMessage :messages="validationErrorMessages.time_study" />
                    </BFormInvalidFeedback>
                  </div>
                  <div role="group">
                    <label for="">Mô tả về địa điểm học?</label>
                    <BFormTextarea v-model="data.location_study"
                      :state="validationErrorMessages.location_study === undefined ? null : false"
                      aria-describedby="input-live-help input-live-feedback" placeholder="Địa điểm" trim required />
                    <BFormInvalidFeedback>
                      <ValidationErrorMessage :messages="validationErrorMessages.location_study" />
                    </BFormInvalidFeedback>
                  </div>
                  <div class="survey_questions">
                    <label for="">Tạo câu hỏi dùng để duyệt thành viên đăng ký tham gia vào nhóm:</label>
                    <button @click.prevent="add_question" class="add">Thêm câu hỏi</button>
                    <div v-for="(questions, index) in data.survey_questions" :key="questions" class="mt-3">
                      Câu hỏi số {{index + 1}}: <button @click.prevent="del(index)" class="del">
                          Xóa
                        </button>
                      <BFormInput v-model="questions.question"
                        aria-describedby="input-live-help input-live-feedback" placeholder="câu hỏi" trim required
                        class="" />
                    </div>
                  </div>
                  <div role="group">
                    <label for="">Bạn có đảm bảo sẽ học tập chăm chỉ, nghiêm túc không? Nếu đánh giá
                      không tốt về thái
                      độ trong quá trình học, nhà trường sẽ đánh giá rèn luyện vì thái độ học
                      tập</label>
                    <BFormCheckbox id="checkbox-1" v-model="data.confirm" name="checkbox-1" value="agreed"
                      unchecked-value="not_agreed">
                      Đảm bảo
                    </BFormCheckbox>
                    <span class="confirm-error" v-if="showConfirmError">Bạn phải đảm bảo thông tin
                      trên!</span>
                  </div>
                </BCol>
              </BRow>
            </BCol>
            <div class="text-end">
              <SubmitButton class="mt-3 submit-button" :isDisabled="isDisabledButton" :content="'Đăng ký tham gia'"
                :color="'rgb(63 88 120)'" />
            </div>
          </form>
        </BContainer>
      </div>
    </div>
  </div>
</template>
  
<script setup>
import { BIconArrowLeft } from 'bootstrap-icons-vue';
definePageMeta({
  layout: false,
});

const router = useRouter();
const config = useConfig();
const { errorAlert } = useAlert();
const isDisabledButton = ref(false);
const showConfirmError = ref(false);
const isSuccess = ref(false);
const data = ref({
  information: '',
  topic: '',
  time_study: '',
  location_study: '',
  confirm: 'not_agreed',
  self_study: 1,
  faculty_id: '',
  subject_id: '',
  survey_questions: [
  ]
})
const validationErrorMessages = ref({
});

const faculty = ref({
  faculty_id: ''
})
const faculties = ref([]);
const subjects = ref([]);


// Tạo url môn học theo khoa
const { url: url1 } = useUrl({
  path: '/subjects',
  queryParams: faculty.value,
});
const {
  data: dataFaculty,
  get: getFaculty,
  onFetchResponse: getFacultyResponse,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: true,
})(
  '/faculties',
  { immediate: false },
);
const {
  data: dataSubject,
  get: getSubject,
  onFetchResponse: getSubjectResponse,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: true,
})(
  url1,
  { immediate: false },
);

const {
  data: dataCreateGroup,
  post: postCreateGroup,
  onFetchResponse: postCreateGroupResponse,
  onFetchError: postCreateGroupError,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: true,
})(
  '/groups',
  { immediate: false },
);

const {
  data: dataGetMe,
  get: getMe,
  onFetchResponse: getMeResponse,
  onFetchError: getMeError,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(
  '/user',
  { immediate: false },
);
// Lấy thông tin cá nhân
getMe().json().execute();
getMeResponse(() => {
  faculty.value.faculty_id = dataGetMe.value.data.faculty_id;
})

getFaculty().json().execute();
getFacultyResponse(() => {
  faculties.value = dataFaculty.value.data.data;
})
getSubjectResponse(() => {
  subjects.value = dataSubject.value.data;
})
// Xử lý tạo group
postCreateGroupResponse(() => {
  isDisabledButton.value = false;
  isSuccess.value = true;
})
postCreateGroupError(() => {
  isDisabledButton.value = false;
  errorAlert(dataCreateGroup.value.meta.error_message);
})
watch(faculty.value, () => {
  getSubject().json().execute();
  data.value.faculty_id = faculty.value.faculty_id;
});
const submit = () => {
  isDisabledButton.value = true;
  showConfirmError.value = false;
  if (data.value.confirm !== 'agreed') {
    showConfirmError.value = true;
    isDisabledButton.value = false;
  } else {
    postCreateGroup(data.value).json().execute();
  }
}
const add_question = () => {
  data.value.survey_questions.push({question: ''});
}
const del = (index) => {
  data.value.survey_questions.splice(index, 1);
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

.submit-button>>>button {
  width: 200px;
}

form>div {
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
.survey_questions button{
  border: none;
  background-color: transparent;
  text-decoration: underline;
}
</style>
  