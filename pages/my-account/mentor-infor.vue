<template>
  <div class="full">
    <BContainer fluid>
      <div class="rating">
        <BRow role="group">
          <label for="">
            <span class="title_outside">
              Tài khoản ngân hàng:
            </span>
          </label>
          <BCol class="a bank">
            <BFormTextarea v-model="infor.smart_banking" :state="
  validationErrorMessages.smart_banking === undefined
    ? null
    : false
" aria-describedby="input-live-help input-live-feedback" placeholder="Thông tin ngân hàng và số tài khoản" trim
              required class="mt-2" />
            <BFormInvalidFeedback>
              <ValidationErrorMessage :messages="validationErrorMessages.smart_banking" />
            </BFormInvalidFeedback>
          </BCol>

          <span class="col col-auto" @click.prevent="updateSB">
            <BIconPencilSquare />
          </span>
        </BRow>
        <div class="accept mt-3">
          <label for="">
            <span class="title_outside">
              Các thành tích đã được duyệt:
            </span>
            <span class="sub-title">Bạn có thể đăng ký làm mentor cho các nhóm của môn học dưới mà
              không cần đăng ký lại và chờ duyệt thông tin thành tích môn học
              (Nhưng vẫn phải xem xét kế hoạch học tập cho nhóm mới duyệt bạn
              làm mentor cho nhóm)</span>
          </label>
          <div class="a">
            <div v-for="(accept, index) in infor.accepts" :key="accept.id">
              <p>{{ index + 1 }}. {{ accept.name }}</p>
              <a :href="`${accept.cv_link}`">Link thành tích</a>
            </div>
          </div>
        </div>
        <div class="accept mt-3">
          <label for="">
            <span class="title_outside">
              Các thành tích đang đợi duyệt:
            </span>
            <!-- <BIconPlusCircle @click.prevent="createRequest" /> -->
            <span class="sub-title">Bạn có thể chỉnh sửa thông tin đăng ký hoặc <button @click.prevent="createRequest"
                class="button-create">
                Đăng ký thành tích
              </button></span>
          </label>
          <div class="update" :class="{ show: showUpdate }">
            <div role="group" class="update-infor">
              <button class="close" @click="showUpdate = false">
                <BIconX />
              </button>
              <h6>Thông tin của bạn làm mentor</h6>
              <div v-if="isUpdateNotCreate" class="update-form pt-3">
                <p for=""><span>Môn học:</span> {{ updateCv.name }}</p>
                <p for=""><span>Thành tích của môn học: </span></p>
                <form @submit.prevent="updateCVLink">
                  <BFormInput v-model="updateCv.cv_link" :state="
  validationErrorMessages.cv_link === undefined
    ? null
    : false
" aria-describedby="input-live-help input-live-feedback" placeholder="Link thành tích" required class="" />
                  <BFormInvalidFeedback>
                    <ValidationErrorMessage :messages="validationErrorMessages.cv_link" />
                  </BFormInvalidFeedback>
                  <BRow class="text-end">
                    <SubmitButton class="col col-4 mt-3 ms-auto submit-button" :is-disabled="isDisabledButton"
                      :content="'Chỉnh sửa'" :color="'rgb(70 83 105)'" />
                  </BRow>
                </form>
              </div>
              <div v-else class="create_form">
                <form @submit.prevent="createCv">
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
                      <select v-model="infor.subject_id" class="form-select col" required>
                        <option value="" disabled selected>Chọn môn học</option>
                        <option v-for="subject in subjects" :key="subject.id" :value="subject.id">
                          {{ subject.name }}
                        </option>
                      </select>
                    </BCol>
                  </BRow>
                  <label for="">Link thành tích</label>
                  <BFormInput v-model="infor.cv_link" :state="
  validationErrorMessages.cv_link === undefined
    ? null
    : false
