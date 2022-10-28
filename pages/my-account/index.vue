<template>
    <div class="full">
      <BContainer fluid>
        <div class="background" v-if="showChangePass" @click="closeChangePass"></div>
        <div class="change-pass" :class="{showChangePass: showChangePass}">
          <form @submit.prevent="save">
            <button class="close" @click="closeChangePass">
              <BIconX/>
            </button>
            <div role="group" class="mb-3">
              <label> Nhập mật khẩu cũ </label>
              <BFormInput
                id="input-live"
                v-model="changeData.current_password"
                :state="validationErrorChangePassMessages.current_password === undefined ? null : false"
                aria-describedby="input-live-help input-live-feedback"
                required
                type="password"
                trim
              />
              <BFormInvalidFeedback>
                <ValidationErrorMessage :messages="validationErrorChangePassMessages.current_password" />
              </BFormInvalidFeedback>
            </div>
            <div role="group" class="mb-3">
              <label> Nhập mật khẩu mới </label>
              <BFormInput
                id="input-live"
                v-model="changeData.password"
                :state="validationErrorChangePassMessages.password === undefined ? null : false"
                aria-describedby="input-live-help input-live-feedback"
                required
                type="password"
                trim
              />
              <BFormInvalidFeedback>
                <ValidationErrorMessage :messages="validationErrorChangePassMessages.password" />
              </BFormInvalidFeedback>
            </div>
            <div role="group" class="mb-3">
              <label> Nhập lại mật khẩu mới </label>
              <BFormInput
                id="input-live"
                v-model="changeData.confirm_password"
                :state="isPasswordMatched"
                aria-describedby="input-live-help input-live-feedback"
                required
                type="password"
                trim
              />
              <BFormInvalidFeedback>
                <ValidationErrorMessage :messages="validationErrorChangePassMessages.confirm_password" />
              </BFormInvalidFeedback>
            </div>
            <SubmitButton
              :isDisabled="isDisabledButton"
              :content="'Lưu'"
              :color="'rgb(64 97 128)'"
              class="mt-2"
            />
        </form>
        </div>
        <BRow>
          <BCol class=" col-3 col-lg-2 text-center sidebar">
            <div class="avatar">
              <img src="assets/mentors/m1.jpg" alt="avatar">
            </div>
            <button
              href="#"
              @click.prevent = "changeAvatar"
              class="text-center"
            >
              Change avatar
            </button>
          </BCol>
          <form @submit.prevent="submit" class="col col-9 col-lg-10 infor">
            <h1 class="text-center">My account</h1>
            <BRow class="mb-3">
              <BCol role="group">
                <label for="email">Email</label>
                <BFormInput
                  id="email"
                  v-model="userData.email"
                  :state="validationErrorMessages.email === undefined ? null : false"
                  aria-describedby="input-live-help input-live-feedback"
                  placeholder="Enter email"
                  type="email"
                  trim
                  required
                />
                <BFormInvalidFeedback>
                  <ValidationErrorMessage :messages="validationErrorMessages.email" />
                </BFormInvalidFeedback>
              </BCol>
            </BRow>
            <BRow class="mb-3">
              <BCol role="group">
                <label for="fullname">Full name</label>
                <BFormInput
                  id="fullname"
                  v-model="userData.fullname"
                  :state="validationErrorMessages.fullname === undefined ? null : false"
                  aria-describedby="input-live-help input-live-feedback"
                  placeholder="Enter full name"
                  trim
                  required
                />
                <BFormInvalidFeedback>
                  <ValidationErrorMessage :messages="validationErrorMessages.fullname" />
                </BFormInvalidFeedback>
              </BCol>
            </BRow>
            <BRow class="mb-3">
              <BCol role="group">
                <label for="phonename">Phone number</label>
                <BFormInput
                  id="phonename"
                  v-model="userData.phonenumber"
                  :state="validationErrorMessages.phonenumber === undefined ? null : false"
                  aria-describedby="input-live-help input-live-feedback"
                  placeholder="Phone number"
                  trim
                  type="tel"
                  pattern="[0]{1}[0-9]{9}"
                  required
                />
                <BFormInvalidFeedback>
                  <ValidationErrorMessage :messages="validationErrorMessages.phonenumber" />
                </BFormInvalidFeedback>
              </BCol>
            </BRow>
            <BRow class="mb-3">
              <BCol role="group" class="pe-0">
                <label for="address">Address</label>
                <BFormInput
                  id="address"
                  v-model="userData.address"
                  :state="validationErrorMessages.address === undefined ? null : false"
                  aria-describedby="input-live-help input-live-feedback"
                  placeholder="Address"
                  trim
                  required
                />
                <BFormInvalidFeedback>
                  <ValidationErrorMessage :messages="validationErrorMessages.address" />
                </BFormInvalidFeedback>
              </BCol>
              <BCol>
                <label for="gender">Gender</label>
                <select
                  id="gender"
                  v-model="userData.gender"
                  class="form-select"
                >
                  <option value="" disabled selected>Select gender</option>
                  <option value="0">
                    Male
                  </option>
                  <option value="1">
                    Female
                  </option>
                </select>
              </BCol>
            </BRow>
            <BRow class="mb-3">
              <BCol class="pe-0">
                <label for="birthday">birthday</label>
                <Datepicker
                  id="birthday"
                  v-model="userData.birthday"
                  date-picker
                  required
                  textInput
                  placeholder="Choose birthday" class="ms-2 date-picker"
                />
              </BCol>
              <BCol role="group" >
                <label for="faculty">Faculty</label>
                <select
                  id="faculty"
                  v-model="userData.faculty"
                  class="form-select"
                  required
                  disabled
                >
                  <option value="" disabled selected>Choose your faculty</option>
                  <option v-for="faculty in dataFaculty" :key="faculty.id" :value="faculty.id">
                    {{ faculty.name }}
                  </option>
                </select>
              </BCol>
            </BRow>
            <BRow class="d-flex justify-content-end mb-3">
              <SubmitButton
                :isDisabled="isDisabledButton"
                :content="'Update'"
                :color="'rgb(64 97 128)'"
                class="col-6 col-lg-2 pe-0"
              />
              <SubmitButton
                :isDisabled="isDisabledButton"
                :content="'Change password'"
                @click.prevent = "showChangePass=true"
                :color="'rgb(64 97 128)'"
                class="col-6 col-lg-3"
              />
            </BRow>
          </form>
        </BRow>
      </BContainer>
    </div>
  </template>
  
