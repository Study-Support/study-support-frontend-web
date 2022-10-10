<template>
  <div class="full">
    <BContainer fluid class="container-fluid">
      <BContainer>
        <BRow class="pt-3 text-center">
          <BCol>
            <h1 class="">LOGIN</h1>
          </BCol>
          
          <div v-if="unauthorizedErrorMessage !== ''" class="mess mt-2 ps-2">
            {{ unauthorizedErrorMessage }} !
          </div>
        </BRow>
        <BRow class="p-4 pt-2">
          <BCol>
            <form @submit.prevent="submit">
              <div role="group">
                <BFormInput
                  id="input-live"
                  v-model="requestBody.username"
                  :state="validationErrorMessages.username === undefined ? null : false"
                  aria-describedby="input-live-help input-live-feedback"
                  placeholder="Username"
                  trim
                  required
                  class=""
                />
                <BFormInvalidFeedback>
                  <ValidationErrorMessage :messages="validationErrorMessages.username" />
                </BFormInvalidFeedback>
              </div>
              <div role="group">
                <BFormInput
                  id="input-live"
                  v-model="requestBody.password"
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
              </div>
              <SubmitButton
                class="mt-3"
                :isDisabled="isDisabledButton"
                :content="'Đăng nhập'"
                :color="'rgb(2, 62, 24)'"
              />
            </form>
          </BCol>
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
const requestBody = ref({username: '', password: ''});
const unauthorizedErrorMessage = ref('');
const isDisabledButton = ref(false);
const validationErrorMessages = ref({
});
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
  post(requestBody).json().execute();
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
</style>
