<template>
  <div class="full">
    <BContainer fluid>
      <div class="rating">
        <BRow role="group">

          <label for="">Tài khoản ngân hàng
          </label>
          <BCol>
            <BFormTextarea v-model="infor.smart_banking"
              :state="validationErrorMessages.smart_banking === undefined ? null : false"
              aria-describedby="input-live-help input-live-feedback" placeholder="Thông tin ngân hàng và số tài khoản"
              trim required />
            <BFormInvalidFeedback>
              <ValidationErrorMessage :messages="validationErrorMessages.smart_banking" />
            </BFormInvalidFeedback>
          </BCol>

          <span @click.prevent="updateSB" class="col col-auto">
            <BIconPencilSquare />
          </span>
        </BRow>
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
            <BIconPlusCircle @click.prevent="create_request" />
            <span>Bạn có thể sửa thông tin</span>
          </label>
          <div class="update" :class="{ show: showUpdate }">
            <div role="group" class="update-infor">
              <button class="close" @click="showUpdate = false">
                <BIconX />
              </button>
              <h6>Thông tin của bạn làm mentor</h6>
              <div class="update_form" v-if="isUpdateNotCreate">
                <p for=""><span>Môn học:</span> {{ update_cv.subject }}</p>
                <p for=""><span>Khoa:</span> {{ update_cv.faculty }}</p>
                <p for=""><span>Thành tích của môn học: </span></p>
                <form @submit.prevent="updateCVLink">
                  <BFormInput v-model="update_cv.cv_link"
                    :state="validationErrorMessages.cv_link === undefined ? null : false"
                    aria-describedby="input-live-help input-live-feedback" placeholder="Link thành tích" required
                    class="" />
                  <BFormInvalidFeedback>
                    <ValidationErrorMessage :messages="validationErrorMessages.cv_link" />
                  </BFormInvalidFeedback>
                  <BRow class="text-end">
                    <SubmitButton class="col col-4 mt-3 ms-auto submit-button" :isDisabled="isDisabledButton"
                      :content="'Chỉnh sửa'" :color="'rgb(70 83 105)'" />
                  </BRow>
                </form>
              </div>
              <div class="create_form" v-else>
                <form @submit.prevent="create_cv">
                  <label class="title">1. Chọn môn học bạn muốn đăng ký học</label>
                  <BRow>
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
                      <select v-model="dataCreate.subject_id" class="form-select col" required>
                        <option value="" disabled selected>Chọn môn học</option>
                        <option v-for="subject in subjects" :key="subject.id" :value="subject.id">
                          {{ subject.name }}
                        </option>
                      </select>
                    </BCol>
                  </BRow>
                  <label for="">Link thành tích</label>
                  <BFormInput v-model="dataCreate.cv_link"
                    :state="validationErrorMessages.cv_link === undefined ? null : false"
                    aria-describedby="input-live-help input-live-feedback" placeholder="Link thành tích" required
                    class="" />
                  <BFormInvalidFeedback>
                    <ValidationErrorMessage :messages="validationErrorMessages.cv_link" />
                  </BFormInvalidFeedback>
                  <BRow class="text-end">
                    <SubmitButton class="col col-4 mt-3 ms-auto submit-button" :isDisabled="isDisabledButton"
                      :content="'Tạo đăng ký'" :color="'rgb(70 83 105)'" />
                  </BRow>
                </form>
              </div>
            </div>
          </div>
          <div v-for="(request, index) in infor.requests" :key="request.id">
            <p>{{ index + 1 }}.{{ request.subject }}</p>
            <p>{{ request.faculty }}</p>
            <a :href="{ path: `${request.cv_link}` }">Link thành tích</a>
            <span @click.prevent="update(request)">
              <BIconPencilSquare />
            </span>
            <span @click.prevent="del(request)">
              <BIconTrash3 />
            </span>
          </div>
        </div>
      </div>
    </BContainer>
  </div>
</template>
    
<script setup>
import { BIconX, BIconPencilSquare, BIconPlusCircle, BIconTrash3 } from 'bootstrap-icons-vue';
const { errorAlert, successAlert } = useAlert();