<script setup>
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';
import authenticated from "~~/middleware/authenticated";
import {BIconX} from 'bootstrap-icons-vue';

definePageMeta({
  layout: 'logout-page',
  middleware: 'authenticated',
});
const {$toast} = useNuxtApp();
const {setToken} = useToken();
const {getConfig} = useConfig();
const {$swal} = useNuxtApp();
const {successAlert} = useAlert();

const isDisabledButton = ref(false);
const userData = ref({
  username: '',
  fullname: '',
  password: '',
  confirm_password: '',
  email: '',
  gender: '',
  birthday: '',
  faculty: '',
});
const validationErrorMessages = ref({});
const dataFaculty = ref([]);

const showChangePass = ref(false);
const changeData = ref({
  current_password: '',
  password: '',
  confirm_password: '',
});
const validationErrorChangePassMessages = ref({
});
const {
  data: dataChangePass,
  onFetchResponse: changePassRes,
  statusCode,
  onFetchError: changePassErr,
  put: changePassPut,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(
  '/users/change-password',
  {immediate: false},
);
const {
  data: dataGetFaculty,
  get: getFaculty,
  onFetchResponse: getFacultyResponse,
  } = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
  })(
  '/faculties',
  {immediate: false},
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
  '/users/me',
  {immediate: false},
);
const {
  data: dataPut,
  onFetchResponse: resPut,
  onFetchError: errPut,
  statusCode: codePut,
  put,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(
  '/users/me',
  {immediate: false},
);
// Lấy thông tin cá nhân
getMe().json().execute();
getMeResponse(() => {
  userData.value = dataGetMe.value.data.data;
})
// Lấy tất cả khoa
getFaculty().json().execute();
getFacultyResponse(() => {
  dataFaculty.value = dataGetFaculty.value.data.data;
});

const isPasswordMatched = computed(
  () => (changeData.value.confirm_password === '' ? null : changeData.value.confirm_password === changeData.value.password),
);
changePassRes(() => {
isDisabledButton.value = false;
successAlert('Thay đổi mật khẩu thành công!', () => {
  closeChangePass();
});
});
const closeChangePass = () => {
  showChangePass.value = false;
  changeData.value.current_password = '',
  changeData.value.password = '',
  changeData.value.confirm_password = ''
  validationErrorChangePassMessages.value = {};
};
changePassErr(() => {
  if (statusCode.value === getConfig('constants.statusCodes.validation')) {
    validationErrorChangePassMessages.value = dataChangePass.value.meta.error_message;
  }
  isDisabledButton.value = false;
  return false;
});
function save () {
  validationErrorChangePassMessages.value = {};
  if (isPasswordMatched.value) {
    isDisabledButton.value = true;
    changePassPut(changeData).json().execute();
  }
}

// Trả về khi put thông tin cá nhân
resPut(() => {
  userData.value = dataPut.value.data.data;
  successAlert('Updated');
  isDisabledButton.value = false;
});
errPut(() => {
  if (codePut.value === getConfig('constants.statusCodes.validation')) {
    validationErrorMessages.value = dataPut.value.meta.error_message;
  }
  isDisabledButton.value = false;
  return false;
});

const changeAvatar = () => {
  $toast('Đổi avatar','success', 2000);
}
const submit = () => {
  validationErrorMessages.value = {};
  isDisabledButton.value = true;
  if (userData.value.birthday === null) {
    const temp = new Date();
    userData.value.birthday = temp.toString().slice(4, 15);
  } else if (userData.value.birthday.toString().length > 12) {
    userData.value.birthday = userData.value.birthday.toString().slice(4, 15);
  }
  put(userData.value).json().execute();
};

</script>
<style scoped>
h1 {
  font-family: "Love Ya Like A Sister";
  color: rgb(2, 21, 62);
  margin: 0px; 
  background-color: transparent;

}
.sidebar, .infor {
  min-height: calc(100vh - 50px);
}
.sidebar {
  padding-top: 20px;
  background-color: #cdd6de;
  border-right: 1px solid rgb(169, 186, 178);
}
.avatar {
  width: 150px;
  height: 150px;
  margin-left: auto;
  margin-right: auto;
  border-radius: 100px;
  overflow: hidden;
}
.avatar img {
  width: 100%;
}
.infor {
  padding: 0 50px;
  background-color: #dfe6ec;
  padding-top: 20px;
  height: 100%;
}
button {
  border: 0px;
  padding-top: 5px;
  background-color: transparent;
  color: rgb(2, 62, 24);
}
label {
  font-weight:400 !important;  
  font-size: 13px;
  color: rgba(2, 62, 24, 0.886);
  padding-left: 2px;
  padding-bottom: 3px;
}
.mess{
  color:red;
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
  opacity: .5;
  color: rgb(165, 165, 165) !important;
  font-size: smaller;
}
select {
  border: 0px solid #ced4da !important;
  border-radius: 3px ;
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
  transition: all .4s;
  background-color: white;
  z-index: 2;
}
.change-pass form{
  position: relative;
}
.change-pass .close {
  position: absolute;
  top: -35px;
  right: -15px;
  font-weight: bold;
  font-size: 25px;
}
.change-pass input{
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
</style>