" aria-describedby="input-live-help input-live-feedback" placeholder="Link thành tích" required
                    class="cv_link_create" />
                  <BFormInvalidFeedback>
                    <ValidationErrorMessage :messages="validationErrorMessages.cv_link" />
                  </BFormInvalidFeedback>
                  <BRow class="text-end">
                    <SubmitButton class="col col-4 mt-3 ms-auto submit-button" :is-disabled="isDisabledButton"
                      :content="'Tạo đăng ký'" :color="'rgb(70 83 105)'" />
                  </BRow>
                </form>
              </div>
            </div>
          </div>
          <div class="a">
            <div v-for="(request, index) in infor.requests" :key="request.id">
              <p>{{ index + 1 }}.{{ request.name }}</p>
              <a :href="`${request.cv_link}`">Link thành tích</a>
              <span @click.prevent="update(request)">
                <BIconPencilSquare />
              </span>
              <span @click.prevent="del(request)">
                <BIconTrash3 />
              </span>
            </div>
          </div>
        </div>
      </div>
    </BContainer>
  </div>
</template>

<script setup>
import {
  BIconX,
  BIconPencilSquare,
  BIconPlusCircle,
  BIconTrash3
} from 'bootstrap-icons-vue'
const { errorAlert, successAlert } = useAlert()

definePageMeta({
  layout: 'logout-page',
  middleware: 'authenticated',
})
const route = useRoute()
const showUpdate = ref(false)
const isUpdateNotCreate = ref(true)
const { $swal } = useNuxtApp()
const isDisabledButton = ref(false)
const infor = ref({
  smart_banking: '',
  accepts: [],
  requests: [],
  subjects: [],
  faculty_id: '',
  subject_id: '',
  cv_link: '',
})
const updateCv = ref({
  subject_id: '',
  faculty_id: '',
  subject: 'Toan',
  faculty: 'Công nghệ thông tin',
  cv_link: '',
})
let cv_link_id = ref([0])
const faculty = ref({
  faculty_id: '',
})
const faculties = ref([])
const subjects = ref([])

const validationErrorMessages = ref({})
// Lấy mentor_infor
const {
  data: dataMentorInfor,
  get: getMentorInfor,
  onFetchResponse: getMentorInforResponse,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})('/mentor', { immediate: false })
// Update cv_link
const {
  data: dataPutCVLink,
  put: putCVLink,
  onFetchResponse: putCVLinkResponse,
  onFetchError: putCVLinkError,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})('/mentor/subjects', { immediate: false })
// del cv_link
// tạo url


// Create cv
const {
  data: dataPostCV,
  post: postCV,
  onFetchResponse: postCVResponse,
  onFetchError: postCVError,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})('/mentor', { immediate: false })
// Update smartBanking
const {
  data: dataPutSB,
  put: putSB,
  onFetchResponse: putSBResponse,
  onFetchError: putSBError,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})('/mentor/bank', { immediate: false })
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

getMentorInfor().json().execute()
getMentorInforResponse(() => {
  infor.value.accepts = [];
  infor.value.requests = [];
  infor.value.smart_banking = dataMentorInfor.value.data.data.bank
  infor.value.subjects = dataMentorInfor.value.data.data.subjects
  infor.value.subjects.map((subject) => {
    if (subject.active === 1) {
      infor.value.accepts.push(subject)
    } else {
      infor.value.requests.push(subject)
    }
  })
})
putCVLinkResponse(() => {
  isDisabledButton.value = false
  showUpdate.value = false
  successAlert('Chỉnh sửa thành công')
  getMentorInfor().json().execute()
})
putCVLinkError(() => {
  isDisabledButton.value = false
  errorAlert(dataPutCVLink.value.meta.error_message)
})
postCVResponse(() => {
  isDisabledButton.value = false
  showUpdate.value = false
  successAlert('Tạo đăng ký thành công')
  getMentorInfor().json().execute()
  infor.value.faculty_id = ''
  infor.value.subject_id = ''
  infor.value.cv_link = ''
})
postCVError(() => {
  isDisabledButton.value = false
  errorAlert(dataPostCV.value.meta.error_message)
})
putSBResponse(() => {
  showUpdate.value = false
  successAlert('Chỉnh sửa thành công')
  getMentorInfor().json().execute()
})
putSBError(() => {
  errorAlert(dataPutSB.value.meta.error_message)
})

