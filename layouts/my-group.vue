<template>
    <div>
      <div class="d-flex">
        <div class="col-3 sidebar">
          <MyGroupMenu />
        </div>
        <div class="result">
          <slot />
        </div>
      </div>
    </div>
  </template>
  <style scoped>
  .sidebar {
    width: 21% !important;
    background-color: #f6f8fc;
    display: inline-block;
    height: 100vh;
    padding-top: 20px;
  }
  
  .result {
    display: inline-block;
    width: 79% !important;
    overflow: auto;
    height: 100vh;
  }
  </style>