<template>
  <div class="full">
    <div class="header">
      <!-- <button class="back-button">
				<BIconArrowLeft />
			</button> -->
      <div class="img">
        
      </div>
      <div class="form">
        <BContainer class="register">
          <h4 class="text-center pb-3" for="">Đăng ký nhu cầu tạo nhóm học</h4>
          <span></span>
          <form @submit.prevent="submit">
            <div>
              <select
                  v-model="faculty_id"
                  class="form-select mt-2"
                  required
                  >
                  <option value="" disabled selected>Khoa của bạn</option>
                  <option v-for="faculty in faculties" :key="faculty.id" :value="faculty.id">
                      {{ faculty.name }}
                  </option>
              </select>
              <select
                  v-model="data.subject_id"
                  class="form-select mt-2"
                  required
                  >
                  <option value="" disabled selected>Chọn môn học</option>
                  <option v-for="subject in subjects" :key="subject.id" :value="subject.id">
                      {{ subject.name }}
                  </option>
              </select>
            </div>
            <div role="group">
              <label for="">Bạn gặp khó khăn gì trong môn học này?</label>
              <BFormTextarea v-model="register_inform.difficult"
                :state="validationErrorMessages.difficult === undefined ? null : false"
                aria-describedby="input-live-help input-live-feedback" placeholder="Khó khăn" trim required class="" />
              <BFormInvalidFeedback>
                <ValidationErrorMessage :messages="validationErrorMessages.difficult" />
              </BFormInvalidFeedback>
            </div>

            <div role="group">
              <label for="">Bạn mong muốn đạt được gì khi tham gia nhóm học?</label>
              <BFormTextarea v-model="register_inform.target"
                :state="validationErrorMessages.target === undefined ? null : false"
                aria-describedby="input-live-help input-live-feedback" placeholder="Mong muốn" trim required class="" />
              <BFormInvalidFeedback>
                <ValidationErrorMessage :messages="validationErrorMessages.target" />
              </BFormInvalidFeedback>
            </div>
            <div role="group">
              <label for="">Bạn có ý kiến gì không muốn gửi không?</label>
              <BFormInput v-model="register_inform.note"
                :state="validationErrorMessages.note === undefined ? null : false"
                aria-describedby="input-live-help input-live-feedback" placeholder="Ý kiến cá nhân" trim required
                class="" />
              <BFormInvalidFeedback>
                <ValidationErrorMessage :messages="validationErrorMessages.note" />
              </BFormInvalidFeedback>
            </div>

            <div role="group">
              <label for="">Bạn phải đảm bảo sẽ học tập chăm chỉ, nghiêm túc không? Nếu đánh giá không tốt về thái độ
                trong
                quá trình học, nhà trường sẽ bị giảm điểm rèn luyện vì thái độ học tập</label>
              <BFormCheckbox id="checkbox-1" v-model="register_inform.confirm" name="checkbox-1" value="agreed"
                unchecked-value="not_agreed">
                Tôi đảm bảo
              </BFormCheckbox>
            </div>

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
const isDisabledButton = ref(false);
const register_inform = ref({
  difficult: '',
  target: '',
  note: '',
  confirm: 'not_agreed',
})
const validationErrorMessages = ref({
});

const faculty_id = ref({
})
const data = ref({
    faculty_id: '',
    subject_id: '',
})
const faculties = ref([]);
const subjects = ref([]);

// Tạo url môn học theo khoa
const {url: url1} = useUrl({
  path: '/subjects',
  queryParams: {
    faculty_id: '2',
  },
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
  {immediate: false},
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
  {immediate: false},
);
getFaculty().json().execute();
getFacultyResponse(() => {
  faculties.value = dataFaculty.value.data.data;
})

getSubject().json().execute();
getSubjectResponse(() => {
  subjects.value = dataSubject.value.data.data;
})

watch(faculty_id, () => {
  data.faculty_id = faculty_id.value;

});
</script>

<style scoped>
.full {
  background-color: #dfe6ec;
}

h4 {
  font-weight: 600;
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

.header{
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
}
</style>