getFaculty().json().execute()
getFacultyResponse(() => {
  faculties.value = dataFaculty.value.data.data
})
getSubjectResponse(() => {
  subjects.value = dataSubject.value.data
})
watch(faculty.value, () => {
  getSubject().json().execute()
  infor.value.faculty_id = faculty.value.faculty_id
})
onMounted(() => {
  if (route.query.request === 'create') {
    createRequest()
  }
})
const update = (a) => {
  showUpdate.value = true
  isUpdateNotCreate.value = true
  updateCv.value = a
}
const del = (a) => {
  $swal
    .fire({
      title: 'Bạn muốn xóa đăng ký này không?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: 'rgb(252, 118, 118)',
    })
    .then((result) => {
      if (result.isConfirmed) {
        cv_link_id.value[0] = a.subject_id;
        const { url: urldel } = useUrl({
          path: `/mentor/${cv_link_id.value[0]}`,
        })
        const {
          data: dataDelCVLink,
          delete: delCVLink,
          onFetchResponse: delCVLinkResponse,
          onFetchError: delCVLinkError,
        } = useFetchApi({
          requireAuth: true,
          disableHandleErrorUnauthorized: false,
        })(urldel, { immediate: false })
        delCVLinkResponse(() => {
          successAlert('Xóa đăng ký thành công')
          getMentorInfor().json().execute()
        })
        delCVLinkError(() => {
          errorAlert(dataDelCVLink.value.meta.error_message)
        })
        delCVLink().json().execute()
      }
    })
}
const createRequest = () => {
  isUpdateNotCreate.value = false
  showUpdate.value = true
}
const updateCVLink = () => {
  validationErrorMessages.value = {}
  isDisabledButton.value = true
  putCVLink(updateCv.value).json().execute()
}
const updateSB = () => {
  putSB({
    smart_banking: infor.value.smart_banking,
  })
    .json()
    .execute()
}
const createCv = () => {
  validationErrorMessages.value = {}
  isDisabledButton.value = true
  postCV(infor.value).json().execute()
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
  padding-top: 10px;
}

.a {
  padding-left: 30px;
}

.a.bank {
  padding-left: 10px;
}

.name {
  font-weight: 600;
  margin: 0;
}

.content {
  font-size: 13px;
}

.sub-title {
  display: block;
  font-size: 13px;
  color: rgb(87, 87, 87);
  font-weight: 100;
  font-style: italic;
  text-transform: none;
  padding-bottom: 20px;
}

label {
  font-weight: 600;
  font-size: 15px;
  padding-top: 30px;
  text-transform: uppercase;
  display: inline-block;
}

.button-create {
  border: none;
  background-color: transparent;
  text-decoration: underline;
  color: rgb(5, 88, 8);
  font-size: 13px;
  font-weight: 100;
  font-style: italic;
  padding-left: 0;
}

.accept>div {
  margin-bottom: 10px;
}

.accept>div p,
.accept a {
  margin: 0;
  padding-left: 10px;
  font-size: 12px;
  padding-right: 8px;
}

.accept>div p {
  display: inline;
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
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 100;
}

.update-infor {
  background-color: rgb(255, 255, 255);
  width: 700px;
  height: 350px;
  padding: 20px;
  border-radius: 0.3125em;
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

.update-form input {
  width: 99%;
}

.update-form p {
  display: block !important;
}

.update.show {
  display: flex;
  margin: 0 !important;
}

.update p {
  padding-left: 2px !important;
  margin: 5px !important;
}

.update p span {
  font-size: 15px !important;
  font-weight: 600;
}

.create_form label {
  font-weight: 500;
  margin-top: 15px;
  font-size: 14px;
  padding-top: 0;
  text-transform: none;
}

label.title {
  font-weight: 600;
  font-size: 16px;
  margin-top: 10px;
  color: black;
  font-style: italic;
}

.cv_link_create {
  margin-left: 0 !important;
  width: 100% !important;
}
</style>