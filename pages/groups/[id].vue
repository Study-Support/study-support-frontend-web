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
        <h4 class="pt-3 pb-4"> {{group.subject}}</h4>
        <p> <span>Khoa:</span> {{group.faculty}} </p>
        <p class="title">
          <span>
            Tóm tắt thông tin:
          </span>
          {{group.title}}
        </p>
        <span>Thông tin chi tiết</span>
        <p class="information">
          {{group.information}}
        </p>
      </BCol>
    </BRow>
    <BRow class="mt-3">
      <BCol>
        <p><span>Thành viên hiện có:</span> {{group.quantity}} thành viên</p>
        <div v-for="(member, index) in group.members" :key="member.id">
          <p class="mb-0"> {{index + 1}}. {{member.full_name}} _ Khoa: {{member.faculty}}</p>
        </div>
        <div class="mt-5 register">
          <h5 class="text-center pb-3" for="">Thông tin kiểm duyệt đăng ký thành viên</h5>
          <form @submit.prevent="submit">
            <div role="group">
              <label for="">Bạn gặp khó khăn gì trong môn học này?</label>
              <BFormTextarea v-model="register_inform.difficult" :state="validationErrorMessages.difficult === undefined ? null : false"
                aria-describedby="input-live-help input-live-feedback" placeholder="Khó khăn" trim required
                class="" />
              <BFormInvalidFeedback>
                <ValidationErrorMessage :messages="validationErrorMessages.difficult" />
              </BFormInvalidFeedback>
            </div>

            <div role="group">
              <label for="">Bạn mong muốn đạt được gì khi tham gia nhóm học?</label>
              <BFormTextarea v-model="register_inform.target" :state="validationErrorMessages.target === undefined ? null : false"
                aria-describedby="input-live-help input-live-feedback" placeholder="Mong muốn" trim required
                class="" />
              <BFormInvalidFeedback>
                <ValidationErrorMessage :messages="validationErrorMessages.target" />
              </BFormInvalidFeedback>
            </div>
            <div role="group">
              <label for="">Bạn có ý kiến gì không muốn gửi không?</label>
              <BFormInput v-model="register_inform.note" :state="validationErrorMessages.note === undefined ? null : false"
                aria-describedby="input-live-help input-live-feedback" placeholder="Ý kiến cá nhân" trim required
                class="" />
              <BFormInvalidFeedback>
                <ValidationErrorMessage :messages="validationErrorMessages.note" />
              </BFormInvalidFeedback>
            </div>

            <div role="group">
              <label for="">Bạn có đảm bảo sẽ học tập chăm chỉ, nghiêm túc không? Nếu đánh giá không tốt về thái độ trong quá trình học, nhà trường sẽ đánh giá rèn luyện vì thái độ học tập</label>
              <BFormCheckbox
                id="checkbox-1"
                v-model="register_inform.confirm"
                name="checkbox-1"
                value="agreed"
                unchecked-value="not_agreed"
              >
                Tôi đảm bảo
              </BFormCheckbox>
            </div>
            
            <div class="text-end">
              <SubmitButton class="mt-3 submit-button" :isDisabled="isDisabledButton" :content="'Đăng ký tham gia'" :color="'rgb(63 88 120)'" />
            </div>
          </form>
        </div>
      </BCol>
    </BRow>
  </BContainer>
</template>

<script setup>
definePageMeta({
  layout: 'page',
  middleware: 'authenticated',
});
const route = useRoute();
const isDisabledButton  = ref(false);
const groupId = ref({
  group_id: '',
})
const group = ref({
  id: '',
  faculty: '',
  subject: '',
  title: '',
  information: '',
  quantity: '',
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
  {immediate: false},
)

const {url: urlMember} = useUrl({
  path: `/member`,
  queryParams: groupId.value,
});
const {
  data: dataMemberGroup,
  post: postMember,
  onFetchResponse: postMemberRes,
  onFetchError: postMemberErr,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(
  urlMember,
  {immediate: false},
)
getGroup().json().execute();
getGroupRes(() => {
  group.value = dataGetGroup.value.data.data;
  groupId.value.group_id = group.value.id;
});

postMemberRes(() => {

});
const submit = () => {
  postMember(register_inform.value).json().execute();

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
h5 {
  font-size: 17px;
  color: rgb(0, 85, 119);
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
.submit-button >>> button {
  width: 200px;
}
form> div {
  margin-top: 10px;
}
</style>
