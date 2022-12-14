<template>
  <div class="full p-4">
    <BRow class="">
      <BCol class="col-4">
        <div class="img">
          <img src="/assets/groups/g1.png" alt="" />
        </div>
      </BCol>
      <BCol class="group-infor">
        <h4 class="pt-3 pb-4">{{ group.subject }}</h4>
        <p><span>Khoa:</span> {{ group.faculty }}</p>
        <p class="topic">
          <span> Tóm tắt thông tin: </span>
          {{ group.topic }}
        </p>
        <span>Thông tin chi tiết</span>
        <p class="information">
          {{ group.information }}
        </p>
      </BCol>
    </BRow>
    <BRow class="mt-3">
      <BCol>
        <p class="quantity">
          <span>Thành viên:</span> {{ group.quantity }} thành viên
        </p>
        <div v-for="(member, index) in group.members" :key="member.id">
          <p class="mb-0">
            {{ index + 1 }}. {{ member.full_name }} _ Khoa: {{ member.faculty }}
          </p>
        </div>
      </BCol>
    </BRow>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'my-group',
  middleware: 'authenticated',
})
const route = useRoute()
const group = ref({
  id: '',
  faculty: '',
  subject: '',
  topic: '',
  information: '',
  quantity: '',
  members: [
    {
      full_name: '',
      faculty: '',
    },
  ],
})
const {
  data: dataGetGroup,
  get: getGroup,
  onFetchResponse: getGroupRes,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(`groups/${route.params.id}`, { immediate: false })
getGroup().json().execute()
getGroupRes(() => {
  group.value = dataGetGroup.value.data.group
  // kiểm tra thực sự nhóm đang tìm mentor k hay nhập bừa id
  // if (group.value.status !== 3) {
  //   alert('Truy cập nhóm không đúng!')
  //   navigateTo('/groups?type=all')
  // }
})
</script>

<style scoped>
.img {
  /* background-color: red; */
  height: 250px;
  max-width: 300px;
  border-radius: 3px;
  border: 0.5px solid rgb(172, 172, 172);
}

img {
  width: 100%;
  height: 100%;
}

h4 {
  font-size: 30px;
  font-weight: 700;
  color: rgb(0, 13, 154);
}

h5 {
  font-size: 22px;
  color: rgb(6, 101, 138);
  font-weight: 600;
}

h5:last-child {
  font-size: 20px;
  color: rgb(6, 101, 138);
  font-weight: 100;
}

.group-infor span {
  color: rgb(0, 16, 192);
  display: inline-block;
  width: 130px;
}

.register {
  background-color: #dfe6ec;
  padding: 20px;
}

.submit-button {
  display: inline-block;
}

.submit-button >>> button {
  width: 200px;
}

form > div {
  margin-top: 10px;
}

label span {
  display: block;
  font-size: 13px;
  padding-bottom: 10px;
  color: rgb(87, 87, 87);
}

.confirm-error {
  color: red;
  font-size: 13px;
}

.notice-success span {
  font-weight: 600;
  color: green;
}

.notice-success span:last-child {
  color: rgb(0, 0, 0);
  display: block;
  font-size: large;
}

.quantity span {
  font-weight: 600;
}

.quantity button {
  border: 1px solid rgb(146, 146, 146);
  border-radius: 4px;
  margin-right: 10px;
}

.beforeShow {
  display: block;
  font-size: 13px;
  padding-bottom: 10px;
  color: rgb(0, 0, 0);
}
</style>
