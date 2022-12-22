<template>
  <div class="full">
    <BContainer fluid>
      <div v-if="showChangePass" class="background" @click="closeChangePass"></div>
      <div class="change-pass" :class="{ showChangePass: showChangePass }">
        <form @submit.prevent="save">
          <button class="close" @click="closeChangePass">
            <BIconX />
          </button>
          <div role="group" class="mb-3">
            <label> Nhập mật khẩu cũ </label>
            <BFormInput id="input-live" v-model="changeData.current_password" :state="
              validationErrorChangePassMessages.current_password === undefined
                ? null
                : false
            " aria-describedby="input-live-help input-live-feedback" required type="password" trim />
            <BFormInvalidFeedback>
              <ValidationErrorMessage :messages="validationErrorChangePassMessages.current_password" />
            </BFormInvalidFeedback>
          </div>
          <div role="group" class="mb-3">
            <label> Nhập mật khẩu mới </label>
            <BFormInput id="input-live" v-model="changeData.password" :state="
              validationErrorChangePassMessages.password === undefined
                ? null
                : false
            " aria-describedby="input-live-help input-live-feedback" required type="password" trim />
            <BFormInvalidFeedback>
              <ValidationErrorMessage :messages="validationErrorChangePassMessages.password" />
            </BFormInvalidFeedback>
          </div>
          <div role="group" class="mb-3">
            <label> Nhập lại mật khẩu mới </label>
            <BFormInput id="input-live" v-model="changeData.password_confirmation" :state="isPasswordMatched"
              aria-describedby="input-live-help input-live-feedback" required type="password" trim />
            <BFormInvalidFeedback>
              <ValidationErrorMessage :messages="
                validationErrorChangePassMessages.password_confirmation
              " />
            </BFormInvalidFeedback>
          </div>
          <SubmitButton :is-disabled="isDisabledButton" :content="'Lưu'" :color="'rgb(64 97 128)'" class="mt-2" />
        </form>
      </div>
      <BRow>
        <input id="imageFile" type="file" name="" hidden accept="image/gif, image/jpeg, image/png"
          @change="changeAvatar" />
        <div class="avatar-infor">
          <div class="avatar">
            <img :src="`${userData.avatar_url}`" alt="avatar" />
            <div>
              <button for="imageFile">
                <label for="imageFile">
                  <BIconCamera/>
                </label>
              </button>
            </div>
          </div>
          <h1 class="text-center">Trang cá nhân</h1>
        </div>
        <form class="col infor" @submit.prevent="submit">
          <BRow class="mb-3">
            <BCol role="group">
              <label for="email">Địa chỉ email</label>
              <BFormInput id="email" v-model="userData.email" :state="
                validationErrorMessages.email === undefined ? null : false
              " aria-describedby="input-live-help input-live-feedback" placeholder="Địa chỉ email" type="email" trim
                required />
              <BFormInvalidFeedback>
                <ValidationErrorMessage :messages="validationErrorMessages.email" />
              </BFormInvalidFeedback>
            </BCol>
          </BRow>
          <BRow class="mb-3">
            <BCol role="group">
              <label for="full_name">Họ và tên</label>
              <BFormInput id="full_name" v-model="userData.full_name" :state="
                validationErrorMessages.full_name === undefined ? null : false
              " aria-describedby="input-live-help input-live-feedback" placeholder="Họ và tên" trim required />
              <BFormInvalidFeedback>
                <ValidationErrorMessage :messages="validationErrorMessages.full_name" />
              </BFormInvalidFeedback>
            </BCol>
          </BRow>
          <BRow class="mb-3">
            <BCol role="group">
              <label for="phonename">Số điện thoại</label>
              <BFormInput id="phonename" v-model="userData.phone_number" :state="
                validationErrorMessages.phone_number === undefined
                  ? null
                  : false
              " aria-describedby="input-live-help input-live-feedback" placeholder="Số điện thoại" trim type="tel"
                pattern="[0]{1}[0-9]{9}" required />
              <BFormInvalidFeedback>
                <ValidationErrorMessage :messages="validationErrorMessages.phonenumber" />
              </BFormInvalidFeedback>
            </BCol>
          </BRow>
          <BRow class="mb-3">
            <BCol role="group" class="pe-0">
              <label for="address">Địa chỉ thường trú</label>
              <BFormInput id="address" v-model="userData.address" :state="
                validationErrorMessages.address === undefined ? null : false
              " aria-describedby="input-live-help input-live-feedback" placeholder="Địa chỉ thường trú" trim
                required />
              <BFormInvalidFeedback>
                <ValidationErrorMessage :messages="validationErrorMessages.address" />
              </BFormInvalidFeedback>
            </BCol>
            <BCol>
              <label for="gender">Giới tính</label>
              <select id="gender" v-model="userData.gender" class="form-select">
                <option value="" disabled selected>Select gender</option>
                <option value="0">Nam</option>
                <option value="1">Nữ</option>
              </select>
            </BCol>
          </BRow>
          <BRow class="mb-3">
            <BCol class="pe-0">
              <label for="birthday">Ngày sinh</label>
              <Datepicker id="birthday" v-model="userData.birthday" date-picker required text-input
                placeholder="Chọn ngày sinh" class="ms-2 date-picker" />
            </BCol>
            <BCol role="group">
              <label for="faculty">Khoa đang học</label>
              <select id="faculty" v-model="userData.faculty_id" class="form-select" required disabled>
                <option value="" disabled selected>Chọn khoa</option>
                <option v-for="faculty in dataFaculty" :key="faculty.id" :value="faculty.id">
                  {{ faculty.name }}
                </option>
              </select>
            </BCol>
          </BRow>
          <BRow class="d-flex justify-content-end mb-3">
            <SubmitButton :is-disabled="isDisabledButton" :content="'Update'" :color="'rgb(64 97 128)'"
              class="col-6 col-lg-2 pe-0" />
            <SubmitButton :is-disabled="isDisabledButton" :content="'Change password'" :color="'rgb(64 97 128)'"
              class="col-6 col-lg-3" @click.prevent="showChangePass = true" />
          </BRow>
        </form>
      </BRow>
    </BContainer>
  </div>
