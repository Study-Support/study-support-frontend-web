<template>
  <div class="full">
    <BContainer fluid>
      <div class="rating">
        <h5>Thông tin của bạn làm mentor</h5>
        <div role="group">
          <label for="">Tài khoản ngân hàng
          </label>
          <BFormInput v-model="infor.smart_banking"
            :state="validationErrorMessages.smart_banking === undefined ? null : false"
            aria-describedby="input-live-help input-live-feedback" placeholder="Tài khoản ngân hàng" required
            class="" />
          <BFormInvalidFeedback>
            <ValidationErrorMessage :messages="validationErrorMessages.smart_banking" />
          </BFormInvalidFeedback>
        </div>
        <div class="accept mt-3">
          <label for="">Môn học bạn đã được duyệt làm mentor bởi nhà trường.
            <span>Bạn có thể đăng ký làm mentor cho các nhóm của môn học dưới mà không cần đăng ký lại và chờ duyệt
              thông tin thành tích môn học (Nhưng vẫn phải xem xét kế hoạch học tập cho nhóm mới duyệt bạn làm mentor
              cho nhóm)</span>
          </label>
          <div v-for="(accept, index) in infor.accepts" :key="accept.id">
            <p>{{ index + 1 }}. {{ accept.subject }}</p>
            <p>{{ accept.faculty }}</p>
            <a :href="{ path: `${accept.cv_link}` }">Link thành tích</a>
          </div>
        </div>
        <div class="accept mt-3">
          <label for="">Môn học bạn đăng ký làm mentor đang đợi duyệt bởi nhà trường.
            <span>Bạn có thể sửa thông tin</span>
          </label>
          <div class="update" :class="{ show: showUpdate }">
            <div role="group" class="update-infor">
              <button class="close" @click="showUpdate = false">
                <BIconX />
              </button>
              <h6>Thông tin của bạn làm mentor</h6>
              <p for=""><span>Môn học:</span> {{ update_cv.subject }}</p>
              <p for=""><span>Khoa:</span> {{ update_cv.faculty }}</p>
              <p for=""><span>Thành tích của môn học: </span></p>
              <BFormInput v-model="update_cv.cv_lick"
                :state="validationErrorMessages.cv_link === undefined ? null : false"
                aria-describedby="input-live-help input-live-feedback" placeholder="Link thành tích" required
                class="" />
              <BFormInvalidFeedback>
                <ValidationErrorMessage :messages="validationErrorMessages.cv_link" />
              </BFormInvalidFeedback>
              <BRow class="text-end">
                <SubmitButton class="col col-auto mt-3 ms-auto submit-button" :isDisabled="isDisabledButton"
                  :content="'Chỉnh sửa'" :color="'rgb(23 131 27)'" @click.prevent="update" />
              </BRow>
            </div>
          </div>
          <div v-for="(request, index) in infor.requests" :key="request.id">
            <p>{{index + 1 }}.{{request.subject}}</p>
            <p>{{request.faculty}}</p>
            <a :href="{ path: `${request.cv_link}` }">Link thành tích</a> 
            <span @click.prevent="update(request)"><BIconPencilSquare/></span>
          </div>
        </div>
      </div>
    </BContainer>
  </div>
</template>
    
<script setup>
import { BIconX, BIconPencilSquare } from 'bootstrap-icons-vue';

definePageMeta({
  layout: 'logout-page',
  middleware: 'authenticated',
});
const showUpdate = ref(false);
const infor = ref({
  smart_banking: '',
  accepts: [

  ],
  requests: [

  ]
})
const update_cv = ref({
  subject_id: '',
  faculty_id: '',
  subject: 'Toan',
  faculty: 'Công nghệ thông tin',
  cv_link: '',
})
const validationErrorMessages = ref({
});
// Lấy mentor_infor
const {
  data: dataMentorInfor,
  get: getMentorInfor,
  onFetchResponse: getMentorInforResponse,
  onFetchError: getMentorInforError,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(
  '/user/mentor-infor',
  { immediate: false },
);
getMentorInfor().json().execute();
getMentorInforResponse(() => {
  infor.value = dataMentorInfor.value.data;
  console.log(infor.value)
})

const update = (a) => {
  showUpdate.value = true;
  update_cv.value = a;
}

</script>
<style scoped>
.full {
  padding: 10px;
}

h5 {
  font-size: 28px;
  text-align: center;
}

h6 {
  font-size: 22px;
  text-align: center;
  font-weight: 600;
}

.name {
  font-weight: 600;
  margin: 0;
}

.content {
  font-size: 13px;
}

label span {
  display: block;
  font-size: 13px;
  padding-bottom: 10px;
  color: rgb(87, 87, 87);
  font-weight: 100;
}

label {
  font-weight: 600;
  font-size: 17px;
}

.accept>div {
  margin-bottom: 10px;
}

.accept>div p,
.accept a {
  margin: 0;
  padding-left: 20px;
  font-size: 12px;
}

.accept>div p:first-child {
  padding-left: 0;
  font-size: 15px;
}

.update {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(224, 224, 224, 0.461);
}

.update-infor {
  background-color: rgb(194, 206, 206);
  width: 500px;
  height: 250px;
  padding: 10px;
  margin: auto;
  align-content: center;
  position: relative;
}

.update-infor .close {
  position: absolute;
  top: 0px;
  right: 0px;
  font-weight: bold;
  font-size: 25px;
  background-color: transparent;
  border: none;
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
</style>
  