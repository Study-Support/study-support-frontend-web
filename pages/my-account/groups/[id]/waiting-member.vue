<template>
  <div class="group-infor">
    <BContainer>
      <BRow class="d-flex justify-content-between">
        <BCol class="col-auto"> </BCol>
        <ul class="col col-auto d-flex menu mb-1 mt-1">
          <li class="text-decoration-none d-block">
            <NuxtLink to="/dashboard"> TRANG CHỦ </NuxtLink>
          </li>
          <li class="text-decoration-none d-block">
            <NuxtLink :to="{
              path: '/groups',
              query: { type: getConfig('constants.typeOfGroup.all') },
            }">
              NHÓM HỌC
            </NuxtLink>
          </li>
          <li class="text-decoration-none d-block">
            <NuxtLink :to="{
              path: '/groups',
              query: {
                type: getConfig('constants.typeOfGroup.findMentor'),
              },
            }">
              TÌM HƯỚNG DẪN
            </NuxtLink>
          </li>
          <li class="text-decoration-none d-block">
            <NuxtLink to="/mentors"> NGƯỜI HƯỚNG DẪN </NuxtLink>
          </li>
          <li class="text-decoration-none d-block" @click="navigateTo('/my-account')">
            <NuxtLink to="/my-account" class="user">
              <div class="avatar">
                <img src="/assets/user.png" alt="" />
              </div>
            </NuxtLink>
          </li>
        </ul>
      </BRow>
      <BRow>
        <BCol class="infor">
          <h4 class="pt-3">{{ group.subject }}</h4>
          <p class="faculty">Khoa {{ group.faculty }}</p>
          <div class="pt-4">
            <p class="topic">
              <span> Mục đích chính của nhóm: </span>
              {{ group.topic }}
            </p>
            <p class="information">
              <span>Mục tiêu muốn đạt được sau khóa học:</span>
              {{ group.information }}
            </p>
          </div>
        </BCol>
      </BRow>
    </BContainer>
  </div>
  <BContainer>

    <BRow class="mt-3">
      <BCol>
        <h6 class="pb-4"><span>Thành viên hiện có:</span> {{ group.quantity }} thành viên</h6>
        <!-- <p><span>1. Thành viên hiện có:</span> {{ group.quantity }} thành viên</p> -->
        <div v-for="(member, index) in group.membersAccepted" :key="member.id" class="mt-2">
          
          <p class="mb-0 member-name">{{index + 1}}. {{ member.full_name }}
          </p>
          <p class="faculty faculty2">
            Khoa {{ member.faculty }}
          </p>
        </div>
        <div class="group-detail">
          <h6 class="pb-4 pt-4">Thông tin chi tiết của nhóm</h6>
          <p v-if="group.self_study === 0">
            <span>Là nhóm có người hướng dẫn</span> 
          </p>
          <p v-else>
            <span>Là nhóm tự học, không có người hướng dẫn</span> 
          </p>
          <p>
            <span>Địa điểm học:</span> {{group.location_study}}
          </p>
          <p>
            <span>Thời gian học:</span> {{group.time_study}}
          </p>
        </div>
      </BCol>
    </BRow>
    <!-- v-if="group.is_creator === 1" -->
    <BRow v-if="group.is_creator" class="mt-3">
      <BCol>
        <div>
          <h6 class="pb-4">Thành viên đợi duyệt: <span v-if="group.membersWaiting.length ===0">Không có</span></h6>
          <table v-if="group.membersWaiting.length !==0">
            <tr class="title">
              <th>STT</th>
              <th>Name</th>
              <th>Khoa</th>
              <th>Câu trả lời</th>
              <th>
                Select All
                <input
                  v-model="allSelected"
                  type="checkbox"
                  @click="selectAll"
                />
              </th>
            </tr>
            <tr
              v-for="(member, index) in group.membersWaiting"
              :key="member.id"
            >
              <td>{{ index }}</td>
              <td>{{ member.full_name }}</td>
              <td>{{ member.faculty }}</td>
              <td>
                <p v-for="answer in group.answers" :key="answer">
                  <span v-if="answer.account_id === member.id">
                    {{answer.content}}: {{answer.answer}}
                  </span>
                </p>
              </td>
              <td>
                <input
                  v-model="acceptMember"
                  type="checkbox"
                  :value="member.id"
                  @change="select"
                />
              </td>
            </tr>
          </table>
          <div class="button" v-if="group.membersWaiting.length !==0">
            <button @click="accept">Duyệt thành viên</button>
            <button @click="deleteWaiting">Xóa thành viên</button>
          </div>
        </div>
      </BCol>
    </BRow>
  </BContainer>
</template>

<script setup>
import { BIconChevronRight } from 'bootstrap-icons-vue'

