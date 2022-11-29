<template>
  <BContainer fluid>
    <BRow>
      <BCol class="filter col-12 col-md-3 pt-3">
        <label for="search"> Tìm kiếm tên môn học </label>
        <div class="input-group search" id="search">
          <input v-model="filter.a.search" class="form-control border" type="search" placeholder="Môn học">
        </div>
        <div class="mt-3">
          <label for="type">Chọn loại nhóm học</label>
          <select v-model="filter.a.type" class="form-select mt-1" id="type">
            <option :value="getConfig('constants.typeOfGroup.all')">
              Tất cả
            </option>
            <option :value="getConfig('constants.typeOfGroup.findMentor')">
              Nhóm tìm người hướng dẫn
            </option>
            <option :value="getConfig('constants.typeOfGroup.findMember')">
              Nhóm tìm thành viên
            </option>
            <option :value="getConfig('constants.typeOfGroup.selfStudy')">
              Nhóm tự học
            </option>
          </select>
        </div>
        <div class="mt-3">
          <label>Chọn khoa</label>
          <select v-model="filter.a.faculty" class="form-select mt-1" required>
            <option value="" disabled selected>Chọn khoa</option>
            <option v-for="faculty in faculties" :key="faculty.id" :value="faculty.id">
              {{ faculty.name }}
            </option>
          </select>
        </div>
        <SubmitButton class="mt-3" :isDisabled="isDisabledButton" :content="'Tìm kiếm'" :color="'rgb(63 88 120)'"
          @click.prevent="search" />
      </BCol>
      <BCol class="pt-3">
        <BRow class="text-end">
          <BCol class="register">
            <button @click="navigateTo('/groups/create')">Đăng ký nhu cầu tạo nhóm</button>
          </BCol>
        </BRow>
        <BRow>
          <BCol class="result pt-2">
            <table>
              <tr class="title">
                <th>STT</th>
                <th>Khoa</th>
                <th>Môn học</th>
                <th>Thành viên hiện tại</th>
                <th>Tham gia nhóm</th>
              </tr>
              <tr v-for="(group, index) in groupsResult" :key="group.id">
                <td>{{ index }}</td>
                <td>{{ group.faculty }}</td>
                <td>{{ group.subject }}</td>
                <td>{{ group.quantity }}</td>
                <td>
                  <button @click="join(group)">
                    Tham gia
                  </button>
                </td>
              </tr>
            </table>
            <div class="loader">
              <InfiniteLoading v-if="loading" class="loading" @infinite="load" />
            </div>
          </BCol>
        </BRow>
      </BCol>
    </BRow>
  </BContainer>
</template>
<script setup>
import { BIconSearch, BIconPlusSquare } from 'bootstrap-icons-vue';
import InfiniteLoading from 'v3-infinite-loading';
import 'v3-infinite-loading/lib/style.css';

definePageMeta({
  layout: 'page',
  middleware: 'authenticated',
});

const route = useRoute();
const router = useRouter();
const { getConfig } = useConfig();
const groupsResult = ref([]);
const loading = ref(true);
const isDisabledButton = ref(false);
const filter = ref(
  {
    a: {
      search: route.query.search === undefined ? '' : route.query.search,
      faculty: route.query.faculty === undefined ? '' : route.query.faculty,
      type: route.query.type === undefined ? '' : route.query.type,
      page: route.query.page === undefined ? 1 : route.query.page,
    }
  }
);
const faculties = ref([]);
const { url: urlGroups } = useUrl({
  path: '/groups',
  queryParams: filter.value.a
});
// Lấy groups theo filter
const {
  data: dataGetFilterGroups,
  get: getFilterGroups,
  onFetchResponse: getFilterGroupsResponse,
  onFetchError: getFilterGroupsError,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(
  urlGroups,
  { immediate: false },
)
getFilterGroupsResponse(() => {
  isDisabledButton.value = false;
  if (dataGetFilterGroups.value.data.data.length !== 0) {
    groupsResult.value = groupsResult.value.concat(dataGetFilterGroups.value.data.data);
  }
  if (dataGetFilterGroups.value.data.data.length < getConfig('constants.pagination')) {
    loading.value = false;
  }
})

const {
  data: dataFaculty,
  get: getFaculty,
  onFetchResponse: getFacultyResponse,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: true,
})(
  '/faculties',
  { immediate: false },
);
getFaculty().json().execute();
getFacultyResponse(() => {
  faculties.value = dataFaculty.value.data.data;
})

const search = () => {
  filter.value.a.page = 1;
  router.replace({
    path: '/groups',
    query: filter.value.a,
  });
  filter.value.a.page = 0;
  groupsResult.value = [];
  isDisabledButton.value = true;
}
// Lấy dữ liệu groups kèm đk theo paginate
const load = () => {
  setTimeout(() => {
    getFilterGroups().json().execute();
    filter.value.a.page += 0;
  }, 100);
};
const join = (group) => {
  if (group.status === 1) {
    navigateTo(`/groups/${group.id}/register-is-member`);
  }
  if (group.status === 2) {
    navigateTo(`/groups/${group.id}/register-is-mentor`);
  }
}
</script>
<style scoped>
label {
  color: rgb(0, 0, 0);
  font-size: 14.5px;
}

span {
  font-size: 12px;
  padding: 5px;
}

.findMember {
  color: rgb(0, 188, 0);
}

.findMentor {
  color: rgb(194, 0, 0);
}

.selfStudy {
  color: rgb(220, 201, 0);
}

.filter,
.result {
  min-height: calc(100vh - 100px);
}

.filter {
  background-color: #F6F8FC;
}

.filter label {
  font-weight: 600;
}

.filter select {
  font-weight: 500;
  color: #585858 !important;
  font-size: smaller;
}

.result {
  height: calc(100vh - 100px);
  overflow: auto;
}

th:nth-child(1),
.td:nth-child(1) {
  width: 5%;
}

th:nth-child(2),
.td:nth-child(1) {
  width: 30%;
}

th:nth-child(3),
.td:nth-child(2) {
  width: 30%;
}

.th:nth-child(4),
.td:nth-child(3) {
  width: 10%;
}

.th:nth-child(5),
.td:nth-child(4) {
  width: 25%;
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
  padding: 8px;
}

th {
  text-align: center;
  color: white;
  background-color: #075794;
}

td:nth-child(1),
td:nth-child(4),
td:nth-child(5) {
  text-align: center;
}

td:nth-child(4) button {
  border: 1px solid black;
  border-radius: 2px;
}

td:nth-child(1) {
  color: rgb(0, 119, 128);
}

tr:nth-child(even) {
  background-color: #efefef;
}

td button {
  border: 0.5px solid rgb(81, 81, 81);
}

.search {
  display: inline-block;
  color: black;
  text-align: center;
}

.search input {
  margin: 0px;
  margin-right: 0;
  width: 100%;
  display: inline-block;
  border-radius: 4px !important;
}

.search button:hover svg {
  color: rgb(7, 30, 95)
}

.loading :deep(div) {
  margin: auto;
  margin-top: 10px;
}

.loader {
  width: 90%;
  margin: auto;
}

.register button {
  color: rgb(0, 0, 0);
  border: none;
  font-size: 16px;
  background-color: transparent;
  padding: 5px 10px 5px 0px;
  text-decoration: underline;
}
</style>
