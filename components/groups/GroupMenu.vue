<template>
  <h5 class="m-3 text-end">Your groups</h5>
  <div class="groups ms-3">
    <button v-for="group in myGroups" :key="group.id" class="mt-3 d-block" @click="navigateTo(`/groups/${group.id}`)">
      <BIconPeopleFill class="me-2" />
      <span style="background-color: transparent" class="pt-2">{{ group.name }}</span>
    </button>
  </div>
</template>

<script setup>
const myGroups = ref([]);

// Tạo url lấy groups user đang tham gia học
const { url: url1 } = useUrl({
  path: 'user/groups',
  queryParams: {
    is_mentor: 0,
  },
});
// Lấy groups của user đang đăng nhập
const {
  data: dataGetMyGroups,
  get: getGroups,
  onFetchResponse: getGroupsResponse,
  onFetchError: getGroupsError,
} = useFetchApi({
  requireAuth: false,
  disableHandleErrorUnauthorized: false,
})(
  url1,
  { immediate: false },
);
getGroupsResponse(() => {
  myGroups.value = dataGetMyGroups.value.data.data;
});
</script>

<style scoped>

</style>
