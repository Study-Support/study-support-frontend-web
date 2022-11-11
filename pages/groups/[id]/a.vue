<template>
    <BContainer class="pt-3">
      <BRow>
        <BCol class="pb-3">
          <h5>>> Đăng ký là người hướng dẫn của nhóm {{statusShow}}</h5>
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
          <p class="quantity"><span>Thành viên:</span> {{ group.quantity }} thành viên</p>
          <div v-for="(member, index) in group.members" :key="member.id">
            <p class="mb-0"> {{ index + 1 }}. {{ member.full_name }} _ Khoa: {{ member.faculty }}</p>
          </div>
          <div class="mt-5 register">
            <h5 class="text-center mb-3" for="">Thông tin kiểm duyệt đăng ký là người hướng dẫn:</h5>
            <p class="notice-success mb-2" v-if="statusShow === 2">
              <span>Bạn đã đăng ký làm người hướng dẫn của nhóm!.</span>
              Nhà trường sẽ xem xét thông tin bạn đăng ký, theo dõi email để cập nhật thông tin nhé.
              <span class="pt-4 mb-0">Thông tin của bạn:</span>
            </p>
            <div>
              <label for="" class="pb-3">Tôi đã tìm hiểu kỹ về Thông báo tuyển chọn sinh viên tham gia hướng dẫn, hỗ
                trợ học tập (Mentor) của Trường. Tôi nhận thấy bản thân đáp ứng các tiêu chuẩn của Mentor và đăng ký làm
                Mentor cho học phần {{ group.subject }}</label>
              <form @submit.prevent="submit">
                <div role="group">
                  <label>1. Thành tích bạn đạt được ở môn học này. <span>Bỏ hết vào một thư mục và chia sẻ link đường dẫn ở
                      chế độ xem public.</span></label>
                  <BFormInput v-model="register_inform.cv_link"
                    :state="validationErrorMessages.cv_link === undefined ? null : false" placeholder="Link thành tích" trim
                    required class="" />
                  <BFormInvalidFeedback>
                    <ValidationErrorMessage :messages="validationErrorMessages.cv_link" />
                  </BFormInvalidFeedback>
                </div>
                <div role="group">
                  <label>2. Kế hoạch công việc dự kiến:</label>
                  <BFormTextarea v-model="register_inform.schedule"
                    :state="validationErrorMessages.schedule === undefined ? null : false"
                    aria-describedby="input-live-help input-live-feedback" placeholder="Kế hoạch dự kiến" trim required
                    class="" />
                  <BFormInvalidFeedback>
                    <ValidationErrorMessage :messages="validationErrorMessages.schedule" />
                  </BFormInvalidFeedback>
                </div>
  
                <div role="group">
                  <label for="">3. Tài khoản ngân hàng?<span>Bao gồm số tài khoản và tên ngân hàng.</span></label>
                  <BFormTextarea v-model="register_inform.smart_banking"
                    :state="validationErrorMessages.smart_banking === undefined ? null : false"
                    aria-describedby="input-live-help input-live-feedback" placeholder="Tài khoản ngân hàng" trim required
                    class="" />
                  <BFormInvalidFeedback>
                    <ValidationErrorMessage :messages="validationErrorMessages.smart_banking" />
                  </BFormInvalidFeedback>
                </div>
                <div role="group">
                  <label for="">4. Bạn có ý kiến gì không muốn gửi không?</label>
                  <BFormInput v-model="register_inform.note"
                    :state="validationErrorMessages.note === undefined ? null : false"
                    aria-describedby="input-live-help input-live-feedback" placeholder="Ý kiến cá nhân" trim required
                    class="" />
                  <BFormInvalidFeedback>
                    <ValidationErrorMessage :messages="validationErrorMessages.note" />
                  </BFormInvalidFeedback>
                </div>
  
                <div role="group">
                  <label for="">5. Bạn có đảm bảo sẽ hướng dẫn nghiêm túc, hết sức mình không? Nếu đánh giá không tốt về
                    thái độ trong quá trình hướng dẫn, nhà trường sẽ đánh giá rèn luyện vì thái độ học tập</label>
                  <BFormCheckbox id="checkbox-1" v-model="register_inform.confirm" name="checkbox-1" value="agreed"
                    unchecked-value="not_agreed">
                    Tôi đảm bảo
                  </BFormCheckbox>
                  <span class="confirm-error" v-if="showConfirmError">Bạn phải đảm bảo thông tin trên!</span>
                </div>
  
                <div class="text-end"  v-if="statusShow === 1">
                  <SubmitButton class="mt-3 submit-button" :isDisabled="isDisabledButton" :content="'Đăng ký tham gia'"
                    :color="'rgb(63 88 120)'" 
                    />
                </div>
                <div class="text-end"  v-if="statusShow === 2">
                  <SubmitButton class="mt-3 me-3 submit-button" :isDisabled="isDisabledButton" :content="'Chỉnh sửa thông tin'"
                    :color="'rgb(23 131 27)'"
                    @click.prevent="update"/>
                  <SubmitButton class="mt-3 submit-button" :isDisabled="isDisabledButton" :content="'Hủy đăng ký'"
                    :color="'rgb(255 57 57)'" 
                    @click.prevent="deletee"
                    />
                </div>
              </form>
            </div>
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
  const isDisabledButton = ref(false);
  const showConfirmError = ref(false);
  const { errorAlert, successAlert } = useAlert();
  const statusShow = ref(0);

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
    cv_link: '',
    schedule: '',
    smart_banking: '',
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
  // Lấy thông tin cv của user đk cho nhóm đó
  const {
    data: dataCv,
    get: getCv,
    onFetchResponse: getCvRes,
    onFetchError: getCvErr,
  } = useFetchApi({
    requireAuth: true,
    disableHandleErrorUnauthorized: false,
  })(
    `/groups/${route.params.id}/register-mentor`,
    { immediate: false },
  )
  // đăng ký là mentor
  const {
    data: dataMentor,
    post: postMentor,
    onFetchResponse: postMentorRes,
    onFetchError: postMentorErr,
  } = useFetchApi({
    requireAuth: true,
    disableHandleErrorUnauthorized: false,
  })(
    `/groups/${route.params.id}/register`,
    { immediate: false },
  )
  // update mentor
  const {
    data: dataMentorPut,
    put: putMentor,
    onFetchResponse: putMentorRes,
    onFetchError: putMentorErr,
  } = useFetchApi({
    requireAuth: true,
    disableHandleErrorUnauthorized: false,
  })(
    `/groups/${route.params.id}/register`,
    { immediate: false },
  )
  // Xóa mentor
  const {
    data: dataMentordel,
    delete: delMentor,
    onFetchResponse: delMentorRes,
    onFetchError: delMentorErr,
  } = useFetchApi({
    requireAuth: true,
    disableHandleErrorUnauthorized: false,
  })(
    `/groups/${route.params.id}/register`,
    { immediate: false },
  )
  
  // Lấy thông tin cv của user với môn đó
  const {
    data: dataCvSubject,
    get: getCvSubject,
    onFetchResponse: getCvSubjectRes,
    onFetchError: getCvSubjectErr,
  } = useFetchApi({
    requireAuth: true,
    disableHandleErrorUnauthorized: false,
  })(
    `/mentor-information/${route.params.id}`,
    { immediate: false },
  )
  
  getGroup().json().execute();
  getGroupRes(() => {
    group.value = dataGetGroup.value.data.data
    // kiểm tra thực sự nhóm đang tìm mentor k hay nhập bừa
    if(group.value.status === 2) {
      getCv().json().execute();
    }
    else {
      alert("Nhóm hiện không tìm người hướng dẫn!");
      navigateTo('/groups?type=all');
    }
  });
  
  // Đã đăng ký mentor
  getCvRes(() => {
    statusShow.value = 2;
    register_inform.value = dataCv.value.data;
  });
  // Chưa có đăng ký mentor cho nhóm này
  getCvErr(() => {
    statusShow.value = 1;
    // Lấy cv đăng ký mentor cho môn này chưa
    getCvSubject().json().execute();
  });

  postMentorRes(() => {
    successAlert('Bạn đã đăng ký thành công!')
    statusShow.value = 2;
    getGroup().json().execute();
  });
  postMentorErr(() => {
    errorAlert(dataMentor.value.meta.error_message);
  })

  putMentorRes(() => {
    successAlert('Chỉnh sửa thông tin thành công!');
    register_inform.value = dataMentorPut.value.data;
  })
  putMentorErr(() => {
    errorAlert(dataMentorPut.value.meta.error_message);
  })

  delMentorRes(() => {
    successAlert('Hủy đăng ký thành công!');
    statusShow.value = 1;
    register_inform.value.cv_link = '';
    register_inform.value.schedule = '';
    register_inform.value.smart_banking = '';
    register_inform.value.note = '';
    register_inform.value.confirm = 'not_agreed';
  
    getCvSubject().json().execute();
  })
  delMentorErr(() => {
    errorAlert(dataMentordel.value.meta.error_message)
  })
// Đã đăng ký 
  getCvSubjectRes(() => {
    register_inform.value.cv_link = dataCvSubject.value.data.cv_link;
    register_inform.value.smart_banking = dataCvSubject.value.data.smart_banking;
  });

  const submit = () => {
    isDisabledButton.value = true;
    showConfirmError.value = false;
    if (register_inform.value.confirm !== 'agreed') {
      showConfirmError.value = true;
      isDisabledButton.value = false;
    } else {
      postMentor(register_inform.value).json().execute();
      isDisabledButton.value = false;
    }
  }
  const update = () => {
    isDisabledButton.value = true;
    showConfirmError.value = false;
    if (register_inform.value.confirm !== 'agreed') {
      showConfirmError.value = true;
      isDisabledButton.value = false;
    } else {
      putMentor(register_inform.value).json().execute();
      isDisabledButton.value = false;
    }
  }
  const deletee = () => {
    isDisabledButton.value = true;
    showConfirmError.value = false;
    delMentor().json().execute();
    isDisabledButton.value = false;
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
    font-size: 22px;
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
  
  .submit-button {  
    display: inline-block;
  }
  .submit-button>>>button {
    width: 200px;
  }
  
  form>div {
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
  </style>
    