definePageMeta({
  layout: false,
  middleware: 'authenticated',
})
const { getConfig } = useConfig()
const route = useRoute()
const acceptMember = ref([])
const allSelected = ref(false)
const group = ref({
  id: '',
  faculty: '',
  subject: '',
  topic: '',
  information: '',
  quantity: '',
  membersAccepted: [],
  membersWaiting: [],
  answers: [],
  is_creator: '',
})
const {
  data: dataGetGroup,
  get: getGroup,
  onFetchResponse: getGroupRes,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(`groups/${route.params.id}`, { immediate: false })

const { 
  put: putAcceptMember,
  onFetchResponse: putAcceptMemberRes,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(`user/groups/${route.params.id}/acceptMember`, { immediate: false })
getGroup().json().execute()
getGroupRes(() => {
  group.value = dataGetGroup.value.data.group
  // kiểm tra thực sự nhóm đang tìm mentor k hay nhập bừa id
  // if (group.value.status === 1) {
  //   alert("Truy cập nhóm không đúng!");
  //   navigateTo('/groups?type=all');
  // }
})
putAcceptMemberRes(() => {
  getGroup().json().execute()
})
const selectAll = () => {
  acceptMember.value = []
  if (!allSelected.value) {
    group.value.membersWaiting.forEach(function (member) {
      acceptMember.value.push(member.id)
    })
  }
}
const select = () => {
  allSelected.value = false
}
const accept = () => {
  putAcceptMember({
    account_id: acceptMember.value,
    accept: true,
  })
    .json()
    .execute()
}
const deleteWaiting = () => {
  putAcceptMember({
    account_id: acceptMember.value,
    accept: false,
  })
    .json()
    .execute()
}
</script>

<style scoped>

.button {
  text-align: right;
  padding-top: 10px;
  padding-bottom: 50px;
}
.button button {
  border: 1px solid rgb(223, 223, 223);
  border-radius: 3px;
  margin-left: 10px;
  padding: 5px 15px;
}
label {
  font-style: italic;
}
.group-detail {
  font-size: 14px;
}
.group-detail span, form span{
  margin-bottom: 0;
  font-style: italic;
  margin-top: 0;
  color: rgb(0, 0, 0);
  font-weight: 600;
}
form {
  font-size: 14px;
}
.group-detail p {
  margin-bottom: 10px;
}
h6 {
  font-size: 16px;
  line-height: 26px;
  margin: 0;
  padding-bottom: 8px;
  font-weight: 700;
  text-transform: uppercase;
  color: #000000;
  font-family: 'Roboto', sans-serif;
  margin-top: 30px;
}

h6::after {
  content: '';
  display: block;
  background-color: #000000;
  width: 100px;
  height: 5px;
  border-radius: 3px;
  margin-top: 5px;
  margin-bottom: 0px;
}

.infor {
  color: white;
  padding-top: 50px;
}

.infor span {
  font-style: normal;
}

.faculty {
  margin-bottom: 0;
  font-size: 14px;
  font-style: italic;
  margin-top: 0;
  color: rgb(207, 207, 207);
}

.faculty2 {
  color: rgb(0, 0, 0);
  padding-left: 20px;
}
.member-name {
  line-height: 22px;
  font-weight: 600;
}
.topic,
.information {
  margin-bottom: 0;
  font-size: 14px;
  font-style: italic;
  margin-top: 0;
  color: rgb(255, 255, 255);
}

.avatar {
  width: 30px;
  height: 30px;
  display: inline-block;
  margin-right: 5px;
  border: 1px solid black;
  border-radius: 15px;
  overflow: hidden;
}

.avatar img {
  width: 100%;
  vertical-align: 0px;
}

ul.menu li {
  font-size: 13px;
  font-weight: 700;
  padding: 0 16px;
  margin-right: 5px;
  line-height: 3em;
  text-transform: uppercase;
  border-radius: 4px;
  box-shadow: -4px 3px 0px 0px rgb(0 0 0 / 0%);
  background-color: transparent;
}

ul.menu li:last-child {
  margin-right: 0px;
  padding-right: 0px;
}

ul.menu li a:hover {
  color: rgb(0, 108, 240);
  transition: color 300ms linear;
}


h4 {
  font-weight: 700;
  text-transform: uppercase;
  display: inline-block;
  vertical-align: middle;
  color: #fff;
  position: relative;
}

h5:first-child {
  font-size: 20px;
  color: rgb(0, 0, 0);
  text-transform: uppercase;
  font-weight: 600;
}

.group-infor {
  background-image: url('assets/laptop.jpg');
  background-color: rgb(96, 139, 141);
  background-repeat: none;
  background-size: 100%;
  min-height: 300px;
  color: white;
  padding-top: 20px;
}

.group-infor a {
  color: rgb(255, 255, 255);
}

.register {
  background-color: #edf1f5;
  padding: 20px;
  border-radius: 5px;
  margin-top: 80px !important;
}
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

/* .title {
  position: fixed;
  right: 0;
  top: 60px;
} */
td,
th {
  border: 1px solid #dbdada;
  text-align: left;
  padding-left: 5px;
}
th input {
  height: 18px;
}
td p {
  margin-bottom: 5px;
  font-style: italic;
  font-size: 14px;
}
th {
  text-align: center;
  color: white;
  background-color: #083253;
  padding: 10px 0;
}
td:nth-child(1), td:nth-child(5) {
  text-align: center;
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
