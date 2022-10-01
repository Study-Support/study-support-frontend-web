<template>
  <div class="full">
    <BContainer>
      <BRow class="row1 m-1">
        <BCol>
          <BTabs
            pills card
            align="end"
          >
            <BTab title="Tuần" active>
              <StatisticLineChart
                :chart-type="getConfig('constants.chartType.week')"
                :title="'tuần'"
              />
            </BTab>
            <BTab title="Tháng">
              <StatisticLineChart
                :chart-type="getConfig('constants.chartType.month')"
                :title="'tháng'"
              />
            </BTab>
          </BTabs>
        </BCol>
      </BRow>
      <BRow class="mt-3">
        <BCol>
          <BRow class="mt-3">
            <h6 class="col">
              Tài khoản của cả gia đình
            </h6>
          </BRow>
          <BRow class="d-flex justify-content-center row2 m-2">
            <BCol>
              <BRow
                v-for="account in dataAccounts" :key="account.id"
                class="d-flex justify-content-between account mb-2 "
              >
                <p class="col-auto">{{ account.name }}</p>
                <p class="col-auto">{{ account.amount }}</p>
              </BRow>
              <BRow class="row d-flex justify-content-between sum-account mb-3">
                <p class="col-auto">Tổng</p>
                <p class="col-auto">{{ sumAccount }}</p>
              </BRow>
            </BCol>
          </BRow>
        </BCol>
      </BRow>
    </BContainer>
  </div>
</template>
<script setup>

definePageMeta({
  middleware: 'authenticated',
});
const {formatter} = useFormatMoney();
const {getConfig} = useConfig();
const {
  data: dataAccounts,
  onFetchResponse,
  get,
} = useFetchApi({
  requireAuth: true,
  disableHandleErrorUnauthorized: false,
})(
  '/accounts',
  {immediate: false},
);
const sumAccount = ref(0);
get().json().execute();
onFetchResponse(() => {
  for (let i = 0; i < dataAccounts.value.length; i += 1) {
    sumAccount.value += dataAccounts.value[i].amount;
    dataAccounts.value[i].amount = formatter.format(dataAccounts.value[i].amount);
  }
  sumAccount.value = formatter.format(sumAccount.value);
});
</script>

<style scoped>
p {
  margin: 8px;
}

.account,
.sum-account {
  /* background-color: #E8E8E8; */
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
  box-shadow: 8px 8px 8px -8px rgb(180, 180, 180);
}

.sum-account {
  background-color: rgb(248, 192, 192);
}
.full {
  background-color: #F6F5FA;
}
.container {
  padding-top: 10px;
}
.row1 {
  background-color: rgb(255, 255, 255);
  border-radius: 10px;
}
div >>> button {
    color: rgb(0, 0, 0);
  }
div >>> button.active{
  color: rgb(255, 143, 143)!important;
}
</style>
