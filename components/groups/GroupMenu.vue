<template>
  <div class="full">
    <h5>Nhóm học</h5>
    <button class="mt-2" @click="choose===1?choose=0:choose=1">Bạn là thành viên</button>
    <div class="group1" :class="`s${choose}`">
      <button v-for="group in groupsIsMember" :key="group.id" class="d-block" @click="navigateTo(`/groups/${group.id}`)">
        <BIconPeopleFill class="me-2" />
        <span style="background-color: transparent">{{ group.subject }}</span>
      </button>
    </div>
    <button class="mt-2" @click="choose===2?choose=0:choose=2">Bạn là người hướng dẫn</button>
    <div class="group2" :class="`s${choose}`">
      <button v-for="group in groupsIsMentor" :key="group.id" class="d-block" @click="navigateTo(`/groups/${group.id}`)">
        <BIconPeopleFill class="me-2" />
        <span style="background-color: transparent">{{ group.subject }}</span>
      </button>
    </div>
    <h5 class="pt-3">Yêu cầu chờ duyệt</h5>
    <button class="mt-2" @click="choose===3?choose=0:choose=3">Tạo nhóm học</button>
    <div class="group3" :class="`s${choose}`">
      <button v-for="group in groupsIsRequireMentor" :key="group.id" class="d-block" @click="navigateTo(`/groups/${group.id}`)">
        <BIconPeopleFill class="me-2" />
        <span style="background-color: transparent" class="subject">
          {{ group.subject }}
        </span>
      </button>
    </div>

    <button class="mt-2" @click="choose===4?choose=0:choose=4">Bạn là người hướng dẫn</button>
    <div class="group4" :class="`s${choose}`">
      <button v-for="group in groupsIsRequireGroup" :key="group.id" class="d-block" @click="navigateTo(`/groups/${group.id}`)">
        <BIconPeopleFill class="me-2" />
        <span style="background-color: transparent" class="subject">
          {{ group.subject }}
        </span>
      </button>
    </div>
  </div>
</template>

<script setup>
import {BIconPeopleFill} from 'bootstrap-icons-vue';

const choose = ref(0)
const groupsIsMember = ref([]);
const groupsIsMentor = ref([]);
const groupsIsRequireGroup = ref([]);
const groupsIsRequireMentor = ref([]);

// Tạo url lấy groups user đang tham gia học
const { url: url1 } = useUrl({
  path: 'user/groups',
  queryParams: {
    is_mentor: 0,
    status: 1,
  },
});
// Tạo url lấy groups user đang tham gia học
const { url: url2 } = useUrl({
  path: 'user/groups',
  queryParams: {
    is_mentor: 1,
    status: 1
  },
});
// Tạo url lấy groups user đang tham gia học
const { url: url3 } = useUrl({
  path: 'user/groups',
  queryParams: {
    status: 0,
  },
});
// Tạo url lấy groups user đang tham gia học
const { url: url4 } = useUrl({
  path: 'user/groups',
  queryParams: {
    status: 0,
  },
});

// Lấy groups của user đang đăng nhập
const {
  data: dataGetgroupsIsMember,
  get: getgroupsIsMember,
  onFetchResponse: getgroupsIsMemberResponse,
  onFetchError: getgroupsIsMemberError,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(
  url1,
  { immediate: false },
);


// Lấy groups của user đang đăng nhập
const {
  data: dataGetgroupsIsRequireMentor,
  get: getgroupsIsRequireMentor,
  onFetchResponse: getgroupsIsRequireMentorResponse,
  onFetchError: getgroupsIsRequireMentorError,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(
  url2,
  { immediate: false },
);

// Lấy groups của user đang đăng nhập
const {
  data: dataGetgroupsIsMentor,
  get: getgroupsIsMentor,
  onFetchResponse: getgroupsIsMentorResponse,
  onFetchError: getgroupsIsMentorError,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(
  url3,
  { immediate: false },
);

// Lấy groups của user đang đăng nhập
const {
  data: dataGetgroupsIsRequireGroup,
  get: getgroupsIsRequireGroup,
  onFetchResponse: getgroupsIsRequireGroupResponse,
  onFetchError: getgroupsIsRequireGroupError,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(
  url4,
  { immediate: false },
);


getgroupsIsMember().json().execute();
getgroupsIsMemberResponse(() => {
  groupsIsMember.value = dataGetgroupsIsMember.value.data.data;
});

getgroupsIsMentor().json().execute();
getgroupsIsMentorResponse(() => {
  groupsIsMentor.value = dataGetgroupsIsMentor.value.data.data;
});

getgroupsIsRequireMentor().json().execute();
getgroupsIsRequireMentorResponse(() => {
  groupsIsRequireMentor.value = dataGetgroupsIsRequireMentor.value.data.data;
});

getgroupsIsRequireGroup().json().execute();
getgroupsIsRequireGroupResponse(() => {
  groupsIsRequireGroup.value = dataGetgroupsIsRequireGroup.value.data.data;
});
</script>

<style scoped>
* {
  color: white;
}
button {
  border: none;
  background-color: transparent;
  text-align: left;
  margin: 10px 0;
}
.full>button {
  display: block;
  width: 100%;
  background-color: rgb(49, 51, 77);
  margin-bottom: 0;
  padding: 7px;
}
.group1, .group2, .group3, .group4{
  height: 0;
  overflow: hidden;
  transition: all .3s ease-in;
  background-color: rgb(86, 86, 130);
  font-size: 13px;
  padding: 0 10px;
}
.group1.s1, .group2.s2, .group3.s3, .group4.s4 {
  height: 230px;
}

.subject span{
  font-size: 13px;
  background-color: rgb(158, 89, 89);
}
h5 {
  font-size: 17px;
  color: rgb(57, 115, 180);
  font-weight: 600;
}
</style>
