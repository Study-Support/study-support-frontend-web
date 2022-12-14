<template>
  <div>
    <BContainer fluid class="header">
      <BContainer>
        <BRow class="content">
          <BCol class="header-content col-12 col-lg-6">
            <BRow class="mb-4">
              <h2 class="col slogan">ĐỘI NGŨ MENTOR</h2>
            </BRow>
            <BRow class="mb-4">
              <p class="col idiom col-12 col-auto">
                Học… học để là chính mình, và học để từ bỏ với vẻ thanh cao
                những gì không phải là mình.
              </p>
            </BRow>
            <BRow class="">
              <BCol>
                <div class="input-group search">
                  <input
                    v-model="filter.a.search"
                    class="form-control border-end-0 border"
                    type="search"
                    placeholder="Tìm kiếm theo tên"
                  />
                  <span class="input-group-append">
                    <button
                      class="btn btn-outline-secondary bg-white border-start-0 border-bottom-0 border ms-n5"
                      type="button"
                      @click.prevent="submit"
                    >
                      <BIconSearch />
                    </button>
                  </span>
                </div>
              </BCol>
            </BRow>
          </BCol>
        </BRow>
      </BContainer>
    </BContainer>
    <BContainer>
      <div class="full-filter">
        <p class="">
          Lọc kết quả
          <BIconCheck2Circle />
        </p>
        <BRow class="filter">
          <BCol class="col-4">
            <select
              v-model="faculty.faculty_id"
              class="form-select col"
              required
            >
              <option value="" disabled selected>Chọn khoa</option>
              <option
                v-for="faculty in faculties"
                :key="faculty.id"
                :value="faculty.id"
              >
                {{ faculty.name }}
              </option>
            </select>
          </BCol>
          <BCol class="col-4">
            <select
              v-model="filter.a.subject_id"
              class="form-select col"
              required
            >
              <option value="" disabled selected>Chọn môn học</option>
              <option
                v-for="subject in subjects"
                :key="subject.id"
                :value="subject.id"
              >
                {{ subject.name }}
              </option>
            </select>
          </BCol>
          <BCol class="text-end col-auto">
            <SubmitButton
              class="submit-button"
              :is-disabled="isDisabledButton"
              :content="'Tìm kiếm'"
              :color="'rgb(63 88 120)'"
              @click.prevent="submit"
            />
          </BCol>
        </BRow>
      </div>
      <BRow class="result pb-5">
        <BCol
          v-for="mentor in MentorsResult"
          :key="mentor.id"
          class="col-6 col-md-3 mt-4"
        >
          <MentorDetail :mentor="mentor" />
        </BCol>
        <div class="loader">
          <InfiniteLoading v-if="loading" class="loading" @infinite="load" />
        </div>
      </BRow>
    </BContainer>
  </div>
</template>
<script setup>
import { BIconSearch, BIconCheck2Circle } from 'bootstrap-icons-vue'
import InfiniteLoading from 'v3-infinite-loading'
import 'v3-infinite-loading/lib/style.css'

definePageMeta({
  layout: 'page',
  middleware: 'authenticated',
})
const faculty = ref({
  faculty_id: '',
})
const MentorsResult = ref([])
const faculties = ref([])
const subjects = ref([])
const loading = ref(true)
const route = useRoute()
const router = useRouter()
const isDisabledButton = ref(false)
const { getConfig } = useConfig()

const filter = ref({
  a: {
    search: route.query.search === undefined ? '' : route.query.search,
    faculty_id: route.query.faculty === undefined ? '' : route.query.faculty,
    subject_id:
      route.query.subject_id === undefined ? '' : route.query.subject_id,
    page: route.query.page === undefined ? 1 : route.query.page,
  },
})
const { url: urlMentors } = useUrl({
  path: '/mentors',
  queryParams: filter.value.a,
})
// Lấy Mentors theo filter
const {
  data: dataGetFilterMentors,
  get: getFilterMentors,
  onFetchResponse: getFilterMentorsResponse,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(urlMentors, { immediate: false })
getFilterMentorsResponse(() => {
  isDisabledButton.value = false
  if (dataGetFilterMentors.value.data.data.length !== 0) {
    MentorsResult.value = MentorsResult.value.concat(
      dataGetFilterMentors.value.data.data
    )
  }
  if (
    dataGetFilterMentors.value.data.data.length <
    getConfig('constants.pagination')
  ) {
    loading.value = false
  }
})

// Tạo url môn học theo khoa
const { url: url1 } = useUrl({
  path: '/subjects',
  queryParams: faculty.value,
})
const {
  data: dataFaculty,
  get: getFaculty,
  onFetchResponse: getFacultyResponse,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: true,
})('/faculties', { immediate: false })
const {
  data: dataSubject,
  get: getSubject,
  onFetchResponse: getSubjectResponse,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: true,
})(url1, { immediate: false })

const load = () => {
  setTimeout(() => {
    getFilterMentors().json().execute()
    filter.value.a.page += 1
  }, 100)
}
const submit = () => {
  filter.value.a.page = 1
  router.replace({
    path: '/mentors',
    query: filter.value.a,
  })
  MentorsResult.value = []
  isDisabledButton.value = true
}

getFaculty().json().execute()
getFacultyResponse(() => {
  faculties.value = dataFaculty.value.data.data
})
getSubjectResponse(() => {
  subjects.value = dataSubject.value.data.data
})
watch(faculty.value, () => {
  getSubject().json().execute()
  filter.value.a.faculty_id = faculty.value.faculty_id
})
</script>
<style scoped>
h2,
p {
  color: white;
}

h2 {
  font-weight: 600;
  font-size: 27px;
}

.header {
  background-image: url('assets/mentors/mentor1.png');
  background-color: rgb(96, 139, 141);
  background-repeat: none;
  background-size: 100%;
}

.header .content {
  padding: 100px 0 60px 0;
}

.header-content {
  margin-top: 20px;
}

.idiom {
  text-align: left;
  line-height: 28px;
  letter-spacing: 0px;
  font-size: 19px;
}

.search {
  display: inline-block;
  color: black;
  width: 400px;
  z-index: 0;
}

.search input {
  margin-right: 0;
  width: 70%;
  display: inline-block;
  border-radius: 4px 0 0 4px !important;
}

.search button {
  border-radius: 0 4px 4px 0;
  margin-bottom: 2px;
  height: 35px;
  padding: 0 9px;
  display: inline-block;
  border-left: 1px solid rgb(223, 223, 223) !important;
  color: black;
}

.search button:hover svg {
  color: rgb(7, 30, 95);
}

.filter {
  background-color: rgb(139, 173, 186);
  margin: 0 0 30px 0;
  padding: 20px;
}

.submit-button >>> button {
  margin: 0 !important;
  padding: 0 40px;
  height: 38px;
}

.full-filter p {
  color: black;
  margin-bottom: 5px;
  margin-top: 20px;
}

.result > p {
  display: flex;
}

.loading :deep(div) {
  margin: auto;
  margin-top: 10px;
}

.loader {
  width: 90%;
  margin: auto;
}
</style>
