<template>
  <div class="full">
    <BRow class="ms-1 me-1 mb-4">
      <BCol
        v-for="group in groupsIsMember"
        :key="group.id"
        class="col-6 col-md-3 mt-4"
      >
        <GroupCard
          :group="group"
          :show-status="true"
          @click.prevent="detail(group)"
        />
      </BCol>
    </BRow>
  </div>
</template>
<script setup>
definePageMeta({
  layout: 'logout-page',
  middleware: 'authenticated',
})
const groupsIsMember = ref([])

// Tạo url lấy groups user đang tham gia học
const { url: url1 } = useUrl({
  path: 'user/groups',
  queryParams: {
    is_mentor: 0,
    accepted: 1,
  },
})

// Lấy groups của user đang đăng nhập
const {
  data: dataGetgroupsIsMember,
  get: getgroupsIsMember,
  onFetchResponse: getgroupsIsMemberResponse,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(url1, { immediate: false })

getgroupsIsMember().json().execute()
getgroupsIsMemberResponse(() => {
  groupsIsMember.value = dataGetgroupsIsMember.value.data.data
})
const detail = (group) => {
  console.log(group)
  if (group.status === 2) {
    navigateTo(`/my-account/groups/${group.id}/waiting-mentor`)
  }
  if (group.status === 1) {
    navigateTo(`/my-account/groups/${group.id}/waiting-member`)
  }
}
</script>
<style scoped></style>
