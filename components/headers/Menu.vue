<template>
    <div>
        <div class="menu">
            <div>
                <p>
                    <BIconChevronDown /> Trang cá nhân
                </p>
                <button class="i1" :class="`${route.path.substring(12,15)}`" @click="navigateTo('/my-account')">
                    <BIconPersonFill /> Thông tin cá nhân
                </button>
                <button class="i2" :class="`${route.path.substring(12,15)}`" @click="navigateTo('/my-account/evaluate')">
                    <BIconPencilSquare /> Đánh giá của bạn
                </button>
                <button class="i8" :class="`${route.path.substring(12,15)}`" @click="navigateTo('/my-account/mentor-infor')">
                    <BIconPersonVideo3 /> Thông tin làm mentor
                </button>
            </div>
            <div>
                <p>
                    <BIconChevronDown /> Nhóm của tôi
                </p>
                <button class="i3" :class="`${route.path.substring(19,28)}`" @click="navigateTo('/my-account/groups/is-member')">
                    <BIconPeopleFill /> Nhóm là thành viên
                </button>
                <button class="i4" :class="`${route.path.substring(19,28)}`" @click="navigateTo('/my-account/groups/is-mentor')">
                    <BIconPersonVideo3 /> Nhóm là mentor
                </button>
            </div>
            <div>
                <p>
                    <BIconChevronDown /> Yêu cầu chờ duyệt
                </p>
                <button class="i5" :class="`${route.path.substring(19,37)}`" @click="navigateTo('/my-account/groups/request-create-group')">
                    <BIconPlusCircle /> Nhu cầu tạo nhóm
                </button>
                <button class="i6" :class="`${route.path.substring(19,37)}`" @click="navigateTo('/my-account/groups/request-is-member')">
                    <BIconPeopleFill /> Yêu cầu là thành viên
                </button>
                <button class="i7" :class="`${route.path.substring(19,37)}`" @click="navigateTo('/my-account/groups/request-is-mentor')">
                    <BIconPersonVideo3 /> Yêu cầu là mentor
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>

import { BIconChevronDown, BIconPencilSquare, BIconPeopleFill, BIconPersonFill, BIconPersonVideo3, BIconPlusCircle } from 'bootstrap-icons-vue';
const route = useRoute();
const a = () => {
    console.log(route.path.substring(19,37))
}
a();
</script>

<style scoped>
.menu {
    padding: 15px 15px 15px 0;
}
.i1, .i2.eva, .i8.men, .i3.is-member,  .i4.is-mentor, .i5.request-create-gro, .i6.request-is-member, .i7.request-is-mentor {
    background-color: #D3E3FD !important;
}
.i1.eva, .i1.gro, .i1.men {
    background-color: transparent !important;
}
.menu>div p {
    margin-top: 20px;
    margin-bottom: 5px;
    font-weight: 600;
    padding-left: 15px;
}

.menu>div>button {
    border-radius: 0 12px 12px 0;
    padding: 4px 4px 4px 15px;
    color: rgb(0, 0, 0);
    display: block;
    width: 100%;
    text-align: left;
    border: none;
    background-color: transparent;
}

.menu>div>button:hover {
    background-color: rgb(230, 230, 230);
}

svg {
    font-size: 13px;
    margin-right: 10px;
}
</style>