</template>

<script setup>
import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import { BIconX, BIconCamera } from 'bootstrap-icons-vue'

definePageMeta({
  layout: 'logout-page',
  middleware: 'authenticated',
})
const { $toast } = useNuxtApp()
const { getConfig } = useConfig()
const { successAlert } = useAlert()
const {
  storage, stRef, uploadBytes, getDownloadURL
} = useFirebase()
const isDisabledButton = ref(false)
const userData = ref({
  id: '',
  username: '',
  full_name: '',
  password: '',
  password_confirmation: '',
  email: '',
  gender: '',
  birthday: '',
  faculty_id: '',
  phone_number: '',
  avatar_url: '',
})
const validationErrorMessages = ref({})
const dataFaculty = ref([])

const showChangePass = ref(false)
const changeData = ref({
  current_password: '',
  password: '',
  password_confirmation: '',
})
const validationErrorChangePassMessages = ref({})
const {
  data: dataChangePass,
  onFetchResponse: changePassRes,
  statusCode,
  onFetchError: changePassErr,
  put: changePassPut,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})('/user/password', { immediate: false })
const {
  data: dataGetFaculty,
  get: getFaculty,
  onFetchResponse: getFacultyResponse,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})('/faculties', { immediate: false })
const {
  data: dataGetMe,
  get: getMe,
  onFetchResponse: getMeResponse,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})('/user', { immediate: false })
const {
  data: dataPut,
  onFetchResponse: resPut,
  onFetchError: errPut,
  statusCode: codePut,
  put,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})('/user/edit', { immediate: false })

// Lấy thông tin cá nhân
getMe().json().execute()
getMeResponse(() => {
  userData.value = dataGetMe.value.data
})
// Lấy tất cả khoa
getFaculty().json().execute()
getFacultyResponse(() => {
  dataFaculty.value = dataGetFaculty.value.data.data
})

