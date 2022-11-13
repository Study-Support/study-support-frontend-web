<template>
  <div>
    <BContainer fluid class="header">
      <BContainer>
        <BRow class="content">
          <BCol class=" header-content col-12 col-lg-6">
            <BRow class="mb-4">
              <h2 class="col slogan"> ĐỘI NGŨ MENTOR </h2>
            </BRow>
            <BRow class="mb-4">
              <p class="col idiom col-12 col-auto">
                Học… học để là chính mình, và học để từ bỏ với vẻ thanh cao những gì không phải là mình.
              </p>
            </BRow> 
            <BRow class="">
              <BCol>
                <div class="input-group search">
                  <input class="form-control border-end-0 border" type="search"
                    placeholder="Tìm kiếm theo tên">
                  <span class="input-group-append">
                    <button class="btn btn-outline-secondary bg-white border-start-0 border-bottom-0 border ms-n5"
                      type="button" @click="searchNoti">
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
  </div>
</template>
<script setup>
import { BIconSearch } from 'bootstrap-icons-vue';

definePageMeta({
  layout: 'page',
  middleware: 'authenticated',
});


</script>
<style scoped>
h2, p {
  color: white;
}

h2 {
  font-weight: 600;
  font-size: 27px;
}

.header {
  background-image: url('assets/mentors/mentorTeam.png');
  background-color: rgb(96, 139, 141);
  background-repeat: none;
  background-size: 100%;
}

.header .content {
  padding: 100px;
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
  color: rgb(7, 30, 95)
}

</style>
 