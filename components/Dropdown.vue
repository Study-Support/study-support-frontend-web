<template>
  <div class="text-center parent">
    <div class="dropout-button" :class="{ active: showd }" @click="showd = !showd">
      <button class="more">
        <span></span>
        <span></span>
        <span></span>
      </button>
      <ul>
        <li>
          <button @click="edit">Chỉnh sửa</button>
        </li>
        <li>
          <button @click="del">Xóa</button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script setup>
definePageMeta({
  layout: false,
});
const {
  database: databaseFirebase,
  ref: firebaseRef,
  set,
} = useFirebase()
const { $swal } = useNuxtApp()
const props = defineProps({
  data: {
    type: Object
  },
  messEdit: {
    type: Object
  },
  showEditMessFrom: {
    type: Object,
  },
  groupId: {
    type: String,
  },
  isReply: {
    type: Number,
  }
})
let showd = ref(false)
const edit = () => {
  props.messEdit.comment = props.data.comment;
  props.messEdit.isReply = props.isReply;
  if (props.messEdit.isReply === 1) {
    props.messEdit.id = props.data.parent;
    props.messEdit.id_child = props.data.id
  } else {
    props.messEdit.id = props.data.id;
  }
  props.showEditMessFrom.value = 'true';
}
const del = () => {
  $swal
    .fire({
      title: 'Bạn muốn xóa tin nhắn?',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      confirmButtonColor: 'rgb(252, 118, 118)',
    })
    .then((result) => {
      if (props.isReply === 1) {
        set(
          firebaseRef(
            databaseFirebase,
            `groups/${props.groupId}/${props.data.parent}/replies/${props.data.id}`
          ),
          null
        )
      } else {
        set(
          firebaseRef(
            databaseFirebase,
            `groups/${props.groupId}/${props.data.id}`
          ),
          null
        )
      }
    })
}
</script>
<style scoped>
.parent {
  position: absolute;
  top: 10px;
  right: 0;
  z-index: 0;
  width: auto;
}

.dropout-button .more {
  cursor: pointer;
  border: none;
  background: transparent;
}

.dropout-button .more span {
  display: block;
  width: .25rem;
  height: .25rem;
  background: #363636;
  border-radius: 50%;
  pointer-events: none;
}

.dropout-button .more span:not(:last-child) {
  margin-bottom: .125rem;
}

.dropout-button {
  z-index: 9001;
  width: fit-content;
  position: relative;
  margin-left: auto;
  margin-right: auto;
}

.dropout-button ul {
  position: absolute;
  top: 0rem;
  right: 1.5rem;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.12s ease;
  padding-left: 0;
  background-color: rgb(244, 244, 244);
  width: 120px;
}

.dropout-button.active ul {
  transform: scaleX(1);
}

.dropout-button li {
  width: 120px;
  display: inline-block;
  margin: 3px 0;
}

li button {
  border: none;
  padding: 2px 20px;
  background-color: transparent;
  width: 100%;
}

li button:hover {
  background-color: #e1e1e1;
}
</style>