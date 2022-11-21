<template>
    <BContainer class="pt-3">
        <BRow>
            <BCol class="pb-4">
                <h5>
                    <BIconChevronRight />
                    <BIconChevronRight /> Nhóm đang đợi tìm kiếm người hướng dẫn
                </h5>
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
                <p class="quantity">
                    <span>
                        Sao chép liên kết để mời người hướng dẫn:
                    </span>
                    <button @click="a">Sao chép liên kết</button>
                    <button @click="navigateTo('/mentors')">Mời người hướng dẫn</button>
                </p>
            </BCol>
        </BRow>
    </BContainer>
</template>
    
<script setup>
import { BIconChevronRight } from 'bootstrap-icons-vue';

definePageMeta({
    layout: 'page',
    middleware: 'authenticated',
});
const route = useRoute();
const {$toast} = useNuxtApp();
const {getConfig} = useConfig();
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
getGroup().json().execute();
getGroupRes(() => {
    group.value = dataGetGroup.value.data
    // kiểm tra thực sự nhóm đang tìm mentor k hay nhập bừa id
    if (group.value.status === 2) {
        getCv().json().execute();
    }
    else {
        alert("Truy cập nhóm không đúng!");
        navigateTo('/groups?type=all');
    }
});
const a = () => {
    try {
        navigator
        .clipboard
        .writeText(`${getConfig('constants.API_BASE')}groups/${route.params.id}/register-is-mentor`)
        .then(() => {
            $toast('Sao chép thành công','success', 2000);
        })
    } catch (e) {
        console.error(e);
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
    