definePageMeta({
  layout: 'logout-page',
  middleware: 'authenticated',
});
const route = useRoute()
const showUpdate = ref(false);
const isUpdateNotCreate = ref(true);
const {$swal} = useNuxtApp();
const isDisabledButton = ref(false);
const infor = ref({
  smart_banking: '',
  accepts: [],
  requests: []
})
const update_cv = ref({
  subject_id: '',
  faculty_id: '',
  subject: 'Toan',
  faculty: 'Công nghệ thông tin',
  cv_link: '',
})
const dataCreate = ref({
  faculty_id: '',
  subject_id: '',
  cv_link: '',
})
const faculty = ref({
  faculty_id: ''
})
const faculties = ref([]);
const subjects = ref([]);

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
  '/user/mentor',
  { immediate: false },
);
// Update cv_link
const {
  data: dataPutCVLink,
  put: putCVLink,
  onFetchResponse: putCVLinkResponse,
  onFetchError: putCVLinkError,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(
  '/user/mentor-infor',
  { immediate: false },
);
// Update cv_link
const {
  data: dataDelCVLink,
  delete: delCVLink,
  onFetchResponse: delCVLinkResponse,
  onFetchError: delCVLinkError,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(
  '/user/mentor-infor',
  { immediate: false },
);
// Update smartBanking
const {
  data: dataPutSB,
  put: putSB,
  onFetchResponse: putSBResponse,
  onFetchError: putSBError,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(
  '/user/mentor-infor',
  { immediate: false },
);
// Create cv
const {
  data: dataPostCV,
  post: postCV,
  onFetchResponse: postCVResponse,
  onFetchError: postCVError,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(
  '/user/mentor-infor',
  { immediate: false },
);

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



getMentorInfor().json().execute();
getMentorInforResponse(() => {
  infor.value = dataMentorInfor.value.data;
})
putCVLinkResponse(() => {
  isDisabledButton.value = false;
  showUpdate.value = false;
  successAlert('Chỉnh sửa thành công');
  getMentorInfor().json().execute();
})
putCVLinkError(() => {
  isDisabledButton.value = false;
  errorAlert(dataPutCVLink.value.meta.error_message);
})
delCVLinkResponse(() => {
  successAlert('Xóa đăng ký thành công');
  getMentorInfor().json().execute();
})
delCVLinkError(() => {
  errorAlert(dataDelCVLink.value.meta.error_message);
})
postCVResponse(() => {
  isDisabledButton.value = false;
  showUpdate.value = false;
  successAlert('Tạo đăng ký thành công');
  getMentorInfor().json().execute();
  dataCreate.value.faculty_id = '';
  dataCreate.value.subject_id = '';
  dataCreate.value.cv_link = '';
})
postCVError(() => {
  isDisabledButton.value = false;
  errorAlert(dataPostCV.value.meta.error_message);
})
putSBResponse(() => {
  showUpdate.value = false;
  successAlert('Chỉnh sửa thành công');
  getMentorInfor().json().execute();
})
putSBError(() => {
  errorAlert(dataPutSB.value.meta.error_message);
})


getFaculty().json().execute();
getFacultyResponse(() => {
  faculties.value = dataFaculty.value.data.data;
})
getSubjectResponse(() => {
  subjects.value = dataSubject.value.data.data;
})
watch(faculty.value, () => {
  getSubject().json().execute();
  dataCreate.value.faculty_id = faculty.value.faculty_id;
});
onMounted(() => {
  if(route.query.request === 'create')
  {
    create_request();
  }
});
const update = (a) => {
  showUpdate.value = true;
  isUpdateNotCreate.value = true;
  update_cv.value = a;
}
const del = (a) => {
  $swal.fire({
    title: 'Bạn muốn xóa đăng ký này không?',
    showCancelButton: true,
    confirmButtonText: 'Delete',
    confirmButtonColor: 'rgb(252, 118, 118)',
  }).then((result) => {
    if (result.isConfirmed) {
      delCVLink({
        cv_link_id: a.id,
      }).json().execute();
    }
  });
}
const create_request = () => {
  isUpdateNotCreate.value = false;
  showUpdate.value = true;
}
const updateCVLink = () => {
  validationErrorMessages.value = {};
  isDisabledButton.value = true;
  putCVLink(update_cv.value).json().execute();
}
const updateSB = () => {
  putSB({
    cv_link: update_cv.value.cv_link
  }).json().execute();
}
const create_cv = () => {
  validationErrorMessages.value = {};
  isDisabledButton.value = true;
  postCV(dataCreate.value).json().execute();
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
  background-color: rgb(182 209 218);
  width: 600px;
  height: 300px;
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

label.title {
  font-weight: 600;
  font-size: 16px;
  margin-top: 10px;
  color: black;
}
</style>
  