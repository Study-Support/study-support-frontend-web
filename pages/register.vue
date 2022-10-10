<template>
  <div class="full">
    <BContainer fluid class="container-fluid">
      <BContainer>
        <BRow class="pt-3 text-center">
          <BCol>
            <h1 class="">REGISTER</h1>
          </BCol>
        </BRow>
        <BRow class="p-4 pt-2">
            <form @submit.prevent="submit" class="col">
              <BRow>
                <BCol role="group" class="pe-0">
                  <BFormInput
                    id="input-live"
                    v-model="registerData.fullname"
                    :state="validationErrorMessages.fullname === undefined ? null : false"
                    aria-describedby="input-live-help input-live-feedback"
                    placeholder="Enter full name"
                    trim
                    required
                    class=""
                  />
                  <BFormInvalidFeedback>
                    <ValidationErrorMessage :messages="validationErrorMessages.fullname" />
                  </BFormInvalidFeedback>
                </BCol>
                <BCol role="group">
                  <BFormInput
                    id="input-live"
                    v-model="registerData.username"
                    :state="validationErrorMessages.username === undefined ? null : false"
                    aria-describedby="input-live-help input-live-feedback"
                    placeholder="Enter username"
                    trim
                    required
                  />
                  <BFormInvalidFeedback>
                    <ValidationErrorMessage :messages="validationErrorMessages.username" />
                  </BFormInvalidFeedback>
                </BCol>
              </BRow>
              <BRow>
                <BCol role="group" class="pe-0">
                  <BFormInput
                    id="input-live"
                    v-model="registerData.username"
                    :state="validationErrorMessages.username === undefined ? null : false"
                    aria-describedby="input-live-help input-live-feedback"
                    placeholder="Password"
                    trim
                    type="password"
                    required
                    class="mt-2"
                  />
                  <BFormInvalidFeedback>
                    <ValidationErrorMessage :messages="validationErrorMessages.username" />
                  </BFormInvalidFeedback>
                </BCol>
                <BCol role="group">
                  <BFormInput
                    id="input-live"
                    v-model="registerData.password"
                    :state="validationErrorMessages.password === undefined ? null : false"
                    aria-describedby="input-live-help input-live-feedback"
                    placeholder="Confirm password"
                    trim
                    type="password"
                    required
                    class="mt-2"
                  />
                  <BFormInvalidFeedback>
                    <ValidationErrorMessage :messages="validationErrorMessages.password" />
                  </BFormInvalidFeedback>
                </BCol>
              </BRow>
              <BRow>
                <BCol role="group" class="pe-0">
                  <BFormInput
                    id="input-live"
                    v-model="registerData.email"
                    :state="validationErrorMessages.email === undefined ? null : false"
                    aria-describedby="input-live-help input-live-feedback"
                    placeholder="Email"
                    trim
                    type="Email"
                    required
                    class="mt-2"
                  />
                  <BFormInvalidFeedback>
                    <ValidationErrorMessage :messages="validationErrorMessages.email" />
                  </BFormInvalidFeedback>
                </BCol>
                <BCol role="group">
                  <BFormInput
                    id="input-live"
                    v-model="registerData.phonenumber"
                    :state="validationErrorMessages.phonenumber === undefined ? null : false"
                    aria-describedby="input-live-help input-live-feedback"
                    placeholder="Phone number"
                    trim
                    type="tel"
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
                    v-model="registerData.email"
                    :state="validationErrorMessages.email === undefined ? null : false"
                    aria-describedby="input-live-help input-live-feedback"
                    placeholder="Birthday"
                    trim
                    type="Email"
                    required
                    class="mt-2"
                  />
                  <BFormInvalidFeedback>
                    <ValidationErrorMessage :messages="validationErrorMessages.email" />
                  </BFormInvalidFeedback>
                </BCol>
                <BCol role="group">
                  <BFormInput
                    id="input-live"
                    v-model="registerData.phonenumber"
                    :state="validationErrorMessages.phonenumber === undefined ? null : false"
                    aria-describedby="input-live-help input-live-feedback"
                    placeholder="gender"
                    trim
                    type="tel"
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
                <BCol role="group">
                  <BFormInput
                    id="input-live"
                    v-model="registerData.address"
                    :state="validationErrorMessages.address === undefined ? null : false"
                    aria-describedby="input-live-help input-live-feedback"
                    placeholder="Faculty"
                    trim
                    required
                    class="mt-2"
                  />
                  <BFormInvalidFeedback>
                    <ValidationErrorMessage :messages="validationErrorMessages.address" />
                  </BFormInvalidFeedback>
                </BCol>
              </BRow>
              <SubmitButton
                class="mt-3"
                :isDisabled="isDisabledButton"
                :content="'Đăng nhập'"
                :color="'rgb(2, 62, 24)'"
              />
            </form>
        </BRow>
        <BRow class="pt-3 pb-4">
          <BCol class="text-center">
            <span>Bạn chưa có tài khoản? </span>
            <NuxtLink to="/register">Đăng ký</NuxtLink>
          </BCol>
        </BRow>
      </BContainer>
    </BContainer>
  </div>
</template>

<script setup>
import "@fontsource/love-ya-like-a-sister";

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
  have_group: '0',
  group_id: '',
});
const validationErrorMessages = ref({});
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
  'login',
  {immediate: false},
);
onFetchResponse(() => {
  setToken(data.value.token);
  return navigateTo({name: 'dashboard'});
});
onFetchError(() => {
  if (statusCode.value === getConfig('constants.statusCodes.unauthorized')) {
    unauthorizedErrorMessage.value = data.value.message;
  } else if (statusCode.value === getConfig('constants.statusCodes.validation')) {
    validationErrorMessages.value = data.value;
  }
  isDisabledButton.value = false;
});
// submit login
const submit = () => {
  unauthorizedErrorMessage.value = '';
  validationErrorMessages.value = {};
  isDisabledButton.value = true;
  console.log("asdfas");
  post(registerData).json().execute();
};
</script>
<style scoped>
h1 {
  font-family: "Love Ya Like A Sister";
  color: rgb(2, 62, 24);
}
.container {
  width: 50%;
  margin-top: 100px;
  background-color: #eef1f7;
  border-radius: 5px;
}
.mess{
  color:red;
  font-size: small;
}
label {
  font-family: 'Helvetica';
  font-weight:700;
  font-size: small;
  color: rgba(61, 61, 61, 0.705);
  padding-left: 2px;
}
</style>