const isPasswordMatched = computed(() =>
  changeData.value.password_confirmation === ''
    ? null
    : changeData.value.password_confirmation === changeData.value.password
)
changePassRes(() => {
  isDisabledButton.value = false
  successAlert('Thay đổi mật khẩu thành công!', () => {
    closeChangePass()
  })
})
const closeChangePass = () => {
  showChangePass.value = false
    ; (changeData.value.current_password = ''),
      (changeData.value.password = ''),
      (changeData.value.password_confirmation = '')
  validationErrorChangePassMessages.value = {}
}
changePassErr(() => {
  if (statusCode.value === getConfig('constants.statusCodes.validation')) {
    validationErrorChangePassMessages.value =
      dataChangePass.value.meta.error_message
  }
  isDisabledButton.value = false
  return false
})
function save() {
  validationErrorChangePassMessages.value = {}
  if (isPasswordMatched.value) {
    isDisabledButton.value = true
    changePassPut(changeData).json().execute()
  }
}

// Trả về khi put thông tin cá nhân
resPut(() => {
  isDisabledButton.value = false
  // userData.value = dataPut.value.data.data
  successAlert('Chỉnh sửa thông tin thành công!')
})
errPut(() => {
  if (codePut.value === getConfig('constants.statusCodes.validation')) {
    validationErrorMessages.value = dataPut.value.meta.error_message
  }
  isDisabledButton.value = false
  return false
})

const changeAvatar = () => {
  const file = document.querySelector('input[type=file]').files[0]
  const storageRef = stRef(storage, "user-avatar/" + userData.value.id);
  uploadBytes(storageRef, file).then(() => {
    getDownloadURL(stRef(storage, "user-avatar/" + userData.value.id)).then(function (newUrl) {
      userData.value.avatar_url = newUrl;
      put(userData.value).json().execute();
    })
  })
}
const submit = () => {
  validationErrorMessages.value = {}
  isDisabledButton.value = true
  if (userData.value.birthday === null) {
    const temp = new Date()
    userData.value.birthday = temp.toString().slice(4, 15)
  } else if (userData.value.birthday.toString().length > 12) {
    userData.value.birthday = userData.value.birthday.toString().slice(4, 15)
  }
  put(userData.value).json().execute()
}
</script>
<style scoped>
h1 {
  color: rgb(75, 82, 98);
  margin: 0px;
  background-color: transparent;
  font-size: 35px;
  font-weight: 600;
}

.avatar {
  width: 120px;
  height: 120px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 100px;
  overflow: hidden;
  position: relative;
  border: 1px solid rgb(200, 200, 200);
}

.avatar>div {
  display: none;
  position: absolute;
  bottom: 0;
  left: 0;
  background-color: rgba(200, 200, 200, 0.477);
  width: 100%;
  height: 100%;
}

.avatar:hover div {
  display: inline-block;
}

.avatar button {
  width: 100%;
}

.avatar img {
  width: 100%;
}

.infor {
  padding: 0 50px;
  background-color: #ffffff;
  padding-top: 20px;
  height: 100%;
}

/* .avatar-infor {
  z-index: -1000;
} */

button {
  border: 0px;
  padding-top: 5px;
  background-color: transparent;
  color: rgb(2, 62, 24);
  display: block;
  margin: auto;
}

label {
  font-weight: 400 !important;
  font-size: 13px;
  color: rgba(2, 18, 62, 0.886);
  padding-left: 2px;
  padding-bottom: 3px;
}

.mess {
  color: red;
  font-size: small;
}

.date-picker {
  width: 100%;
  margin-left: 0 !important;
  margin-right: 12px;
  z-index: -1000;
}

.date-picker::placeholder {
  font-weight: 500;
  opacity: 0.5;
  color: rgb(165, 165, 165) !important;
  font-size: smaller;
}

select {
  border: 0px solid #ced4da !important;
  border-radius: 3px;
  color: #a2a2a2 !important;
  font-size: smaller;
  height: 37px;
}

select option:first-child {
  color: black;
}

.change-pass {
  position: fixed;
  top: -400px;
  width: 60%;
  left: 20%;
  padding: 30px;
  transition: all 0.4s;
  background-color: white;
  z-index: 2;
}

.change-pass form {
  position: relative;
}

.change-pass .close {
  position: absolute;
  top: -35px;
  right: -15px;
  font-weight: bold;
  font-size: 25px;
}

.change-pass input {
  border: 1px solid black !important;
}

.showChangePass {
  top: 0;
}

.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(207, 207, 207, 0.53);
  z-index: 1;
  transition: all 2s;
}

input,
select,
.date-picker {
  box-shadow: 0 3px 5px 0 rgb(0 0 0 / 10%);
}
</style>