<template>
  <BContainer>
    <BRow>
      <BCol class="position-fixed top-0 start-0 menu-top">
        <BRow class="d-flex justify-content-between mt-2">
          <BCol class="ps-4 col-auto">
            <NuxtLink to="/dashboard"><h2>Study With Us</h2></NuxtLink>
          </BCol>
          <button
            class="col col-auto text-center pe-4"
            @click="logout"
          >
            <BRow>
              <BCol class="logout">
                <BIconBoxArrowLeft @click="logout" />
              </BCol>
            </BRow>
            <BRow>
              <BCol>
                <p class="m-0">Logout</p>
              </BCol>
            </BRow>
          </button>
        </BRow>
      </BCol>
    </BRow>
    <BRow class="back-header" />
  </BContainer>
</template>

<script setup>
import {BIconBoxArrowLeft} from 'bootstrap-icons-vue';
import "@fontsource/love-ya-like-a-sister";

const {$toast} = useNuxtApp();

const {deleteToken} = useToken();
const {
  onFetchResponse,
  get,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(
  '/users/logout',
  {immediate: false},
);
onFetchResponse(() => {
  $toast('Đăng xuất thành công','success', 1500);
  deleteToken();
  return navigateTo({name: 'dashboard'});
});
const logout = () => {
  get().json().execute();
};
</script>

<style scoped>
* {
  color: white;
}
button {
  background-color: transparent;
  border: 0;
}
.logout {
  font-size: 20px;
  margin-top: -15px;
}
p {
  font-size: 15px;
}
 h2{
  font-family: "Love Ya Like A Sister";
  display: block;
  min-width: 20px;
}
.menu-top {
  background-color: rgb(10, 103, 175);
}
</style>
