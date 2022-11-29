<template>
  <div>
    <div v-for="data in allChat" :key="data.id" class="mt-4">
      {{ data.name }}:
      {{ data.message }}
      <div class="replyMess">
        <BFormInput id="input-live" v-model="replyMess" placeholder="Nhập trả lời" trim class="mt-2" />
        <button @click="sendReplyMess(data.id)">
          reply
        </button>
      </div>
      Câu trả lời:
      <div v-for="reply in data.replies" :key="reply.id">
        {{reply.name}}:
        {{reply.message}}
      </div>
    </div>
    <div class="newMess">
      <BFormInput id="input-live" v-model="newMess" placeholder="Nhập tin nhắn mới" trim class="mt-2" />
      <button @click="sendNewMess">
        send
      </button>
    </div>
  </div>
</template>
<script setup>
import { v4 as uuidv4 } from 'uuid';
definePageMeta({
  layout: false
});
const route = useRoute();
const newMess = ref();
const replyMess = ref();
let userId = uuidv4();
let allChat = ref([]);
const {
  database: databaseFirebase,
  ref: firebaseRef,
  push,
  set,
  onValue
} = useFirebase();


const sendNewMess = () => {
  allChat.value = [];
  userId = uuidv4();
  set(firebaseRef(databaseFirebase, `groups/${route.params.id}/${userId}`), {
    id: userId,
    name: 'Như Hoàng',
    message: newMess.value,
  });
  newMess.value = '';
};
const sendReplyMess = (id) => {
  allChat.value = [];
  userId = uuidv4();
  set(firebaseRef(databaseFirebase, `groups/${route.params.id}/${id}/replies/${userId}`), {
    id: userId,
    name: 'Như Hoàng',
    message: replyMess.value,
  });
  replyMess.value = '';
}
const bb = () => {
  allChat.value = [];
  onValue(firebaseRef(databaseFirebase, `groups/${route.params.id}`), (data) => {
    allChat.value = [];
    data.forEach((d) => {
      allChat.value.push(d.val());
    });
  })
};
onMounted(() => {
  bb();
})
</script>
<style scoped>
* {
  color: black;
}

.newMess {
  position: fixed;
  ;
  bottom: 0;
  right: 0;
  width: 100%;
  padding: 20px;
}
</style>