<template>
  <BContainer class="pt-3">
    <BRow>
      <BCol class="pb-3">
        <h5>>> Đăng ký là thành viên của nhóm</h5>
      </BCol>
    </BRow>
    <BRow>
      <BCol class="col-4">
        <div class="img">
          <img src="/assets/groups/g1.png" alt="">
        </div>
      </BCol>
      <BCol class="group-infor">
        <h4 class="pt-3 pb-4"> {{ group.subject }}</h4>
        <p> <span>Khoa:</span> {{ group.faculty }} </p>
        <p class="title">
          <span>
            Tóm tắt thông tin:
          </span>
          {{ group.title }}
        </p>
        <span>Thông tin chi tiết</span>
        <p class="information">
          {{ group.information }}
        </p>
      </BCol>
    </BRow>
    <BRow class="mt-3">
      <BCol>
        <p><span>Thành viên hiện có:</span> {{ group.quantity }} thành viên</p>
        <div v-for="(member, index) in group.members" :key="member.id">
          <p class="mb-0"> {{ index + 1 }}. {{ member.full_name }} _ Khoa: {{ member.faculty }}</p>
        </div>
        <div class="mt-5 register">
          <h5 class="text-center pb-3" for="">Thông tin kiểm duyệt đăng ký thành viên</h5>
          <p class="notice-success" v-if="statusShow === 2">
            <span>Đăng ký đã thực hiện thành công!.</span>
            Bây giờ bạn là thành viên của nhóm học trên. Nhà trường thể thực hiện xóa bạn ra khỏi nhóm nếu nhận thấy thông tin bạn cũng cấp sai lệch trước khi nhóm chuyển sang giai đoạn tìm người hướng dẫn và bắt đầu học.</p>
          <form @submit.prevent="submit" v-if="statusShow === 1">
            <div role="group">
              <label for="">Bạn gặp khó khăn gì trong môn học này?</label>
              <BFormTextarea v-model="register_inform.difficult"
                :state="validationErrorMessages.difficult === undefined ? null : false"
                aria-describedby="input-live-help input-live-feedback" placeholder="Khó khăn" trim required class="" />
              <BFormInvalidFeedback>
                <ValidationErrorMessage :messages="validationErrorMessages.difficult" />
              </BFormInvalidFeedback>
            </div>

            <div role="group">
              <label for="">Bạn mong muốn đạt được gì khi tham gia nhóm học?</label>
              <BFormTextarea v-model="register_inform.target"
                :state="validationErrorMessages.target === undefined ? null : false"
                aria-describedby="input-live-help input-live-feedback" placeholder="Mong muốn" trim required class="" />
              <BFormInvalidFeedback>
                <ValidationErrorMessage :messages="validationErrorMessages.target" />
              </BFormInvalidFeedback>
            </div>
            <div role="group">
              <label for="">Bạn có ý kiến gì không muốn gửi không?</label>
              <BFormInput v-model="register_inform.note"
                :state="validationErrorMessages.note === undefined ? null : false"
                aria-describedby="input-live-help input-live-feedback" placeholder="Ý kiến cá nhân" trim required
                class="" />
              <BFormInvalidFeedback>
                <ValidationErrorMessage :messages="validationErrorMessages.note" />
              </BFormInvalidFeedback>
            </div>

            <div role="group">
              <label for="">Bạn có đảm bảo sẽ học tập chăm chỉ, nghiêm túc không? Nếu đánh giá không tốt về thái độ
                trong quá trình học, nhà trường sẽ đánh giá rèn luyện vì thái độ học tập</label>
              <BFormCheckbox id="checkbox-1" v-model="register_inform.confirm" name="checkbox-1" value="agreed"
                unchecked-value="not_agreed">
                Tôi đảm bảo
              </BFormCheckbox>
              <span class="confirm-error" v-if="showConfirmError">Bạn phải đảm bảo thông tin trên!</span>
            </div>

            <div class="text-end">
              <SubmitButton class="mt-3 submit-button" :isDisabled="isDisabledButton" :content="'Đăng ký tham gia'"
                :color="'rgb(63 88 120)'" />
            </div>
          </form>
        </div>
      </BCol>
    </BRow>
  </BContainer>
</template>
  
<script setup>
// link đã kiểm tra liệu người dùng đã đăng ký nhóm chưa (Kiểm tra trong list member có user k)
// link đã kiểm tra liệu id nhóm ở link đúng là status là 1_tìm member k
definePageMeta({
  layout: 'page',
  middleware: 'authenticated',
});
const route = useRoute();
const isDisabledButton = ref(false);
const showConfirmError = ref(false);
const { errorAlert } = useAlert();
const statusShow = ref(0);
const group = ref({
  id: '',
  faculty: '',
  subject: '',
  title: '',
  information: '',
  quantity: '',
  status: '',
  members: [
    {
      full_name: '',
      faculty: '',
    }
  ]
});
const register_inform = ref({
  difficult: '',
  target: '',
  note: '',
  confirm: 'not_agreed',
})
const validationErrorMessages = ref({
});
const {
  data: dataGetGroup,
  get: getGroup,
  onFetchResponse: getGroupRes,
  onFetchError: getGroupErr,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(
  `groups/${route.params.id}`,
  { immediate: false },
)

const {
  data: dataMember,
  post: postMember,
  onFetchResponse: postMemberRes,
  onFetchError: postMemberErr,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(
  `/groups/${route.params.id}/register`,
  { immediate: false },
)

// Lấy thông tin user
const {
  data: dataGetMe,
  get: getMe,
  onFetchResponse: getMeResponse,
  onFetchError: getMeError,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(
  '/user',
  {immediate: false},
);

getMeResponse(() => {
  if(group.value.members.find(member => member.id === dataGetMe.value.data.id)) {
    statusShow.value = 2;
  } else {
    statusShow.value = 1;
  }
});
getMeError(() => {
  // deleteToken();
});

getGroup().json().execute();
getGroupRes(() => {
  group.value = dataGetGroup.value.data.data
  if(group.value.status === 1) {
    getMe().json().execute();
  }
  else {
    alert("Nhóm hiện không tìm thành viên!");
    navigateTo('/groups?type=all');
  }
});

postMemberRes(() => {
  isDisabledButton.value = false;
  getGroup().json().execute();
});
postMemberErr(() => {
  isDisabledButton.value = false;
  errorAlert(dataMember.value.meta.error_message);
})
const submit = () => {
  isDisabledButton.value = true;
  showConfirmError.value = false;
  if (register_inform.value.confirm !== 'agreed') {
    showConfirmError.value = true;
    isDisabledButton.value = false;
  } else {
    postMember(register_inform.value).json().execute();
  }
}
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
  font-size: 25px;
  font-weight: 700;
  color: rgb(0, 13, 154);
}

h5:first-child {
  font-size: 23px;
  color: rgb(0, 85, 119);
}
h5:last-child {
  font-size: 18px;
  color: rgb(0, 85, 119);
  font-weight: 600;
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

.submit-button>>>button {
  width: 200px;
}

form>div {
  margin-top: 10px;
}

.confirm-error {
  color: red;
  font-size: 13px;
}
.notice-success span {
  font-weight: 600;
  color: green;
}
</style>
  