<template>
  <div class="full">
    <BContainer fluid class="container-fluid">
      <BContainer>
        <BRow class="pt-3 text-center">
          <BCol>
            <h1 class="">REGISTER</h1>
          </BCol>
        </BRow>
        <BRow class="p-4 pt-2 pb-2">
            <form @submit.prevent="submit" class="col">
              <BRow>
                <BCol role="group">
                  <label> LOGIN INFORMATION</label>
                  <BFormInput
                    id="input-live"
                    v-model="registerData.email"
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
              <BRow>
                <BCol role="group" class="pe-0">
                  <BFormInput
                    id="input-live"
                    v-model="registerData.password"
                    :state="validationErrorMessages.password === undefined ? null : false"
                    aria-describedby="input-live-help input-live-feedback"
                    placeholder="Password"
                    trim
                    type="password"
                    required
                    class="mt-2"
                  />
                  <BFormInvalidFeedback>
                    <ValidationErrorMessage :messages="validationErrorMessages.password" />
                  </BFormInvalidFeedback>
                </BCol>
                <BCol role="group">
                  <BFormInput
                    id="input-live"
                    v-model="registerData.confirm_password"
                    :state="isPasswordMatched"
                    aria-describedby="input-live-help input-live-feedback"
                    placeholder="Confirm password"
                    trim
                    type="password"
                    required
                    class="mt-2"
                  />
                  <BFormInvalidFeedback>
                    <ValidationErrorMessage :messages="validationErrorMessages.passwordConfirm" />
                  </BFormInvalidFeedback>
                </BCol>
              </BRow>
              <BRow>
                <BCol role="group">
                  <label class="pt-4"> PERSONAL INFORMATION</label>
                  <BFormInput
                    id="input-live"
                    v-model="registerData.fullname"
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
              <BRow>
                <BCol role="group">
                  <BFormInput
                    id="input-live"
                    v-model="registerData.phonenumber"
                    :state="validationErrorMessages.phonenumber === undefined ? null : false"
                    aria-describedby="input-live-help input-live-feedback"
                    placeholder="Phone number"
                    trim
                    type="tel"
                    pattern="[0]{1}[0-9]{9}"
                    required
                    class="mt-2"
                  />
                  <BFormInvalidFeedback>
                    <ValidationErrorMessage :messages="validationErrorMessages.phonenumber" />
                  </BFormInvalidFeedback>
                </BCol>
              </BRow>
              <BRow>
                <BCol role="group" class="pe-0">
                  <BFormInput
                    id="input-live"
                    v-model="registerData.address"
                    :state="validationErrorMessages.address === undefined ? null : false"
                    aria-describedby="input-live-help input-live-feedback"
                    placeholder="Address"
                    trim
                    required
                    class="mt-2"
                  />
                  <BFormInvalidFeedback>
                    <ValidationErrorMessage :messages="validationErrorMessages.address" />
                  </BFormInvalidFeedback>
                </BCol>
                <BCol>
                  <select
                    v-model="registerData.gender"
                    class="form-select mt-2"
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
              <BRow>
                <BCol class="pe-0">
                  <Datepicker
                    v-model="registerData.birthday"
                    date-picker
                    required
                    textInput
                    placeholder="Choose birthday" class="m-1 ms-2 date-picker"
                  />
                </BCol>
                <BCol role="group">
                  <select
                    v-model="registerData.faculty"
                    class="form-select mt-2"
                    required
                  >
                    <option value="" disabled selected>Choose your faculty</option>
                    <option v-for="faculty in dataFaculty" :key="faculty.id" :value="faculty.id">
                      {{ faculty.name }}
                    </option>
                  </select>
                </BCol>
              </BRow>
              <SubmitButton
                class="mt-3"
                :isDisabled="isDisabledButton"
                :content="'Register'"
                :color="'rgb(2, 62, 24)'"
              />
            </form>
        </BRow>
        <BRow class="pt-2 pb-3">
          <BCol class="text-center">
            <span>Have already an account? </span>
            <NuxtLink to="/login">Login here</NuxtLink>
          </BCol>
        </BRow>
      </BContainer>
    </BContainer>
  </div>
</template>

<script setup>
import "@fontsource/love-ya-like-a-sister";
import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

definePageMeta({
  layout: false,
});
const {setToken} = useToken();
const {getConfig} = useConfig();
const isDisabledButton = ref(false);
const registerData = reactive({
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
const {
  data: dataFaculty,
  get: getFaculty,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(
  '/faculties',
  {immediate: false},
);
const {
  data,
  statusCode,
  onFetchResponse,
  onFetchError,
  post,
} = useFetchApi({
  requireAuth: false,
  disableHandleErrorUnauthorized: true,
})(
  '/users',
  {immediate: false},
);

const isPasswordMatched = computed(
  () => (registerData.confirm_password === '' ? null : registerData.confirm_password === registerData.password),
);
getFaculty().json().execute();
onFetchResponse(() => {
  setToken(data.value.api_token);
  isDisabledButton.value = false;
  
  navigateTo({name: 'dashboard'});
});
onFetchError(() => {
  isDisabledButton.value = false;
  if (statusCode.value === getConfig('constants.statusCodes.validation')) {
    validationErrorMessages.value = data.value;
    // Incase server return passwordConfirm no matched error message
    isPasswordMatched.value = validationErrorMessages.passwordConfirm !== '' ? null : false;
  }
  return false;
});
const submit = () => {
  validationErrorMessages.value = {};
  if (isPasswordMatched.value) {
    isDisabledButton.value = true;
    registerData.birthday = registerData.birthday.toString().slice(4, 15);
    console.log(registerData)
    post(registerData).json().execute();
  }
};

</script>
<style scoped>
h1 {
  font-family: "Love Ya Like A Sister";
  color: rgb(2, 62, 24);
}
.container {
  width: 50%;
  margin-top: 50px;
  background-color: #eef1f7;
  border-radius: 5px;
}
.mess{
  color:red;
  font-size: small;
}
label {
  font-weight:400 !important;  
  font-size: 13px;
  color: rgba(2, 62, 24, 0.886);
  padding-left: 2px;
  padding-bottom: 3px;
}
.date-picker {
  width: 100%;
  margin-left: 0 !important;
  margin-right: 12px;
  padding-top: 5px;
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
a {
  color: rgb(2, 62, 24);
  text-decoration: underline;
}

</style>
